import { isValidElement, ReactElement } from 'react';

export const isSafeElement = (value: unknown): value is ReactElement =>
  isValidElement(value);
