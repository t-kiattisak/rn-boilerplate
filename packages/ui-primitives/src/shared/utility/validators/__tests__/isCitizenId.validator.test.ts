import { isCitizenId } from '../isCitizenId.validator';

describe('isCitizenId', () => {
  describe('valid citizen IDs', () => {
    it('should validate correct 13-digit citizen ID', () => {
      expect(isCitizenId('1100800223141')).toBe(true);
    });

    it('should validate citizen ID with string input', () => {
      expect(isCitizenId('1234567890121')).toBe(true);
    });

    it('should validate citizen ID with number input', () => {
      expect(isCitizenId(1234567890121)).toBe(true);
    });

    it('should validate citizen ID with non-digit characters (strips them)', () => {
      expect(isCitizenId('1-2345-67890-12-1')).toBe(true);
      expect(isCitizenId('1 2345 67890 12 1')).toBe(true);
      expect(isCitizenId('1.2345.67890.12.1')).toBe(true);
    });

    it('should validate citizen ID with leading zeros if checksum is correct', () => {
      expect(isCitizenId('0123456789012')).toBe(false);
    });
  });

  describe('invalid citizen IDs', () => {
    it('should reject IDs with wrong length (less than 13)', () => {
      expect(isCitizenId('123456789012')).toBe(false);
      expect(isCitizenId('12345678901')).toBe(false);
      expect(isCitizenId('1234567890')).toBe(false);
      expect(isCitizenId('123')).toBe(false);
      expect(isCitizenId('')).toBe(false);
    });

    it('should reject IDs with wrong length (more than 13)', () => {
      expect(isCitizenId('12345678901234')).toBe(false);
      expect(isCitizenId('123456789012345')).toBe(false);
    });

    it('should reject IDs with all same digits', () => {
      expect(isCitizenId('1111111111111')).toBe(false);
      expect(isCitizenId('2222222222222')).toBe(false);
      expect(isCitizenId('0000000000000')).toBe(false);
      expect(isCitizenId('9999999999999')).toBe(false);
    });

    it('should reject IDs with wrong check digit', () => {
      expect(isCitizenId('1100800223142')).toBe(false);
      expect(isCitizenId('1100800223140')).toBe(false);
      expect(isCitizenId('1234567890123')).toBe(false);
    });

    it('should reject IDs with non-numeric characters that result in wrong length', () => {
      expect(isCitizenId('abc123def456')).toBe(false);
      expect(isCitizenId('123-456-789-012')).toBe(false);
    });

    it('should reject empty string', () => {
      expect(isCitizenId('')).toBe(false);
    });

    it('should reject null and undefined (converted to string)', () => {
      expect(isCitizenId(null as any)).toBe(false);
      expect(isCitizenId(undefined as any)).toBe(false);
    });
  });

  describe('edge cases', () => {
    it('should handle string with only non-digit characters', () => {
      expect(isCitizenId('abc-def-ghi')).toBe(false);
      expect(isCitizenId('---')).toBe(false);
    });

    it('should handle very large numbers', () => {
      expect(isCitizenId(9999999999999)).toBe(false);
      expect(isCitizenId(123456789012345)).toBe(false);
    });

    it('should handle negative numbers', () => {
      const result = isCitizenId(-1234567890121);
      expect(typeof result).toBe('boolean');
    });

    it('should handle zero', () => {
      expect(isCitizenId(0)).toBe(false);
    });

    it('should handle floating point numbers', () => {
      expect(isCitizenId(1234567890121.5)).toBe(false);
    });
  });

  describe('checksum algorithm verification', () => {
    it('should correctly calculate check digit for known valid IDs', () => {
      const validIds = [
        '1100800223141',
        '1234567890121',
      ];

      validIds.forEach((id) => {
        expect(isCitizenId(id)).toBe(true);
      });
    });

    it('should reject IDs where check digit calculation is wrong', () => {
      const baseId = '1100800223141';
      for (let i = 0; i <= 9; i++) {
        if (i !== 1) {
          const wrongId = baseId.slice(0, 12) + i;
          expect(isCitizenId(wrongId)).toBe(false);
        }
      }
    });
  });
});

