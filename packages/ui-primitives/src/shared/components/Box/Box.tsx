import { createBox, BoxProps as RBoxProps } from '@shopify/restyle';

import { Theme } from '@/shared/theme';

export const Box = createBox<Theme>();
export type BoxProps = RBoxProps<Theme>;
