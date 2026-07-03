import { ComponentRef, forwardRef, memo } from 'react';
import {
  GestureResponderEvent,
  Pressable,
  PressableProps,
  PressableStateCallbackType,
  StyleProp,
  ViewStyle,
} from 'react-native';

import { useButtonPress } from './hooks/useButtonPress';

export type UnstyleButtonProps = Omit<PressableProps, 'onPress'> & {
  onPress?: (
    event: GestureResponderEvent
  ) => void | Promise<void> | Promise<unknown>;
  style?:
    | StyleProp<ViewStyle>
    | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>);
  dismissKeyboard?: boolean;
};

export interface UnstyleButtonRef extends ComponentRef<typeof Pressable> {}

const UnstyleButtonBase = forwardRef<UnstyleButtonRef, UnstyleButtonProps>(
  (
    { children, style, onPress, disabled, dismissKeyboard = true, ...props },
    ref
  ) => {
    const { isDisabled, handlePress } = useButtonPress({
      disabled,
      dismissKeyboard,
      onPress,
    });

    return (
      <Pressable
        ref={ref}
        style={style}
        {...props}
        disabled={isDisabled}
        onPress={handlePress}
      >
        {children}
      </Pressable>
    );
  }
);

UnstyleButtonBase.displayName = 'UnstyleButton';

export const UnstyleButton = memo(UnstyleButtonBase);
