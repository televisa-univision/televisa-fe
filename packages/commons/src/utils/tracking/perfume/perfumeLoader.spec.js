import perfumeLoader from './perfumeLoader';

describe('perfumeLoader', () => {
  it('should not load perfume if is already initialized', async (done) => {
    window.PERFUME = true;
    const expectedError = new Error('Perfume.js is already initialized!');
    try {
      await perfumeLoader();
      expect.fail();
    } catch (error) {
      expect(error).toStrictEqual(expectedError);
    }
    done();
  });

  it('should load perfume', (done) => {
    window.PERFUME = false;
    perfumeLoader()
      .then(() => {
        expect(window.PERFUME).toBe(true);
      });
    done();
  });
});
