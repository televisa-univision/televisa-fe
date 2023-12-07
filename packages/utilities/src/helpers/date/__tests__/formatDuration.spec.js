import formatDuration from '../formatDuration';

describe('formatDuration', () => {
  it('should return a string from a number', () => {
    const duration = 300;
    const expectedResult = '5:00';

    expect(formatDuration(duration)).toEqual(expectedResult);
  });

  it('should return the same string if a string is passed', () => {
    const duration = '5:00';
    const expectedResult = '5:00';

    expect(formatDuration(duration)).toEqual(expectedResult);
  });

  it('should return null if unsupported type is passed', () => {
    const duration = {};
    const expectedResult = null;

    expect(formatDuration(duration)).toEqual(expectedResult);
  });
});
