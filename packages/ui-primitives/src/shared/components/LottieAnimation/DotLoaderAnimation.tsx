import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import DotLoader from '../../../assets/lottie/dot-loader.json';
import {
  LottieAnimation,
  LottieAnimationProps,
} from './LottieAnimation';

interface DotLoaderAnimationProps extends Omit<LottieAnimationProps, 'source'> {
  style?: StyleProp<ViewStyle>;
}

const DotLoaderAnimation = ({ style }: DotLoaderAnimationProps) => {
  return (
    <LottieAnimation
      autoPlay
      loop
      resizeMode="contain"
      source={DotLoader}
      speed={1}
      style={[{ height: 100, width: 100 }, style]}
    />
  );
};

export { DotLoaderAnimation };
