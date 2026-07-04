import React, { ComponentType, ReactNode } from 'react';

type ProviderComponent = ComponentType<{ children: ReactNode }>;

/**
 * Higher-Order Component that wraps a component with multiple providers
 * @param Component - The component to wrap
 * @param providers - Array of provider components to wrap with
 * @returns Wrapped component with all providers applied
 *
 * @example
 * ```tsx
 * const EnhancedComponent = withProvider(MyComponent, [
 *   ThemeProvider,
 *   QueryProvider,
 *   AuthProvider
 * ]);
 * ```
 */
export function withProvider<P extends object>(
  Component: ComponentType<P>,
  providers: ProviderComponent[]
) {
  const WrappedComponent: ComponentType<P> = (props: P) => {
    const wrappedComponent = providers.reduceRight(
      (acc, Provider) => <Provider>{acc}</Provider>,
      <Component {...props} />
    );

    return wrappedComponent;
  };

  WrappedComponent.displayName = `withProvider(${
    Component.displayName ?? Component.name
  })`;

  return WrappedComponent;
}
