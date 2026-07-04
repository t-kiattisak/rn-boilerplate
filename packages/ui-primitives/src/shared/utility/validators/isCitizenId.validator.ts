/**
 * Validates a Thai Citizen ID number
 * @param id - The ID number to validate (can be string or number)
 * @returns boolean - True if the ID is valid
 *
 * @example
 * isCitizenId('1234567890121') // true
 * isCitizenId('12345') // false
 */
export const isCitizenId = (id: string | number): boolean => {
  const idStr = String(id).replaceAll(/\D/g, '');

  if (idStr.length !== 13) {
    return false;
  }

  if (/^(\d)\1+$/.test(idStr)) {
    return false;
  }

  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += Number.parseInt(idStr.charAt(i)) * (13 - i);
  }

  const checkDigit = (11 - (sum % 11)) % 10;
  return checkDigit === Number.parseInt(idStr.charAt(12));
};
