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
    case categories.LAS_ESTRELLAS_TELENOVELAS:
    case categories.LAS_ESTRELLAS_PROGRAMAS:
    case categories.LAS_ESTRELLAS_REALITY:
    case categories.LAS_ESTRELLAS_CAPITULOS_GRATIS:
    case categories.LAS_ESTRELLAS_HOROSCOPOS:
    case categories.LAS_ESTRELLAS_EN_VIVO:
    case categories.LAS_ESTRELLAS_SHOW:
      return logos.lasestrellas;
    // TODO: BEX Migration - Figure out with a PO what are the other categories for Canal 5
    case categories.CANAL5:
    case categories.CANAL5_CUAL_ES_BUENO:
    case categories.CANAL5_EL_RETO_4_ELEMENTOS:
    case categories.CANAL5_HOTEL_VIP:
    case categories.CANAL5_REALITIES:
    case categories.CANAL5_LCDLFM:
    case categories.CANAL5_ME_CAIGO_DE_RISA:
    case categories.CANAL5_PELICULAS_DEL_5:
      return logos.canal5;
    case categories.ELNU9VE:
    case categories.ELNU9VE_NOVELA:
    case categories.ELNU9VE_SHOW:
      return logos.elnu9ve;
    case categories.TELEHIT:
    case categories.TELEHIT_ENTRETENIMIENTO:
    case categories.TELEHIT_KPOP:
    case categories.TELEHIT_MUSICA:
    case categories.TELEHIT_PROGRAMAS:
    case categories.TELEHIT_URBANO:
    case categories.TELEHIT_VIRAL:
      return logos.telehit;
    case categories.DISTRITO_COMEDIA:
      return logos.distritocomedia;
    case categories.UNICABLE:
    case categories.UNICABLE_CELEBS:
    case categories.UNICABLE_FELIZMENTE:
    case categories.UNICABLE_LIFESTYLE:
    case categories.UNICABLE_PROGRAMAS:
      return logos.unicable;
    default:
      // return default televisa logo if no pageCategory was configured
      if (TELEVISA_SITES.includes(siteName)) {
        return logos.televisa;
      }

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
