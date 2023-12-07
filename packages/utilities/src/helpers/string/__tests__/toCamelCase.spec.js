import toCamelCase from '../toCamelCase';

/**
 * @test {toCamelCase}
 */
describe('toCamelCase test', () => {
  it('should convert a string in camelCase', () => {
    const result = toCamelCase('string-in-camel-case');
    expect(result).toEqual('stringInCamelCase');
  });

  it('should convert a string with special characters in camelCase', () => {
    const result = toCamelCase('@string-in@camel-case');
    expect(result).toEqual('stringInCamelCase');
  });

  it('should convert a string in StartCase to camelCase', () => {
    const result = toCamelCase('StartCase');
    expect(result).toEqual('startCase');
  });

  it('should convert a string in Uppercase to camelCase', () => {
    const result = toCamelCase('MEXICAN PRIMERA (CLAUSURA)');
    expect(result).toEqual('mexicanPrimeraClausura');
  });

  it('should return empty if not have valid characters', () => {
    const result = toCamelCase('?|$');
    expect(result).toEqual('');
  });

  it('should return same value if is a non-string', () => {
    const result = toCamelCase(10);
    expect(result).toEqual(10);
  });

  it('should return empty if is null', () => {
    const result = toCamelCase();
    expect(result).toEqual('');
  });
});
