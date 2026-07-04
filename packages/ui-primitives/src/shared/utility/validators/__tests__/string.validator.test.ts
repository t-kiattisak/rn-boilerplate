import {
  isEmptyString,
  isNonEmptyString,
  isString,
  isStringWithLength,
  isTrimmedString,
} from '@/shared/utility/validators/string.validator';

describe('string.validator', () => {
  describe('isString', () => {
    it('should return true for strings', () => {
      expect(isString('')).toBe(true);
      expect(isString('hello')).toBe(true);
      expect(isString('123')).toBe(true);
      expect(isString(' ')).toBe(true);
    });

    it('should return false for non-string types', () => {
      expect(isString(123)).toBe(false);
      expect(isString(true)).toBe(false);
      expect(isString(null)).toBe(false);
      expect(isString(undefined)).toBe(false);
      expect(isString([])).toBe(false);
      expect(isString({})).toBe(false);
    });
  });

  describe('isEmptyString', () => {
    it('should return true for empty strings', () => {
      expect(isEmptyString('')).toBe(true);
    });

    it('should return false for non-empty strings', () => {
      expect(isEmptyString('hello')).toBe(false);
      expect(isEmptyString(' ')).toBe(false);
      expect(isEmptyString('0')).toBe(false);
    });

    it('should return false for non-string types', () => {
      expect(isEmptyString(null)).toBe(false);
      expect(isEmptyString(undefined)).toBe(false);
      expect(isEmptyString(0)).toBe(false);
      expect(isEmptyString([])).toBe(false);
    });
  });

  describe('isNonEmptyString', () => {
    it('should return true for non-empty strings', () => {
      expect(isNonEmptyString('hello')).toBe(true);
      expect(isNonEmptyString(' ')).toBe(true);
      expect(isNonEmptyString('0')).toBe(true);
      expect(isNonEmptyString('a')).toBe(true);
    });

    it('should return false for empty strings', () => {
      expect(isNonEmptyString('')).toBe(false);
    });

    it('should return false for non-string types', () => {
      expect(isNonEmptyString(null)).toBe(false);
      expect(isNonEmptyString(undefined)).toBe(false);
      expect(isNonEmptyString(0)).toBe(false);
    });
  });

  describe('isTrimmedString', () => {
    it('should return true for strings without leading/trailing whitespace', () => {
      expect(isTrimmedString('hello')).toBe(true);
      expect(isTrimmedString('hello world')).toBe(true);
      expect(isTrimmedString('123')).toBe(true);
      expect(isTrimmedString('')).toBe(true);
    });

    it('should return false for strings with leading whitespace', () => {
      expect(isTrimmedString(' hello')).toBe(false);
      expect(isTrimmedString('  hello')).toBe(false);
      expect(isTrimmedString('\thello')).toBe(false);
      expect(isTrimmedString('\nhello')).toBe(false);
    });

    it('should return false for strings with trailing whitespace', () => {
      expect(isTrimmedString('hello ')).toBe(false);
      expect(isTrimmedString('hello  ')).toBe(false);
      expect(isTrimmedString('hello\t')).toBe(false);
      expect(isTrimmedString('hello\n')).toBe(false);
    });

    it('should return false for strings with both leading and trailing whitespace', () => {
      expect(isTrimmedString(' hello ')).toBe(false);
      expect(isTrimmedString('  hello  ')).toBe(false);
    });

    it('should return false for strings with only whitespace', () => {
      expect(isTrimmedString(' ')).toBe(false);
      expect(isTrimmedString('  ')).toBe(false);
      expect(isTrimmedString('\t')).toBe(false);
      expect(isTrimmedString('\n')).toBe(false);
    });

    it('should return false for non-string types', () => {
      expect(isTrimmedString(null)).toBe(false);
      expect(isTrimmedString(undefined)).toBe(false);
      expect(isTrimmedString(123)).toBe(false);
    });
  });

  describe('isStringWithLength', () => {
    it('should return true for strings with length within range', () => {
      expect(isStringWithLength('hello', 1, 10)).toBe(true);
      expect(isStringWithLength('hello', 5, 5)).toBe(true);
      expect(isStringWithLength('hello', 3, 10)).toBe(true);
    });

    it('should return true for strings with length >= min when max is undefined', () => {
      expect(isStringWithLength('hello', 1)).toBe(true);
      expect(isStringWithLength('hello', 5)).toBe(true);
      expect(isStringWithLength('hello', 3)).toBe(true);
    });

    it('should return false for strings shorter than min', () => {
      expect(isStringWithLength('hi', 3)).toBe(false);
      expect(isStringWithLength('hi', 3, 10)).toBe(false);
      expect(isStringWithLength('', 1)).toBe(false);
    });

    it('should return false for strings longer than max', () => {
      expect(isStringWithLength('hello world', 1, 5)).toBe(false);
      expect(isStringWithLength('hello', 1, 4)).toBe(false);
    });

    it('should return false for non-string types', () => {
      expect(isStringWithLength(null, 1, 10)).toBe(false);
      expect(isStringWithLength(undefined, 1, 10)).toBe(false);
      expect(isStringWithLength(123, 1, 10)).toBe(false);
      expect(isStringWithLength([], 1, 10)).toBe(false);
    });

    it('should handle edge cases with min and max', () => {
      expect(isStringWithLength('', 0, 0)).toBe(true);
      expect(isStringWithLength('a', 1, 1)).toBe(true);
      expect(isStringWithLength('ab', 1, 1)).toBe(false);
    });

    it('should handle very long strings', () => {
      const longString = 'a'.repeat(1000);
      expect(isStringWithLength(longString, 1, 2000)).toBe(true);
      expect(isStringWithLength(longString, 1, 500)).toBe(false);
    });
  });
});

