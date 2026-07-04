import { isBoolean } from '@/shared/utility/validators/boolean.validator';

describe('isBoolean', () => {
  it('should return true for boolean true', () => {
    expect(isBoolean(true)).toBe(true);
  });

  it('should return true for boolean false', () => {
    expect(isBoolean(false)).toBe(true);
  });

  it('should return false for truthy values', () => {
    expect(isBoolean(1)).toBe(false);
    expect(isBoolean('true')).toBe(false);
    expect(isBoolean('false')).toBe(false);
    expect(isBoolean([])).toBe(false);
    expect(isBoolean({})).toBe(false);
    expect(isBoolean('1')).toBe(false);
  });

  it('should return false for falsy values that are not boolean', () => {
    expect(isBoolean(0)).toBe(false);
    expect(isBoolean('')).toBe(false);
    expect(isBoolean(null)).toBe(false);
    expect(isBoolean(undefined)).toBe(false);
    expect(isBoolean(NaN)).toBe(false);
  });

  it('should return false for string representations of boolean', () => {
    expect(isBoolean('true')).toBe(false);
    expect(isBoolean('false')).toBe(false);
    expect(isBoolean('True')).toBe(false);
    expect(isBoolean('False')).toBe(false);
  });

  it('should return false for number representations', () => {
    expect(isBoolean(1)).toBe(false);
    expect(isBoolean(0)).toBe(false);
  });

  it('should return false for null and undefined', () => {
    expect(isBoolean(null)).toBe(false);
    expect(isBoolean(undefined)).toBe(false);
  });

  it('should return false for objects and arrays', () => {
    expect(isBoolean({})).toBe(false);
    expect(isBoolean([])).toBe(false);
    expect(isBoolean(new Boolean(true))).toBe(false); // Boolean object, not primitive
    expect(isBoolean(new Boolean(false))).toBe(false);
  });
});

