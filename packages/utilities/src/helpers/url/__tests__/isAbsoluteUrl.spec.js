import isAbsoluteUrl from '../isAbsoluteUrl';

/**
 * @test {isAbsoluteUrl}
 */
describe('isAbsoluteUrl test', () => {
  it('should return true for relative urls', () => {
    const url = 'http://test.com/test-path/1';

    expect(isAbsoluteUrl(url)).toBe(true);
  });

  it('should return false for relative urls', () => {
    const url = '/test-path/1';

    expect(isAbsoluteUrl(url)).toBe(false);
  });
});
