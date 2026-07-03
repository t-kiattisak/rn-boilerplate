import { regexConstant } from '@/shared/constants/regex.constant';

describe('regexConstant', () => {
  describe('phoneNumber', () => {
    it('matches numeric phone strings', () => {
      expect(regexConstant.phoneNumber.test('0812345678')).toBe(true);
      expect(regexConstant.phoneNumber.test('1234567890')).toBe(true);
    });

    it('rejects non-numeric phone strings', () => {
      expect(regexConstant.phoneNumber.test('0812-345-678')).toBe(false);
      expect(regexConstant.phoneNumber.test('abc')).toBe(false);
      expect(regexConstant.phoneNumber.test('')).toBe(false);
    });
  });

  describe('phoneNumberClean', () => {
    it('removes non-digit characters', () => {
      expect('081-234-5678'.replace(regexConstant.phoneNumberClean, '')).toBe(
        '0812345678'
      );
      expect('(66) 81 234 5678'.replace(regexConstant.phoneNumberClean, '')).toBe(
        '66812345678'
      );
    });
  });
});
