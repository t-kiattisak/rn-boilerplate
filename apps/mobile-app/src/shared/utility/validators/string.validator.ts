export const isString = (value: unknown): value is string =>
  typeof value === 'string';

export const isEmptyString = (value: unknown): boolean =>
  isString(value) && value.length === 0;

export const isNonEmptyString = (value: unknown): boolean =>
  isString(value) && value.length > 0;

export const isTrimmedString = (value: unknown): boolean =>
  isString(value) && value.trim().length === value.length;

export const isStringWithLength = (
  value: unknown,
  min: number,
  max?: number
): boolean => {
  if (!isString(value)) return false;
  if (max !== undefined) {
    return value.length >= min && value.length <= max;
  }
  return value.length >= min;
};
