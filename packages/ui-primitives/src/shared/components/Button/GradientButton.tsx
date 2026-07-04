import React, { forwardRef, memo } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {
  UnstyleButton,
  UnstyleButtonProps,
  UnstyleButtonRef,
} from './UnstyleButton';
import { theme } from '../../theme';
import {
  createVariants,
  type CreateVariantsConfig,
} from '../../utility/factories';

interface GradientVariantResult extends Record<string, unknown> {
  colors: string[];
  gradientEnd?: { x: number; y: number };
  gradientStart?: { x: number; y: number };
  style: ViewStyle;
}

const gradientStyleDefinitions: ViewStyle = {
  alignItems: 'center',
  borderRadius: theme.borderRadii.lg,
  borderWidth: 0,
  flex: 1,
  justifyContent: 'center',
  minHeight: 56,
  paddingHorizontal: theme.spacing.md,
  paddingVertical: theme.spacing.sm2,
};

const gradientVariantDefinitions = {
  color: {
    magenta: {
      colors: ['#F50D8F', '#B0045D'],
      gradientEnd: { x: 1, y: 0.5 },
      gradientStart: { x: 0, y: 0.5 },
    },
    ocean: {
      colors: ['#00C6FB', '#005BEA'],
      gradientEnd: { x: 1, y: 0 },
      gradientStart: { x: 0, y: 0 },
    },
    sunset: {
      colors: ['#FF9A9E', '#FECFEF'],
      gradientEnd: { x: 1, y: 0 },
      gradientStart: { x: 0, y: 0 },
    },
  },
  state: {
    default: {},
    disabled: {
      colors: [theme.colors.light, theme.colors.light],
      gradientEnd: { x: 0, y: 0 },
      gradientStart: { x: 0, y: 0 },
      style: gradientStyleDefinitions,
    },
  },
};

const gradientVariantsConfig: CreateVariantsConfig<
  GradientVariantResult,
  typeof gradientVariantDefinitions
> = {
  base: {
    colors: ['#F50D8F', '#B0045D'],
    gradientEnd: { x: 1, y: 0.5 },
    gradientStart: { x: 0, y: 0.5 },
    style: {
      ...gradientStyleDefinitions,
      borderColor: '#F8C8FF',
    },
  },
  defaultVariants: {
    color: 'magenta',
    state: 'default',
  },
  variants: gradientVariantDefinitions,
};

const gradientVariants = createVariants(gradientVariantsConfig);

type GradientColor = keyof typeof gradientVariantDefinitions.color;

interface GradientButtonProps extends Pick<UnstyleButtonProps, 'onPress'> {
  children: React.ReactNode;
  color?: GradientColor;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

const GradientButtonBase = forwardRef<UnstyleButtonRef, GradientButtonProps>(
  ({ children, style, color = 'magenta', disabled = false, onPress }, ref) => {
    const gradientProps = gradientVariants({
      color,
      state: disabled ? 'disabled' : 'default',
    });

    const {
      colors,
      gradientEnd,
      gradientStart,
      style: gradientStyle,
    } = gradientProps;

    return (
      <UnstyleButton
        disabled={disabled}
        ref={ref}
        style={{ flex: 1 }}
        onPress={onPress}
      >
        <LinearGradient
          colors={colors}
          end={gradientEnd}
          start={gradientStart}
          style={[gradientStyle, style]}
        >
          {children}
        </LinearGradient>
      </UnstyleButton>
    );
  }
);

GradientButtonBase.displayName = 'GradientButtonBase';
export const GradientButton = memo(GradientButtonBase);
