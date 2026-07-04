import { ImageSourcePropType, ImageStyle, StyleProp } from 'react-native';

import { ImageAdapter } from './imageAdapter.model';

export type ImageResizeMode = 'cover' | 'contain' | 'stretch' | 'center';
export type ImagePriority = 'low' | 'normal' | 'high';
export type ImageCacheControl = 'immutable' | 'web' | 'cacheOnly';

export interface ImageSource {
  uri?: string;
  cache?: ImageCacheControl;
  priority?: ImagePriority;
}

export type ImageSourceProp =
  | number
  | string
  | ImageSource
  | { uri: string }
  | ImageSourcePropType;

export interface ImageProps {
  adapter?: ImageAdapter;
  source?: ImageSourceProp;
  resizeMode?: ImageResizeMode;
  style?: ImageStyle | StyleProp<ImageStyle>;
  testID?: string;
  fallback?: ImageSourceProp;
  id?: string;
}
