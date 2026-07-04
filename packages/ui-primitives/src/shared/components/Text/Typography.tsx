import { createText, TextProps as RestyleTextProps } from '@shopify/restyle';
import React, { FC, ReactNode, useMemo } from 'react';
import { StyleProp, TextStyle } from 'react-native';

import { BaseComponentProps } from '../../../models/common/baseComponent.model';
import { Slot } from '../Slot';
import { TypographyRequiredMark } from './TypographyRequiredMark';
import { TypographyRoot } from './TypographyRoot';
import { Theme } from '../../theme';
import { createVariants } from '../../utility/factories/createVariants.factory';

const RText = createText<Theme>();

type FontWeight = 'bold' | 'semibold' | 'regular' | 'default';

export type TextProps = RestyleTextProps<Theme> &
  BaseComponentProps & {
    asChild?: boolean;
    withAsterisk?: boolean;
    asteriskColor?: RestyleTextProps<Theme>['color'];
    weight?: FontWeight;
    style?: StyleProp<TextStyle>;
    children?: ReactNode;
    numberOfLines?: number;
  };

const typographyVariants = createVariants<{
  variant: RestyleTextProps<Theme>['variant'];
}>({
  defaultVariants: {
    weight: 'default',
  },
  variants: {
    weight: {
      bold: { variant: 'bold' },
      default: { variant: 'medium' },
      regular: { variant: 'regular' },
      semibold: { variant: 'semibold' },
    },
  },
});

const Text: FC<TextProps> = ({
  asChild = false,
  children,
  withAsterisk,
  asteriskColor = 'gray400',
  numberOfLines,
  weight = 'default',
  style,
  testID,
  ...rest
}) => {
  const { variant } = useMemo(() => typographyVariants({ weight }), [weight]);

  const textProps = {
    allowFontScaling: false,
    numberOfLines,
    style,
    testID,
    variant,
    ...rest,
  };

  const textNode = asChild ? (
    <Slot {...textProps}>{children}</Slot>
  ) : (
    <RText {...textProps}>{children}</RText>
  );

  if (withAsterisk) {
    return (
      <TypographyRoot testID={testID}>
        {textNode}
        <TypographyRequiredMark color={asteriskColor} />
      </TypographyRoot>
    );
  }

  return textNode;
};

export const Typography = React.memo(Text);

Typography.displayName = 'Typography';
