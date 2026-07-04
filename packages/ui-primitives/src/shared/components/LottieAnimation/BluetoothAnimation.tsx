import { StyleProp, ViewStyle } from 'react-native';

import type { LottieAnimationProps } from './LottieAnimation';
import { LottieAnimation } from './LottieAnimation';

import Bluetooth from '../../../assets/lottie/bluetooth.json';
import {
  createVariants,
  type CreateVariantsConfig,
  type CreateVariantsProps,
} from '../../utility/factories';

interface BluetoothVariantResult extends Record<string, unknown> {
  height: number;
  width: number;
}

const bluetoothVariantDefinitions = {
  variant: {
    large: { height: 300, width: 300 },
    medium: { height: 200, width: 200 },
    small: { height: 100, width: 100 },
  },
};

const bluetoothVariantsConfig: CreateVariantsConfig<
  BluetoothVariantResult,
  typeof bluetoothVariantDefinitions
> = {
  base: { height: 200, width: 200 },
  defaultVariants: {
    variant: 'medium',
  },
  variants: bluetoothVariantDefinitions,
};

const bluetoothVariants = createVariants(bluetoothVariantsConfig);

interface BluetoothAnimationProps extends Omit<LottieAnimationProps, 'source'> {
  style?: StyleProp<ViewStyle>;
  size?: CreateVariantsProps<typeof bluetoothVariantsConfig>['variant'];
}

const BluetoothAnimation: React.FC<BluetoothAnimationProps> = ({
  size = 'medium',
  style,
  ...props
}) => {
  const styles = bluetoothVariants({ variant: size });

  return (
    <LottieAnimation
      autoPlay
      loop
      resizeMode="contain"
      source={Bluetooth}
      speed={1}
      style={[styles, style]}
      {...props}
    />
  );
};

export { BluetoothAnimation };
