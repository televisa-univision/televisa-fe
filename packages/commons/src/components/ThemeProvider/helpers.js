import {
  AUTOS,
  BREAKING_NEWS,
  FAMOSOS,
  GASTRONOMY,
  HOROSCOPE,
  LAS_ESTRELLAS,
  NEWS,
  RADIO,
  SHOW,
  SPORTS,
  TV,
  UNIVISION,
} from '../../constants/pageCategories';
import { isValidFunction, toRelativeUrl, getKey } from '../../utils/helpers';
import themes from '../../themes';
import { TUDN_DEFAULT_HOST } from '../../constants/sites';
import { BLACK_RGB } from '../../utils/styled/constants';

// Object to map all possible verticals
const verticalMapping = Object.freeze({
  breaking: BREAKING_NEWS,
  carros: AUTOS,
  conecta: SHOW,
  delicioso: GASTRONOMY,
  deportes: SPORTS,
  futbol: SPORTS,
  famosos: FAMOSOS,
  horoscopos: HOROSCOPE,
  local: TV,
  noticias: NEWS,
  radio: RADIO,
  shows: SHOW,
  entretenimiento: SHOW,
  'univision-news': NEWS,
  lasestrellas: LAS_ESTRELLAS,
});

/**
 * Get gradients built from primary and secondary colors of the provided theme
 * @param {string} primary color of the theme
 * @param {string} secondary color of the theme
 * @returns {Object}
 */
export function getThemeGradients({ primary, secondary } = {}) {
  // If neither are there, don't return anything
  if (!primary || !secondary) return {};

  // Expand shorthand form to full form (#000 to #000000)
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const extendedPrimary = primary.replace(shorthandRegex, (m, r, g, b) => `${r}${r}${g}${g}${b}${b}`);
  // Finds a valid hex color pattern and slice it in three parts
  const hexResult = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(extendedPrimary);
  // Will default to black RGB if no valid pattern found
  const rgb = hexResult
    ? `${parseInt(hexResult[1], 16)}, ${parseInt(hexResult[2], 16)}, ${parseInt(hexResult[3], 16)}` : BLACK_RGB;

  return {
    alphaGradient: `linear-gradient(to top, rgba(${rgb}, 0.95) 0%, rgba(${rgb}, 0) 50%)`,
    solidGradient: `linear-gradient(to bottom, ${primary} 0%, ${secondary} 100%)`,
    horizontalGradient: `linear-gradient(to right, ${primary} 0%, ${secondary} 100%)`,
    horizontalLeftGradient: `linear-gradient(to left, ${primary} 0%, ${secondary} 100%)`,
  };
}

/**
 * getTheme helper
 * @param {string} pageCategory - page category
 * @param {Object} pageData - page data
 * @param {Object} options - additional options
 * @returns {Object}
 */
export default function getTheme(pageCategory = UNIVISION, pageData = {}, options) {
  const themeToLoad = themes[pageCategory] || themes[UNIVISION];
  let result = null;

  if (isValidFunction(themeToLoad)) {
    const theme = themeToLoad(pageData, { isWorldCupMVP: options?.isWorldCupMVPEnabled });
    result = {
      ...theme,
      ...getThemeGradients(theme),
    };
  }

  return result;
}

/**
 * Used primarily at widget level from commonRootSection value, gets the theme from the vertical
 * or vertical url.
 * @param {string} url to get a match of a vertical from
 * @returns {Object}
 */
export function getThemeFromVertical(url) {
  if (!url) return {};

  // Used outside TUDN
  if (url.includes(TUDN_DEFAULT_HOST)) {
    return getTheme(SPORTS);
  }

  // will try to find a valid path from list and return the appropiate pageCategory
  const path = toRelativeUrl(url);
  const vertical = path
    .toLowerCase()
    .split('/')
    .filter(Boolean)[0];

  const pageCategory = getKey(verticalMapping, vertical);

  if (pageCategory) {
    return getTheme(pageCategory);
  }

  // No valid vertical was found
  return {};
}
