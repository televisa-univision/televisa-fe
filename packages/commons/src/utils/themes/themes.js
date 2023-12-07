// eslint-disable-next-line import/no-cycle
import {
  exists, hasKey, isValidObject,
} from '../helpers';
import { ALLOWED_SITES_DOMAINS } from '../../constants/sites';
import themeData from './themes.json';
// eslint-disable-next-line import/no-cycle
import features from '../../config/features';

const defaultTheme = themeData.themes.darkGrey;

/**
 * Get the TUDN theme if flag is present
 * @returns {Object}
 * @param {string} legacy name of the legacy theme to apply if flag isn't present
 */
export function getTudnTheme(legacy = 'sports') {
  const isTudn = features.deportes.isTudn();
  return isTudn ? themeData.themes.tudn : themeData.themes[legacy];
}

/**
 * Get the colors for a theme
 * @returns {Object}
 * @param {Object} themeKey to get theme's name to look colors for
 * @param {Object} state initial state to avoid call the store on reducer
 */
function getThemeColors(themeKey, state) {
  const themeName = isValidObject(themeKey) && themeKey.theme;

  if (themeName === 'tudn' && !features.deportes.isTudn(state)) {
    // temporal behavior until TUDN launch
    return themeData.themes.sports;
  }

  return themeData.themes[themeName];
}

/**
 * Get the css properties for a theme
 * @returns {Object}
 */
function getThemeCSS({ primary, secondary }) {
  const rgb = `${parseInt(primary.slice(1, 3), 16)}, ${parseInt(
    primary.slice(3, 5),
    16
  )}, ${parseInt(primary.slice(5, 7), 16)}`;

  return {
    alphaGradient: `linear-gradient(to top, rgba(${rgb}, 0.95) 0%, rgba(${rgb}, 0) 50%)`,
    solidGradient: `linear-gradient(to bottom, ${primary} 0%, ${secondary} 100%)`,
    horizontalGradient: `linear-gradient(to right, ${primary} 0%, ${secondary} 100%)`,
    horizontalLeftGradient: `linear-gradient(to left, ${primary} 0%, ${secondary} 100%)`,
  };
}

/**
 * Gets a page's URL used in `themes.json`
 * @param {string} url of the page
 * @param {string} urlDomain to serve as origin
 * @returns {Object} path fragments and clean url used in themes
 */
export function getThemeURL(url, urlDomain) {
  const domainRegExp = new RegExp(urlDomain || ALLOWED_SITES_DOMAINS.join('|'));
  let themeDomain = '';
  let pagePath = '';

  // Type validation
  if (typeof url !== 'string') return null;

  const domainMatch = url.match(domainRegExp);
  if (domainMatch) {
    const urlIndex = 1;
    [themeDomain] = domainMatch;
    pagePath = url.split(`${themeDomain}`)[urlIndex];
  } else {
    pagePath = url;
  }
  let themeUrl = pagePath.substring(1);
  const pathFragments = themeUrl.split('/');

  if (pathFragments.length > 2) {
    themeUrl = pathFragments.slice(0, 2).join('/');
  }

  return {
    pathFragments,
    themeDomain,
    themeUrl,
  };
}

/**
 * Gets a theme by url
 * @param {string} url the url to query
 * @param {string} type of page to theme
 * @param {Object} state initial state data
 * @returns {Object}
 */
export default function getThemeFromURL(url, type, state) {
  let theme = defaultTheme;

  if (url) {
    const { pathFragments, themeDomain, themeUrl } = getThemeURL(url);
    const themeKey = themeData.urls[`${themeDomain}/*`]
     || themeData.urls[themeUrl]
     || themeData.urls[`${pathFragments[0]}/*`];

    /* allow themes to specify variants -
      - themeData.urls can either contain a string reference to a theme (e.g., "blue")
      - or an object with { theme: 'themeName', variant: 'light|dark' } */

    if (
      typeof themeKey === 'object'
      && hasKey(themeKey, 'theme')
      && hasKey(themeData, 'themes')
      && typeof themeData.themes === 'object'
      && exists(themeData.themes[themeKey.theme])
    ) {
      theme = {
        ...getThemeColors(themeKey, state),
        ...themeKey,
      };
    }
    if (!hasKey(theme, 'variant')) {
      theme.variant = 'dark';
    }

    if (hasKey(theme, `variants.${type}`)) {
      theme.variant = theme.variants[type];
    }
  }

  return Object.assign({}, theme, getThemeCSS(theme));
}
