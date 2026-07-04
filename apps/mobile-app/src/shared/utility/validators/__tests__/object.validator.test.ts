import {
  isEmptyObject,
  isObject,
} from '@/shared/utility/validators/object.validator';

describe('object.validator', () => {
  describe('isObject', () => {
    it('should return true for plain objects', () => {
      expect(isObject({})).toBe(true);
      expect(isObject({ a: 1 })).toBe(true);
      expect(isObject({ a: 1, b: 2 })).toBe(true);
      expect(isObject({ nested: { a: 1 } })).toBe(true);
    });

    it('should return true for objects with various value types', () => {
      expect(isObject({ string: 'value' })).toBe(true);
      expect(isObject({ number: 123 })).toBe(true);
      expect(isObject({ boolean: true })).toBe(true);
      expect(isObject({ null: null })).toBe(true);
      expect(isObject({ undefined: undefined })).toBe(true);
      expect(isObject({ array: [] })).toBe(true);
      expect(isObject({ object: {} })).toBe(true);
    });

    it('should return false for null', () => {
      expect(isObject(null)).toBe(false);
    });

    it('should return false for arrays', () => {
      expect(isObject([])).toBe(false);
      expect(isObject([1, 2, 3])).toBe(false);
      expect(isObject(['a', 'b'])).toBe(false);
    });

    it('should return false for primitive types', () => {
      expect(isObject('string')).toBe(false);
      expect(isObject(123)).toBe(false);
      expect(isObject(true)).toBe(false);
      expect(isObject(false)).toBe(false);
      expect(isObject(undefined)).toBe(false);
    });

    it('should return true for Date objects', () => {
      expect(isObject(new Date())).toBe(true);
    });

    it('should return false for function', () => {
      expect(isObject(() => {})).toBe(false);
      expect(isObject(function () {})).toBe(false);
    });

    it('should return true for class instances', () => {
      class TestClass {
        prop = 'value';
      }
      expect(isObject(new TestClass())).toBe(true);
    });
  });

  describe('isEmptyObject', () => {
    it('should return true for empty objects', () => {
      expect(isEmptyObject({})).toBe(true);
      expect(isEmptyObject(Object.create(null))).toBe(true);
    });

    it('should return false for non-empty objects', () => {
      expect(isEmptyObject({ a: 1 })).toBe(false);
      expect(isEmptyObject({ a: 1, b: 2 })).toBe(false);
      expect(isEmptyObject({ nested: {} })).toBe(false);
    });

    it('should return false for objects with undefined values', () => {
      expect(isEmptyObject({ a: undefined })).toBe(false);
    });

    it('should return false for objects with null values', () => {
      expect(isEmptyObject({ a: null })).toBe(false);
    });

    it('should return false for non-object types', () => {
      expect(isEmptyObject(null)).toBe(false);
      expect(isEmptyObject(undefined)).toBe(false);
      expect(isEmptyObject([])).toBe(false);
      expect(isEmptyObject('')).toBe(false);
      expect(isEmptyObject(123)).toBe(false);
    });

    it('should return false for empty arrays', () => {
      expect(isEmptyObject([])).toBe(false);
    });
  });

  describe('edge cases', () => {
    it('should handle objects with symbol keys', () => {
      const sym = Symbol('test');
      const obj = { [sym]: 'value' };
      expect(isObject(obj)).toBe(true);
      expect(isEmptyObject(obj)).toBe(true);
    });

    it('should handle objects with getter/setter properties', () => {
      const obj = {
        get prop() {
          return 'value';
        },
        set prop(value: string) {
        },
      };
      expect(isObject(obj)).toBe(true);
      expect(isEmptyObject(obj)).toBe(false);
    });

    it('should handle objects created with Object.create', () => {
      const obj = Object.create({ inherited: 'prop' });
      expect(isObject(obj)).toBe(true);
      expect(isEmptyObject(obj)).toBe(true);
    });

    it('should handle objects with prototype chain', () => {
      function TestConstructor(this: any) {
        this.prop = 'value';
      }
      //@ts-ignore
      const obj = new TestConstructor();
      expect(isObject(obj)).toBe(true);
      expect(isEmptyObject(obj)).toBe(false);
    });

    it('should handle frozen and sealed objects', () => {
      const frozen = Object.freeze({ a: 1 });
      const sealed = Object.seal({ a: 1 });
      expect(isObject(frozen)).toBe(true);
      expect(isObject(sealed)).toBe(true);
      expect(isEmptyObject(frozen)).toBe(false);
      expect(isEmptyObject(sealed)).toBe(false);
    });
  });
});

