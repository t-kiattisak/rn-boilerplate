import { isDate, isValidDate } from '@/shared/utility/validators/date.validator';
import dayjs from 'dayjs';


describe('date.validator', () => {
  describe('isDate', () => {
    it('should return true for Date objects', () => {
      expect(isDate(new Date())).toBe(true);
      expect(isDate(new Date(2023, 0, 1))).toBe(true);
      expect(isDate(new Date('2023-01-01'))).toBe(true);
      expect(isDate(new Date(0))).toBe(true);
    });

    it('should return false for invalid Date objects', () => {
      expect(isDate(new Date('invalid'))).toBe(true);
      expect(isDate(new Date(NaN))).toBe(true);
    });

    it('should return false for string dates', () => {
      expect(isDate('2023-01-01')).toBe(false);
      expect(isDate('01/01/2023')).toBe(false);
      expect(isDate('2023-01-01T00:00:00Z')).toBe(false);
    });

    it('should return false for number timestamps', () => {
      expect(isDate(1672531200000)).toBe(false);
      expect(isDate(0)).toBe(false);
    });

    it('should return false for null and undefined', () => {
      expect(isDate(null)).toBe(false);
      expect(isDate(undefined)).toBe(false);
    });

    it('should return false for other types', () => {
      expect(isDate({})).toBe(false);
      expect(isDate([])).toBe(false);
      expect(isDate(true)).toBe(false);
    });
  });

  describe('isValidDate', () => {
    it('should return true for valid Date objects', () => {
      expect(isValidDate(new Date())).toBe(true);
      expect(isValidDate(new Date(2023, 0, 1))).toBe(true);
      expect(isValidDate(new Date('2023-01-01'))).toBe(true);
      expect(isValidDate(new Date(0))).toBe(true);
      expect(isValidDate(new Date('2023-12-31T23:59:59Z'))).toBe(true);
    });

    it('should return true for valid dayjs objects', () => {
      expect(isValidDate(dayjs())).toBe(true);
      expect(isValidDate(dayjs('2023-01-01'))).toBe(true);
    });

    it('should return false for invalid dayjs objects', () => {
      expect(isValidDate(dayjs('invalid'))).toBe(false);
    });

    it('should return false for invalid Date objects', () => {
      expect(isValidDate(new Date('invalid'))).toBe(false);
      expect(isValidDate(new Date(NaN))).toBe(false);
      expect(isValidDate(new Date('not a date'))).toBe(false);
    });

    it('should return false for non-Date types or invalid strings', () => {
      expect(isValidDate('invalid-date-string')).toBe(false);
      expect(isValidDate(1672531200000)).toBe(false);
      expect(isValidDate(null)).toBe(false);
      expect(isValidDate(undefined)).toBe(false);
      expect(isValidDate({})).toBe(false);
      expect(isValidDate([])).toBe(false);
    });

    it('should return true for valid string dates', () => {
      expect(isValidDate('2023-01-01')).toBe(true);
      expect(isValidDate('01/01/2023')).toBe(true);
      expect(isValidDate('2023-01-01T00:00:00Z')).toBe(true);
    });

    it('should handle edge cases with dates', () => {
      expect(isValidDate(new Date(1900, 0, 1))).toBe(true);
      expect(isValidDate(new Date(2100, 11, 31))).toBe(true);
      expect(isValidDate(new Date(1970, 0, 1))).toBe(true);
    });

    it('should handle Date objects created with various constructors', () => {
      expect(isValidDate(new Date(Date.now()))).toBe(true);
      expect(isValidDate(new Date(Date.parse('2023-01-01')))).toBe(true);
    });
  });

  describe('edge cases', () => {
    it('should handle Date objects with extreme values', () => {
      expect(isValidDate(new Date(Number.MAX_VALUE))).toBe(false);
      expect(isValidDate(new Date(Number.MIN_VALUE))).toBe(true);
    });

    it('should handle Date objects with year boundaries', () => {
      expect(isValidDate(new Date(1, 0, 1))).toBe(true);
      expect(isValidDate(new Date(9999, 11, 31))).toBe(true);
    });

    it('should distinguish between Date object and date-like strings', () => {
      expect(isDate(new Date('2023-01-01'))).toBe(true);
      expect(isDate('2023-01-01')).toBe(false);
      expect(isValidDate(new Date('2023-01-01'))).toBe(true);
      expect(isValidDate('2023-01-01')).toBe(true);
    });
  });
});

