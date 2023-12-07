import getVerticalTheme, { themes } from '.';

describe('get vertical theme', () => {
  it('should handle an absolute url', () => {
    expect(getVerticalTheme('https://univision.com/noticias/test-article')).toEqual(themes.noticias);
  });

  it('should handle a relative url', () => {
    expect(getVerticalTheme('/noticias/test-article')).toEqual(themes.noticias);
  });

  it('should handle a vertical', () => {
    expect(getVerticalTheme('Local')).toEqual(themes.local);
  });

  it('should handle null argument', () => {
    expect(getVerticalTheme(null)).toEqual(themes.global);
  });

  it('should handle no match url', () => {
    expect(getVerticalTheme('invalid')).toEqual(themes.global);
  });

  it('should use deportes theme if tudn site', () => {
    expect(getVerticalTheme('https://www.tudn.com')).toEqual(themes.deportes);
  });
});
