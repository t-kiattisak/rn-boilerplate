import { createNavigationContainerRef } from '@react-navigation/native';

import { navigationRef } from '@/shared/utility/navigation/createNavigation.utility';

jest.mock('@react-navigation/native', () => {
  const actual = jest.requireActual('@react-navigation/native');
  return {
    ...actual,
    createNavigationContainerRef: jest.fn(() => ({
      isReady: jest.fn(() => false),
      navigate: jest.fn(),
      dispatch: jest.fn(),
      goBack: jest.fn(),
      canGoBack: jest.fn(() => false),
      getCurrentRoute: jest.fn(() => null),
      getState: jest.fn(() => null),
      setParams: jest.fn(),
      resetRoot: jest.fn(),
      getRootState: jest.fn(() => null),
    })),
  };
});

const mockCreateNavigationContainerRef = createNavigationContainerRef as jest.MockedFunction<
  typeof createNavigationContainerRef
>;

describe('createNavigation.utility', () => {
  describe('navigationRef', () => {
    it('should create navigation ref using createNavigationContainerRef', () => {
      expect(navigationRef).toBeDefined();
      expect(mockCreateNavigationContainerRef.mock.results.length).toBeGreaterThan(0);
    });

    it('should create navigation ref with correct type', () => {
      expect(navigationRef).toBeDefined();
      expect(navigationRef).not.toBeNull();
    });

    it('should export navigationRef', () => {
      expect(navigationRef).toBeDefined();
      expect(navigationRef).not.toBeNull();
    });

    it('should have isReady method', () => {
      expect(navigationRef).toHaveProperty('isReady');
      expect(typeof navigationRef.isReady).toBe('function');
    });

    it('should have navigate method', () => {
      expect(navigationRef).toHaveProperty('navigate');
      expect(typeof navigationRef.navigate).toBe('function');
    });

    it('should have dispatch method', () => {
      expect(navigationRef).toHaveProperty('dispatch');
      expect(typeof navigationRef.dispatch).toBe('function');
    });

    it('should have goBack method', () => {
      expect(navigationRef).toHaveProperty('goBack');
      expect(typeof navigationRef.goBack).toBe('function');
    });

    it('should have canGoBack method', () => {
      expect(navigationRef).toHaveProperty('canGoBack');
      expect(typeof navigationRef.canGoBack).toBe('function');
    });

    it('should have getCurrentRoute method', () => {
      expect(navigationRef).toHaveProperty('getCurrentRoute');
      expect(typeof navigationRef.getCurrentRoute).toBe('function');
    });

    it('should have getState method', () => {
      expect(navigationRef).toHaveProperty('getState');
      expect(typeof navigationRef.getState).toBe('function');
    });

    it('should have setParams method', () => {
      expect(navigationRef).toHaveProperty('setParams');
      expect(typeof navigationRef.setParams).toBe('function');
    });

    it('should be a singleton instance', () => {
      const { navigationRef: navigationRef2 } = require('@/shared/utility/navigation/createNavigation.utility');
      expect(navigationRef).toBe(navigationRef2);
    });

    it('should create navigation ref when module is loaded', () => {
      expect(navigationRef).toBeDefined();
      expect(navigationRef).toHaveProperty('isReady');
      expect(navigationRef).toHaveProperty('navigate');
      expect(navigationRef).toHaveProperty('dispatch');
    });
  });

  describe('navigationRef methods behavior', () => {
    it('should have isReady return boolean', () => {
      const result = navigationRef.isReady();
      expect(typeof result).toBe('boolean');
    });

    it('should have canGoBack return boolean', () => {
      const result = navigationRef.canGoBack();
      expect(typeof result).toBe('boolean');
    });

    it('should have getCurrentRoute return route or null', () => {
      const result = navigationRef.getCurrentRoute();
      expect(result === null || typeof result === 'object').toBe(true);
    });

    it('should have getState return state or null', () => {
      const result = navigationRef.getState();
      expect(result === null || typeof result === 'object').toBe(true);
    });
  });
});

