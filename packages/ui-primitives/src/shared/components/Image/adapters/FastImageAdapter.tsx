import RnFastImage from '@d11/react-native-fast-image';

import {
  ImageCacheControl,
  ImagePriority,
  ImageResizeMode,
  ImageSource,
  ImageSourceProp,
} from '../models/image.model';
import { ImageAdapter } from '../models/imageAdapter.model';

export const FastImageAdapter: ImageAdapter = {
  Component: RnFastImage as ImageAdapter['Component'],

  getCacheControl(control: ImageCacheControl): ImageCacheControl {
    return RnFastImage.cacheControl[control];
  },

  getPriority(priority: ImagePriority): ImagePriority {
    return RnFastImage.priority[priority];
  },

  getResizeMode(mode: ImageResizeMode): ImageResizeMode {
    if (!Object.values(RnFastImage.resizeMode).includes(mode)) {
      return 'cover';
    }
    return RnFastImage.resizeMode[mode];
  },

  resolveSource(source: ImageSourceProp): ImageSourceProp {
    if (typeof source === 'number') return source;
    if (typeof source === 'string') {
      return {
        cache: RnFastImage.cacheControl.immutable,
        priority: RnFastImage.priority.normal,
        uri: source,
      };
    }
    if (typeof source === 'object' && 'uri' in source) {
      const obj = source as ImageSource;
      const cache = RnFastImage.cacheControl[obj.cache ?? 'immutable'];
      return {
        ...source,
        cache,
        priority: RnFastImage.priority.normal,
      };
    }
    return source;
  },
};
