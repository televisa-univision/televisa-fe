import fetch from '@univision/fe-commons/dist/utils/fetch';
import consoleLogger from '@univision/fe-utilities/utils/consola';
import { UNIVISION_SITE } from '@univision/fe-commons/dist/constants/sites';

/**
 * Returns the endpoint to the web archive API
 * @param {string} path - path to be requested
 * @param {Object} options - additional options
 * @returns {string}
 */
function getArchiveUrl(path, options) {
  const {
    siteName = UNIVISION_SITE,
    config,
  } = options;

  return `${config?.syndicator?.archive}/${siteName}/${path}`;
}

/**
 * Fetch content from Archives API
 * @param {string} path page request from next.js
 * @param {Object} config options to be passed to the archive api
 * @returns {Object} initial state
 */
async function getArchiveContent(path, { params = {}, siteName, config }) {
  try {
    const archiveUrl = getArchiveUrl(path, { siteName, config });
    consoleLogger.log(`[nextjs]: Fetching ${siteName} archive url - ${archiveUrl}`);
    const response = await fetch(archiveUrl, { params });

    return response;
  } catch (error) {
    return error;
  }
}

export default getArchiveContent;
