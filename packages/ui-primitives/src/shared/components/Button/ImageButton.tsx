import React, { memo, useMemo } from 'react';

import { Button, ButtonProps } from './Button';

import {
  FastImage,
  FastImageProps,
  ImageProps,
} from '../Image';
import {
  createVariants,
  type CreateVariantsConfig,
} from '../../utility/factories';
import { resolveSourceFastImage } from '../../utility/resolvers';

type Size = 'sm' | 'md' | 'lg';

interface ImageVariantResult extends Record<string, unknown> {
  image: ImageProps['style'];
}

const imageVariantDefinitions = {
  size: {
    lg: {
      image: { height: 28, width: 28 },
    },
    md: {
      image: { height: 20, width: 20 },
    },
    sm: {
      image: { height: 16, width: 16 },
    },
  },
};

const imageVariantsConfig: CreateVariantsConfig<
  ImageVariantResult,
  typeof imageVariantDefinitions
> = {
  base: {
    image: { height: 20, width: 20 },
  },
  defaultVariants: {
    size: 'md',
  },
  variants: imageVariantDefinitions,
};

const imageVariants = createVariants(imageVariantsConfig);

export interface ImageButtonProps extends ButtonProps {
  image: FastImageProps['source'];
  imageStyle?: ImageProps['style'];
  size?: Size;
}

export const ImageButton = memo(
  ({
    image,
    imageStyle,
    size = 'md',
    variant = 'plain',
    children,
    ...props
  }: ImageButtonProps) => {
    const resolvedImage = useMemo(() => resolveSourceFastImage(image), [image]);
    const { image: imageSizeStyle } = imageVariants({ size });

    return (
      <Button variant={variant} {...props}>
        <FastImage
          resizeMode="contain"
          source={resolvedImage}
          style={[imageSizeStyle, imageStyle]}
        />
        {children}
      </Button>
    );
  }
);
