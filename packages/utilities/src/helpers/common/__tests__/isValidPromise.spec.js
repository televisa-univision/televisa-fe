import isValidPromise from '../isValidPromise';

/**
 * @test {isValidPromise}
 */
describe('helpers/common/isValidPromise test', () => {
  it('should return false by default', () => {
    expect(isValidPromise()).toBe(false);
  });

  it('should return true when an actual Promise is provided', () => {
    const data = new Promise(resolve => resolve(null));
    expect(isValidPromise(data)).toBe(true);
  });

  it('should return false when something else is provided', () => {
    expect(isValidPromise(true)).toBe(false);
    expect(isValidPromise({})).toBe(false);
    expect(isValidPromise('promise')).toBe(false);
  });
});
