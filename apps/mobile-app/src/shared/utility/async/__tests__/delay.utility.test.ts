import { delay } from '@/shared/utility/async/delay.utility';

describe('delay', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('defaults to 500ms when called with no argument', async () => {
    const promise = delay();
    const onResolve = jest.fn();
    promise.then(onResolve);

    jest.advanceTimersByTime(499);
    await Promise.resolve();
    expect(onResolve).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1);
    await promise;
    expect(onResolve).toHaveBeenCalledTimes(1);
  });

  it('resolves after the given milliseconds', async () => {
    const promise = delay(500);
    const onResolve = jest.fn();
    promise.then(onResolve);

    expect(onResolve).not.toHaveBeenCalled();

    jest.advanceTimersByTime(500);
    await promise;

    expect(onResolve).toHaveBeenCalledTimes(1);
  });

  it('resolves immediately when ms is 0', async () => {
    const promise = delay(0);
    jest.advanceTimersByTime(0);
    await expect(promise).resolves.toBeUndefined();
  });
});
