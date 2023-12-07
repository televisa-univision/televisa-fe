import isValidString from '../isValidString';

/**
 * @test {isValidString}
 */
describe('helpers/common/isValidString test', () => {
  it('should return true if passed value is a string', () => {
    expect(isValidString('I am a string')).toBe(true);
  });

  it('should return false if passed value is not a string', () => {
    expect(isValidString([])).toBe(false);
  });

  it('should return false if passed value is undefined', () => {
    expect(isValidString(undefined)).toBe(false);
  });

  it('should return false if passed value is null', () => {
    expect(isValidString(null)).toBe(false);
  });
});
