import toKebabCase from '../toKebabCase';

/**
 * @test {toKebabCase}
 */
describe('toKebabCase test', () => {
  it('should return the correct string', () => {
    const string = 'Géminis: 21 de mayo - 20 de junio';
    const expected = 'geminis-21-de-mayo-20-de-junio';
    const text = toKebabCase(string);

    expect(text).toEqual(expected);
  });

  it('should return null if text is not a string', () => {
    const string = ['bar'];
    const text = toKebabCase(string);

    expect(text).toEqual('');
  });

  it('should return same string if user agent does not support normilize', () => {
    jest.spyOn(String.prototype, 'normalize').mockReturnValueOnce(null);
    const string = 'Géminis: 21 de mayo - 20 de junio';
    expect(toKebabCase(string)).toEqual(string);
  });
});
