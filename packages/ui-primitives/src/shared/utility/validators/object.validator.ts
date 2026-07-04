export const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

export const isEmptyObject = (value: unknown): boolean =>
  isObject(value) && Object.keys(value).length === 0;
