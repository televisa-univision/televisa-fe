import fetch from '@univision/fe-commons/dist/utils/fetch';
import consoleLogger from '@univision/fe-utilities/utils/consola';

import WebApiRequest from '../../utils/webapi/WebApiRequest';

/**
 * Fetch page data from WebApi
 * @public
 * @param {string} path page request from next.js
 * @param {Object} options to be passed to the page api context
 * @returns {Object} initial props/state
 */
export async function getPage(path, {
  config,
  params = {},
  siteName,
  country,
} = {}) {
  try {
    const webApiUrl = WebApiRequest.getWebApiUrl(path, { config, siteName, country });
    consoleLogger.log(`[nextjs]: Fetching url - ${webApiUrl}`);
    return await fetch(webApiUrl, { params });
  } catch (error) {
    const { message, status, payload } = error;
    consoleLogger.log(`[nextjs]: Error fetching - ${message} status: ${status}`);
    return { message, status, ...payload?.data };
  }
}

/**
 * Fetch content data from WebApi
 * @public
 * @param {string} url - absolute URL to make the request
 * @param {Object} options - to be passed to the request
 * @param {string} options.contentUrl - domain URL content to perform the request
 * @returns {Object} response
 */
export async function getContent(url, { contentUrl, params } = {}) {
  try {
    const webApiParams = WebApiRequest.getWebApiParams(url, params);
    const response = await fetch(contentUrl, {
      params: webApiParams,
    });
    return response;
  } catch (error) {
    return error;
  }
}

export default getPage;
