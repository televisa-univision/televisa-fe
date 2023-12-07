import getFirstLetter from '../getFirstLetter';

/**
 * @test {toCamelCase}
 */
describe('getFirstLetter test', () => {
  it('should get first letter of a', () => {
    const result = getFirstLetter('string-in-camel-case');
    expect(result).toEqual('s');
  });
  it('should return empty string if we have another type of value', () => {
    const result = getFirstLetter(9);
    expect(result).toEqual('');
  });
  it('should return v string if we have a mix number with letters', () => {
    const result = getFirstLetter('1999-version');
    expect(result).toEqual('v');
  });
  it('should return empty string if we have a string number', () => {
    const result = getFirstLetter('0000');
    expect(result).toEqual('');
  });
  it('should return empty string if we have a null value', () => {
    const result = getFirstLetter(null);
    expect(result).toEqual('');
  });
});
