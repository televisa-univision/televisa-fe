import isValidNumber from '../isValidNumber';

/**
 * @test {isValidNumber}
 */
describe('helpers/common/isValidNumber test', () => {
  it('should return truthy when number is valid', () => {
    expect(isValidNumber('0')).toBe(true);
    expect(isValidNumber(100)).toBe(true);
  });

  it('should be falsy when number is null', () => {
    expect(isValidNumber(null)).toBe(false);
  });

  it('should be falsy when number is undefined', () => {
    expect(isValidNumber(undefined)).toBe(false);
  });

  it('should be truthy when number is negative', () => {
    expect(isValidNumber(-10)).toBe(true);
    expect(isValidNumber('-10')).toBe(true);
  });

  it('should be truthy for client', () => {
    delete Number.isFinite;
    expect(isValidNumber('123')).toBe(true);
  });
});
