import React, { memo } from 'react';
import { ImageStyle, StyleProp, View } from 'react-native';

import { Button, ButtonProps } from './Button';

import {
  createVariants,
  type CreateVariantsConfig,
} from '../../utility/factories';

type Size = 'sm' | 'md' | 'lg';

interface IconVariantResult extends Record<string, unknown> {
  icon: ImageStyle;
}

const iconVariantDefinitions = {
  size: {
    lg: {
      icon: { height: 28, width: 28 },
    },
    md: {
      icon: { height: 20, width: 20 },
    },
    sm: {
      icon: { height: 16, width: 16 },
    },
  },
};

const iconVariantsConfig: CreateVariantsConfig<
  IconVariantResult,
  typeof iconVariantDefinitions
> = {
  base: {
    icon: { height: 20, width: 20 },
  },
  defaultVariants: {
    size: 'md',
  },
  variants: iconVariantDefinitions,
};

const iconVariants = createVariants(iconVariantsConfig);

export interface IconButtonProps extends ButtonProps {
  icon: React.ReactNode;
  size?: Size;
  iconStyle?: StyleProp<ImageStyle>;
}

export const IconButton = memo(
  ({ icon, size = 'md', iconStyle, children, ...props }: IconButtonProps) => {
    const { icon: iconSizeStyle } = iconVariants({ size });

    return (
      <Button {...props}>
        <View style={[iconSizeStyle, iconStyle]}>{icon}</View>
        {children}
      </Button>
    );
  }
);
