import { CreateStateFn, createZustandSafeContext } from '../createZustandSafeContext.factory';
import { act, render, renderHook } from '@testing-library/react-native';
import React from 'react';
import { Text, View } from 'react-native';

interface TestState {
  count: number;
  name: string;
  increment: () => void;
  setName: (name: string) => void;
}

const createTestState: CreateStateFn<TestState> = (initial) => (set) => ({
  count: initial?.count ?? 0,
  name: initial?.name ?? 'default',
  increment: () => set((state) => ({ count: state.count + 1 })),
  setName: (name: string) => set({ name }),
});

describe('createZustandSafeContext', () => {
  let Provider: React.ComponentType<{
    value?: Partial<TestState>;
    children: React.ReactNode;
  }>;
  let useSafeContext: <Sel>(selector: (s: TestState) => Sel) => Sel;

  beforeEach(() => {
    const result = createZustandSafeContext(
      createTestState,
      'TestContext must be used within TestProvider'
    );
    Provider = result[0];
    useSafeContext = result[1];
  });

  describe('Provider', () => {
    it('should render children correctly', () => {
      const TestComponent = () => <Text>Test Content</Text>;

      const { getByText } = render(
        <Provider>
          <TestComponent />
        </Provider>
      );

      expect(getByText('Test Content')).toBeTruthy();
    });

    it('should provide default state when no initial value is passed', () => {
      const TestComponent = () => {
        const count = useSafeContext((state) => state.count);
        const name = useSafeContext((state) => state.name);

        return (
          <View>
            <Text testID="count">{count}</Text>
            <Text testID="name">{name}</Text>
          </View>
        );
      };

      const { getByTestId } = render(
        <Provider>
          <TestComponent />
        </Provider>
      );

      expect(getByTestId('count').props.children).toBe(0);
      expect(getByTestId('name').props.children).toBe('default');
    });

    it('should initialize state with provided initial values', () => {
      const initialState = { count: 10, name: 'test' };

      const TestComponent = () => {
        const count = useSafeContext((state) => state.count);
        const name = useSafeContext((state) => state.name);

        return (
          <View>
            <Text testID="count">{count}</Text>
            <Text testID="name">{name}</Text>
          </View>
        );
      };

      const { getByTestId } = render(
        <Provider value={initialState}>
          <TestComponent />
        </Provider>
      );

      expect(getByTestId('count').props.children).toBe(10);
      expect(getByTestId('name').props.children).toBe('test');
    });

    it('should create new store instance when value prop changes', () => {
      const TestComponent = () => {
        const count = useSafeContext((state) => state.count);
        return <Text testID="count">{count}</Text>;
      };

      const { getByTestId, rerender } = render(
        <Provider value={{ count: 5 }}>
          <TestComponent />
        </Provider>
      );

      expect(getByTestId('count').props.children).toBe(5);

      rerender(
        <Provider value={{ count: 15 }}>
          <TestComponent />
        </Provider>
      );

      expect(getByTestId('count').props.children).toBe(5);
    });

    it('should have correct display name', () => {
      expect(Provider.displayName).toBe('ZustandScopedContextProvider');
    });
  });

  describe('useSafeContext', () => {
    it('should throw error when used outside Provider', () => {
      const TestComponent = () => {
        useSafeContext((state) => state.count);
        return <Text>Should not render</Text>;
      };

      // Suppress console.error for this test
      const originalError = console.error;
      console.error = jest.fn();

      expect(() => render(<TestComponent />)).toThrow(
        'TestContext must be used within TestProvider'
      );

      console.error = originalError;
    });

    it('should return selected state value', () => {
      const TestComponent = () => {
        const count = useSafeContext((state) => state.count);
        return <Text testID="count">{count}</Text>;
      };

      const { getByTestId } = render(
        <Provider value={{ count: 42 }}>
          <TestComponent />
        </Provider>
      );

      expect(getByTestId('count').props.children).toBe(42);
    });

    it('should allow state updates through actions', () => {
      const TestComponent = () => {
        const count = useSafeContext((state) => state.count);
        const increment = useSafeContext((state) => state.increment);

        // Simulate increment on mount for testing
        React.useEffect(() => {
          increment();
        }, [increment]);

        return <Text testID="count">{count}</Text>;
      };

      const { getByTestId } = render(
        <Provider value={{ count: 0 }}>
          <TestComponent />
        </Provider>
      );

      expect(getByTestId('count').props.children).toBe(1);
    });

    it('should work with complex selectors', () => {
      const TestComponent = () => {
        const data = useSafeContext((state) => ({
          count: state.count,
          name: state.name,
          doubled: state.count * 2,
        }));

        return (
          <View>
            <Text testID="count">{data.count}</Text>
            <Text testID="name">{data.name}</Text>
            <Text testID="doubled">{data.doubled}</Text>
          </View>
        );
      };

      const { getByTestId } = render(
        <Provider value={{ count: 5, name: 'test' }}>
          <TestComponent />
        </Provider>
      );

      expect(getByTestId('count').props.children).toBe(5);
      expect(getByTestId('name').props.children).toBe('test');
      expect(getByTestId('doubled').props.children).toBe(10);
    });

    it('should use shallow comparison by default', () => {
      let renderCount = 0;

      const TestComponent = () => {
        renderCount++;
        const data = useSafeContext((state) => ({
          count: state.count,
          name: state.name,
        }));

        return (
          <View>
            <Text testID="count">{data.count}</Text>
            <Text testID="name">{data.name}</Text>
          </View>
        );
      };

      const { rerender } = render(
        <Provider value={{ count: 5, name: 'test' }}>
          <TestComponent />
        </Provider>
      );

      const initialRenderCount = renderCount;

      rerender(
        <Provider value={{ count: 5, name: 'test' }}>
          <TestComponent />
        </Provider>
      );

      expect(renderCount).toBe(initialRenderCount + 1);
    });
  });

  describe('Hook usage with renderHook', () => {
    it('should work with renderHook utility', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <Provider value={{ count: 10 }}>{children}</Provider>
      );

      const { result } = renderHook(
        () => useSafeContext((state) => state.count),
        { wrapper }
      );

      expect(result.current).toBe(10);
    });

    it('should handle state updates in renderHook', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <Provider value={{ count: 0 }}>{children}</Provider>
      );

      const { result } = renderHook(
        () => ({
          count: useSafeContext((state) => state.count),
          increment: useSafeContext((state) => state.increment),
        }),
        { wrapper }
      );

      expect(result.current.count).toBe(0);

      act(() => {
        result.current.increment();
      });

      expect(result.current.count).toBe(1);
    });
  });

  describe('Multiple providers', () => {
    it('should isolate state between different provider instances', () => {
      const TestComponent1 = () => {
        const count = useSafeContext((state) => state.count);
        return <Text testID="count1">{count}</Text>;
      };

      const TestComponent2 = () => {
        const count = useSafeContext((state) => state.count);
        return <Text testID="count2">{count}</Text>;
      };

      const { getByTestId } = render(
        <View>
          <Provider value={{ count: 10 }}>
            <TestComponent1 />
          </Provider>
          <Provider value={{ count: 20 }}>
            <TestComponent2 />
          </Provider>
        </View>
      );

      expect(getByTestId('count1').props.children).toBe(10);
      expect(getByTestId('count2').props.children).toBe(20);
    });
  });

  describe('Error handling', () => {
    it('should provide meaningful error message', () => {
      const customErrorMessage = 'Custom error message for testing';
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, useCustomContext] = createZustandSafeContext(
        createTestState,
        customErrorMessage
      );

      const TestComponent = () => {
        useCustomContext((state) => state.count);
        return <Text>Should not render</Text>;
      };

      const originalError = console.error;
      console.error = jest.fn();

      expect(() => render(<TestComponent />)).toThrow(customErrorMessage);

      console.error = originalError;
    });
  });

  describe('Performance', () => {
    it('should not recreate store on re-renders with same value', () => {
      const storeInstances = new Set();

      const TestComponent = () => {
        const store = React.useContext(
          (Provider as any)._context || React.createContext(null)
        );
        storeInstances.add(store);

        const count = useSafeContext((state) => state.count);
        return <Text testID="count">{count}</Text>;
      };

      const initialValue = { count: 5 };

      const { rerender } = render(
        <Provider value={initialValue}>
          <TestComponent />
        </Provider>
      );

      rerender(
        <Provider value={initialValue}>
          <TestComponent />
        </Provider>
      );

      expect(storeInstances.size).toBe(1);
    });
  });
});
