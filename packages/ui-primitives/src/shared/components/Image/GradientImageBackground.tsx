import React, { memo, ReactNode } from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import LinearGradient, {
  LinearGradientProps,
} from 'react-native-linear-gradient';

import { FastImage } from './Image';
import type { ImageProps } from './models/image.model';

import { BaseComponentProps } from '../../../models/common/baseComponent.model';
import { UnstyleButton } from '../Button/UnstyleButton';
import { theme } from '../../theme';

type GradientMode = 'bottom' | 'full' | 'none';

export interface GradientImageBackgroundProps
  extends Pick<ImageProps, 'source'>,
    BaseComponentProps {
  children?: ReactNode;
  style?: ViewStyle;
  height?: number;
  borderRadius?: number;
  gradientMode?: GradientMode;
  gradientColors?: string[];
  gradientStart?: LinearGradientProps['start'];
  gradientEnd?: LinearGradientProps['end'];
  onPress?: (e: GestureResponderEvent) => void;
  disabled?: boolean;
}

const GradientImageBackgroundBase = ({
  source,
  children,
  style,
  height = 200,
  borderRadius = 16,
  gradientMode = 'bottom',
  gradientColors = ['transparent', theme.colors.black99],
  gradientStart = { x: 0, y: 0 },
  gradientEnd = { x: 0, y: 1 },
  onPress,
  testID,
  disabled,
}: Readonly<GradientImageBackgroundProps>) => {
  const Container = onPress ? UnstyleButton : View;

  return (
    <Container
      disabled={disabled}
      style={[styles.container, { borderRadius, height }, style]}
      testID={testID}
      onPress={onPress}
    >
      <FastImage
        source={source}
        style={[StyleSheet.absoluteFill, { borderRadius }]}
      />

      {gradientMode !== 'none' && (
        <LinearGradient
          colors={gradientColors}
          end={gradientEnd}
          pointerEvents="none"
          start={gradientStart}
          style={[
            gradientMode === 'full'
              ? styles.fullGradient
              : styles.bottomGradient,
            gradientMode === 'bottom' && {
              borderBottomLeftRadius: borderRadius,
              borderBottomRightRadius: borderRadius,
            },
          ]}
        />
      )}
      {children && (
        <View pointerEvents="box-none" style={StyleSheet.absoluteFill}>
          {children}
        </View>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  bottomGradient: {
    bottom: 0,
    height: '55%',
    left: 0,
    position: 'absolute',
    right: 0,
  },
  container: {
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
  },
  fullGradient: {
    ...StyleSheet.absoluteFill,
  },
});

export const GradientImageBackground = memo(GradientImageBackgroundBase);
