import { ImageSourcePropType } from 'react-native';

import type { ImageSourceProp } from '@/shared/components/Image';
import { FastImageAdapter } from '@/shared/components/Image';

/**
 * Normalizes an image source for use with FastImage (react-native-fast-image).
 * Filters out invalid inputs (falsy, boolean, function, or object without `uri`)
 * and delegates to FastImageAdapter so the result includes cache/priority fields.
 *
 * Use this when the source will be passed to a FastImage or a component using
 * the FastImage adapter. Use `resolveSource` instead when the source will be
 * passed to the default React Native Image component.
 *
 * @param input - Optional image source (uri object, number for require(), or null).
 *                Invalid types are filtered out and yield undefined.
 * @returns Normalized source for FastImage, or undefined when input is invalid/falsy.
 */
export function resolveSourceFastImage(
  input?: ImageSourceProp | null
): ReturnType<typeof FastImageAdapter.resolveSource> {
  if (!input) return undefined;
  if (typeof input === 'boolean' || typeof input === 'function')
    return undefined;
  if (typeof input === 'object' && !('uri' in input)) return undefined;
  return FastImageAdapter.resolveSource(input);
}

/**
 * Normalizes an image source for use with the default React Native Image component.
 * Converts string to { uri }, passes through number (require()) and object sources.
 *
 * Use this for React Native Image. Use `resolveSourceFastImage` for FastImage.
 *
 * @param input - Optional string (URL), number (require()), or Image source object.
 * @returns ImageSourcePropType for Image, or undefined when input is invalid.
 */
export function resolveSource(
  input?: string | number | ImageSourcePropType | null
): ImageSourcePropType | undefined {
  if (typeof input === 'string') {
    return { uri: input };
  }

  if (typeof input === 'number' || (input && typeof input === 'object')) {
    return input;
  }

  return undefined;
}
