import URL from 'url';

import serverConfig from 'server/config';
import { getKey, isInArray } from '@univision/fe-commons/dist/utils/helpers';
import features from '@univision/fe-commons/dist/config/features';
import getUserLocationValue from '@univision/fe-commons/dist/utils/helpers/getUserLocationValue';

import {
  getUnivisionHost,
  isUnivisionHost,
  getTudnHost,
  isTudnHost,
  getLasEstrellasHost,
  isLasEstrellasHost,
} from '../utils/sites';
import WebApiType from './WebApiType';
import WebApiRequestSigner from './WebApiRequestSigner';

/**
 * Wraps a HTTPRequest to add web-api capabilities
 */
const WebApiRequest = {
  /**
   * Returns the web-api URL based on the HTTP Request
   * @param {Object} httpRequest Express.js HTTP Request
   * @param {string} [apiType=WebApiType.CONTENT] Web Api Type.
   * @returns {string} URL
   */
  getWebApiUrl(httpRequest, apiType = WebApiType.CONTENT) {
    let webApiUrl = null;
    // Ignore unknown API types or Invalid requests
    if (isInArray(apiType, Object.values(WebApiType)) && httpRequest) {
      const userLocation = this.getUserLocation(httpRequest);
      const endpoint = this.getWebApiEndpoint(httpRequest);
      const contentDomain = this.getContentDomain(httpRequest);
      const {
        pathname: requestedPath,
        query: queryString,
      } = URL.parse(this.getContentUri(httpRequest));
      // Domain + Path + Query String
      const contentUrl = `${contentDomain}${requestedPath}${queryString ? `&${queryString}` : ''}`;
      const signature = this.getRequiredSignature(contentUrl, apiType);
      const lazyLoadFlag = !features.content.serverSideLazyLoading || getKey(httpRequest, 'originalUrl', '').indexOf('/amp/') > -1 ? '&lazyload=false' : '';
      webApiUrl = `${endpoint}${apiType}?${userLocation}url=${contentUrl}${signature}${lazyLoadFlag}`;
    }
    return webApiUrl;
  },

  /**
   * Returns a sanitized version of httpRequest.originalUrl.
   * Remove any custom prefix (/amp/, /embed).
   * @param {Object} httpRequest Express.js HTTP Request
   * @returns {string}
   */
  getContentUri(httpRequest) {
    let originalUrl = getKey(httpRequest, 'originalUrl', '');

    // Remove /embed only if no embed id
    if (!originalUrl.includes('?eid')) {
      originalUrl = originalUrl.replace('/embed', '');
    }

    return originalUrl.replace(/\/(amp|spa)\//, '/');
  },

  /**
   * Returns the endpoint to the Web Api
   * @param {Object} httpRequest Express.js HTTP Request
   * @returns {string}
   */
  getWebApiEndpoint(httpRequest) {
    let endpoint = process.env.CMS_API_URL;
    const contentUrl = URL.parse(this.getContentUri(httpRequest));
    const { pathname: requestedPath } = contentUrl;
    // A preview request from the CMS has the format: HOST/_preview/ID/ENVIRONMENT
    if (typeof requestedPath === 'string' && requestedPath.indexOf(WebApiType.PREVIEW) >= 0) {
      const pathParts = requestedPath.split('/');
      const environment = pathParts[pathParts.length - 1];
      const previewEndpoint = serverConfig.cmsPreview.environments[environment.toLowerCase()];
      endpoint = previewEndpoint || endpoint;
    }

    return `${endpoint}/web-api`;
  },

  isPreview(httpRequest) {
    const contentUrl = URL.parse(this.getContentUri(httpRequest));
    const { pathname: requestedPath } = contentUrl;
    return typeof requestedPath === 'string' && requestedPath.indexOf(WebApiType.PREVIEW) >= 0;
  },

  /**
   * Returns the actual domain to use for the Web Api URL.
   * @param {Object} httpRequest Express.js HTTP Request
   * @returns {string}
   */
  getContentDomain(httpRequest) {
    const headers = getKey(httpRequest, 'headers', {});
    const { host, 'X-Forwarded-Proto': protocol } = headers;
    let defaultHost = host;
    if (isTudnHost(host)) {
      defaultHost = getTudnHost(host);
    } else if (isUnivisionHost(host) || !host) {
      defaultHost = getUnivisionHost(host, true);
    } else if (isLasEstrellasHost(host)) {
      defaultHost = getLasEstrellasHost(host);
    }
    return `${protocol || 'https'}://${defaultHost}`;
  },

  /**
   * Returns the required signature, if any.
   * @param {string} contentUrl Content URL
   * @param {string} [apiType=WebApiType.CONTENT] Web Api Type.
   * @returns {string}
   */
  getRequiredSignature(contentUrl, apiType) {
    let signature = '';
    const isSignatureRequired = process.env.CMS_API_SIGNING_REQUIRED;
    if (isSignatureRequired) {
      signature = WebApiRequestSigner.sign(contentUrl, apiType);
    }
    return signature;
  },

  /**
   * Returns the relevant headers in the Rrequest
   * @param {Object} httpRequest Express.js HTTP Request
   * @returns {{}}
   */
  getHttpHeaders(httpRequest) {
    return {
      'x-is-user-loc-eu': getKey(httpRequest, 'headers.x-is-user-loc-eu', 'false'),
    };
  },

  getCustomRedirect(httpRequest) {
    const domains = [
      'univision.com',
      'tudn.com',
      'tasaudavel.com.br',
      'delicioso.com.br',
      'mulher.com.br',
      'zappeando.com.br',
    ];
    const { host } = httpRequest.headers;
    if (domains.includes(host)) {
      return {
        url: `https://www.${host}${httpRequest.path}`,
        code: 301,
        type: 'redirectdata',
      };
    }
    return null;
  },

  /**
   * Returns the relevant param for userLocation if available
   * @param {Object} httpRequest Express.js HTTP Request
   * @returns {string}
   */
  getUserLocation(httpRequest) {
    return `userLocation=${getUserLocationValue(httpRequest?.userLocation)}&`;
  },
};

export default WebApiRequest;
