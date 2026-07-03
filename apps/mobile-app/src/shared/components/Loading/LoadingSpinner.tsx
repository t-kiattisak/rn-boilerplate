import React from 'react';
import { ActivityIndicator } from 'react-native';

interface LoadingSpinnerProps {
  top?: number;
  size?: number | 'small' | 'large' | undefined;
}
const LoadingSpinner = ({ top, size = 'large' }: LoadingSpinnerProps) => {
  return (
    <ActivityIndicator
      size={size}
      style={{
        left: '50%',
        position: 'absolute',
        top: top ?? '50%',
        zIndex: 9999,
      }}
    />
  );
};
export { LoadingSpinner };
