import React, { forwardRef, memo } from 'react';
import { PressableStateCallbackType, StyleProp, ViewStyle } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

import { useTheme } from '../../theme/useTheme';
import {
  UnstyleButton,
  UnstyleButtonProps,
  UnstyleButtonRef,
} from '@/shared/components/Button/UnstyleButton';
import {
  createVariants,
  type CreateVariantsConfig,
} from '@/shared/utility/factories';

interface ShadowVariantResult extends Record<string, unknown> {
  buttonStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  distance?: number;
  offset?: [number, number];
  shadowStyle?: StyleProp<ViewStyle>;
  shadowViewStyle?: StyleProp<ViewStyle>;
  startColor?: string;
}

const DEFAULT_START_COLOR = 'rgba(196, 218, 255, 0.5)';
const DEFAULT_DISTANCE = 8;
const DEFAULT_OFFSET: [number, number] = [0, 0];
const DEFAULT_HEIGHT = 56;
const DEFAULT_PRESSED_OPACITY = 0.85;
const DEFAULT_SHADOW_OPACITY = 0.5;

const shadowVariantDefinitions = {
  tone: {
    default: {},
    subtle: {
      shadowViewStyle: { opacity: 0.4 },
      startColor: 'rgba(60, 108, 231, 0.18)',
    },
  },
  width: {
    fit: {},
    full: {
      buttonStyle: { alignSelf: 'stretch', width: '100%' },
      containerStyle: { alignSelf: 'stretch', width: '100%' },
      shadowStyle: { alignSelf: 'stretch', width: '100%' },
    },
  },
} as const;

const shadowVariantsConfig: CreateVariantsConfig<
  ShadowVariantResult,
  typeof shadowVariantDefinitions
> = {
  base: {
    distance: DEFAULT_DISTANCE,
    offset: DEFAULT_OFFSET,
    shadowViewStyle: { opacity: DEFAULT_SHADOW_OPACITY },
    startColor: DEFAULT_START_COLOR,
  },
  defaultVariants: {
    tone: 'default',
    width: 'fit',
  },
  variants: shadowVariantDefinitions,
};

const shadowVariants = createVariants(shadowVariantsConfig);

type ShadowTone = keyof typeof shadowVariantDefinitions.tone;
type ShadowWidth = keyof typeof shadowVariantDefinitions.width;

export interface ShadowButtonProps extends Omit<UnstyleButtonProps, 'style'> {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  tone?: ShadowTone;
  width?: ShadowWidth;
}

const ShadowButtonBase = forwardRef<UnstyleButtonRef, ShadowButtonProps>(
  (
    {
      children,
      disabled,
      style: styleOverride,
      tone = 'default',
      width = 'full',
      ...pressableProps
    },
    ref
  ) => {
    const theme = useTheme();

    const variantStyles = shadowVariants({ tone, width });

    const resolvedRadius = theme.borderRadii.lg;

    const containerStyle: StyleProp<ViewStyle> = [
      { borderRadius: resolvedRadius },
      variantStyles.containerStyle,
    ];

    const shadowStyle: StyleProp<ViewStyle> = [
      { borderRadius: resolvedRadius },
      variantStyles.shadowStyle,
    ];

    const shadowViewStyle: StyleProp<ViewStyle> = [
      { borderRadius: resolvedRadius, opacity: DEFAULT_SHADOW_OPACITY },
      variantStyles.shadowViewStyle,
    ];

    const buttonBaseStyle: ViewStyle = {
      alignItems: 'center',
      backgroundColor: theme.colors.white,
      borderRadius: resolvedRadius,
      justifyContent: 'center',
      minHeight: DEFAULT_HEIGHT,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm2,
    };

    const distance = variantStyles.distance ?? DEFAULT_DISTANCE;
    const offset = variantStyles.offset ?? DEFAULT_OFFSET;
    const startColor = variantStyles.startColor ?? DEFAULT_START_COLOR;

    return (
      <Shadow
        containerStyle={containerStyle}
        distance={distance}
        offset={offset}
        shadowViewProps={{ style: shadowViewStyle }}
        startColor={startColor}
        style={shadowStyle}
      >
        <UnstyleButton
          {...pressableProps}
          disabled={disabled}
          ref={ref}
          style={(state: PressableStateCallbackType) => {
            return [
              buttonBaseStyle,
              variantStyles.buttonStyle,
              styleOverride,
              !disabled && state.pressed
                ? { opacity: DEFAULT_PRESSED_OPACITY }
                : null,
            ];
          }}
        >
          {children}
        </UnstyleButton>
      </Shadow>
    );
  }
);

ShadowButtonBase.displayName = 'ShadowButtonBase';

export const ShadowButton = memo(ShadowButtonBase);
