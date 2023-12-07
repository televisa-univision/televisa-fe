import tudnWhiteLogo from '@univision/fe-commons/dist/assets/images/tudn/tudn_white_logo.svg';
import whiteLogo from '@univision/fe-commons/dist/assets/images/logo-univision-white.svg';
import colorLogo from '@univision/fe-commons/dist/assets/images/logo-univision-color.svg';
// import { LOGOS } from '@univision/fe-commons/dist/constants/televisaSitesData';
/**
 * Get the logo thats need to be rendered
 * @param {boolean} isTudn - Boolean to know if the target site are tudn
 * @param {boolean} isTelevisaSite - Boolean to know if the target site are part of televisa
 * @param {string} siteName - current siteName
 * @param {Object} theme - The current theme
 * @returns {string}
 */
export const getLogoLink = (isTudn, isTelevisaSite, siteName, theme) => {
  const LOGOS = Object.freeze({
    canal5: 'https://st1.uvnimg.com/e4/9a/5179580043c2b3fe6183579b7b01/televisa-horizontal-color.svg',
    lasestrellas: 'https://st1.uvnimg.com/e4/9a/5179580043c2b3fe6183579b7b01/televisa-horizontal-color.svg',
  });
  if (isTudn && !isTelevisaSite) return tudnWhiteLogo;
  if (isTelevisaSite) {
    const logo = LOGOS[[siteName]];
    return logo !== undefined ? logo : 'https://st1.uvnimg.com/e4/9a/5179580043c2b3fe6183579b7b01/televisa-horizontal-color.svg';
  }
  if (theme.variant === 'dark') return whiteLogo;
  return colorLogo;
};

/**
 * Get the social links need to be rendered
 * @param {boolean} isTudn - Boolean to know if the target site are tudn
 * @param {boolean} isTelevisaSite - Boolean to know if the target site are part of televisa
 * @returns {Object}
 */
export const getSocialLinks = (isTudn, isTelevisaSite) => {
  const links = {
    facebook: 'https://www.facebook.com/univision',
    twitter: 'https://www.facebook.com/univision',
    instagram: 'https://www.instagram.com/univision',
  };
  if (isTudn && !isTelevisaSite) {
    links.facebook = 'https://www.facebook.com/tudnusa';
    links.twitter = 'https://twitter.com/TUDNUSA';
    links.instagram = 'https://www.instagram.com/tudnusa';
  }
  if (isTelevisaSite) {
    links.facebook = 'https://www.facebook.com/televisacorporativo/';
    links.twitter = 'https://twitter.com/Televisa';
    links.instagram = 'https://www.instagram.com/televisa/?hl=es';
  }
  return links;
};

/**
   * Returns the current image href url
   * @param {boolean} isTudn - Boolean to know if the target site are tudn
   * @param {boolean} isTelevisaSite  - Boolean to know if the target site are part of televisa
   * @param {string} siteName - current site name
   * @returns {string}
   */
export const getLogoHref = (isTudn, isTelevisaSite, siteName) => {
  if (isTudn && !isTelevisaSite) return 'https://www.tudn.com';
  if (isTelevisaSite) return `https://${siteName}.com`;
  return 'https://www.univision.com';
};
