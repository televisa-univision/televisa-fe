import toRelativeUrl from '../toRelativeUrl';

/**
 * @test {toRelativeUrl}
 */
describe('toRelativeUrl test', () => {
  it('should convert absolute url to relative', () => {
    expect(toRelativeUrl('http://www.univision.com/noticias/immigracion')).toBe('/noticias/immigracion');
  });
  it('should convert absolute url to relative even is the root page', () => {
    expect(toRelativeUrl('http://www.univision.com')).toBe('/');
  });
  it('should keep relative url', () => {
    expect(toRelativeUrl('/hola-mundo')).toBe('/hola-mundo');
  });
  it('should return null when converting non existing url to relative', () => {
    expect(toRelativeUrl()).toBe(null);
  });
});
