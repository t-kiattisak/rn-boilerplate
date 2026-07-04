export const isArray = <T = unknown>(value: unknown): value is T[] => {
  return Array.isArray(value);
};

export const isEmptyArray = (value: unknown): boolean =>
  isArray(value) && value.length === 0;

export const isNonEmptyArray = (value: unknown): boolean =>
  isArray(value) && value.length > 0;
