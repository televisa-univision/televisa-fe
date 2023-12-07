import url from 'url';

import Store from '../../../store/store';
import { getConfig, getDomain } from '../../../store/storeHelpers';
import { getKey, isRelativeUrl } from '../../helpers';
import { requestWithBasicAuth } from '../request';

/**
 * Limit the redirects to 1. There are some edges cases
 * where the CMS has a redirect to the same permalink.
 * Set a hard limit to avoid infinite recursive calls.
 */
export const MAX_REDIRECTS_TO_FOLLOW = 1;

export const FETCH_TYPE_WEB_APP_STATE = 'webAppState';
export const FETCH_TYPE_CONTENT = 'content';
export const FETCH_TYPE_LOCAL_MARKET_CONTENT = 'localMarketContent';

/**
 * Fetch a content using the web-api
 * @param {string} contentUri Content URI
 * @param {string} apiType API Type
 * @param {Object} extraParams - Additional request parameter
 * @param {number} recursiveCount - Current recursive calls
 * @returns {Promise.<void>}
 */
export default async function fetch(
  contentUri,
  apiType = FETCH_TYPE_CONTENT,
  extraParams = {},
  recursiveCount = 0
) {
  const uri = getConfig(Store, `syndicator.${apiType}`);
  const { headers, ...paramsObj } = { ...extraParams };
  let params = { ...paramsObj };

  // The web-api supports fetching content by id, it has a higher precedence than the url
  // parameter
  if (!extraParams.id) {
    const {
      protocol,
      host,
      pathname,
      query,
    } = url.parse(contentUri, true);
    const domain = isRelativeUrl(contentUri) ? getDomain(Store) : url.format({ protocol, host });
    params = Object.assign(params, {
      url: `${domain}${pathname}`,
      ...query,
    });
  }
  const response = await requestWithBasicAuth({ uri, params, headers });
  const data = getKey(response, 'data', {});
  if (data.type === 'redirectdata' && recursiveCount < MAX_REDIRECTS_TO_FOLLOW) {
    return fetch(data.url, apiType, extraParams, recursiveCount + 1);
  }
  return data;
}

/**
 * Facade for {@code fetch} to fetch a content by uid.
 * @param {string} id Content id
 * @param {string} apiType API type
 * @returns {Promise<void>}
 */
export async function fetchById(id, apiType = 'content') {
  return fetch('', apiType, { id });
}
