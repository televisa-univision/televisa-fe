import Store from '@univision/fe-commons/dist/store/store';
import { getBrandable } from '@univision/fe-commons/dist/store/storeHelpers';
import { isValidArray, getKey } from '@univision/fe-commons/dist/utils/helpers';
import * as categories from '@univision/fe-commons/dist/constants/pageCategories';

import univisionLogo from '@univision/fe-commons/dist/assets/images/logo-univision-color.svg';
import univisionWhiteLogo from '@univision/fe-commons/dist/assets/images/logo-univision-white.svg';
import univisionWhiteColorLogo from '@univision/fe-commons/dist/assets/images/logo-univision-white-tulip-color.svg';
import noticiasLogo from '@univision/fe-commons/dist/assets/images/logo-noticias-color.svg';
import entretenimientoLogo from '@univision/fe-commons/dist/assets/images/logo-entretenimiento-color-v.svg';
import tudnWhiteLogo from '@univision/fe-commons/dist/assets/images/tudn/tudn_white_logo.svg';

const logos = {
  entretenimiento: {
    src: entretenimientoLogo,
    variant: 'light',
    url: '/entretenimiento',
    width: 140,
    height: 23,
  },
  noticias: {
    src: noticiasLogo,
    variant: 'light',
    url: '/noticias',
    width: 213,
    height: 26,
  },
  deportes: {
    src: tudnWhiteLogo,
    variant: 'dark',
    url: '/',
    width: 110,
    height: 23,
  },
  musica: {
    src: univisionWhiteColorLogo,
    variant: 'dark',
    url: '/musica',
    width: 140,
    height: 30,
  },
  local: {
    src: univisionWhiteLogo,
    variant: 'dark',
    width: 144,
    height: 29,
  },
  shows: {
    src: univisionWhiteColorLogo,
    variant: 'dark',
    width: 128,
    height: 26,
  },
};

/**
 * Returns the logo settings for the current AMP page
 * @param {Object} pageData from API
 * @param {string} pageCategory AMP page category
 * @returns {Object}
 */
export default (pageData, pageCategory) => {
  switch (pageCategory) {
    case categories.ENTERTAINMENT:
      return logos.entretenimiento;
    case categories.HOROSCOPE:
      return logos.entretenimiento;
    case categories.RADIO:
      return Object.assign({}, logos.local, {
        src: univisionWhiteColorLogo,
        url: getKey(getBrandable(Store), 'brandable.uri'),
      });
    case categories.SPORTS:
    case categories.SOCCER_FUTBOL:
      return logos.deportes;
    case categories.MUSIC:
      return logos.musica;
    case categories.NEWS:
    case categories.UNIVISION_NEWS:
      return logos.noticias;
    case categories.SHOW:
      return logos.shows;
    default:
      if (isValidArray(pageData.hierarchy)) {
        const key = pageData.hierarchy[0].uri.replace('/', '');
        if (logos[key]) {
          return logos[key];
        }
      }
      // Default to Univision logo
      return {
        src: univisionLogo,
        variant: 'light',
        url: '/',
      };
  }
};
