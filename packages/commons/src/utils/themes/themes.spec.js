import features from '../../config/features';
import themeData from './themes.json';
import getThemeFromURL, { getThemeURL, getTudnTheme } from './themes';

features.deportes.isTudn = jest.fn(() => false);

describe('Themes util tests', () => {
  it('should return the default theme if the url is invalid or null', () => {
    let theme = getThemeFromURL(null);
    expect(theme.primary).toEqual(themeData.themes.darkGrey.primary);
    theme = getThemeFromURL('/doesnt-exist/station');
    expect(theme.primary).toEqual(themeData.themes.darkGrey.primary);
    theme = getThemeFromURL('test.com');
    expect(theme.primary).toEqual(themeData.themes.darkGrey.primary);
  });

  it('should return a theme for a given url', () => {
    const theme = getThemeFromURL('/los-angeles/klve');
    expect(theme.primary).toEqual(themeData.themes.sapphire.primary);
  });

  it('should return a correct theme for sports url', () => {
    features.deportes.isTudn.mockReturnValueOnce(true);
    let theme = getThemeFromURL('/deportes');
    expect(theme.primary).toEqual(themeData.themes.tudn.primary);
    expect(theme.secondary).toEqual(themeData.themes.tudn.secondary);
    features.deportes.isTudn.mockReturnValueOnce(true);
    theme = getThemeFromURL('https://tudn.com/futbol/liga-mx');
    expect(theme.primary).toEqual(themeData.themes.tudn.primary);
    expect(theme.secondary).toEqual(themeData.themes.tudn.secondary);
    theme = getThemeFromURL('/deportes');
    expect(theme.primary).toEqual(themeData.themes.sports.primary);
    expect(theme.secondary).toEqual(themeData.themes.sports.secondary);
    theme = getThemeFromURL('/deportes/futbol/liga-mx');
    expect(theme.primary).toEqual(themeData.themes.sports.primary);
    expect(theme.secondary).toEqual(themeData.themes.sports.secondary);
  });

  it('should return a correct theme for getTudnTheme', () => {
    features.deportes.isTudn.mockReturnValueOnce(true);
    let theme = getTudnTheme();
    expect(theme.primary).toEqual(themeData.themes.tudn.primary);
    expect(theme.secondary).toEqual(themeData.themes.tudn.secondary);
    theme = getTudnTheme();
    expect(theme.primary).toEqual(themeData.themes.sports.primary);
    expect(theme.secondary).toEqual(themeData.themes.sports.secondary);
  });

  it('should return a correct theme for getTudnTheme with a legacy theme as argument', () => {
    features.deportes.isTudn.mockReturnValueOnce(true);
    let theme = getTudnTheme('white');
    expect(theme.primary).toEqual(themeData.themes.tudn.primary);
    expect(theme.secondary).toEqual(themeData.themes.tudn.secondary);
    theme = getTudnTheme('white');
    expect(theme.primary).toEqual(themeData.themes.white.primary);
    expect(theme.secondary).toEqual(themeData.themes.white.secondary);
  });

  it('should return a correct theme for LIGHT MODE url', () => {
    const theme = getThemeFromURL('/noticias');
    expect(theme.variant).toEqual(themeData.urls['noticias/*'].variant);
    expect(theme.theme).toEqual(themeData.urls['noticias/*'].theme);
    expect(theme.primary).toEqual(themeData.themes[theme.theme].primary);
    expect(theme.secondary).toEqual(themeData.themes[theme.theme].secondary);
  });

  it('should return a correct theme for url with CUSTOM VARIANTS', () => {
    const theme = getThemeFromURL('/local/san-francisco-kdtv', 'horizontalSlideshow');
    expect(theme.variant).toEqual(themeData.urls['local/san-francisco-kdtv'].variants.horizontalSlideshow);
    expect(theme.theme).toEqual(themeData.urls['local/san-francisco-kdtv'].theme);
    expect(theme.primary).toEqual(themeData.themes[theme.theme].primary);
    expect(theme.secondary).toEqual(themeData.themes[theme.theme].secondary);
  });

  it('should use the correct url key for longer urls', () => {
    const theme = getThemeFromURL('/los-angeles/klve/entretenimiento');
    expect(theme.primary).toEqual(themeData.themes.sapphire.primary);
  });
  it('should use the correct url key for longer absolute urls', () => {
    const theme = getThemeFromURL('http://www.univision.com/los-angeles/klve/entretenimiento');
    expect(theme.primary).toEqual(themeData.themes.sapphire.primary);
  });
});

describe('getThemeURL()', () => {
  it('should return null if passed url not valid type `string`', () => {
    const themeUrl = getThemeURL({});
    expect(themeUrl).toBeNull();
  });

  it('should return a proper theme url for a given url with relative URL', () => {
    const themeUrl = getThemeURL('/san-francisco/wltv');
    const expectedResult = {
      pathFragments: [
        'san-francisco',
        'wltv',
      ],
      themeDomain: '',
      themeUrl: 'san-francisco/wltv',
    };
    expect(themeUrl).toEqual(expectedResult);
  });

  it('should return a proper theme url for a given url with Univision domain', () => {
    const themeUrl = getThemeURL('https://univision.com/san-francisco/wltv');
    const expectedResult = {
      pathFragments: [
        'san-francisco',
        'wltv',
      ],
      themeDomain: 'univision.com',
      themeUrl: 'san-francisco/wltv',
    };
    expect(themeUrl).toEqual(expectedResult);
  });

  it('should return a proper theme url for a given url with TUDN domain', () => {
    const themeUrl = getThemeURL('https://uat.tudn.com/futbol');
    const expectedResult = {
      pathFragments: [
        'futbol',
      ],
      themeDomain: 'tudn.com',
      themeUrl: 'futbol',
    };
    expect(themeUrl).toEqual(expectedResult);
  });
});
