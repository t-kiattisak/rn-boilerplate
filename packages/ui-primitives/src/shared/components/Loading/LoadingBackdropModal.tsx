import React, { memo, useId } from 'react';
import { Modal, StyleSheet } from 'react-native';

import type { LoadingBackdropProps } from './models/loadingBackdrop.model';

import { Box } from '../Box';
import { DotLoaderAnimation } from '../LottieAnimation';

const LoadingBackdropModalBase = ({
  opacity = 0.4,
  backgroundColor,
  visible = true,
  loadingComponent,
}: LoadingBackdropProps) => {
  const modalId = useId();
  const backdropColor = backgroundColor ?? `rgba(0, 0, 0, ${opacity})`;

  return (
    <Modal
      accessibilityLabel="LoadingBackdrop"
      accessibilityRole="alert"
      animationType="fade"
      aria-modal
      id={`modal-${modalId}`}
      presentationStyle="overFullScreen"
      statusBarTranslucent
      transparent
      visible={visible}
    >
      <Box
        alignItems="center"
        justifyContent="center"
        style={[
          StyleSheet.absoluteFill,
          {
            backgroundColor: backdropColor,
          },
        ]}
      >
        {loadingComponent ?? <DotLoaderAnimation />}
      </Box>
    </Modal>
  );
};

export const LoadingBackdropModal = memo(LoadingBackdropModalBase);
