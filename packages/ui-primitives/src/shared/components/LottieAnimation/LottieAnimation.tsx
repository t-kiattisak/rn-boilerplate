import LottieView, { LottieViewProps } from 'lottie-react-native';
import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleProp, ViewStyle } from 'react-native';

export interface LottieAnimationProps
  extends Pick<LottieViewProps, 'source' | 'colorFilters'> {
  autoPlay?: boolean;
  loop?: boolean;
  speed?: number;
  duration?: number;
  easing?: (value: number) => number;
  style?: StyleProp<ViewStyle>;
  onAnimationFinish?: () => void;
  progress?: Animated.Value;
  resizeMode?: 'cover' | 'contain' | 'center';
}

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

const LottieAnimation = ({
  source,
  autoPlay = true,
  loop = true,
  speed = 1,
  duration,
  easing = Easing.linear,
  style,
  onAnimationFinish,
  progress,
  resizeMode = 'contain',
  colorFilters,
}: LottieAnimationProps) => {
  const animationProgress = useRef(new Animated.Value(0));
  const lottieRef = useRef<LottieView>(null);

  useEffect(() => {
    if (duration && !progress) {
      const animation = Animated.timing(animationProgress.current, {
        duration,
        easing,
        toValue: 1,
        useNativeDriver: false,
      });

      animation.start(({ finished }) => {
        if (finished && onAnimationFinish) {
          onAnimationFinish();
        }
      });

      return () => {
        animation.stop();
      };
    }
  }, [duration, easing, onAnimationFinish, progress]);

  const handleAnimationFinish = () => {
    if (onAnimationFinish) {
      onAnimationFinish();
    }
  };

  return (
    <AnimatedLottieView
      autoPlay={autoPlay}
      colorFilters={colorFilters}
      loop={loop}
      progress={progress ?? animationProgress.current}
      ref={lottieRef}
      resizeMode={resizeMode}
      source={source}
      speed={speed}
      style={style}
      onAnimationFinish={handleAnimationFinish}
    />
  );
};

export { LottieAnimation };
