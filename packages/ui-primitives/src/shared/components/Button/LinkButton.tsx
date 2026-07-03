import { LinkProps, useLinkProps } from '@react-navigation/native';
import React, { PropsWithChildren, memo } from 'react';
import {
  Pressable,
  PressableStateCallbackType,
  StyleProp,
  ViewStyle,
} from 'react-native';

type LinkButtonProps<ParamList extends ReactNavigation.RootParamList> =
  PropsWithChildren<LinkProps<ParamList>> & {
    style?:
      | StyleProp<ViewStyle>
      | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>);
  };

const LinkButtonBase = <ParamList extends ReactNavigation.RootParamList>({
  children,
  style,
  ...linkProps
}: LinkButtonProps<ParamList>) => {
  const links = useLinkProps(linkProps as LinkProps<ParamList>);

  return (
    <Pressable style={style} {...links}>
      {children}
    </Pressable>
  );
};

const LinkButton = memo(LinkButtonBase);
LinkButton.displayName = 'LinkButton';

export { LinkButton };
