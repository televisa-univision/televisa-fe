import isValidFunction from '../isValidFunction';

/**
 * @test {isValidFunction}
 */
describe('helpers/common/isValidFunction test', () => {
  it('should return true when receiving a function', () => {
    expect(isValidFunction(() => {})).toBe(true);
  });

  it('should return false when not receiving a function', () => {
    expect(isValidFunction('not a function')).toBe(false);
  });

  it('should return false when receiving a null value', () => {
    expect(isValidFunction(null)).toBe(false);
  });

  it('should return false when receiving undefined', () => {
    expect(isValidFunction(undefined)).toBe(false);
  });

  it('should return false when receiving no value', () => {
    expect(isValidFunction()).toBe(false);
  });
});
