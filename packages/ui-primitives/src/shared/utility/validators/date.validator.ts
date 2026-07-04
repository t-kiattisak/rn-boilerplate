import dayjs from 'dayjs';

export const isDate = (value: unknown): value is Date => value instanceof Date;

export const isValidDate = (value: unknown): boolean => {
  if (dayjs.isDayjs(value)) return value.isValid();
  if (isDate(value)) return dayjs(value).isValid();
  if (typeof value === 'string') return dayjs(value).isValid();
  return false;
};
