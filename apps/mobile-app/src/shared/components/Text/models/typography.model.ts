import type { TextProps as RestyleTextProps } from '@shopify/restyle';
import type { ComponentPropsWithoutRef, ElementType } from 'react';

import { Box } from '@/shared/components/Box';
import { Theme } from '@/shared/theme';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ComponentPropsWithAsChild<T extends ElementType<any>> =
  ComponentPropsWithoutRef<T> & { asChild?: boolean };

export type SlottableBoxProps = ComponentPropsWithAsChild<typeof Box>;

export type TypographyRequiredMarkProps = Omit<
  RestyleTextProps<Theme>,
  'children'
> & {
  testID?: string;
};
