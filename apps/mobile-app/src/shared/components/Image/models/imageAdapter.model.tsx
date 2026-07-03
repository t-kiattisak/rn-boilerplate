import { FastImageStaticProperties } from '@d11/react-native-fast-image';

import type {
  ImageCacheControl,
  ImagePriority,
  ImageResizeMode,
  ImageSourceProp,
} from './image.model';

import { FastImageProps } from '@/shared/components/Image';

export interface ImageAdapter {
  Component: React.ComponentType<FastImageProps> & FastImageStaticProperties;
  resolveSource(source: ImageSourceProp): ImageSourceProp | undefined;
  getResizeMode(mode: ImageResizeMode): ImageResizeMode;
  getCacheControl(control: ImageCacheControl): ImageCacheControl;
  getPriority(priority: ImagePriority): ImagePriority;
}
