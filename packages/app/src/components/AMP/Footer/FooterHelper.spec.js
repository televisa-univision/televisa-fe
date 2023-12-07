import {
  getLogoLink,
  getSocialLinks,
  getLogoHref,
} from './FooterHelpers';

jest.mock('@univision/fe-commons/dist/assets/images/logo-univision-white.svg', () => 'univision-logo');
jest.mock('@univision/fe-commons/dist/constants/televisaSitesData', () => (Object.freeze({
  lasestrellas: 'lasestrellas-logo',
})));

describe('FooterHelpers', () => {
  let config;

  beforeEach(() => {
    config = {
      isTudn: false,
      isTelevisaSite: false,
      siteName: 'univision',
      theme: {
        variant: 'dark',
      },
    };
  });

  afterEach(() => {
    config.isTudn = false;
    config.isTelevisaSite = false;
    config.siteName = 'univision';
    config.theme.variant = 'dark';
  });

  it('should return tudn logo', () => {
    const linkhref = getLogoLink(
      config.isTudn,
      config.isTelevisaSite,
      config.siteName,
      config.theme,
    );
    expect(linkhref).toEqual('univision-logo');
  });

  it('should return lasestrellas logo', () => {
    config.isTelevisaSite = true;
    config.siteName = 'lasestrellas';
    const linkhref = getLogoLink(
      config.isTudn,
      config.isTelevisaSite,
      config.siteName,
      config.theme,
    );
    expect(linkhref).toEqual('https://st1.uvnimg.com/e4/9a/5179580043c2b3fe6183579b7b01/televisa-horizontal-color.svg');
  });

  it('should return univision default logo when no televisa site are configured', () => {
    config.isTelevisaSite = true;
    const linkhref = getLogoLink(
      config.isTudn,
      config.isTelevisaSite,
      config.siteName,
      config.theme,
    );
    expect(linkhref).toEqual('https://st1.uvnimg.com/e4/9a/5179580043c2b3fe6183579b7b01/televisa-horizontal-color.svg');
  });

  it('should return tudn logo', () => {
    config.isTudn = true;
    const linkhref = getLogoLink(
      config.isTudn,
      config.isTelevisaSite,
      config.siteName,
      config.theme,
    );
    expect(linkhref).toEqual('univision-logo');
  });

  it('should return default logo', () => {
    config.theme.variant = 'light';
    const linkhref = getLogoLink(
      config.isTudn,
      config.isTelevisaSite,
      config.siteName,
      config.theme,
    );
    expect(linkhref).toEqual('univision-logo');
  });

  it('should return tudn social links', () => {
    config.isTudn = true;
    const socialLinks = getSocialLinks(config.isTudn, config.isTelevisaSite);
    expect(socialLinks).toEqual({
      facebook: 'https://www.facebook.com/tudnusa',
      twitter: 'https://twitter.com/TUDNUSA',
      instagram: 'https://www.instagram.com/tudnusa',
    });
  });

  it('should return isTelevisaSite social links', () => {
    config.isTelevisaSite = true;
    const socialLinks = getSocialLinks(config.isTudn, config.isTelevisaSite);
    expect(socialLinks).toEqual({
      facebook: 'https://www.facebook.com/televisacorporativo/',
      twitter: 'https://twitter.com/Televisa',
      instagram: 'https://www.instagram.com/televisa/?hl=es',
    });
  });

  it('should return default social links', () => {
    const socialLinks = getSocialLinks(config.isTudn, config.isTelevisaSite);
    expect(socialLinks).toEqual({
      facebook: 'https://www.facebook.com/univision',
      twitter: 'https://www.facebook.com/univision',
      instagram: 'https://www.instagram.com/univision',
    });
  });

  it('should return tudn logo href', () => {
    config.isTudn = true;
    const logoHref = getLogoHref(config.isTudn, config.isTelevisaSite, config.siteName);
    expect(logoHref).toEqual('https://www.tudn.com');
  });

  it('should return isTelevisaSite logo href', () => {
    config.isTelevisaSite = true;
    config.siteName = 'lasestrellas';
    const logoHref = getLogoHref(config.isTudn, config.isTelevisaSite, config.siteName);
    expect(logoHref).toEqual('https://lasestrellas.com');
  });

  it('should return defualt logo href', () => {
    const logoHref = getLogoHref(config.isTudn, config.isTelevisaSite, config.siteName);
    expect(logoHref).toEqual('https://www.univision.com');
  });
});
