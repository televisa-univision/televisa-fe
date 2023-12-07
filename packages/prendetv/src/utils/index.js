/* eslint-disable import/order */
/**
 * @module PrendeTV Utilities
 */
import localStorage from '@univision/fe-commons/dist/utils/helpers/LocalStorage';
import * as languages from '@univision/fe-commons/dist/utils/localization/languages';
import gtmManager from '@univision/fe-commons/dist/utils/tracking/googleTagManager/gtmManager';
import { setCookie } from '@univision/fe-commons/dist/utils/helpers';

import { BITTERSWEET, WHITE } from '@univision/fe-utilities/styled/constants';
import isValidString from '@univision/fe-utilities/helpers/common/isValidString';

import {
  LANGUAGE_KEY_STORAGE,
  PRENDE_TV_LANDING,
  PRENDETV_COOKIE,
} from '../constants';

/**
 * Validate if the current page is the ladning page
 *
 * @param {string} page - page constant
 * @returns {boolean} return true if it is the landing page, false otherwise
 */
export const isLandingPage = page => page === PRENDE_TV_LANDING;

/**
 * get the color that should apply to the fonts, depending of the page
 *
 * @param {string} page - page constant
 * @returns {string} - returns the hexa color
 */
export const getHeadlineFontColor = (page) => {
  return isLandingPage(page) ? WHITE : BITTERSWEET;
};

/**
 * get the color that should apply to the fonts, depending of the page
 *
 * @param {string} page - page constant
 * @returns {string} - returns the hexa color
 */
export const getHeadlineBackColor = (page) => {
  return isLandingPage(page) ? BITTERSWEET : WHITE;
};

/**
 * Get the prefix to put in the path
 *
 * @returns {string} - the correct prefix by environment.
 */
export const getPrefix = () => (process.env.NODE_ENV !== 'development' ? '' : '/prendetv');

/**
 * get the url formatted
 *
 * @param {string} lang - Language
 * @param {string} path - Pathname
 * @returns {string} - returns the proper url
 */
export const getUrlPath = (lang, path) => {
  if (!path || path.startsWith('https')) {
    return path;
  }

  return `${getPrefix()}${lang !== languages.ES ? `/${lang}` : ''}${path}`;
};

/**
 * get url redirect with language and path
 *
 * @param {string} lang - target language to redirect
 * @param {string} path - current path name
 * @returns {string} - returns the proper url
 */
export const getRedirectWithLangUrl = (lang, path) => {
  if (!path || path.startsWith('https')) {
    return path;
  }

  const prefix = getPrefix();
  let finalPath = path;

  if (lang === languages.ES) {
    finalPath = path.replace(`/${languages.EN}`, '') || '/';
  } else if (!path.startsWith(`/${languages.EN}`)) {
    finalPath = `/${languages.EN}${path === '/' ? '' : path}`;
  }

  return `${prefix}${finalPath}`;
};

/**
 * Do a redirect to the path and language specified
 *
 * @param {string} lang - Language
 * @param {string} path - Pathname
 *
 * @returns {boolean} - returns true if the redirect is sent, otherwise false.
 */
export const redirectWithLang = (lang, path) => {
  const url = getRedirectWithLangUrl(lang, path);
  if (url && typeof window !== 'undefined' && typeof window.location !== 'undefined') {
    localStorage.setObject(LANGUAGE_KEY_STORAGE, lang);
    window.location.href = url;
    return true;
  }
  return false;
};

/**
 * Sets PrendeTV Cookie
 */
export const setPrendeTVCookie = () => {
  setCookie(PRENDETV_COOKIE, 'true', 7);
};

/**
 * Sets the content tracking settings for content
 * @param {string} event event called
 */
export const setContentTracking = (event) => {
  const eventLabel = event?.currentTarget?.dataset?.app;
  gtmManager.triggerEvent({
    event_action: 'content_click',
    event_name: 'section',
    ...(isValidString(eventLabel) && { event_label: eventLabel }),
  });
};
