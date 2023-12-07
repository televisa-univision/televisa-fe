import isInArray from '../isInArray';

/**
 * @test {isInArray}
 */
describe('isInArray test', () => {
  it('should return true if the element is in the array', () => {
    const element = 'univision';
    const array = [element];
    expect(isInArray(array, element)).toBe(true);
  });

  it('should return true if a array element is in the array', () => {
    const element = 'univision';
    const array = [element];
    expect(isInArray(array, [element])).toBe(true);
  });

  it('should return false if the element is in the array', () => {
    const element = 'univision';
    const array = [`non-${element}`];
    expect(isInArray(array, element)).toBe(false);
  });

  it('should return false if the array is undefined', () => {
    const element = 'univision';
    const array = undefined;
    expect(isInArray(array, element)).toBe(false);
  });
});
