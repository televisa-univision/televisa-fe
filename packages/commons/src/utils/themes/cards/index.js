import {
  ASTRONAUT,
  CARDINAL,
  CERULEAN_BLUE,
  CHAMBRAY,
  CORAL_RED,
  DAISY_BUSH,
  DARKER_GREY,
  DODGER_BLUE,
  FLIRT,
  GRADIENT_PURPLE_SHOW,
  GOSSAMER,
  MAGENTA,
  MARTINIQUE,
  POMEGRANATE,
  PURPLE_HEART,
  RED,
  SHOWS_GRADIENT,
  STEEL_GREY,
  TORCH_RED,
  TROPICAL_RAIN_FOREST,
  VELVET_RED,
} from '../../styled/constants';
import { toRelativeUrl, getKey } from '../../helpers';
import { TUDN_DEFAULT_HOST } from '../../../constants/sites';

export const themes = {
  breaking: {
    headlineFont: {
      default: 'uvs-font-a-medium',
    },
    gradient: `linear-gradient(229deg, ${VELVET_RED} 0%, ${TORCH_RED} 100%)`,
    primary: VELVET_RED,
  },
  conecta: {
    headlineFont: {
      portrait: 'uvs-font-a-bold',
      rectangle: 'uvs-font-a-bold',
      default: 'uvs-font-a-black',
    },
    gradient:
      'linear-gradient(63.43deg, #DC1830 0%, rgba(220,24,48,0) 100%), linear-gradient(180deg, rgba(0,190,213,0.5) 0%, rgba(0,190,213,0) 100%), linear-gradient(25.58deg, rgba(68,207,123,0) 0%, #6DB43E 100%), linear-gradient(129.91deg, rgba(68,0,232,0) 0%, rgba(68,0,232,0.98) 100%, #4400E8 100%), linear-gradient(315.3deg, rgba(68,0,232,0) 0%, #00BED5 100%)',
    primary: MARTINIQUE,
  },
  delicioso: {
    headlineFont: {
      default: 'uvs-font-a-medium',
    },
    gradient: `linear-gradient(229deg, ${RED} 0%, ${CORAL_RED} 100%)`,
    primary: RED,
  },
  deportes: {
    headlineFont: {
      default: 'uvs-font-a-black',
    },
    gradient: `linear-gradient(229deg, ${TROPICAL_RAIN_FOREST} 0%, ${GOSSAMER} 100%)`,
    primary: TROPICAL_RAIN_FOREST,
  },
  futbol: {
    headlineFont: {
      default: 'uvs-font-a-black',
    },
    gradient: `linear-gradient(229deg, ${TROPICAL_RAIN_FOREST} 0%, ${GOSSAMER} 100%)`,
    primary: TROPICAL_RAIN_FOREST,
  },
  famosos: {
    headlineFont: {
      default: 'uvs-font-a-medium',
    },
    gradient: `linear-gradient(229deg, ${FLIRT} 0%, ${MAGENTA} 100%)`,
    primary: FLIRT,
  },
  global: {
    headlineFont: {
      default: 'uvs-font-a-bold',
    },
    gradient: `linear-gradient(229deg, ${DARKER_GREY} 0%, ${MARTINIQUE} 100%)`,
    primary: STEEL_GREY,
  },
  horoscopos: {
    headlineFont: {
      default: 'uvs-font-a-medium',
    },
    gradient: `linear-gradient(229deg, ${DAISY_BUSH} 0%, ${PURPLE_HEART} 100%)`,
    primary: DAISY_BUSH,
  },
  local: {
    headlineFont: {
      default: 'uvs-font-b-bold',
    },
    gradient: `linear-gradient(229deg, ${ASTRONAUT} 0%, ${CHAMBRAY} 100%)`,
    primary: ASTRONAUT,
  },
  noticias: {
    headlineFont: {
      default: 'uvs-font-b-bold',
    },
    gradient: `linear-gradient(229deg, ${CERULEAN_BLUE} 0%, ${DODGER_BLUE} 100%)`,
    primary: CERULEAN_BLUE,
  },
  radio: {
    headlineFont: {
      rectangle: 'uvs-font-a-bold',
      default: 'uvs-font-a-black',
    },
    gradient: `linear-gradient(229deg, ${CARDINAL} 0%, ${POMEGRANATE} 100%)`,
    primary: CARDINAL,
  },
  shows: {
    headlineFont: {
      portrait: 'uvs-font-a-bold',
      rectangle: 'uvs-font-a-bold',
      default: 'uvs-font-a-black',
    },
    gradient: GRADIENT_PURPLE_SHOW,
    primary: SHOWS_GRADIENT,
  },
  'univision-news': {
    headlineFont: {
      default: 'uvs-font-a-bold',
    },
    gradient: `linear-gradient(229deg, ${CERULEAN_BLUE} 0%, ${DODGER_BLUE} 100%)`,
    primary: CERULEAN_BLUE,
  },
};

/**
 * Get theme from the vertical or vertical url
 * @param {string} match the vertical to match
 * @returns {Object}
 */
export default (match) => {
  if (!match) {
    return themes.global;
  }

  const path = toRelativeUrl(match);

  const vertical = path
    .toLowerCase()
    .split('/')
    .filter(Boolean)[0];

  const verticalTheme = getKey(themes, vertical, '');

  if (verticalTheme) {
    return verticalTheme;
  }

  return match.includes(TUDN_DEFAULT_HOST) ? themes.deportes : themes.global;
};
