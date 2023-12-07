import promiseMock, { sleep } from './helpers';

jest.useFakeTimers();

describe('Jest helpers', () => {
  describe('promise mock helper', () => {
    it('Should create a new promise with a resolve value', async () => {
      const newHelper = promiseMock({ resolve: 3 });
      jest.runAllTimers();
      await expect(newHelper).resolves.toEqual(3);
    });
    it('Should create a new promise with a reject value', async () => {
      const newHelper = promiseMock({ reject: new Error(7) });
      jest.runAllTimers();
      await expect(newHelper).rejects.toEqual(new Error(7));
    });
    it('Should create a new promise with a resolve function', async () => {
      let value = 2;
      const newHelper = promiseMock({
        resolve: () => { value = 4; }
      });
      jest.runAllTimers();
      await newHelper;
      expect(value).toEqual(4);
    });
    it('Should create a new promise with a reject function', async () => {
      let value = 2;
      const newHelper = promiseMock({
        reject: () => { value = 4; }
      });
      jest.runAllTimers();
      await expect(newHelper).rejects.toEqual(new Error('error'));
      expect(value).toEqual(4);
    });
  });

  describe('sleep', () => {
    it('should resolve after given period', async () => {
      expect.assertions(1);
      const promise = sleep(1000);
      jest.runAllTimers();
      await expect(promise).resolves.toEqual(undefined);
    });
  });
});
