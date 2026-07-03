import { Dimensions, Platform } from 'react-native';

export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;

export const platformOS = Platform.OS;
export const isIos = platformOS === 'ios';
export const isAndroid = platformOS === 'android';
export const isDev = __DEV__;
