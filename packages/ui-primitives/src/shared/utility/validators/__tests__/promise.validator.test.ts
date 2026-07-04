import { isPromise } from '../promise.validator';

describe('isPromise', () => {
  describe('should return true for valid promises', () => {
    it('should return true for Promise.resolve()', () => {
      expect(isPromise(Promise.resolve())).toBe(true);
    });

    it('should return true for Promise.reject()', () => {
      const rejectedPromise = Promise.reject(new Error('test'));
      rejectedPromise.catch(() => {});
      expect(isPromise(rejectedPromise)).toBe(true);
    });

    it('should return true for new Promise()', () => {
      expect(
        isPromise(
          new Promise((resolve) => {
            resolve(1);
          })
        )
      ).toBe(true);
    });

    it('should return true for async function return value', async () => {
      const asyncFn = async () => 1;
      expect(isPromise(asyncFn())).toBe(true);
    });

    it('should return true for promise-like objects with then and catch', () => {
      const promiseLike = {
        then: () => promiseLike,
        catch: () => promiseLike,
      };
      expect(isPromise(promiseLike)).toBe(true);
    });

    it('should return true for promise with data', () => {
      expect(isPromise(Promise.resolve('data'))).toBe(true);
      expect(isPromise(Promise.resolve(123))).toBe(true);
      expect(isPromise(Promise.resolve({ a: 1 }))).toBe(true);
    });
  });

  describe('should return false for non-promises', () => {
    it('should return false for null', () => {
      expect(isPromise(null)).toBe(false);
    });

    it('should return false for undefined', () => {
      expect(isPromise(undefined)).toBe(false);
    });

    it('should return false for primitive types', () => {
      expect(isPromise('string')).toBe(false);
      expect(isPromise(123)).toBe(false);
      expect(isPromise(true)).toBe(false);
      expect(isPromise(false)).toBe(false);
      expect(isPromise(NaN)).toBe(false);
    });

    it('should return false for plain objects', () => {
      expect(isPromise({})).toBe(false);
      expect(isPromise({ a: 1 })).toBe(false);
      expect(isPromise({ then: 'not a function' })).toBe(false);
    });

    it('should return false for arrays', () => {
      expect(isPromise([])).toBe(false);
      expect(isPromise([1, 2, 3])).toBe(false);
    });

    it('should return false for functions', () => {
      expect(isPromise(() => {})).toBe(false);
      expect(isPromise(function () {})).toBe(false);
      expect(isPromise(async () => {})).toBe(false);
    });

    it('should return false for objects with only then method', () => {
      const objWithThen = {
        then: () => {},
      };
      expect(isPromise(objWithThen)).toBe(false);
    });

    it('should return false for objects with only catch method', () => {
      const objWithCatch = {
        catch: () => {},
      };
      expect(isPromise(objWithCatch)).toBe(false);
    });

    it('should return false for objects with non-function then', () => {
      const objWithNonFunctionThen = {
        then: 'not a function',
        catch: () => {},
      };
      expect(isPromise(objWithNonFunctionThen)).toBe(false);
    });

    it('should return false for objects with non-function catch', () => {
      const objWithNonFunctionCatch = {
        then: () => {},
        catch: 'not a function',
      };
      expect(isPromise(objWithNonFunctionCatch)).toBe(false);
    });
  });

  describe('edge cases', () => {
    it('should return false for Date objects', () => {
      expect(isPromise(new Date())).toBe(false);
    });

    it('should return false for RegExp objects', () => {
      expect(isPromise(/test/)).toBe(false);
    });

    it('should return false for Error objects', () => {
      expect(isPromise(new Error('test'))).toBe(false);
    });

    it('should return false for class instances', () => {
      class TestClass {
        prop = 'value';
      }
      expect(isPromise(new TestClass())).toBe(false);
    });

    it('should return false for objects with then and catch but not both as functions', () => {
      const obj = {
        then: 'string',
        catch: () => {},
      };
      expect(isPromise(obj)).toBe(false);
    });

    it('should handle promise-like objects with thenable interface', () => {
      const thenable = {
        then: (onFulfilled: unknown, onRejected: unknown) => thenable,
        catch: () => thenable,
      };
      expect(isPromise(thenable)).toBe(true);
    });
  });
});

