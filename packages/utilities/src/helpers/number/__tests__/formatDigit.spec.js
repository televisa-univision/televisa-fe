import formatDigit from '../formatDigit';

describe('formatDigit helper', () => {
  it('should return a two digit number as string', () => {
    const digit = 1;
    expect(formatDigit(digit)).toBe('01');
  });

  it('should return a two digit number', () => {
    const digit = 10;
    expect(formatDigit(digit)).toBe('10');
  });

  it('should return a two digit number from string number', () => {
    const digit = '2';
    expect(formatDigit(digit)).toBe('02');
  });
});
