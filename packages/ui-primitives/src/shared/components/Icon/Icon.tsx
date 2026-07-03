/* eslint-disable @typescript-eslint/no-explicit-any */

import AntDesign from '@react-native-vector-icons/ant-design';
import Entypo from '@react-native-vector-icons/entypo';
import EvilIcons from '@react-native-vector-icons/evil-icons';
import Feather from '@react-native-vector-icons/feather';
import FontAwesome from '@react-native-vector-icons/fontawesome';
import FontAwesome5 from '@react-native-vector-icons/fontawesome5';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import Foundation from '@react-native-vector-icons/foundation';
import Ionicons from '@react-native-vector-icons/ionicons';
import MaterialCommunityIcons from '@react-native-vector-icons/material-design-icons';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import Octicons from '@react-native-vector-icons/octicons';
import SimpleLineIcons from '@react-native-vector-icons/simple-line-icons';
import Zocial from '@react-native-vector-icons/zocial';
import React from 'react';
import { TextProps } from 'react-native';

import { useTheme } from '@/app/hooks/core';

interface IconSetMap {
  AntDesign: typeof AntDesign;
  Entypo: typeof Entypo;
  EvilIcons: typeof EvilIcons;
  Feather: typeof Feather;
  FontAwesome: typeof FontAwesome;
  FontAwesome5: typeof FontAwesome5;
  FontAwesome6: typeof FontAwesome6;
  Foundation: typeof Foundation;
  Ionicons: typeof Ionicons;
  MaterialCommunityIcons: typeof MaterialCommunityIcons;
  MaterialIcons: typeof MaterialIcons;
  Octicons: typeof Octicons;
  SimpleLineIcons: typeof SimpleLineIcons;
  Zocial: typeof Zocial;
}

export type IconSet = keyof IconSetMap;

type ExtractIconName<T> =
  T extends React.ComponentType<infer P>
    ? P extends { name: infer N }
      ? N
      : never
    : never;

export type IconNameForSet<T extends IconSet> = ExtractIconName<IconSetMap[T]>;

export type IconProps<T extends IconSet = 'Feather'> = Omit<
  TextProps,
  'color'
> & {
  iconSet?: T;
  name: IconNameForSet<T>;
  size?: number;
  color?: string;
};

const iconComponents: IconSetMap = {
  AntDesign,
  Entypo,
  EvilIcons,
  Feather,
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
  SimpleLineIcons,
  Zocial,
};

export const IconBase = <T extends IconSet = 'Feather'>({
  name,
  size = 24,
  color,
  iconSet = 'Feather' as T,
  style,
  ...props
}: IconProps<T>): React.ReactElement => {
  const theme = useTheme();

  const IconComponent = iconComponents[iconSet] as React.ComponentType<any>;

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!IconComponent) {
    console.warn(`Icon set "${iconSet}" not found. Using Feather as fallback.`);
    return (
      <Feather
        color={color ?? theme.colors.text}
        name={name as any}
        size={size}
        style={style}
        {...props}
      />
    );
  }

  return (
    <IconComponent
      color={color ?? theme.colors.text}
      name={name}
      size={size}
      style={style}
      {...props}
    />
  );
};

export const Icon = React.memo(IconBase) as typeof IconBase;

(Icon as any).displayName = 'Icon';
