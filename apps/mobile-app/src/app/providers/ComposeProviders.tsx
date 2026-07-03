import type { ComponentType, ReactNode } from 'react';
import React from 'react';

interface ChildrenProps {
  children: ReactNode;
}

type ComposeProvidersProps = ChildrenProps & {
  components: Array<ComponentType<ChildrenProps>>;
};

const ComposeProviders = ({
  components,
  children,
}: ComposeProvidersProps): React.JSX.Element => {
  return components.reduceRight(
    (acc, Component) => <Component>{acc}</Component>,
    children
  ) as React.JSX.Element;
};

ComposeProviders.displayName = 'ComposeProviders';
export { ComposeProviders };
