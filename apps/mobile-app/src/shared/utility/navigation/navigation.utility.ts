import {
  CommonActions,
  NavigationState,
  PartialState,
  Route,
  StackActions,
} from '@react-navigation/native';

import type { AppFocusedRouteName, RootStackParamList } from '@/app/types';
import { navigationRef } from '@/shared/utility/navigation/createNavigation.utility';
import { isObject } from '@/shared/utility/validators';

type RootResetRoute = {
  [K in keyof RootStackParamList]: {
    name: K;
    params?: RootStackParamList[K];
    state?: PartialState<NavigationState>;
  };
}[keyof RootStackParamList];

type RootResetState = {
  index: number;
  routes: RootResetRoute[];
};

type NavState = NavigationState | PartialState<NavigationState>;

function readNavigationState(): NavState | undefined {
  if (!navigationRef.isReady()) {
    return undefined;
  }

  // React Navigation types assume non-null after isReady(); tests may still mock null.
  return navigationRef.getState() as NavState | undefined;
}

export function navigate<RouteName extends keyof RootStackParamList>(
  ...args: RouteName extends unknown
    ? undefined extends RootStackParamList[RouteName]
      ?
          | [screen: RouteName]
          | [screen: RouteName, params: RootStackParamList[RouteName]]
      : [screen: RouteName, params: RootStackParamList[RouteName]]
    : never
): void {
  if (navigationRef.isReady()) {
    navigationRef.navigate(...args);
  }
}

export function push<RouteName extends keyof RootStackParamList>(
  ...args: RouteName extends unknown
    ? undefined extends RootStackParamList[RouteName]
      ?
          | [screen: RouteName]
          | [screen: RouteName, params: RootStackParamList[RouteName]]
      : [screen: RouteName, params: RootStackParamList[RouteName]]
    : never
): void {
  if (navigationRef.isReady()) {
    const [screen, params] = args;
    navigationRef.dispatch(
      params === undefined
        ? StackActions.push(screen)
        : StackActions.push(screen, params)
    );
  }
}

export function goBack(): void {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
  }
}

export function reset<RouteName extends keyof RootStackParamList>(
  ...args: RouteName extends unknown
    ? undefined extends RootStackParamList[RouteName]
      ?
          | [screen: RouteName]
          | [screen: RouteName, params: RootStackParamList[RouteName]]
      : [screen: RouteName, params: RootStackParamList[RouteName]]
    : never
): void;

// eslint-disable-next-line no-redeclare
export function reset(state: RootResetState): void;

// eslint-disable-next-line no-redeclare
export function reset<RouteName extends keyof RootStackParamList>(
  ...args:
    | [RouteName]
    | [RouteName, RootStackParamList[RouteName]]
    | [PartialState<NavigationState> | NavigationState<RootStackParamList>]
): void {
  if (!navigationRef.isReady()) return;

  if (isObject(args[0]) && 'routes' in args[0]) {
    const currentState = readNavigationState();
    const mergedRoutes = args[0].routes.map((incomingRoute) => {
      const existingRoute = currentState?.routes.find(
        (r) => r.name === incomingRoute.name
      );

      return existingRoute
        ? {
            ...existingRoute,
            ...incomingRoute,
            state: incomingRoute.state ?? undefined,
          }
        : incomingRoute;
    });

    const resetState = {
      ...currentState,
      ...args[0],
      routes: mergedRoutes,
    } as PartialState<NavigationState<RootStackParamList>>;

    navigationRef.dispatch(CommonActions.reset(resetState));
    return;
  }

  const [screen, params] = args as [RouteName, RootStackParamList[RouteName]?];
  navigationRef.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [
        params === undefined ? { name: screen } : { name: screen, params },
      ],
    })
  );
}

type GetActiveStackKey = (
  state: NavigationState | PartialState<NavigationState> | undefined
) => string | undefined;

const getActiveStackKey: GetActiveStackKey = (state): string | undefined => {
  if (!state) return;

  const route = state.routes[state.index ?? 0];

  if (route.state) {
    const childKey = getActiveStackKey(route.state);
    return childKey ?? route.state.key ?? route.key;
  }
};

export function replace<
  ParamList extends object = RootStackParamList,
  RouteName extends keyof ParamList = keyof ParamList,
>(
  ...args: RouteName extends unknown
    ? undefined extends ParamList[RouteName]
      ? [screen: RouteName, params?: ParamList[RouteName]]
      : [screen: RouteName, params: ParamList[RouteName]]
    : never
): void {
  if (navigationRef.isReady()) {
    const [screen, params] = args as [string, object | undefined];
    const state = navigationRef.getState();

    if (state.routeNames.includes(screen)) {
      navigationRef.dispatch(
        params === undefined
          ? StackActions.replace(screen)
          : StackActions.replace(screen, params)
      );
      return;
    }

    const targetKey = getActiveStackKey(state);

    navigationRef.dispatch({
      ...StackActions.replace(screen, params),
      target: targetKey,
    });
  }
}

const findRouteKey = (
  state: NavigationState | PartialState<NavigationState> | undefined,
  targetRoute: keyof RootStackParamList
): string | undefined => {
  if (!state) return undefined;

  for (const route of state.routes) {
    if (route.name === targetRoute) {
      return route.key;
    }
    const nestedKey = findRouteKey(route.state, targetRoute);
    if (nestedKey) return nestedKey;
  }

  return undefined;
};

export function replaceParams<RouteName extends keyof RootStackParamList>(
  routeName: RouteName,
  params: Partial<RootStackParamList[RouteName]>
): void {
  if (navigationRef.isReady()) {
    const routeKey = findRouteKey(navigationRef.getState(), routeName);
    if (!routeKey) return;

    navigationRef.dispatch({
      ...CommonActions.setParams(params),
      source: routeKey,
    });
  }
}

export function popToTop(): void {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.popToTop());
  }
}

export function pop(count: number = 1): void {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.pop(count));
  }
}

export function getCurrentRoute(): Route<keyof RootStackParamList> | undefined {
  if (navigationRef.isReady()) {
    const route = navigationRef.getCurrentRoute();
    return route as Route<keyof RootStackParamList> | undefined;
  }
  return undefined;
}

export function getCurrentRouteName(): keyof RootStackParamList | undefined {
  if (navigationRef.isReady()) {
    const route = navigationRef.getCurrentRoute();
    return route?.name as keyof RootStackParamList | undefined;
  }
  return undefined;
}

/**
 * ตรวจว่า route ที่ focus อยู่ตอนนี้เป็นหนึ่งในชื่อที่ส่งเข้ามาหรือไม่
 * ชื่อต้องเป็น key ที่รู้จักในแอป — ดู {@link AppFocusedRouteName}
 *
 * @example isCurrentRouteNameOneOf('IncomingCallVideo', 'ConsultSessionVideo')
 */
export function isCurrentRouteNameOneOf(
  ...routeNames: AppFocusedRouteName[]
): boolean {
  if (!navigationRef.isReady() || routeNames.length === 0) {
    return false;
  }
  const name = navigationRef.getCurrentRoute()?.name;
  return name != null && (routeNames as readonly string[]).includes(name);
}

export function isReady(): boolean {
  return navigationRef.isReady();
}

export function canGoBack(): boolean {
  if (navigationRef.isReady()) {
    return navigationRef.canGoBack();
  }
  return false;
}

export function getState(): NavState | undefined {
  return readNavigationState();
}

export function setParams<RouteName extends keyof RootStackParamList>(
  params: Partial<RootStackParamList[RouteName]>
): void {
  if (navigationRef.isReady()) {
    navigationRef.setParams(params);
  }
}

export function navigateAndReset<RouteName extends keyof RootStackParamList>(
  ...args: RouteName extends unknown
    ? undefined extends RootStackParamList[RouteName]
      ?
          | [screen: RouteName]
          | [screen: RouteName, params: RootStackParamList[RouteName]]
      : [screen: RouteName, params: RootStackParamList[RouteName]]
    : never
): void {
  reset(...args);
}

export function navigateAndClear<RouteName extends keyof RootStackParamList>(
  screen: RouteName,
  params: undefined extends RootStackParamList[RouteName]
    ? RootStackParamList[RouteName] | undefined
    : RootStackParamList[RouteName],
  screensToKeep: ReadonlyArray<keyof RootStackParamList> = []
): void {
  const state = readNavigationState();
  if (!state) {
    return;
  }

  const preservedRoutes = state.routes
    .filter((route) =>
      screensToKeep.includes(route.name as keyof RootStackParamList)
    )
    .map((route) => {
      const routeName = route.name as keyof RootStackParamList;
      const routeParams = route.params as
        | RootStackParamList[keyof RootStackParamList]
        | undefined;

      if (routeParams === undefined) {
        return { name: routeName };
      }

      return { name: routeName, params: routeParams };
    }) as RootResetRoute[];

  const newRoute: RootResetRoute =
    params === undefined
      ? { name: screen }
      : ({ name: screen, params } as RootResetRoute);

  const routes: RootResetRoute[] = [...preservedRoutes, newRoute];

  const resetPayload: Parameters<typeof CommonActions.reset>[0] = {
    ...state,
    index: routes.length - 1,
    routes,
  };

  navigationRef.dispatch(CommonActions.reset(resetPayload));
}

export function popToRouteName<RouteName extends keyof RootStackParamList>(
  routeName: RouteName
): boolean {
  const state = readNavigationState();
  if (!state) {
    return false;
  }

  const targetRouteIndex = state.routes.findIndex(
    (route) => route.name === routeName
  );

  if (targetRouteIndex === -1) {
    console.warn(`${routeName} is not in the navigation state history`);
    return false;
  }

  navigationRef.dispatch(
    CommonActions.reset({
      ...state,
      index: targetRouteIndex,
      routes: state.routes.slice(0, targetRouteIndex + 1),
    } as Parameters<typeof CommonActions.reset>[0])
  );
  return true;
}
