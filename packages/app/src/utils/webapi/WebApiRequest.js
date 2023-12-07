import {
  UNIVISION_DEFAULT_HOST,
} from '@univision/fe-commons/dist/constants/sites';
import { COUNTRY, FROM, NEXTJS } from '@univision/fe-commons/dist/constants/nextjs';
import { US } from '@univision/fe-commons/dist/constants/userLocation';
import contentApiUrls, { contentDomains } from '../../config/contentApiUrls';

/**
 * Add web-api capabilities to get/build content/urls domain or redirects
 */
const WebApiRequest = {
  /**
   * Returns the web-api URL based on the HTTP Request
   * @param {string} asPath - request path from next.js
   * @param {Object} options - additional setting for the request
   * @param {Object} options.config - application configuration
   * @param {Object} options.siteName - current site name
   * @returns {string} URL
   */
  getWebApiUrl(asPath, options = {}) {
    const {
      config: { proxy, apiEnv = 'prod' } = {},
      siteName,
      country = US,
    } = options;
    const sites = Object.keys(contentApiUrls);
    if (!asPath || !siteName || !sites.includes(siteName)) return null;

    const siteRegExp = new RegExp(`(?:^|/)${siteName}(?:$|/|(\\?|\\#))`);
    const path = !asPath.includes('/amp/')
      ? asPath.replace(siteRegExp, '/$1')
      : asPath;
    const endpoint = this.getWebApiEndpoint(proxy);
    const contentUrl = new URL(path, contentDomains[siteName][apiEnv]);
    const webApiUrl = new URL(endpoint);

    // reset query params with those we need
    contentUrl.search = new URLSearchParams();
    webApiUrl.search = new URLSearchParams({
      url: contentUrl.toString(),
      [FROM]: NEXTJS,
      [COUNTRY]: country,
    });
    return webApiUrl.toString();
  },

  /**
   * Returns the endpoint to the Web Api
   * @param {string} contentApiDomain cms content domain
   * @returns {string}
   */
  getWebApiEndpoint(contentApiDomain) {
    const defaultApiDomain = `https://${UNIVISION_DEFAULT_HOST}`;
    return `${contentApiDomain || defaultApiDomain}/proxy/api/cached/web-app-state`;
  },

  /**
   * Returns the web-api parameters based on the HTTP Request
   * @param {string} url - absolute request URL
   * @param {string} params - additional request object to append
   * @returns {Object} request parameters
   */
  getWebApiParams(url, params) {
    return {
      url,
      ...params,
    };
  },
};

export default WebApiRequest;
