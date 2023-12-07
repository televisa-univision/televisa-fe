import fetch from '@univision/fe-commons/dist/utils/fetch';
import consoleLogger from '@univision/fe-utilities/utils/consola';
import { FROM, NEXTJS } from '@univision/fe-commons/dist/constants/nextjs';
import { PRENDETV_SITE } from '@univision/fe-commons/dist/constants/sites';

import HttpError from '../../utils/page/HttpError';
import { contentDomains } from '../../config/contentApiUrls';

/**
 * Fetch contents from Web API
 *
 * @param {Object} pathObject Object wit the path and request parameters.
 * @param {string} pathObject.path page request from next.js
 * @param {string} pathObject.requestParams page request from next.js
 * @param {Object} config options to be passed
 * @returns {Object} initial state
 */
async function getPage({ path, requestParams }, config) {
  const { apiEnv, syndicator: { content: syndicatorContent } } = config;
  const contentUrl = contentDomains[PRENDETV_SITE][apiEnv];

  const siteRegExp = new RegExp(`(?:^|/)${PRENDETV_SITE}(?:$|/|(\\?|\\#))`);
  const pathToResolve = path.replace(siteRegExp, '/$1');
  const contentUrlToResolve = `${contentUrl}${pathToResolve || '/'}`;

  const webApiUrl = new URL(syndicatorContent);
  webApiUrl.search = new URLSearchParams({
    url: contentUrlToResolve,
    [FROM]: NEXTJS,
    ...requestParams,
  });

  consoleLogger.log(`[nextjs]: Fetching prendetv api url - ${webApiUrl}`);
  const response = await fetch(webApiUrl.toString()).catch((reason) => {
    const { status } = reason;
    consoleLogger.log(`[nextjs]: Error: ${status} catched on prendetv api url - ${webApiUrl}, ${reason}`);
    const error = new HttpError(reason,
      {
        statusCode: status,
        data: {
          code: status,
          reason,
        },
      });
    return error;
  });

  return response;
}

export default getPage;
