import {
  isFloat,
  isInteger,
  isNegativeNumber,
  isNumber,
  isPositiveNumber,
} from '@/shared/utility/validators/number.validator';

describe('number.validator', () => {
  describe('isNumber', () => {
    it('should return true for valid numbers', () => {
      expect(isNumber(0)).toBe(true);
      expect(isNumber(1)).toBe(true);
      expect(isNumber(-1)).toBe(true);
      expect(isNumber(123.456)).toBe(true);
      expect(isNumber(-123.456)).toBe(true);
      expect(isNumber(Number.MAX_VALUE)).toBe(true);
      expect(isNumber(Number.MIN_VALUE)).toBe(true);
    });

    it('should return false for NaN', () => {
      expect(isNumber(NaN)).toBe(false);
    });

    it('should return false for non-number types', () => {
      expect(isNumber('123')).toBe(false);
      expect(isNumber('abc')).toBe(false);
      expect(isNumber(true)).toBe(false);
      expect(isNumber(false)).toBe(false);
      expect(isNumber(null)).toBe(false);
      expect(isNumber(undefined)).toBe(false);
      expect(isNumber([])).toBe(false);
      expect(isNumber({})).toBe(false);
    });
  });

  describe('isInteger', () => {
    it('should return true for integers', () => {
      expect(isInteger(0)).toBe(true);
      expect(isInteger(1)).toBe(true);
      expect(isInteger(-1)).toBe(true);
      expect(isInteger(100)).toBe(true);
      expect(isInteger(-100)).toBe(true);
      expect(isInteger(Number.MAX_SAFE_INTEGER)).toBe(true);
      expect(isInteger(Number.MIN_SAFE_INTEGER)).toBe(true);
    });

    it('should return false for floats', () => {
      expect(isInteger(1.5)).toBe(false);
      expect(isInteger(-1.5)).toBe(false);
      expect(isInteger(0.1)).toBe(false);
      expect(isInteger(0.9)).toBe(false);
    });

    it('should return false for non-number types', () => {
      expect(isInteger('123')).toBe(false);
      expect(isInteger('1.5')).toBe(false);
      expect(isInteger(NaN)).toBe(false);
      expect(isInteger(Infinity)).toBe(false);
      expect(isInteger(null)).toBe(false);
      expect(isInteger(undefined)).toBe(false);
    });
  });

  describe('isFloat', () => {
    it('should return true for floating point numbers', () => {
      expect(isFloat(1.5)).toBe(true);
      expect(isFloat(-1.5)).toBe(true);
      expect(isFloat(0.1)).toBe(true);
      expect(isFloat(0.9)).toBe(true);
      expect(isFloat(123.456)).toBe(true);
      expect(isFloat(-123.456)).toBe(true);
    });

    it('should return false for integers', () => {
      expect(isFloat(0)).toBe(false);
      expect(isFloat(1)).toBe(false);
      expect(isFloat(-1)).toBe(false);
      expect(isFloat(100)).toBe(false);
    });

    it('should return false for NaN', () => {
      expect(isFloat(NaN)).toBe(false);
    });

    it('should return false for non-number types', () => {
      expect(isFloat('1.5')).toBe(false);
      expect(isFloat('123')).toBe(false);
      expect(isFloat(null)).toBe(false);
      expect(isFloat(undefined)).toBe(false);
    });
  });

  describe('isPositiveNumber', () => {
    it('should return true for positive numbers', () => {
      expect(isPositiveNumber(1)).toBe(true);
      expect(isPositiveNumber(0.1)).toBe(true);
      expect(isPositiveNumber(100)).toBe(true);
      expect(isPositiveNumber(123.456)).toBe(true);
    });

    it('should return false for zero', () => {
      expect(isPositiveNumber(0)).toBe(false);
    });

    it('should return false for negative numbers', () => {
      expect(isPositiveNumber(-1)).toBe(false);
      expect(isPositiveNumber(-0.1)).toBe(false);
      expect(isPositiveNumber(-100)).toBe(false);
    });

    it('should return false for NaN', () => {
      expect(isPositiveNumber(NaN)).toBe(false);
    });

    it('should return false for non-number types', () => {
      expect(isPositiveNumber('1')).toBe(false);
      expect(isPositiveNumber(null)).toBe(false);
      expect(isPositiveNumber(undefined)).toBe(false);
    });
  });

  describe('isNegativeNumber', () => {
    it('should return true for negative numbers', () => {
      expect(isNegativeNumber(-1)).toBe(true);
      expect(isNegativeNumber(-0.1)).toBe(true);
      expect(isNegativeNumber(-100)).toBe(true);
      expect(isNegativeNumber(-123.456)).toBe(true);
    });

    it('should return false for zero', () => {
      expect(isNegativeNumber(0)).toBe(false);
    });

    it('should return false for positive numbers', () => {
      expect(isNegativeNumber(1)).toBe(false);
      expect(isNegativeNumber(0.1)).toBe(false);
      expect(isNegativeNumber(100)).toBe(false);
    });

    it('should return false for NaN', () => {
      expect(isNegativeNumber(NaN)).toBe(false);
    });

    it('should return false for non-number types', () => {
      expect(isNegativeNumber('-1')).toBe(false);
      expect(isNegativeNumber(null)).toBe(false);
      expect(isNegativeNumber(undefined)).toBe(false);
    });
  });

  describe('edge cases', () => {
    it('should handle Infinity', () => {
      expect(isNumber(Infinity)).toBe(true);
      expect(isNumber(-Infinity)).toBe(true);
      expect(isInteger(Infinity)).toBe(false);
      expect(isFloat(Infinity)).toBe(true);
      expect(isPositiveNumber(Infinity)).toBe(true);
      expect(isNegativeNumber(-Infinity)).toBe(true);
    });

    it('should handle Number.MAX_VALUE and Number.MIN_VALUE', () => {
      expect(isNumber(Number.MAX_VALUE)).toBe(true);
      expect(isNumber(Number.MIN_VALUE)).toBe(true);
      expect(isPositiveNumber(Number.MAX_VALUE)).toBe(true);
      expect(isPositiveNumber(Number.MIN_VALUE)).toBe(true);
    });

    it('should handle Number.MAX_SAFE_INTEGER and Number.MIN_SAFE_INTEGER', () => {
      expect(isInteger(Number.MAX_SAFE_INTEGER)).toBe(true);
      expect(isInteger(Number.MIN_SAFE_INTEGER)).toBe(true);
      expect(isFloat(Number.MAX_SAFE_INTEGER)).toBe(false);
      expect(isFloat(Number.MIN_SAFE_INTEGER)).toBe(false);
    });
  });
});
