import shortenLargeNumber from '../shortenLargeNumber';

/** @test {Format Number} */
describe('Format Number Helpers', () => {
  it('should format a number without K', () => {
    const number = shortenLargeNumber(100);
    expect(number).toBe(100);
  });
  it('should format a number with K', () => {
    const number = shortenLargeNumber(10000);
    expect(number).toBe('10.0K');
  });
  it('should format a number with 100K', () => {
    const number = shortenLargeNumber(100000);
    expect(number).toBe('100.0K');
  });
});
