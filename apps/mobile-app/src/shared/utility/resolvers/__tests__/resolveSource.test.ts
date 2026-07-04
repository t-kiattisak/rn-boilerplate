import { resolveSource, resolveSourceFastImage } from '@/shared/utility/resolvers';
import { ImageSourcePropType } from 'react-native';
import RnFastImage, { Source } from '@d11/react-native-fast-image';

describe('Image Source Resolvers', () => {
  describe('resolveSourceFastImage', () => {
    it('should return undefined for falsy inputs', () => {
      expect(resolveSourceFastImage()).toBeUndefined();
      expect(resolveSourceFastImage(null)).toBeUndefined();
      expect(resolveSourceFastImage({uri: ''})).toEqual({
        uri: '',
        cache: RnFastImage.cacheControl.immutable,
        priority: RnFastImage.priority.normal,
      });
      expect(resolveSourceFastImage(0)).toBeUndefined(); // 0 is falsy
    });

    it('should convert string URI to Source object with default cache and priority', () => {
      const uri = 'https://example.com/image.jpg';
      const result = resolveSourceFastImage({uri});

      expect(result).toEqual({
        uri,
        cache: RnFastImage.cacheControl.immutable,
        priority: RnFastImage.priority.normal,
      });
    });

    it('should return number as-is for local require images', () => {
      const localImage = 12345; // simulate require('./image.png')
      const result = resolveSourceFastImage(localImage);

      expect(result).toBe(localImage);
    });

    it('should enhance Source object with default cache and priority when not provided', () => {
      const sourceInput: Source = {
        uri: 'https://example.com/image.jpg',
      };

      const result = resolveSourceFastImage(sourceInput);

      expect(result).toEqual({
        uri: 'https://example.com/image.jpg',
        cache: RnFastImage.cacheControl.immutable,
        priority: RnFastImage.priority.normal,
      });
    });

    it('should preserve existing cache and priority in Source object', () => {
      const sourceInput: Source = {
        uri: 'https://example.com/image.jpg',
        cache: RnFastImage.cacheControl.web,
        priority: RnFastImage.priority.high,
      };

      const result = resolveSourceFastImage(sourceInput);

      expect(result).toEqual({
        uri: 'https://example.com/image.jpg',
        cache: RnFastImage.cacheControl.web,
        priority: RnFastImage.priority.normal, // priority is always overridden
      });
    });

    it('should use default values when cache or priority is undefined in Source object', () => {
      const sourceInput: Source = {
        uri: 'https://example.com/image.jpg',
        cache: undefined,
        priority: undefined,
      };

      const result = resolveSourceFastImage(sourceInput);

      expect(result).toEqual({
        uri: 'https://example.com/image.jpg',
        cache: RnFastImage.cacheControl.immutable,
        priority: RnFastImage.priority.normal,
      });
    });

    it('should preserve additional properties in Source object', () => {
      const sourceInput: Source = {
        uri: 'https://example.com/image.jpg',
        headers: { Authorization: 'Bearer token' },
        cache: RnFastImage.cacheControl.cacheOnly,
      };

      const result = resolveSourceFastImage(sourceInput);

      expect(result).toEqual({
        uri: 'https://example.com/image.jpg',
        headers: { Authorization: 'Bearer token' },
        cache: RnFastImage.cacheControl.cacheOnly,
        priority: RnFastImage.priority.normal,
      });
    });

    it('should return undefined for invalid object input without uri property', () => {
      const invalidInput = { notUri: 'invalid' } as any;
      const result = resolveSourceFastImage(invalidInput);

      expect(result).toBeUndefined();
    });

    it('should handle empty string URI in Source object', () => {
      const sourceInput: Source = {
        uri: '',
      };

      const result = resolveSourceFastImage(sourceInput);

      expect(result).toEqual({
        uri: '',
        cache: RnFastImage.cacheControl.immutable,
        priority: RnFastImage.priority.normal,
      });
    });
  });

  describe('resolveSource', () => {
    it('should return undefined for falsy inputs except number 0', () => {
      expect(resolveSource()).toBeUndefined();
      expect(resolveSource(null)).toBeUndefined();
      expect(resolveSource()).toBeUndefined();
      expect(resolveSource({ uri: '' })).toEqual({ uri: '' });
    });

    it('should return number as-is for local require images', () => {
      const localImage = 12345;
      const result = resolveSource(localImage);

      expect(result).toBe(localImage);
    });

    it('should handle number 0 as valid local image', () => {
      const result = resolveSource(0);
      expect(result).toBe(0);
    });

    it('should return object as-is when it is a valid ImageSourcePropType', () => {
      const imageSource: ImageSourcePropType = {
        uri: 'https://example.com/image.jpg',
        width: 100,
        height: 100,
      };

      const result = resolveSource(imageSource);
      expect(result).toBe(imageSource);
    });

    it('should handle object with uri property', () => {
      const imageSource = { uri: 'https://example.com/image.jpg' };
      const result = resolveSource(imageSource);

      expect(result).toBe(imageSource);
    });

    it('should handle object without uri property', () => {
      const imageSource = { width: 100, height: 100 };
      const result = resolveSource(imageSource);

      expect(result).toBe(imageSource);
    });

    it('should handle complex ImageSourcePropType object', () => {
      const imageSource: ImageSourcePropType = {
        uri: 'https://example.com/image.jpg',
        width: 200,
        height: 150,
        scale: 2,
        headers: { 'User-Agent': 'MyApp' },
      };

      const result = resolveSource(imageSource);
      expect(result).toBe(imageSource);
    });

    it('should handle array of image sources', () => {
      const imageSourceArray: ImageSourcePropType = [
        { uri: 'https://example.com/image1.jpg', width: 100, height: 100 },
        { uri: 'https://example.com/image2.jpg', width: 200, height: 200 },
      ];

      const result = resolveSource(imageSourceArray);
      expect(result).toBe(imageSourceArray);
    });
  });

  describe('Edge Cases and Type Safety', () => {
    it('should handle undefined input gracefully', () => {
      expect(resolveSourceFastImage()).toBeUndefined();
      expect(resolveSource()).toBeUndefined();
    });

    it('should handle boolean input (invalid type)', () => {
      const invalidInput = true as any;
      expect(resolveSourceFastImage(invalidInput)).toBeUndefined();
      expect(resolveSource(invalidInput)).toBeUndefined();
    });

    it('should handle function input (invalid type)', () => {
      const invalidInput = (() => {}) as any;
      expect(resolveSourceFastImage(invalidInput)).toBeUndefined();
      expect(resolveSource(invalidInput)).toBeUndefined();
    });

    it('should handle empty object', () => {
      const emptyObject = {};
      expect(resolveSourceFastImage(emptyObject as any)).toBeUndefined();
      expect(resolveSource(emptyObject)).toBe(emptyObject);
    });

    it('should handle null object properties', () => {
      const sourceWithNullProps: Source = {
        uri: 'https://example.com/image.jpg',
        cache: null as any,
        priority: null as any,
      };

      const result = resolveSourceFastImage(sourceWithNullProps);
      expect(result).toEqual({
        uri: 'https://example.com/image.jpg',
        cache: RnFastImage.cacheControl.immutable,
        priority: RnFastImage.priority.normal,
      });
    });

    it('should handle very long URI strings', () => {
      const longUri = 'https://example.com/' + 'a'.repeat(1000) + '.jpg';

      const fastImageResult = resolveSourceFastImage({uri: longUri});
      expect(fastImageResult).toEqual({
        uri: longUri,
        cache: RnFastImage.cacheControl.immutable,
        priority: RnFastImage.priority.normal,
      });

      const regularResult = resolveSource(longUri);
      expect(regularResult).toEqual({ uri: longUri });
    });

    it('should handle special characters in URI', () => {
      const specialUri = 'https://example.com/image with spaces & symbols!@#.jpg';

      const fastImageResult = resolveSourceFastImage({uri: specialUri});
      expect(fastImageResult).toEqual({
        uri: specialUri,
        cache: RnFastImage.cacheControl.immutable,
        priority: RnFastImage.priority.normal,
      });

      const regularResult = resolveSource(specialUri);
      expect(regularResult).toEqual({ uri: specialUri });
    });
  });
});
