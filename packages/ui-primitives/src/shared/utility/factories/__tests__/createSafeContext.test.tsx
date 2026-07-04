import { createSafeContext } from '@/shared/utility/factories';
import { render, screen } from '@testing-library/react-native';
import React from 'react';
import { Text, View } from 'react-native';

describe('createSafeContext', () => {
  interface TestContextValue {
    name: string;
    count: number;
    isActive: boolean;
  }

  const TestContext = createSafeContext<TestContextValue>('TestContext was used outside of provider');

  const mockContextValue: TestContextValue = {
    name: 'Test User',
    count: 42,
    isActive: true,
  };

  describe('Provider', () => {
    it('should render children with provided context value', () => {
      const TestComponent = () => {
        const [Provider] = TestContext;
        return (
          <Provider value={mockContextValue}>
            <TestConsumer />
          </Provider>
        );
      };

      const TestConsumer = () => {
        const [, useSafeContext] = TestContext;
        const context = useSafeContext();
        return <Text>{context.name}</Text>;
      };

      render(<TestComponent />);
      expect(screen.getByText('Test User')).toBeTruthy();
    });

    it('should handle multiple consumers', () => {
      const TestComponent = () => {
        const [Provider] = TestContext;
        return (
          <Provider value={mockContextValue}>
            <TestConsumer1 />
            <TestConsumer2 />
          </Provider>
        );
      };

      const TestConsumer1 = () => {
        const [, useSafeContext] = TestContext;
        const context = useSafeContext();
        return <Text>Name: {context.name}</Text>;
      };

      const TestConsumer2 = () => {
        const [, useSafeContext] = TestContext;
        const context = useSafeContext();
        return <Text>Count: {context.count}</Text>;
      };

      render(<TestComponent />);
      expect(screen.getByText('Name: Test User')).toBeTruthy();
      expect(screen.getByText('Count: 42')).toBeTruthy();
    });
  });

  describe('useSafeContext', () => {
    it('should return context value when used within provider', () => {
      const TestComponent = () => {
        const [Provider] = TestContext;
        return (
          <Provider value={mockContextValue}>
            <TestConsumer />
          </Provider>
        );
      };

      const TestConsumer = () => {
        const [, useSafeContext] = TestContext;
        const context = useSafeContext();
        return (
          <View>
            <Text>{context.name}</Text>
            <Text>{context.count}</Text>
            <Text>{context.isActive ? 'Active' : 'Inactive'}</Text>
          </View>
        );
      };

      render(<TestComponent />);
      expect(screen.getByText('Test User')).toBeTruthy();
      expect(screen.getByText('42')).toBeTruthy();
      expect(screen.getByText('Active')).toBeTruthy();
    });

    it('should throw error when used outside of provider', () => {
      const TestConsumer = () => {
        const [, useSafeContext] = TestContext;
        try {
          const context = useSafeContext();
          return <Text>{context.name}</Text>;
        } catch (error) {
          return <Text>Error: {(error as Error).message}</Text>;
        }
      };

      render(<TestConsumer />);
      expect(screen.getByText('Error: TestContext was used outside of provider')).toBeTruthy();
    });
  });

  describe('Error handling', () => {
    it('should throw error with custom message', () => {
      const CustomContext = createSafeContext<TestContextValue>('Custom error message');

      const TestConsumer = () => {
        const [, useSafeContext] = CustomContext;
        try {
          const context = useSafeContext();
          return <Text>{context.name}</Text>;
        } catch (error) {
          return <Text>Error: {(error as Error).message}</Text>;
        }
      };

      render(<TestConsumer />);
      expect(screen.getByText('Error: Custom error message')).toBeTruthy();
    });
  });
});
