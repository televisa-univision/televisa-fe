import * as categories from '@univision/fe-commons/dist/constants/pageCategories';
import univisionLogo from '@univision/fe-commons/dist/assets/images/logo-univision-color.svg';
import univisionWhiteColorLogo from '@univision/fe-commons/dist/assets/images/logo-univision-white-tulip-color.svg';
import getLogos, { logos } from './logos';

jest.mock('@univision/fe-commons/dist/constants/sites', () => ({
  TELEVISA_SITES: [
    'lasestrellas',
    'canal5',
    'telehit',
    'unicable',
    'elnu9ve',
    'losbingers',
    'bandamax',
    'lcdlf',
  ],
}));

describe('getLogos', () => {
  it.each([
    ['lasestrellas', logos.lasestrellas],
    [
      'canal5',
      {
        src: '/file-mock',
        variant: 'dark',
        width: 144,
        height: 29,
      },
    ],
  ])('should return the correct logo for %s site', (site, expectedLogo) => {
    const actualLogo = getLogos({}, 'anyCategory', site);
    expect(actualLogo).toEqual(expectedLogo);
  });

  it('should return the entretenimiento logo for ENTERTAINMENT category', () => {
    const actualLogo = getLogos({}, categories.ENTERTAINMENT, 'anySite');
    expect(actualLogo).toEqual(logos.entretenimiento);
  });

  it('should return the default logo when no specific conditions are met', () => {
    const actualLogo = getLogos({}, 'anyCategory', 'anyNonTelevisaSite');
    expect(actualLogo).toEqual({ src: univisionLogo, variant: 'light', url: '/' });
  });

  it('should return the logo based on the first hierarchy item', () => {
    const pageData = { hierarchy: [{ uri: '/deportes' }] };
    const actualLogo = getLogos(pageData, 'anyCategory', 'anySite');
    expect(actualLogo).toEqual(logos.deportes);
  });

  it('should return the correct logo based on categoryRegexMap', () => {
    const actualLogo = getLogos({}, 'canal5', 'anySite');
    expect(actualLogo).toEqual(logos.canal5);
  });

  it('should return the correct logo for RADIO category', () => {
    const actualLogo = getLogos({}, categories.RADIO, 'anySite');
    expect(actualLogo).toEqual({
      ...logos.local,
      src: univisionWhiteColorLogo,
      url: undefined,
    });
  });

  it.each([
    categories.SPORTS,
    categories.SOCCER_FUTBOL,
  ])('should return the deportes logo for %s category', (category) => {
    const actualLogo = getLogos({}, category, 'anySite');
    expect(actualLogo).toEqual(logos.deportes);
  });

  it('should return the musica logo for MUSIC category', () => {
    const actualLogo = getLogos({}, categories.MUSIC, 'anySite');
    expect(actualLogo).toEqual(logos.musica);
  });

  it.each([
    categories.NEWS,
    categories.UNIVISION_NEWS,
  ])('should return the noticias logo for %s category', (category) => {
    const actualLogo = getLogos({}, category, 'anySite');
    expect(actualLogo).toEqual(logos.noticias);
  });

  it('should return the shows logo for SHOW category', () => {
    const actualLogo = getLogos({}, categories.SHOW, 'anySite');
    expect(actualLogo).toEqual(logos.shows);
  });

  it('should return the default logo when no logo matches the first hierarchy item', () => {
    const pageData = {
      hierarchy: [{ uri: '/non-existent-category' }],
    };
    const actualLogo = getLogos(pageData, 'anyCategory', 'anySite');

    expect(actualLogo).toEqual({
      src: univisionLogo,
      variant: 'light',
      url: '/',
    });
  });
});
