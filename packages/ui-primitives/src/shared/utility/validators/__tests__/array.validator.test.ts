import {
  isArray,
  isEmptyArray,
  isNonEmptyArray,
} from '../array.validator';

describe('array.validator', () => {
  describe('isArray', () => {
    it('should return true for arrays', () => {
      expect(isArray([])).toBe(true);
      expect(isArray([1, 2, 3])).toBe(true);
      expect(isArray(['a', 'b', 'c'])).toBe(true);
      expect(isArray([null, undefined])).toBe(true);
      expect(isArray([{ a: 1 }, { b: 2 }])).toBe(true);
    });

    it('should return true for typed arrays', () => {
      expect(isArray<number>([1, 2, 3])).toBe(true);
      expect(isArray<string>(['a', 'b'])).toBe(true);
      expect(isArray<boolean>([true, false])).toBe(true);
    });

    it('should return false for non-array types', () => {
      expect(isArray(null)).toBe(false);
      expect(isArray(undefined)).toBe(false);
      expect(isArray('')).toBe(false);
      expect(isArray('[]')).toBe(false);
      expect(isArray(123)).toBe(false);
      expect(isArray({})).toBe(false);
      expect(isArray({ length: 0 })).toBe(false);
    });

    it('should return false for array-like objects', () => {
      expect(isArray({ 0: 'a', 1: 'b', length: 2 })).toBe(false);
      expect(isArray('string')).toBe(false);
    });
  });

  describe('isEmptyArray', () => {
    it('should return true for empty arrays', () => {
      expect(isEmptyArray([])).toBe(true);
      expect(isEmptyArray(new Array())).toBe(true);
      expect(isEmptyArray(Array())).toBe(true);
    });

    it('should return false for non-empty arrays', () => {
      expect(isEmptyArray([1])).toBe(false);
      expect(isEmptyArray([1, 2, 3])).toBe(false);
      expect(isEmptyArray(['a'])).toBe(false);
      expect(isEmptyArray([null])).toBe(false);
      expect(isEmptyArray([undefined])).toBe(false);
    });

    it('should return false for non-array types', () => {
      expect(isEmptyArray(null)).toBe(false);
      expect(isEmptyArray(undefined)).toBe(false);
      expect(isEmptyArray('')).toBe(false);
      expect(isEmptyArray({})).toBe(false);
      expect(isEmptyArray(0)).toBe(false);
    });
  });

  describe('isNonEmptyArray', () => {
    it('should return true for non-empty arrays', () => {
      expect(isNonEmptyArray([1])).toBe(true);
      expect(isNonEmptyArray([1, 2, 3])).toBe(true);
      expect(isNonEmptyArray(['a', 'b'])).toBe(true);
      expect(isNonEmptyArray([null])).toBe(true);
      expect(isNonEmptyArray([undefined])).toBe(true);
      expect(isNonEmptyArray([{ a: 1 }])).toBe(true);
    });

    it('should return false for empty arrays', () => {
      expect(isNonEmptyArray([])).toBe(false);
      expect(isNonEmptyArray(new Array())).toBe(false);
    });

    it('should return false for non-array types', () => {
      expect(isNonEmptyArray(null)).toBe(false);
      expect(isNonEmptyArray(undefined)).toBe(false);
      expect(isNonEmptyArray('hello')).toBe(false);
      expect(isNonEmptyArray({})).toBe(false);
      expect(isNonEmptyArray(123)).toBe(false);
    });
  });

  describe('edge cases', () => {
    it('should handle arrays with various element types', () => {
      expect(isArray([1, '2', true, null, undefined, {}])).toBe(true);
      expect(isNonEmptyArray([1, '2', true, null, undefined, {}])).toBe(true);
    });

    it('should handle sparse arrays', () => {
      const sparse = [1, , , 4];
      expect(isArray(sparse)).toBe(true);
      expect(isNonEmptyArray(sparse)).toBe(true);
      expect(isEmptyArray(sparse)).toBe(false);
    });

    it('should handle nested arrays', () => {
      expect(isArray([[1, 2], [3, 4]])).toBe(true);
      expect(isNonEmptyArray([[1, 2], [3, 4]])).toBe(true);
    });
  });
});

