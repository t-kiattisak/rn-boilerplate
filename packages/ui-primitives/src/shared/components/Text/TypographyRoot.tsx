import React, { FC } from 'react';

import { Box } from '../Box';
import { Slot } from '../Slot';
import type { SlottableBoxProps } from './models/typography.model';

const Root: FC<SlottableBoxProps> = ({
  asChild = false,
  children,
  ...boxProps
}) => {
  const Component = asChild ? Slot : Box;

  return (
    <Component
      alignItems="center"
      flexDirection="row"
      position="relative"
      {...boxProps}
    >
      {children}
    </Component>
  );
};

export const TypographyRoot = React.memo(Root);

TypographyRoot.displayName = 'TypographyRoot';
