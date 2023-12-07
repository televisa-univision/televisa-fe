import getDurationString from '../getDurationString';

/**
 * @test {getDurationString}
 */
describe('getDurationString test', () => {
  it('should return null if nothing is passed', () => {
    expect(getDurationString()).toBeNull();
  });

  it('should return a string from a number', () => {
    const duration = 300;
    const expectedResult = '5:00';

    expect(getDurationString(duration)).toEqual(expectedResult);
  });

  it('should return same string if string is passed', () => {
    const duration = '5:00';
    const expectedResult = '5:00';

    expect(getDurationString(duration)).toEqual(expectedResult);
  });

  it('should return a string from an object with `duration` prop', () => {
    const duration = 300;
    const expectedResult = '5:00';
    const params = { duration };

    expect(getDurationString(params)).toEqual(expectedResult);
  });

  it('should return a string from an object with `durationString` prop', () => {
    const durationString = '5:00';
    const expectedResult = '5:00';
    const params = { durationString };

    expect(getDurationString(params)).toEqual(expectedResult);
    expect(getDurationString({})).toBeNull();
  });

  it('should return null if not proper type', () => {
    const duration = true;
    const expectedResult = null;

    expect(getDurationString(duration)).toEqual(expectedResult);
  });
});
