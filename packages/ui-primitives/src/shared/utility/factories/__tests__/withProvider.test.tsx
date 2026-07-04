import { withProvider } from '@/shared/utility/factories';
import { render, screen } from '@testing-library/react-native';
import React from 'react';
import { Text, View } from 'react-native';

describe('withProvider', () => {
  // Test component that will be wrapped
  const TestComponent: React.ComponentType<{ name: string; count: number }> = ({ name, count }) => (
    <View>
      <Text>Name: {name}</Text>
      <Text>Count: {count}</Text>
    </View>
  );

  // Mock provider components
  const MockProvider1: React.ComponentType<{ children: React.ReactNode }> = ({ children }) => (
    <View testID="provider-1">{children}</View>
  );

  const MockProvider2: React.ComponentType<{ children: React.ReactNode }> = ({ children }) => (
    <View testID="provider-2">{children}</View>
  );

  const MockProvider3: React.ComponentType<{ children: React.ReactNode }> = ({ children }) => (
    <View testID="provider-3">{children}</View>
  );

  describe('Single Provider', () => {
    it('should wrap component with a single provider', () => {
      const EnhancedComponent = withProvider(TestComponent, [MockProvider1]);

      render(<EnhancedComponent name="John" count={42} />);

      expect(screen.getByTestId('provider-1')).toBeTruthy();
      expect(screen.getByText('Name: John')).toBeTruthy();
      expect(screen.getByText('Count: 42')).toBeTruthy();
    });

    it('should pass props correctly to wrapped component', () => {
      const EnhancedComponent = withProvider(TestComponent, [MockProvider1]);

      render(<EnhancedComponent name="Jane" count={100} />);

      expect(screen.getByText('Name: Jane')).toBeTruthy();
      expect(screen.getByText('Count: 100')).toBeTruthy();
    });
  });

  describe('Multiple Providers', () => {
    it('should wrap component with multiple providers in correct order', () => {
      const EnhancedComponent = withProvider(TestComponent, [
        MockProvider1,
        MockProvider2,
        MockProvider3,
      ]);

      render(<EnhancedComponent name="Alice" count={7} />);

      // Check that all providers are rendered
      expect(screen.getByTestId('provider-1')).toBeTruthy();
      expect(screen.getByTestId('provider-2')).toBeTruthy();
      expect(screen.getByTestId('provider-3')).toBeTruthy();

      // Check that the component content is rendered
      expect(screen.getByText('Name: Alice')).toBeTruthy();
      expect(screen.getByText('Count: 7')).toBeTruthy();
    });

    it('should nest providers in correct order (outermost to innermost)', () => {
      const EnhancedComponent = withProvider(TestComponent, [
        MockProvider1, // Should be outermost
        MockProvider2, // Should be middle
        MockProvider3, // Should be innermost
      ]);

      const { getByTestId } = render(<EnhancedComponent name="Bob" count={15} />);

      const provider1 = getByTestId('provider-1');
      const provider2 = getByTestId('provider-2');
      const provider3 = getByTestId('provider-3');

      // Provider1 should contain Provider2
      expect(provider1).toContainElement(provider2);
      // Provider2 should contain Provider3
      expect(provider2).toContainElement(provider3);
      // Provider3 should contain the TestComponent
      expect(provider3).toContainElement(screen.getByText('Name: Bob'));
    });
  });

  describe('Component Properties', () => {
    it('should preserve component props interface', () => {
      const EnhancedComponent = withProvider(TestComponent, [MockProvider1]);

      // This should not cause TypeScript errors
      render(<EnhancedComponent name="Test" count={0} />);

      expect(screen.getByText('Name: Test')).toBeTruthy();
      expect(screen.getByText('Count: 0')).toBeTruthy();
    });

    it('should set correct displayName', () => {
      const EnhancedComponent = withProvider(TestComponent, [MockProvider1]);

      expect(EnhancedComponent.displayName).toBe('withProvider(TestComponent)');
    });

    it('should handle component without displayName', () => {
      const AnonymousComponent: React.ComponentType<{ name: string }> = ({ name }) => (
        <Text>{name}</Text>
      );

      const EnhancedComponent = withProvider(AnonymousComponent, [MockProvider1]);

      expect(EnhancedComponent.displayName).toBe('withProvider(AnonymousComponent)');
    });
  });

  describe('Edge Cases', () => {
    it('should work with empty providers array', () => {
      const EnhancedComponent = withProvider(TestComponent, []);

      render(<EnhancedComponent name="Edge" count={999} />);

      // Should render the component without any providers
      expect(screen.getByText('Name: Edge')).toBeTruthy();
      expect(screen.getByText('Count: 999')).toBeTruthy();
    });

    it('should work with functional components', () => {
      const FunctionalComponent: React.FC<{ message: string }> = ({ message }) => (
        <Text>{message}</Text>
      );

      const EnhancedComponent = withProvider(FunctionalComponent, [MockProvider1]);

      render(<EnhancedComponent message="Hello World" />);

      expect(screen.getByTestId('provider-1')).toBeTruthy();
      expect(screen.getByText('Hello World')).toBeTruthy();
    });

    it('should work with class components', () => {
      class ClassComponent extends React.Component<{ title: string }> {
        render() {
          return <Text>{this.props.title}</Text>;
        }
      }

      const EnhancedComponent = withProvider(ClassComponent, [MockProvider1]);

      render(<EnhancedComponent title="Class Component" />);

      expect(screen.getByTestId('provider-1')).toBeTruthy();
      expect(screen.getByText('Class Component')).toBeTruthy();
    });
  });

  describe('Provider Nesting Behavior', () => {
    it('should create proper provider hierarchy', () => {
      const EnhancedComponent = withProvider(TestComponent, [
        MockProvider1,
        MockProvider2,
      ]);

      render(<EnhancedComponent name="Nested" count={5} />);

      // The structure should be: Provider1 > Provider2 > TestComponent
      const provider1 = screen.getByTestId('provider-1');
      const provider2 = screen.getByTestId('provider-2');

      // Verify nesting structure
      expect(provider1).toContainElement(provider2);
      expect(provider2).toContainElement(screen.getByText('Name: Nested'));
    });

    it('should handle providers that modify children', () => {
      const ModifyingProvider: React.ComponentType<{ children: React.ReactNode }> = ({ children }) => (
        <View testID="modifying-provider">
          <Text>Provider Wrapper</Text>
          {children}
        </View>
      );

      const EnhancedComponent = withProvider(TestComponent, [ModifyingProvider]);

      render(<EnhancedComponent name="Modified" count={123} />);

      expect(screen.getByTestId('modifying-provider')).toBeTruthy();
      expect(screen.getByText('Provider Wrapper')).toBeTruthy();
      expect(screen.getByText('Name: Modified')).toBeTruthy();
      expect(screen.getByText('Count: 123')).toBeTruthy();
    });
  });
});
