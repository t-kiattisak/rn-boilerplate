import Icon from '@react-native-vector-icons/feather';
import React, { useEffect } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Animated, {
  Easing,
  type SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { useTheme } from '../../theme/useTheme';
import { Box } from '../Box';

interface BluetoothPulseAnimationProps {
  size?: 'small' | 'medium' | 'large';
  style?: StyleProp<ViewStyle>;
}

const sizeMap = {
  large: { circleSize: 280, iconSize: 120 },
  medium: { circleSize: 200, iconSize: 80 },
  small: { circleSize: 140, iconSize: 48 },
};

const BluetoothPulseAnimation: React.FC<BluetoothPulseAnimationProps> = ({
  size = 'medium',
  style,
}) => {
  const { circleSize, iconSize } = sizeMap[size];
  const theme = useTheme();

  const waveA = useSharedValue(0);
  const waveB = useSharedValue(0);
  const waveC = useSharedValue(0);

  const startWave = (wave: SharedValue<number>, delay: number) => {
    wave.value = withRepeat(
      withSequence(
        withDelay(
          delay,
          withTiming(1, { duration: 2200, easing: Easing.out(Easing.ease) })
        ),
        withTiming(0, { duration: 0 })
      ),
      -1,
      false
    );
  };

  useEffect(() => {
    startWave(waveA, 0);
    startWave(waveB, 700);
    startWave(waveC, 1400);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const waveAStyle = useAnimatedStyle(() => ({
    opacity: 0.55 - waveA.value * 0.55,
    transform: [{ scale: 0.62 + waveA.value * 0.46 }],
  }));

  const waveBStyle = useAnimatedStyle(() => ({
    opacity: 0.55 - waveB.value * 0.55,
    transform: [{ scale: 0.62 + waveB.value * 0.46 }],
  }));

  const waveCStyle = useAnimatedStyle(() => ({
    opacity: 0.55 - waveC.value * 0.55,
    transform: [{ scale: 0.62 + waveC.value * 0.46 }],
  }));

  return (
    <Animated.View
      style={[
        {
          alignItems: 'center',
          height: circleSize,
          justifyContent: 'center',
          width: circleSize,
        },
        style,
      ]}
    >
      <Animated.View
        style={[
          {
            backgroundColor: theme.colors.primary,
            borderRadius: circleSize / 2,
            height: circleSize,
            position: 'absolute',
            width: circleSize,
          },
          waveAStyle,
        ]}
      />
      <Animated.View
        style={[
          {
            backgroundColor: theme.colors.primary,
            borderRadius: circleSize / 2,
            height: circleSize,
            position: 'absolute',
            width: circleSize,
          },
          waveBStyle,
        ]}
      />
      <Animated.View
        style={[
          {
            backgroundColor: theme.colors.primary,
            borderRadius: circleSize / 2,
            height: circleSize,
            position: 'absolute',
            width: circleSize,
          },
          waveCStyle,
        ]}
      />
      <Box bg="primary" borderRadius="full" p="md" position="absolute">
        <Icon color={theme.colors.white} name="bluetooth" size={iconSize} />
      </Box>
    </Animated.View>
  );
};

export { BluetoothPulseAnimation };
