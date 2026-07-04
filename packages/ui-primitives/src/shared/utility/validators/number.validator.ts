export const isNumber = (value: unknown): value is number => {
  return typeof value === 'number' && !Number.isNaN(value);
};

export const isInteger = (value: unknown): boolean => {
  return Number.isInteger(value);
};

export const isFloat = (value: unknown): boolean => {
  return isNumber(value) && !isInteger(value);
};

export const isPositiveNumber = (value: unknown): boolean => {
  return isNumber(value) && value > 0;
};

export const isNegativeNumber = (value: unknown): boolean => {
  return isNumber(value) && value < 0;
};
