import React, { memo } from 'react';

import { Box } from '../Box';
import { DotLoaderAnimation } from '../LottieAnimation';

interface LoadingDotsProps {
  size?: number;
}

const LoadingDotsBase = ({ size = 12 }: LoadingDotsProps) => {
  return (
    <Box alignItems="center" height={size * 3} justifyContent="center">
      <DotLoaderAnimation />
    </Box>
  );
};

export const LoadingDots = memo(LoadingDotsBase);
