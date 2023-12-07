import isValidArray from '../isValidArray';

/**
 * @test {isValidArray}
 */
describe('helpers/common/isValidArray test', () => {
  it('should be true if array and not empty', () => {
    expect(isValidArray(['a', 'b'])).toBe(true);
  });

  it('should be false is argument is not array', () => {
    expect(isValidArray('')).toBe(false);
  });

  it('should be false is empty array', () => {
    expect(isValidArray([])).toBe(false);
  });
});
