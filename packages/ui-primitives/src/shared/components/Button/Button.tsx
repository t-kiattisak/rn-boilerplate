import {
  backgroundColor,
  BackgroundColorProps,
  border,
  BorderProps,
  ColorProps,
  composeRestyleFunctions,
  createBox,
  createVariant,
  layout,
  LayoutProps,
  spacing,
  SpacingProps,
  useRestyle,
  VariantProps,
} from '@shopify/restyle';
import React, { memo } from 'react';
import {
  GestureResponderEvent,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

import { useButtonPress } from './hooks/useButtonPress';

import { BaseComponentProps } from '../../../models/common/baseComponent.model';
import { Slot } from '../Slot';
import { Typography } from '../Text';
import { testIdsConstant } from '../../constants/testIds.constant';
import { Theme } from '../../theme';
import {
  createVariants,
  type CreateVariantsConfig,
} from '../../utility/factories';
import { isSafeElement } from '../../utility/validators';

const BaseButton = createBox<Theme, TouchableOpacityProps>(TouchableOpacity);

type Size = 'sm' | 'md' | 'lg';

interface ButtonVariantResult extends Record<string, unknown> {
  minHeight: number;
}

const buttonVariantDefinitions = {
  size: {
    lg: {
      minHeight: 64,
    },
    md: {
      minHeight: 56,
    },
    sm: {
      minHeight: 40,
    },
  },
};

const buttonVariantsConfig: CreateVariantsConfig<
  ButtonVariantResult,
  typeof buttonVariantDefinitions
> = {
  base: {
    minHeight: 56,
  },
  defaultVariants: {
    size: 'md',
  },
  variants: buttonVariantDefinitions,
};

const buttonVariants = createVariants(buttonVariantsConfig);

type RestyleProps = SpacingProps<Theme> &
  BorderProps<Theme> &
  BackgroundColorProps<Theme> &
  LayoutProps<Theme> &
  VariantProps<Theme, 'buttonVariants'>;

export interface ButtonProps
  extends RestyleProps,
    ColorProps<Theme>,
    BaseComponentProps {
  onPress?: (
    event: GestureResponderEvent
  ) => void | Promise<void> | Promise<unknown>;
  children?: React.ReactNode;
  size?: Size;
  dismissKeyboard?: boolean;
  asChild?: boolean;
}

const restyleFunctions = composeRestyleFunctions<Theme, RestyleProps>([
  spacing,
  border,
  layout,
  backgroundColor,
  createVariant({ themeKey: 'buttonVariants' }),
]);

const ButtonBase = ({
  onPress,
  children,
  disabled,
  dismissKeyboard = true,
  testID = testIdsConstant.button,
  color,
  size = 'md',
  asChild,
  ...others
}: React.ComponentProps<typeof BaseButton> & ButtonProps) => {
  const buttonProps = useRestyle(restyleFunctions, others);
  const { minHeight } = buttonVariants({ size });
  const { isDisabled, handlePress } = useButtonPress({
    disabled,
    dismissKeyboard,
    onPress,
  });

  const Component = asChild ? Slot : BaseButton;

  return (
    <Component
      disabled={isDisabled}
      minHeight={minHeight}
      opacity={isDisabled ? 0.6 : 1}
      testID={testID}
      {...buttonProps}
      activeOpacity={0.9}
      onPress={handlePress}
    >
      {asChild ? (
        children
      ) : isSafeElement(children) ? (
        children
      ) : (
        <Typography color={color} variant="buttonText">
          {children}
        </Typography>
      )}
    </Component>
  );
};

export const Button = memo(ButtonBase);
