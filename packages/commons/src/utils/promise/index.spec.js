import promiseMock from '../jest/helpers';
import { timeoutPromise, resolveOrRejectAll, makeCancelablePromise } from './index';

jest.useFakeTimers();

describe('timeout promise', () => {
  it('Should timeout', (done) => {
    let value = 1;

    const longPromise = promiseMock({
      resolve: () => {
        value = 4;
      },
      delay: 5000
    });

    const pendingPromise = timeoutPromise(longPromise, 1000)
      .then(() => {
        done.fail(new Error('Timeout did not happen'));
      })
      .catch(() => {
        expect(value).toEqual(1);
        done();
      });

    jest.runTimersToTime(1000);
    return pendingPromise;
  });
});

describe('resolve or reject all', () => {
  it('should wait for all promises', (done) => {
    const promise1 = promiseMock({ resolve: 1 });
    const promise2 = promiseMock({ resolve: 2 });
    const promise3 = promiseMock({ reject: new Error(3) });

    const pendingPromise = resolveOrRejectAll([promise1, promise2, promise3]).then((result) => {
      const expectedResult = [1, 2, undefined];
      expectedResult.errors = [undefined, undefined, new Error(3)];
      expect(result).toEqual(expectedResult);
      expect(result.errors).toEqual(expectedResult.errors);
      done();
    });

    jest.runAllTimers();
    return pendingPromise;
  });
});

describe('cancel a promise', () => {
  it('should cancel the promise when cancel is called', (done) => {
    const handler = jest.fn();
    const myPromise = makeCancelablePromise(promiseMock({
      resolve: jest.fn()
    }));
    myPromise.then(handler);
    myPromise.cancel();

    const pendingPromise = promiseMock({
      resolve: jest.fn(),
      delay: 100
    }).then(() => {
      expect(handler).not.toHaveBeenCalled();
      done();
    });
    jest.runAllTimers();

    return pendingPromise;
  });
  it('should return the resolve value', async () => {
    const myPromise = makeCancelablePromise(promiseMock({
      resolve: 'foo'
    }));

    jest.runAllTimers();
    await myPromise.then(val => expect(val).toEqual('foo'));
  });
  it('should return the reject value', async () => {
    const myPromise = makeCancelablePromise(promiseMock({
      reject: new Error('there was an error')
    }));

    jest.runAllTimers();
    await myPromise.catch((error) => {
      expect(error).toEqual(new Error('there was an error'));
    });
  });
});
