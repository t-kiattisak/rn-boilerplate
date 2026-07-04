export const isPromise = (value: unknown): value is Promise<unknown> => {
  return (
    value instanceof Promise ||
    (value !== null &&
      typeof value === 'object' &&
      'then' in value &&
      typeof value.then === 'function' &&
      'catch' in value &&
      typeof value.catch === 'function')
  );
};
