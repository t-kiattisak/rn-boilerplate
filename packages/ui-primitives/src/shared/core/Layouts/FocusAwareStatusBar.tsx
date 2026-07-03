import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import type { StatusBarProps } from 'react-native';
import { StatusBar } from 'react-native';

const FocusAwareStatusBar = (props: StatusBarProps) => {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
};

export default FocusAwareStatusBar;
