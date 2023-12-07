/**
 * ##########################################
 *
 *  D E P R E C A T E D
 *
 * Please use /server/webapi/WebApiRequest.js
 *
 * ##########################################
 */

import crypto from 'crypto';
import url from 'url';

import serverConfig from 'server/config';
import { exists } from '@univision/fe-commons/dist/utils/helpers';

import logger from 'app/utils/logging/serverLogger';

/**
 * URL pattern for preview requests
 * @type {string}
 */
const PREVIEW_URL_PATTERN = '/_preview/';

/**
 * Generate a FeedSyn signature
 * See - https://univision.atlassian.net/wiki/display/DEVTEAM/Feeds+API+Documentation
 * 1. The name of the HTTP method of the request in all caps. Typically GET or POST.
 * 2. The client id.
 * 3. The request URI (the part of the URL after the domain excluding the query string).
 * 4. The query string parameters in alphabetical order
 * 5. The secret key
 * @param {string} requestedUrl - Url requested from the webapp
 * @param {string} type - FeedSyn type ('page' or 'layout')
 * @param {string} method - HTTP method (ie: 'GET' or 'POST')
 * @returns {string} API signature
 */
export function generateApiSignature(requestedUrl, type = 'page', method = 'GET') {
  const hash = crypto.createHash('sha1');
  const hashCode = `${method}${process.env.CMS_API_CLIENT_ID}${serverConfig.api.endpoints[type]}?`
    + `client_id=${process.env.CMS_API_CLIENT_ID}&url=${requestedUrl}`
    + `${process.env.CMS_API_SECRET}`;

  hash.update(hashCode);

  return hash.digest('hex');
}

/**
 * Generate a signed FeedSyn request
 * @param {string} originalUrl - URL requested from the webapp.
 * @param {string} cmsUrl - Base url for API calls to the CMS
 * @param {string} type - FeedSyn type ('page' or 'layout')
 * @returns {string} Signed API request url
 */
export default function generateApiUrl(originalUrl, cmsUrl, type = 'page') {
  let apiEndpointUrl = cmsUrl;
  if (exists(originalUrl) && exists(cmsUrl)) {
    const parsedUrl = url.parse(originalUrl);
    const requestedPath = parsedUrl.pathname;
    const queryString = parsedUrl.query ? `&${parsedUrl.query}` : '';
    // A preview request from the CMS has the format: HOST/_preview/ID/ENVIRONMENT
    if (requestedPath.indexOf(PREVIEW_URL_PATTERN) >= 0) {
      const pathParts = requestedPath.split('/');
      // The environment is the last part of the URL
      const environment = pathParts[pathParts.length - 1];
      apiEndpointUrl = serverConfig.cmsPreview.environments[environment.toLowerCase()] || cmsUrl;
      logger.info(`Preview environment - endpoint: ${environment} - ${apiEndpointUrl}`);
    }
    const requestDomain = serverConfig.api.domains[apiEndpointUrl.replace(/^https?:\/\//i, '')] || apiEndpointUrl;
    const requestedUrl = `${requestDomain}${requestedPath}${queryString}`;
    let apiUrl = `${apiEndpointUrl}${serverConfig.api.endpoints[type]}?url=${requestedUrl}`;
    if (exists(process.env.CMS_API_SIGNING_REQUIRED)) {
      apiUrl = `${apiUrl}`
        + `&client_id=${process.env.CMS_API_CLIENT_ID}`
        + `&signature=${generateApiSignature(requestedUrl, type)}`;
    }
    return apiUrl;
  }
  return null;
}
