import toAbsoluteUrl from '../toAbsoluteUrl';

/**
 * @test {toAbsoluteUrl}
 */
describe('toAbsoluteUrl test', () => {
  it('should return null when converting non existing url to absolute', () => {
    expect(toAbsoluteUrl()).toBeNull();
  });

  it('should return null when converting null url to absolute', () => {
    expect(toAbsoluteUrl(null)).toBeNull();
  });

  it('should convert a relative url to an absolute one', () => {
    const uri = '/noticias/inmigracion/nuevas-reglas-de-inmigracion';
    const domain = 'https://www.univision.com';
    const absoluteUrl = 'https://www.univision.com/noticias/inmigracion/nuevas-reglas-de-inmigracion';

    expect(toAbsoluteUrl(uri, domain)).toBe(absoluteUrl);
  });

  it('should keep a the url is already is an absolute one', () => {
    const uri = 'https://www.univision.com/noticias/inmigracion/nuevas-reglas-de-inmigracion';
    const domain = 'https://www.univision.com';
    const absoluteUrl = 'https://www.univision.com/noticias/inmigracion/nuevas-reglas-de-inmigracion';

    expect(toAbsoluteUrl(uri, domain)).toBe(absoluteUrl);
  });

  it('should not change a url if its already an absolute one', () => {
    const domain = 'https://www.univision.com';
    const absoluteUrl = 'https://www.univision.com/noticias/inmigracion/nuevas-reglas-de-inmigracion';

    expect(toAbsoluteUrl(absoluteUrl, domain)).toBe(absoluteUrl);
  });

  it('should append a forward slash (/) if uri doesnt start with one', () => {
    const uri = 'noticias/inmigracion/nuevas-reglas-de-inmigracion';
    const domain = 'https://www.univision.com';
    const absoluteUrl = 'https://www.univision.com/noticias/inmigracion/nuevas-reglas-de-inmigracion';

    expect(toAbsoluteUrl(uri, domain)).toBe(absoluteUrl);
  });

  it('should root absolute URL if uri is root (/)', () => {
    const uri = '/';
    const domain = 'https://www.univision.com';
    const absoluteUrl = 'https://www.univision.com';

    expect(toAbsoluteUrl(uri, domain)).toBe(absoluteUrl);
  });

  it('should same uri URL if is root (/) and domain is empty', () => {
    const uri = '/';
    const domain = '';
    const absoluteUrl = '/';

    expect(toAbsoluteUrl(uri, domain)).toBe(absoluteUrl);
  });

  it('should return uri if domain is not defined or non-string', () => {
    const uri = 'noticias/inmigracion/nuevas-reglas-de-inmigracion';

    expect(toAbsoluteUrl(uri, null)).toBe(uri);
    expect(toAbsoluteUrl(uri, {})).toBe(uri);
  });

  it('should return null if trying to operate on non string params', () => {
    expect(toAbsoluteUrl({}, {})).toBeNull();
  });

  it('should remove trailing slash from domain', () => {
    const uri = '/test/';
    const domain = 'https://test.com/';
    const result = 'https://test.com/test/';

    expect(toAbsoluteUrl(uri, domain)).toBe(result);
  });
});
