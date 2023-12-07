import isValidValue from '../isValidValue';

/**
 * @test {isValidValue}
 */
describe('helpers/common/isValidValue test', () => {
  it('should return false if the given value is undefined', () => {
    expect(isValidValue()).toBe(false);
  });

  it('should return false if the given value is null', () => {
    expect(isValidValue(null)).toBe(false);
  });

  it('should return false if the given value is an empty string', () => {
    expect(isValidValue('')).toBe(false);
  });

  it('should return false if the given value is NaN', () => {
    expect(isValidValue(Number.parseInt('invalid', 10))).toBe(false);
  });

  it('should return true if the given value is a string', () => {
    expect(isValidValue('test')).toBe(true);
  });

  it('should return true if the given value is a boolean of true', () => {
    expect(isValidValue(true)).toBe(true);
  });

  it('should return true if the given value is a boolean of false', () => {
    expect(isValidValue(false)).toBe(true);
  });

  it('should return true if the given value is 0', () => {
    expect(isValidValue(0)).toBe(true);
  });
});
