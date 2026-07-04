/**
 * Validates a Thai phone number
 * @param phone - The phone number to validate (can be string or number)
 * @returns boolean - True if the phone number is valid
 *
 * @example
 * isPhone('0812345678') // true
 * isPhone('08-1234-5678') // true
 * isPhone('08123456789') // false
 */
export const isPhone = (phone: string | number): boolean => {
  const phoneStr = String(phone).replaceAll(/\D/g, '');

  if (phoneStr.length !== 10) {
    return false;
  }

  if (!/^0[689]\d{8}$/.test(phoneStr)) {
    return false;
  }

  return true;
};
