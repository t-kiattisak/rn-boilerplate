export const delay = (ms: number = 500): Promise<void> =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));
