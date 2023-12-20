/* eslint-disable import/no-unresolved */
// eslint-disable-next-line no-restricted-imports
import Store from '@univision/fe-commons/dist/store/store';
import { getBrandable } from '@univision/fe-commons/dist/store/storeHelpers';
import { isValidArray, getKey } from '@univision/fe-commons/dist/utils/helpers';
import * as categories from '@univision/fe-commons/dist/constants/pageCategories';
import { TELEVISA_SITES } from '@univision/fe-commons/dist/constants/sites';

import univisionLogo from '@univision/fe-commons/dist/assets/images/logo-univision-color.svg';
import univisionWhiteLogo from '@univision/fe-commons/dist/assets/images/logo-univision-white.svg';
import univisionWhiteColorLogo from '@univision/fe-commons/dist/assets/images/logo-univision-white-tulip-color.svg';
import noticiasLogo from '@univision/fe-commons/dist/assets/images/logo-noticias-color.svg';
import entretenimientoLogo from '@univision/fe-commons/dist/assets/images/logo-entretenimiento-color-v.svg';
import tudnWhiteLogo from '@univision/fe-commons/dist/assets/images/tudn/tudn_white_logo.svg';

// Televisa logos
import unicableLogo from '@univision/fe-commons/dist/assets/images/unicable-horizontal-color-1.svg';
import canal5Logo from '@univision/fe-commons/dist/assets/images/logo-canal5_solid.svg';
import televisaLogo from '@univision/fe-commons/dist/assets/images/logo-televisa-horizontal-solid.svg';
import lasestrellasLogo from '@univision/fe-commons/dist/assets/images/logo-las-estrellas-horizontal-solid.svg';
import elnu9veLogo from '@univision/fe-commons/dist/assets/images/logo-elnu9ve-horizontal-solid.svg';
import telehitLogo from '@univision/fe-commons/dist/assets/images/logo_telehit_horizontal_solid.svg';
import distritocomediaLogo from '@univision/fe-commons/dist/assets/images/logo_distritocomedia_horizontal_solid.svg';
import losbingersLogo from '@univision/fe-commons/dist/assets/images/losbingers-logo-color.svg';
import lcdlfLogo from '@univision/fe-commons/dist/assets/images/lcdlf-logo-horizontal_solid.png';

export const logos = {
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
  lasestrellas: {
    src: lasestrellasLogo,
    variant: 'dark',
    width: 144,
    height: 29,
  },
  televisa: {
    src: televisaLogo,
    variant: 'dark',
    width: 144,
    height: 29,
  },
  canal5: {
    src: canal5Logo,
    variant: 'dark',
    width: 20,
    height: 26,
  },
  elnu9ve: {
    src: elnu9veLogo,
    variant: 'dark',
    width: 144,
    height: 29,
  },
  telehit: {
    src: telehitLogo,
    variant: 'dark',
    width: 144,
    height: 29,
  },
  distritocomedia: {
    src: distritocomediaLogo,
    variant: 'dark',
    width: 144,
    height: 29,
  },
  losbingers: {
    src: losbingersLogo,
    variant: 'dark',
    width: 144,
    height: 29,
  },
  lcdlf: {
    src: lcdlfLogo,
    variant: 'dark',
    width: 55,
    height: 32,
  },
  unicable: {
    src: unicableLogo,
    variant: 'dark',
    width: 104.87,
    height: 32,
  },
};

/**
 * Returns the logo settings for the current AMP page
 * @param {Object} pageData from API
 * @param {string} pageCategory AMP page category
 * @param {string} siteName current site
 * @returns {Object}
 */
export default (pageData, pageCategory, siteName) => {
  const categoryRegexMap = {
    [categories.CANAL5]: logos.canal5,
    [categories.LAS_ESTRELLAS]: logos.lasestrellas,
    [categories.TELEHIT]: logos.telehit,
    [categories.UNICABLE]: logos.unicable,
    [categories.DISTRITO_COMEDIA]: logos.distritocomedia,
    [categories.ELNU9VE]: logos.elnu9ve,
    [categories.LOS_BINGERS]: logos.losbingers,
    [categories.LCDLF]: logos.lcdlf,
  };

  let returnValue = null;

  const hasMatchingCategory = Object.entries(categoryRegexMap)
    .some(([category, logo]) => {
      const regex = new RegExp(category, 'i');
      if (regex.test(pageCategory)) {
        returnValue = logo;
        return true;
      }
      return false;
    });

  if (hasMatchingCategory) {
    return returnValue;
  }

  switch (pageCategory) {
    case categories.ENTERTAINMENT:
    case categories.HOROSCOPE:
      return logos.entretenimiento;
    case categories.RADIO:
      return {
        ...logos.local,
        src: univisionWhiteColorLogo,
        url: getKey(getBrandable(Store), 'brandable.uri'),
      };
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
      if (TELEVISA_SITES.includes(siteName)) {
        return logos.televisa;
      }

      if (isValidArray(pageData.hierarchy)) {
        const key = pageData.hierarchy[0].uri.replace('/', '');
        if (logos[key]) {
          return logos[key];
        }
      }

      return {
        src: univisionLogo,
        variant: 'light',
        url: '/',
      };
  }
};
