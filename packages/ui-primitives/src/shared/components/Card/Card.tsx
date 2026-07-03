import React, { memo, useMemo } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Shadow, ShadowProps } from 'react-native-shadow-2';

import { BaseComponentProps } from '@/models/common/baseComponent.model';
import { Box, BoxProps } from '@/shared/components/Box';
import { theme } from '@/shared/theme';
import { palette } from '@/shared/theme/colors';

export type ShadowVariant =
  | 'none'
  | 'md'
  | 'lg'
  | 'bottom'
  | 'avatar'
  | 'card'
  | 'top';

export interface CardProps
  extends Omit<BoxProps, 'shadowColor'>,
    BaseComponentProps {
  children: React.ReactNode;
  shadow?: ShadowVariant;
  shadowColor?: string;
  style?: StyleProp<ViewStyle>;
  distance?: number;
}

type ShadowVariantParams = {
  [key in ShadowVariant]: ShadowProps | null;
};

const shadowVariants: ShadowVariantParams = {
  avatar: {
    containerStyle: { borderRadius: 9999, zIndex: 1000 },
    distance: 8,
    offset: [0, 2],
    shadowViewProps: { style: { borderRadius: 9999, opacity: 0.2 } },
    sides: { bottom: true, end: false, start: false, top: false },
    startColor: palette.shadowDefalt,
    style: { borderRadius: 256 },
  },
  bottom: {
    containerStyle: { zIndex: 1000 },
    distance: 8,
    offset: [0, 2],
    shadowViewProps: { style: { opacity: 0.2 } },
    sides: { bottom: true, end: false, start: false, top: false },
    startColor: palette.shadowDefalt,
  },
  card: {
    containerStyle: { zIndex: 500 },
    distance: 8,
    offset: [0, 2],
    shadowViewProps: { style: { opacity: 0.25 } },
    startColor: palette.shadowDefalt,
  },
  lg: {
    distance: 8,
    shadowViewProps: { style: { opacity: 0.25 } },
    startColor: palette.shadowDefalt,
  },
  md: {
    containerStyle: { zIndex: 1000 },
    distance: 8,
    offset: [0, 2],
    shadowViewProps: { style: { opacity: 0.2 } },
    startColor: palette.shadowDefalt,
  },
  none: null,
  top: {
    containerStyle: { zIndex: 1000 },
    distance: 8,
    offset: [2, 0],
    shadowViewProps: { style: { opacity: 0.2 } },
    sides: { bottom: false, end: false, start: false, top: true },
    startColor: palette.shadowDefalt,
  },
};

const getBorderRadiusToNumber = (borderRadius: BoxProps['borderRadius']) => {
  if (typeof borderRadius === 'number') {
    return borderRadius;
  }
  if (typeof borderRadius === 'string') {
    return theme.borderRadii[borderRadius];
  }
  return 0;
};

const CardBase: React.FC<CardProps> = ({
  children,
  shadow = 'md',
  shadowColor,
  style,
  backgroundColor = 'white',
  borderRadius = 'md',
  padding = 'md',
  distance,
  ...boxProps
}) => {
  const shadowConfig = useMemo(() => {
    const baseConfig = shadowVariants[shadow];
    if (!baseConfig) return null;
    if (shadowColor) {
      return { ...baseConfig, distance, startColor: shadowColor };
    }
    return baseConfig;
  }, [shadow, shadowColor, distance]);

  const shadowViewStyle = useMemo(
    () => [
      shadowConfig?.shadowViewProps?.style,
      { borderRadius: getBorderRadiusToNumber(borderRadius) },
    ],
    [shadowConfig?.shadowViewProps?.style, borderRadius]
  );

  if (!shadowConfig) {
    return (
      <Box
        backgroundColor={backgroundColor}
        borderRadius={borderRadius}
        padding={padding}
        style={style}
        {...boxProps}
      >
        {children}
      </Box>
    );
  }

  return (
    <Shadow
      {...shadowConfig}
      shadowViewProps={{
        ...shadowConfig.shadowViewProps,
        style: shadowViewStyle,
      }}
    >
      <Box
        backgroundColor={backgroundColor}
        borderRadius={borderRadius}
        minWidth="100%"
        padding={padding}
        style={style}
        width="100%"
        {...boxProps}
      >
        {children}
      </Box>
    </Shadow>
  );
};

export const Card = memo(CardBase);
