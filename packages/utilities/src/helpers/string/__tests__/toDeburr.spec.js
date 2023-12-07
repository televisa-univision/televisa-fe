import toDeburr from '../toDeburr';

/**
 * @test {toDeburr}
 */
describe('toDeburr test', () => {
  it('should return an empty string if param is not a string', () => {
    expect(toDeburr(null)).toBe('');
  });

  it('should return a sanitized string without any accents or diacritics [1]', () => {
    expect(toDeburr('crème brulée')).toBe('creme brulee');
  });

  it('should return a sanitized string without any accents or diacritics [2]', () => {
    expect(toDeburr('América Latina - Bogotá')).toBe('America Latina - Bogota');
  });

  it('should return a sanitized string without any accents or diacritics [3]', () => {
    expect(toDeburr('ąśćńżółźćę')).toBe('ascnzołzce');
  });

  it('should return an empty string if param is not a string', () => {
    expect(toDeburr(null, { lowercase: true })).toBe('');
  });

  it('should return a sanitized event action label', () => {
    expect(toDeburr('América Latina - Bogotá', { lowercase: true })).toBe('america latina - bogota');
  });

  it('should return same string if user agent does not support normilize', () => {
    jest.spyOn(String.prototype, 'normalize').mockReturnValueOnce(null);
    const string = 'América Latina - Bogotá';
    expect(toDeburr(string, { lowercase: true })).toBe(string.toLowerCase());
  });
});
