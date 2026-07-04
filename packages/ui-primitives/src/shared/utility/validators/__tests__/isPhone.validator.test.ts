import { isPhone } from '@/shared/utility/validators/isPhone.validator';

describe('isPhone', () => {
  describe('valid phone numbers', () => {
    it('should validate 10-digit phone number starting with 0', () => {
      expect(isPhone('0812345678')).toBe(true);
      expect(isPhone('0912345678')).toBe(true);
      expect(isPhone('0612345678')).toBe(true);
    });

    it('should validate phone number with dashes', () => {
      expect(isPhone('08-1234-5678')).toBe(true);
      expect(isPhone('09-1234-5678')).toBe(true);
      expect(isPhone('06-1234-5678')).toBe(true);
    });

    it('should validate phone number with spaces', () => {
      expect(isPhone('08 1234 5678')).toBe(true);
      expect(isPhone('09 1234 5678')).toBe(true);
    });

    it('should validate phone number with mixed separators', () => {
      expect(isPhone('08-1234 5678')).toBe(true);
      expect(isPhone('09 1234-5678')).toBe(true);
    });

    it('should validate phone number with parentheses', () => {
      expect(isPhone('(08)12345678')).toBe(true);
      expect(isPhone('(09)1234-5678')).toBe(true);
    });

    it('should validate phone number as number input', () => {
      expect(isPhone('0812345678')).toBe(true);
      expect(isPhone('0912345678')).toBe(true);
      expect(isPhone('0612345678')).toBe(true);
      expect(isPhone(812345678)).toBe(false);
      expect(isPhone(912345678)).toBe(false);
    });

    it('should validate phone numbers starting with 08, 09, or 06', () => {
      expect(isPhone('0812345678')).toBe(true);
      expect(isPhone('0912345678')).toBe(true);
      expect(isPhone('0612345678')).toBe(true);
    });
  });

  describe('invalid phone numbers', () => {
    it('should reject phone numbers with wrong length (less than 10)', () => {
      expect(isPhone('081234567')).toBe(false);
      expect(isPhone('08123456')).toBe(false);
      expect(isPhone('0812345')).toBe(false);
      expect(isPhone('081234')).toBe(false);
      expect(isPhone('08123')).toBe(false);
      expect(isPhone('0812')).toBe(false);
      expect(isPhone('081')).toBe(false);
      expect(isPhone('08')).toBe(false);
      expect(isPhone('0')).toBe(false);
      expect(isPhone('')).toBe(false);
    });

    it('should reject phone numbers with wrong length (more than 10)', () => {
      expect(isPhone('08123456789')).toBe(false);
      expect(isPhone('081234567890')).toBe(false);
    });

    it('should reject phone numbers not starting with 0', () => {
      expect(isPhone('1812345678')).toBe(false);
      expect(isPhone('2812345678')).toBe(false);
      expect(isPhone('812345678')).toBe(false);
    });

    it('should reject phone numbers not starting with 08, 09, or 06', () => {
      expect(isPhone('0012345678')).toBe(false);
      expect(isPhone('0112345678')).toBe(false);
      expect(isPhone('0212345678')).toBe(false);
      expect(isPhone('0312345678')).toBe(false);
      expect(isPhone('0412345678')).toBe(false);
      expect(isPhone('0512345678')).toBe(false);
      expect(isPhone('0712345678')).toBe(false);
    });

    it('should reject empty string', () => {
      expect(isPhone('')).toBe(false);
    });

    it('should reject null and undefined', () => {
      expect(isPhone(null as any)).toBe(false);
      expect(isPhone(undefined as any)).toBe(false);
    });

    it('should reject phone numbers with only non-digit characters', () => {
      expect(isPhone('abc-def-ghi')).toBe(false);
      expect(isPhone('---')).toBe(false);
    });
  });

  describe('edge cases', () => {
    it('should handle phone number with multiple separators', () => {
      expect(isPhone('08--1234--5678')).toBe(true);
      expect(isPhone('09  1234  5678')).toBe(true);
    });

    it('should handle phone number with country code prefix', () => {
      expect(isPhone('+66812345678')).toBe(false);
      expect(isPhone('66812345678')).toBe(false);
    });

    it('should handle very large numbers', () => {
      expect(isPhone(81234567890)).toBe(false);
      expect(isPhone(9999999999)).toBe(false);
    });

    it('should handle negative numbers', () => {
      expect(isPhone(-812345678)).toBe(false);
    });

    it('should handle zero', () => {
      expect(isPhone(0)).toBe(false);
    });

    it('should handle floating point numbers', () => {
      expect(isPhone(812345678.5)).toBe(false);
    });

    it('should handle phone numbers with special characters', () => {
      expect(isPhone('08@1234#5678')).toBe(true);
      expect(isPhone('08!1234$5678')).toBe(true);
    });
  });
});

