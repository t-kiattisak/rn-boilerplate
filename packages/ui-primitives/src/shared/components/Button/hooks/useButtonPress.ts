import { useCallback, useRef, useState } from 'react';
import { GestureResponderEvent, Keyboard } from 'react-native';

import { isPromise } from '../../../utility/validators';

export interface UseButtonPressParams {
  onPress?: (
    event: GestureResponderEvent
  ) => void | Promise<void> | Promise<unknown>;
  disabled?: boolean | null;
  dismissKeyboard?: boolean;
}

export interface UseButtonPressResult {
  handlePress: (event: GestureResponderEvent) => Promise<void>;
  isDisabled: boolean;
  isLoading: boolean;
}

export const useButtonPress = ({
  onPress,
  disabled,
  dismissKeyboard = true,
}: UseButtonPressParams): UseButtonPressResult => {
  const [isLoading, setIsLoading] = useState(false);

  const isProcessingRef = useRef(false);

  const handlePress = useCallback(
    async (event: GestureResponderEvent) => {
      if (disabled || isProcessingRef.current || !onPress) return;

      if (dismissKeyboard) {
        Keyboard.dismiss();
      }

      const result = onPress(event);

      if (isPromise(result)) {
        isProcessingRef.current = true;
        setIsLoading(true);

        try {
          await result;
        } finally {
          isProcessingRef.current = false;
          setIsLoading(false);
        }
      }
    },
    [disabled, onPress, dismissKeyboard]
  );

  return {
    handlePress,
    isDisabled: !!disabled || isLoading,
    isLoading,
  };
};
