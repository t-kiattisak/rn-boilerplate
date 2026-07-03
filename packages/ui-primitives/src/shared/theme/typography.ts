import { Platform } from 'react-native';

export const typography = {
  bold: Platform.OS === 'ios' ? '600' : 'NotoSansThai-Bold',
  default: 'NotoSansThai-Medium',
  regular: 'NotoSansThai-Regular',
  semiBold: 'NotoSansThai-SemiBold',
};
