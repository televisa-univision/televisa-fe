import URL from 'url';

import hasKey from '@univision/fe-utilities/helpers/object/hasKey';
import isRelativeUrl from '@univision/fe-utilities/helpers/url/isRelativeUrl';
import toRelativeUrl from '@univision/fe-utilities/helpers/url/toRelativeUrl';
import isMailToUrl from '@univision/fe-utilities/helpers/url/isMailToUrl';
import isWhatsappUrl from '@univision/fe-utilities/helpers/url/isWhatsappUrl';

import Store from '../../store/store';
import {
  getNavigationCount,
  getPageUrl,
  isPlayingMedia,
  hasFeatureFlag,
  getPageCategory,
} from '../../store/storeHelpers';
import { isSpaSelector } from '../../store/selectors/page-selectors';
import { MAX_NAVIGATIONS_COUNT, SPA_MODE, FORCE_REDIRECT } from '../../constants/spa';
import contentFeatures from '../../config/features/content';
import { globalComponents } from '../../config';
import fetchContent, { FETCH_TYPE_WEB_APP_STATE } from '../api/content/fetch';
import { ALLOWED_SITES_DOMAINS } from '../../constants/sites';

export const unsupportedPathsForSpa = new RegExp('/amp/|/embed|/archivo');

/**
 * Checks if both provided url are from the same allowed domains
 * @param {string} firstUrl - first url provided
 * @param {*} secondUrl - second url provided
 * @returns {boolean}
 */
export function areInSameSitesDomain(firstUrl, secondUrl) {
  if (isRelativeUrl(firstUrl) || isRelativeUrl(secondUrl)) {
    return true;
  }

  return ALLOWED_SITES_DOMAINS.some((site) => {
    const regex = new RegExp(`${site}|localhost|execute-api.us-east-1.amazonaws.com`);
    return regex.test(firstUrl) && regex.test(secondUrl);
  });
}

/**
 * Checks if url is in any of the allowed domains
 * @param {string} href - the original href prop
 * @returns {boolean}
 */
export function isInSitesDomain(href) {
  if (!href) {
    return false;
  }

  return isRelativeUrl(href)
    || ALLOWED_SITES_DOMAINS.some(site => href.includes(site));
}

/**
 * Returns true if we should skip the SPA for the given path:
 * - The max navigation is exceeded and there is not an inline media player
 * - OR the user is navigating to an excluded path for SPA.
 * @param {Object} context Context
 * @param {string} context.url Absolute or Relative URL.
 *                             If it's absolute then the domain will be validated.
 * @returns {boolean}
 */
export function shouldSkipSpa({ url } = {}) {
  const pageCategory = getPageCategory(Store);
  if (hasFeatureFlag(Store, SPA_MODE, 'false')) {
    return true;
  }
  if (globalComponents.pageSettings[pageCategory]) {
    return globalComponents.pageSettings[pageCategory].skipSpa;
  }
  const path = toRelativeUrl(url);
  // Skip SPA if max nav is exceeded and the user is not using PiP.
  const hasExceededNavigation = global.window
    && getNavigationCount(Store) >= MAX_NAVIGATIONS_COUNT
    && !isPlayingMedia(Store);

  if (!contentFeatures.isSpaEnabled()
    || !path
    || hasExceededNavigation
    || unsupportedPathsForSpa.test(path)
  ) {
    return true;
  }

  if (global.window && !areInSameSitesDomain(global.window.location.href, url)) {
    return true;
  }

  // Skip SPA for unsupported URLs and feature flag false.
  return !isInSitesDomain(url)
    || isMailToUrl(url)
    || isWhatsappUrl(url);
}

/**
 * Error handle in case SPA fails
 * @param {Object} storeInstance - Store from error scope
 */
export function errorHandler(storeInstance) {
  let url = '/';

  if (isSpaSelector(storeInstance)) {
    const storeUrl = getPageUrl(storeInstance);
    if (storeUrl) {
      url = storeUrl;
    }
  }
  const paramAgregator = url.includes('?') ? '&' : '?';
  url += `${paramAgregator}${SPA_MODE}=false&${FORCE_REDIRECT}=true`;
  if (hasKey(global, 'window.location.assign')
    // Validate there was not previews redirect to avoid infinite loop
    && !global.window.location.href.includes(FORCE_REDIRECT)) {
    global.window.location.assign(url);
  }
}

/**
 * Format the error message for SPA ErrorBoundaries.
 * @param {Object} input Inputs for the formatter.
 * @param {Object} store instance.
 * @param {Object} error JS Error instance.
 * @returns {{}}
 */
export function errorFormatter({ store, error = {} } = {}) {
  let formattedError = error;
  if (isSpaSelector(store) && error.message) {
    formattedError = Object.create(error);
    formattedError.message = `[SPA Error] ${error.message}`;
  }
  return formattedError;
}

/**
 * Returns a safe version of requestParams for SPA.
 * @param {Object} options Options to build the request
 * @param {string} options.contentUri URI to fetch the state for
 * @param {Object} options.requestParams Request parameters to add to the fetch
 * @returns {Object}
 */
export function getRequestParamsForSpa({
  contentUri = '',
  requestParams = {},
  enableAllowedParams = false,
}) {
  const allowedParams = ['q', 'page', 'id', 'uid', 'wid'];

  const params = {
    ...requestParams,
    ...URL.parse(contentUri, true).query,
  };

  // Make sure we are not sending an "url" param. Kept for retro-compatibility
  delete params.url;

  // Filter out any param not allowed if flag is enabled
  if (enableAllowedParams) {
    Object.keys(params).forEach((key) => {
      if (!allowedParams.includes(key)) {
        delete params[key];
      }
    });
  }

  return params;
}

/**
 * Fetches the state to use for SPA.
 * @param {Object} options Options to build the request
 * @param {string} options.contentUri URI to fetch the state for
 * @param {Object} options.requestParams Request parameters to add to the fetch
 * @returns {Promise}
 */
export function fetchSpaState({ contentUri = '', requestParams = {} }) {
  return fetchContent(
    contentUri,
    FETCH_TYPE_WEB_APP_STATE,
    getRequestParamsForSpa({ contentUri, requestParams, enableAllowedParams: true }),
  );
}
