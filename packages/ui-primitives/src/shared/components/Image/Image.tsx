import React, { memo } from 'react';

import { FastImageAdapter } from './adapters/FastImageAdapter';
import type { ImageProps } from './models/image.model';

import { testIdsConstant } from '../../constants/testIds.constant';

const FastImageBase: React.FC<ImageProps> = ({
  source,
  resizeMode = 'cover',
  fallback,
  testID = testIdsConstant.fastImage,
  adapter = FastImageAdapter,
  ...rest
}) => {
  const resolvedSource =
    source == null ? undefined : adapter.resolveSource(source);
  const resolvedResizeMode = adapter.getResizeMode(resizeMode);
  const resolvedFallback =
    fallback == null ? undefined : adapter.resolveSource(fallback);

  const Component = adapter.Component;

  return (
    <Component
      {...rest}
      fallback={resolvedFallback}
      resizeMode={resolvedResizeMode}
      source={resolvedSource}
      testID={testID}
    />
  );
};

export const FastImage = memo(FastImageBase);
