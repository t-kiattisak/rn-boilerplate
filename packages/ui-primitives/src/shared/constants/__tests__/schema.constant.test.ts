import {
  booleanChoiceConstant,
  booleanChoiceOptions,
  booleanChoiceSchema,
  optionSchema,
  optionsSchema,
  phoneCountrySchema,
} from '../schema.constant';

describe('schema.constant', () => {
  describe('booleanChoiceConstant', () => {
    it('defines yes/no values', () => {
      expect(booleanChoiceConstant).toEqual({ No: 'No', Yes: 'Yes' });
    });
  });

  describe('booleanChoiceSchema', () => {
    it('accepts yes/no values', () => {
      expect(booleanChoiceSchema.parse('Yes')).toBe('Yes');
      expect(booleanChoiceSchema.parse('No')).toBe('No');
    });

    it('rejects invalid values', () => {
      expect(() => booleanChoiceSchema.parse('Maybe')).toThrow();
    });
  });

  describe('booleanChoiceOptions', () => {
    it('maps yes/no constants to option shape', () => {
      expect(optionsSchema.parse(booleanChoiceOptions)).toEqual(
        booleanChoiceOptions
      );
    });
  });

  describe('optionSchema', () => {
    it('accepts label/value pairs', () => {
      expect(
        optionSchema.parse({ label: 'Option A', value: 'a' })
      ).toEqual({
        label: 'Option A',
        value: 'a',
      });
    });

    it('rejects invalid option shapes', () => {
      expect(() => optionSchema.parse({ label: 'Only label' })).toThrow();
      expect(() => optionSchema.parse({ value: 'only-value' })).toThrow();
    });
  });

  describe('optionsSchema', () => {
    it('accepts arrays of options', () => {
      const options = [{ label: 'A', value: 'a' }];
      expect(optionsSchema.parse(options)).toEqual(options);
    });
  });

  describe('phoneCountrySchema', () => {
    it('accepts country objects', () => {
      const country = {
        code: 'TH',
        dialCode: '+66',
        emoji: '🇹🇭',
        flag: '🇹🇭',
        name: 'Thailand',
      };
      expect(phoneCountrySchema.parse(country)).toEqual(country);
    });
  });
});
