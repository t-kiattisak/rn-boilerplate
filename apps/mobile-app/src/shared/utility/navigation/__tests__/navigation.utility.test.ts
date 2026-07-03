// @ts-nocheck
import {
  CommonActions,
  NavigationState,
  Route,
  StackActions
} from '@react-navigation/native';

import { RootStackParamList } from '@/app/types/navigation';
import { navigationRef } from '@/shared/utility/navigation/createNavigation.utility';
import * as navigationUtils from '@/shared/utility/navigation/navigation.utility';

jest.mock('@/shared/utility/navigation/createNavigation.utility', () => ({
  navigationRef: {
    isReady: jest.fn(),
    navigate: jest.fn(),
    dispatch: jest.fn(),
    goBack: jest.fn(),
    canGoBack: jest.fn(),
    getCurrentRoute: jest.fn(),
    getState: jest.fn(),
    setParams: jest.fn(),
  },
}));

jest.mock('@react-navigation/native', () => {
  const actual = jest.requireActual('@react-navigation/native');
  return {
    ...actual,
    CommonActions: {
      reset: jest.fn((payload) => ({ type: 'RESET', payload })),
      setParams: jest.fn((params) => ({ type: 'SET_PARAMS', payload: params })),
    },
    StackActions: {
      push: jest.fn((screen, params) => ({
        type: 'PUSH',
        payload: { name: screen, params },
      })),
      replace: jest.fn((screen, params) => ({
        type: 'REPLACE',
        payload: { name: screen, params },
      })),
      popToTop: jest.fn(() => ({ type: 'POP_TO_TOP' })),
      pop: jest.fn((count) => ({ type: 'POP', payload: { count } })),
    },
  };
});

const mockNavigationRef = navigationRef as jest.Mocked<typeof navigationRef>;
const mockCommonActions = CommonActions as jest.Mocked<typeof CommonActions>;
const mockStackActions = StackActions as jest.Mocked<typeof StackActions>;

const createMockRoute = (
  name: keyof RootStackParamList,
  params?: RootStackParamList[keyof RootStackParamList],
  key?: string
): Route<keyof RootStackParamList> => ({
  key: key || `route-${name}`,
  name,
  params: params as any,
});

const createMockState = (
  routes: Route<keyof RootStackParamList>[],
  index: number = routes.length - 1
): NavigationState => ({
  index,
  routes: routes as any,
  key: 'root',
  routeNames: routes.map((r) => r.name),
  type: 'stack',
  stale: false,
});

describe('navigation.utility', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockNavigationRef.isReady.mockReturnValue(true);
    mockNavigationRef.canGoBack.mockReturnValue(true);
  });

  describe('navigate', () => {
    it('should navigate when navigation is ready', () => {
      const screen = 'Home' as keyof RootStackParamList;
      navigationUtils.navigate(screen);

      expect(mockNavigationRef.isReady).toHaveBeenCalled();
      expect(mockNavigationRef.navigate).toHaveBeenCalledWith(screen);
    });

    it('should navigate with params when navigation is ready', () => {
      const screen = 'Home' as keyof RootStackParamList;
      const params = { id: '123' };
      navigationUtils.navigate(screen, params);

      expect(mockNavigationRef.navigate).toHaveBeenCalledWith(screen, params);
    });

    it('should not navigate when navigation is not ready', () => {
      mockNavigationRef.isReady.mockReturnValue(false);

      const screen = 'Home' as keyof RootStackParamList;
      navigationUtils.navigate(screen);

      expect(mockNavigationRef.navigate).not.toHaveBeenCalled();
    });
  });

  describe('push', () => {
    it('should push screen when navigation is ready', () => {
      const screen = 'Home' as keyof RootStackParamList;
      navigationUtils.push(screen);

      expect(mockNavigationRef.dispatch).toHaveBeenCalledWith(
        mockStackActions.push(screen)
      );
    });

    it('should push screen with params when navigation is ready', () => {
      const screen = 'Home' as keyof RootStackParamList;
      const params = { id: '123' };
      navigationUtils.push(screen, params);

      expect(mockNavigationRef.dispatch).toHaveBeenCalledWith(
        mockStackActions.push(screen, params)
      );
    });

    it('should not push when navigation is not ready', () => {
      mockNavigationRef.isReady.mockReturnValue(false);

      const screen = 'Home' as keyof RootStackParamList;
      navigationUtils.push(screen);

      expect(mockNavigationRef.dispatch).not.toHaveBeenCalled();
    });
  });

  describe('goBack', () => {
    it('should go back when navigation is ready and can go back', () => {
      navigationUtils.goBack();

      expect(mockNavigationRef.isReady).toHaveBeenCalled();
      expect(mockNavigationRef.canGoBack).toHaveBeenCalled();
      expect(mockNavigationRef.goBack).toHaveBeenCalled();
    });

    it('should not go back when navigation is not ready', () => {
      mockNavigationRef.isReady.mockReturnValue(false);

      navigationUtils.goBack();

      expect(mockNavigationRef.goBack).not.toHaveBeenCalled();
    });

    it('should not go back when cannot go back', () => {
      mockNavigationRef.canGoBack.mockReturnValue(false);

      navigationUtils.goBack();

      expect(mockNavigationRef.goBack).not.toHaveBeenCalled();
    });
  });

  describe('reset', () => {
    it('should reset to screen when navigation is ready', () => {
      const screen = 'Home' as keyof RootStackParamList;
      navigationUtils.reset(screen);

      expect(mockCommonActions.reset).toHaveBeenCalledWith({
        index: 0,
        routes: [{ name: screen }],
      });
      expect(mockNavigationRef.dispatch).toHaveBeenCalled();
    });

    it('should reset to screen with params when navigation is ready', () => {
      const screen = 'Home' as keyof RootStackParamList;
      const params = { id: '123' };
      navigationUtils.reset(screen, params);

      expect(mockCommonActions.reset).toHaveBeenCalledWith({
        index: 0,
        routes: [{ name: screen, params }],
      });
    });

    it('should reset with navigation state object', () => {
      const state = createMockState([
        createMockRoute('Home' as keyof RootStackParamList),
      ]);
      navigationUtils.reset(state);

      expect(mockCommonActions.reset).toHaveBeenCalledWith(state);
    });

    it('should not reset when navigation is not ready', () => {
      mockNavigationRef.isReady.mockReturnValue(false);

      const screen = 'Home' as keyof RootStackParamList;
      navigationUtils.reset(screen);

      expect(mockNavigationRef.dispatch).not.toHaveBeenCalled();
    });
  });

  describe('replace', () => {
    it('should replace root screen (no target) when screen is in root routeNames', () => {
      const screen = 'Home' as keyof RootStackParamList;
      const state = createMockState([
        createMockRoute('Previous' as keyof RootStackParamList),
      ]);
      state.routeNames = ['Home', 'Previous'];
      mockNavigationRef.getState.mockReturnValue(state);

      navigationUtils.replace(screen);

      expect(mockNavigationRef.dispatch).toHaveBeenCalledWith(
        mockStackActions.replace(screen)
      );
    });

    it('should replace nested screen (with target) when screen is NOT in root routeNames', () => {
      const screen = 'NestedScreen' as any; // Treat as nested screen
      const nestedKey = 'nested-stack-key';
      
      // Create state with nested stack
      const nestedState = createMockState([
        createMockRoute('CurrentNested' as keyof RootStackParamList),
      ]);
      nestedState.key = nestedKey;

      const rootRoute = createMockRoute('RootStack' as keyof RootStackParamList);
      (rootRoute as any).state = nestedState;

      const rootState = createMockState([rootRoute]);
      // Ensure target screen is NOT in root routeNames
      rootState.routeNames = ['RootStack']; 
      
      mockNavigationRef.getState.mockReturnValue(rootState);

      navigationUtils.replace(screen);

      expect(mockNavigationRef.dispatch).toHaveBeenCalledWith({
        ...mockStackActions.replace(screen),
        target: nestedKey,
      });
    });

    it('should replace screen with params', () => {
      const screen = 'Home' as keyof RootStackParamList;
      const params = { id: '123' };
      const state = createMockState([
        createMockRoute('Previous' as keyof RootStackParamList),
      ]);
      state.routeNames = ['Home'];
      mockNavigationRef.getState.mockReturnValue(state);

      navigationUtils.replace(screen, params);

      expect(mockNavigationRef.dispatch).toHaveBeenCalledWith(
        mockStackActions.replace(screen, params)
      );
    });

    it('should not replace when navigation is not ready', () => {
      mockNavigationRef.isReady.mockReturnValue(false);

      const screen = 'Home' as keyof RootStackParamList;
      navigationUtils.replace(screen);

      expect(mockNavigationRef.dispatch).not.toHaveBeenCalled();
    });
  });

  describe('replaceParams', () => {
    it('should replace params when route exists and navigation is ready', () => {
      const routeName = 'Home' as keyof RootStackParamList;
      const routeKey = 'route-Home';
      const params = { id: '123' };

      const state = createMockState([
        createMockRoute(routeName, undefined, routeKey),
      ]);
      mockNavigationRef.getState.mockReturnValue(state);

      navigationUtils.replaceParams(routeName, params);

      expect(mockNavigationRef.dispatch).toHaveBeenCalledWith({
        ...mockCommonActions.setParams(params),
        source: routeKey,
      });
    });

    it('should not replace params when route does not exist', () => {
      const routeName = 'NonExistent' as keyof RootStackParamList;
      const params = { id: '123' };

      const state = createMockState([
        createMockRoute('Home' as keyof RootStackParamList),
      ]);
      mockNavigationRef.getState.mockReturnValue(state);

      navigationUtils.replaceParams(routeName, params);

      expect(mockNavigationRef.dispatch).not.toHaveBeenCalled();
    });

    it('should find route in nested state', () => {
      const routeName = 'Nested' as keyof RootStackParamList;
      const routeKey = 'route-Nested';
      const params = { id: '123' };

      const nestedState = createMockState([
        createMockRoute(routeName, undefined, routeKey),
      ]);
      const parentRoute = createMockRoute('Home' as keyof RootStackParamList);
      (parentRoute as any).state = nestedState;
      const state = createMockState([parentRoute]);
      mockNavigationRef.getState.mockReturnValue(state);

      navigationUtils.replaceParams(routeName, params);

      expect(mockNavigationRef.dispatch).toHaveBeenCalledWith({
        ...mockCommonActions.setParams(params),
        source: routeKey,
      });
    });

    it('should not replace params when navigation is not ready', () => {
      mockNavigationRef.isReady.mockReturnValue(false);

      const routeName = 'Home' as keyof RootStackParamList;
      navigationUtils.replaceParams(routeName, {});

      expect(mockNavigationRef.dispatch).not.toHaveBeenCalled();
    });
  });

  describe('popToTop', () => {
    it('should pop to top when navigation is ready', () => {
      navigationUtils.popToTop();

      expect(mockNavigationRef.dispatch).toHaveBeenCalledWith(
        mockStackActions.popToTop()
      );
    });

    it('should not pop to top when navigation is not ready', () => {
      mockNavigationRef.isReady.mockReturnValue(false);

      navigationUtils.popToTop();

      expect(mockNavigationRef.dispatch).not.toHaveBeenCalled();
    });
  });

  describe('pop', () => {
    it('should pop with default count of 1 when navigation is ready', () => {
      navigationUtils.pop();

      expect(mockNavigationRef.dispatch).toHaveBeenCalledWith(
        mockStackActions.pop(1)
      );
    });

    it('should pop with custom count when navigation is ready', () => {
      navigationUtils.pop(3);

      expect(mockNavigationRef.dispatch).toHaveBeenCalledWith(
        mockStackActions.pop(3)
      );
    });

    it('should not pop when navigation is not ready', () => {
      mockNavigationRef.isReady.mockReturnValue(false);

      navigationUtils.pop();

      expect(mockNavigationRef.dispatch).not.toHaveBeenCalled();
    });
  });

  describe('getCurrentRoute', () => {
    it('should return current route when navigation is ready', () => {
      const mockRoute = createMockRoute('Home' as keyof RootStackParamList);
      mockNavigationRef.getCurrentRoute.mockReturnValue(mockRoute as any);

      const result = navigationUtils.getCurrentRoute();

      expect(result).toBe(mockRoute);
      expect(mockNavigationRef.getCurrentRoute).toHaveBeenCalled();
    });

    it('should return undefined when navigation is not ready', () => {
      mockNavigationRef.isReady.mockReturnValue(false);

      const result = navigationUtils.getCurrentRoute();

      expect(result).toBeUndefined();
      expect(mockNavigationRef.getCurrentRoute).not.toHaveBeenCalled();
    });
  });

  describe('getCurrentRouteName', () => {
    it('should return current route name when navigation is ready', () => {
      const routeName = 'Home' as keyof RootStackParamList;
      const mockRoute = createMockRoute(routeName);
      mockNavigationRef.getCurrentRoute.mockReturnValue(mockRoute as any);

      const result = navigationUtils.getCurrentRouteName();

      expect(result).toBe(routeName);
    });

    it('should return undefined when navigation is not ready', () => {
      mockNavigationRef.isReady.mockReturnValue(false);

      const result = navigationUtils.getCurrentRouteName();

      expect(result).toBeUndefined();
    });

    it('should return undefined when route is null', () => {
      mockNavigationRef.getCurrentRoute.mockReturnValue(null as any);

      const result = navigationUtils.getCurrentRouteName();

      expect(result).toBeUndefined();
    });
  });

  describe('isReady', () => {
    it('should return true when navigation is ready', () => {
      mockNavigationRef.isReady.mockReturnValue(true);

      const result = navigationUtils.isReady();

      expect(result).toBe(true);
    });

    it('should return false when navigation is not ready', () => {
      mockNavigationRef.isReady.mockReturnValue(false);

      const result = navigationUtils.isReady();

      expect(result).toBe(false);
    });
  });

  describe('canGoBack', () => {
    it('should return true when navigation is ready and can go back', () => {
      mockNavigationRef.canGoBack.mockReturnValue(true);

      const result = navigationUtils.canGoBack();

      expect(result).toBe(true);
    });

    it('should return false when navigation is not ready', () => {
      mockNavigationRef.isReady.mockReturnValue(false);

      const result = navigationUtils.canGoBack();

      expect(result).toBe(false);
    });

    it('should return false when cannot go back', () => {
      mockNavigationRef.canGoBack.mockReturnValue(false);

      const result = navigationUtils.canGoBack();

      expect(result).toBe(false);
    });
  });

  describe('getState', () => {
    it('should return state when navigation is ready', () => {
      const state = createMockState([
        createMockRoute('Home' as keyof RootStackParamList),
      ]);
      mockNavigationRef.getState.mockReturnValue(state);

      const result = navigationUtils.getState();

      expect(result).toBe(state);
    });

    it('should return undefined when navigation is not ready', () => {
      mockNavigationRef.isReady.mockReturnValue(false);

      const result = navigationUtils.getState();

      expect(result).toBeUndefined();
    });
  });

  describe('setParams', () => {
    it('should set params when navigation is ready', () => {
      const params = { id: '123' };
      navigationUtils.setParams(params);

      expect(mockNavigationRef.setParams).toHaveBeenCalledWith(params);
    });

    it('should not set params when navigation is not ready', () => {
      mockNavigationRef.isReady.mockReturnValue(false);

      const params = { id: '123' };
      navigationUtils.setParams(params);

      expect(mockNavigationRef.setParams).not.toHaveBeenCalled();
    });
  });

  describe('navigateAndReset', () => {
    it('should call reset with screen', () => {
      const screen = 'Home' as keyof RootStackParamList;
      // Ensure navigation is ready for reset to work
      mockNavigationRef.isReady.mockReturnValue(true);

      navigationUtils.navigateAndReset(screen);

      expect(mockCommonActions.reset).toHaveBeenCalledWith({
        index: 0,
        routes: [{ name: screen }],
      });
      expect(mockNavigationRef.dispatch).toHaveBeenCalled();
    });

    it('should call reset with screen and params', () => {
      const screen = 'Home' as keyof RootStackParamList;
      const params = { id: '123' };
      // Ensure navigation is ready for reset to work
      mockNavigationRef.isReady.mockReturnValue(true);

      navigationUtils.navigateAndReset(screen, params);

      expect(mockCommonActions.reset).toHaveBeenCalledWith({
        index: 0,
        routes: [{ name: screen, params }],
      });
      expect(mockNavigationRef.dispatch).toHaveBeenCalled();
    });
  });

  describe('navigateAndClear', () => {
    it('should navigate and clear all routes when navigation is ready', () => {
      const screen = 'Home' as keyof RootStackParamList;
      const state = createMockState([
        createMockRoute('Previous' as keyof RootStackParamList),
      ]);
      mockNavigationRef.getState.mockReturnValue(state);

      navigationUtils.navigateAndClear(screen);

      expect(mockCommonActions.reset).toHaveBeenCalledWith(
        expect.objectContaining({
          index: 0,
          routes: expect.arrayContaining([
            expect.objectContaining({ name: screen }),
          ]),
        })
      );
    });

    it('should navigate and clear with params when navigation is ready', () => {
      const screen = 'Home' as keyof RootStackParamList;
      const params = { id: '123' };
      const state = createMockState([
        createMockRoute('Previous' as keyof RootStackParamList),
      ]);
      mockNavigationRef.getState.mockReturnValue(state);

      navigationUtils.navigateAndClear(screen, params);

      expect(mockCommonActions.reset).toHaveBeenCalledWith(
        expect.objectContaining({
          index: 0,
          routes: expect.arrayContaining([
            expect.objectContaining({ name: screen, params }),
          ]),
        })
      );
    });

    it('should preserve specified screens to keep', () => {
      const screen = 'Home' as keyof RootStackParamList;
      const keepScreen = 'KeepMe' as keyof RootStackParamList;
      const keepRoute = createMockRoute(keepScreen, { id: 'keep-123' });
      const state = createMockState([
        createMockRoute('Previous' as keyof RootStackParamList),
        keepRoute,
      ]);
      mockNavigationRef.getState.mockReturnValue(state);

      navigationUtils.navigateAndClear(screen, undefined, [keepScreen]);

      expect(mockCommonActions.reset).toHaveBeenCalledWith(
        expect.objectContaining({
          index: 1,
          routes: expect.arrayContaining([
            expect.objectContaining({ name: keepScreen, params: { id: 'keep-123' } }),
            expect.objectContaining({ name: screen }),
          ]),
        })
      );
    });

    it('should preserve multiple screens to keep', () => {
      const screen = 'Home' as keyof RootStackParamList;
      const keepScreen1 = 'Keep1' as keyof RootStackParamList;
      const keepScreen2 = 'Keep2' as keyof RootStackParamList;
      const keepRoute1 = createMockRoute(keepScreen1);
      const keepRoute2 = createMockRoute(keepScreen2, { id: 'keep2-123' });
      const state = createMockState([
        createMockRoute('Previous' as keyof RootStackParamList),
        keepRoute1,
        keepRoute2,
      ]);
      mockNavigationRef.getState.mockReturnValue(state);

      navigationUtils.navigateAndClear(screen, undefined, [keepScreen1, keepScreen2]);

      expect(mockCommonActions.reset).toHaveBeenCalledWith(
        expect.objectContaining({
          index: 2,
          routes: expect.arrayContaining([
            expect.objectContaining({ name: keepScreen1 }),
            expect.objectContaining({ name: keepScreen2, params: { id: 'keep2-123' } }),
            expect.objectContaining({ name: screen }),
          ]),
        })
      );
    });

    it('should not navigate when navigation is not ready', () => {
      mockNavigationRef.isReady.mockReturnValue(false);

      const screen = 'Home' as keyof RootStackParamList;
      navigationUtils.navigateAndClear(screen);

      expect(mockNavigationRef.dispatch).not.toHaveBeenCalled();
    });

    it('should not navigate when state is null', () => {
      mockNavigationRef.getState.mockReturnValue(null as any);

      const screen = 'Home' as keyof RootStackParamList;
      navigationUtils.navigateAndClear(screen);

      expect(mockNavigationRef.dispatch).not.toHaveBeenCalled();
    });

    it('preserve routes without params correctly', () => {
      const screen = 'Home' as keyof RootStackParamList;
      const keepScreen = 'KeepMe' as keyof RootStackParamList;
      const keepRoute = createMockRoute(keepScreen); // no params
      const state = createMockState([keepRoute]);
      mockNavigationRef.getState.mockReturnValue(state);

      navigationUtils.navigateAndClear(screen, undefined, [keepScreen]);

      expect(mockCommonActions.reset).toHaveBeenCalledWith(
        expect.objectContaining({
          index: 1,
          routes: expect.arrayContaining([
            expect.objectContaining({ name: keepScreen }),
            expect.objectContaining({ name: screen }),
          ]),
        })
      );
    });
  });

  describe('reset with navigation state object', () => {
    it('merges incoming routes with existing routes by name', () => {
      const existingRoute = createMockRoute(
        'Home' as keyof RootStackParamList,
        { id: 'existing' },
        'existing-key'
      );
      const currentState = createMockState([existingRoute]);
      mockNavigationRef.getState.mockReturnValue(currentState);

      const incomingState = {
        index: 0,
        routes: [{ name: 'Home' as keyof RootStackParamList, params: { id: 'new' } }],
      };

      navigationUtils.reset(incomingState as any);

      expect(mockCommonActions.reset).toHaveBeenCalledWith(
        expect.objectContaining({
          routes: expect.arrayContaining([
            expect.objectContaining({
              key: 'existing-key',
              name: 'Home',
              params: { id: 'new' },
            }),
          ]),
        })
      );
    });

    it('uses incoming route when no existing route matches', () => {
      const currentState = createMockState([
        createMockRoute('Previous' as keyof RootStackParamList),
      ]);
      mockNavigationRef.getState.mockReturnValue(currentState);

      const incomingRoute = {
        name: 'Home' as keyof RootStackParamList,
        params: { id: '123' },
      };

      navigationUtils.reset({
        index: 0,
        routes: [incomingRoute],
      } as any);

      expect(mockCommonActions.reset).toHaveBeenCalledWith(
        expect.objectContaining({
          routes: [incomingRoute],
        })
      );
    });
  });

  describe('isCurrentRouteNameOneOf', () => {
    it('returns true when current route matches one of the names', () => {
      mockNavigationRef.getCurrentRoute.mockReturnValue(
        createMockRoute('Home' as keyof RootStackParamList) as any
      );

      expect(navigationUtils.isCurrentRouteNameOneOf('Home', 'Settings')).toBe(
        true
      );
    });

    it('returns false when route name does not match', () => {
      mockNavigationRef.getCurrentRoute.mockReturnValue(
        createMockRoute('Home' as keyof RootStackParamList) as any
      );

      expect(navigationUtils.isCurrentRouteNameOneOf('Settings')).toBe(false);
    });

    it('returns false when navigation is not ready', () => {
      mockNavigationRef.isReady.mockReturnValue(false);

      expect(navigationUtils.isCurrentRouteNameOneOf('Home')).toBe(false);
    });

    it('returns false when no route names are provided', () => {
      expect(navigationUtils.isCurrentRouteNameOneOf()).toBe(false);
    });

    it('returns false when current route is null', () => {
      mockNavigationRef.getCurrentRoute.mockReturnValue(null as any);

      expect(navigationUtils.isCurrentRouteNameOneOf('Home')).toBe(false);
    });
  });

  describe('popToRouteName', () => {
    it('pops to an existing route in history', () => {
      const homeRoute = createMockRoute('Home' as keyof RootStackParamList);
      const settingsRoute = createMockRoute(
        'Settings' as keyof RootStackParamList
      );
      const state = createMockState([homeRoute, settingsRoute], 1);
      mockNavigationRef.getState.mockReturnValue(state);

      const result = navigationUtils.popToRouteName(
        'Home' as keyof RootStackParamList
      );

      expect(result).toBe(true);
      expect(mockCommonActions.reset).toHaveBeenCalledWith(
        expect.objectContaining({
          index: 0,
          routes: [homeRoute],
        })
      );
    });

    it('returns false and warns when route is not in history', () => {
      const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      const state = createMockState([
        createMockRoute('Home' as keyof RootStackParamList),
      ]);
      mockNavigationRef.getState.mockReturnValue(state);

      const result = navigationUtils.popToRouteName(
        'Settings' as keyof RootStackParamList
      );

      expect(result).toBe(false);
      expect(warnSpy).toHaveBeenCalled();
      warnSpy.mockRestore();
    });

    it('returns false when navigation is not ready', () => {
      mockNavigationRef.isReady.mockReturnValue(false);

      expect(
        navigationUtils.popToRouteName('Home' as keyof RootStackParamList)
      ).toBe(false);
    });

    it('returns false when state is null', () => {
      mockNavigationRef.getState.mockReturnValue(null as any);

      expect(
        navigationUtils.popToRouteName('Home' as keyof RootStackParamList)
      ).toBe(false);
    });
  });

  describe('replace without params', () => {
    it('replaces root screen without params when screen is in root routeNames', () => {
      const screen = 'Home' as keyof RootStackParamList;
      const state = createMockState([
        createMockRoute('Previous' as keyof RootStackParamList),
      ]);
      state.routeNames = ['Home', 'Previous'];
      mockNavigationRef.getState.mockReturnValue(state);

      navigationUtils.replace(screen);

      expect(mockNavigationRef.dispatch).toHaveBeenCalledWith(
        mockStackActions.replace(screen)
      );
    });
  });
});

