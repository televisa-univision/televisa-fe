import { createSelector } from 'reselect';
import { requestParamsSelector } from './page-selectors';

/**
 * Get the environment configuration related to the url
 * where we are serving the SSO iframe.
 * @param {Object} state redux state
 * @returns {string}
 */
export const envSsoIFrameUrlSelector = state => state?.page?.config?.ssoIframeUrl;

/**
 * Get query string configuration related to the url
 * where we are serving the SSO iframe.
 * @param {Object} state redux state
 * @returns {string}
 */
export const querySsoIFrameUrlSelector = state => requestParamsSelector(state)?.ssoIframeUrl;

/**
 * Get query string configuration related to the url
 * where we are serving the SSO iframe.
 * @param {Object} state redux state
 * @returns {string}
 */
export const userTokenQueryStringSelector = state => requestParamsSelector(state)?.uvnUserToken;

/**
 * Get the SingleSignOn iframe url.
 * It look up the url first in the query params, then
 * in the environment configuration
 * @returns {String} url where the SSO iframe is being exposed
 */
export const ssoIFrameUrlSelector = createSelector(
  querySsoIFrameUrlSelector,
  envSsoIFrameUrlSelector,
  (querySsoIframeUrl, envSsoIFrameUrl) => {
    return querySsoIframeUrl || envSsoIFrameUrl;
  }
);

export default ssoIFrameUrlSelector;
