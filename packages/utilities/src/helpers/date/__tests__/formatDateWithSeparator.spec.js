import formatDateWithSeparator from '../formatDateWithSeparator';

const date = '2020-08-06';

/** @test {formatDateWithSeparator} */
describe('formatDateWithSeparator helper', () => {
  it('should return empty if is a invalid date string', () => {
    expect(formatDateWithSeparator()).toBe('');
    expect(formatDateWithSeparator('')).toBe('');
    expect(formatDateWithSeparator('date 2019')).toBe('');
  });

  it('should return the correct formatted date', () => {
    expect(formatDateWithSeparator(date)).toBe('06/08/2020');
  });

  it('should return the correct formatted date with other separator', () => {
    expect(formatDateWithSeparator(date, '-')).toBe('06-08-2020');
  });
});
