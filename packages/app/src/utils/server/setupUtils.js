import fetch from '@univision/fe-commons/dist/utils/fetch';

import { appConfig } from '../../config';
import { dateFilters, typeFilters } from '../../components/contentTypes/Search/filters';

/**
 * Determine if the path is the Android app url /.well-known/assetlinks.json
 *  which shouldn't be ignored.
 * @param {string} path - request page relative path
 * @returns {boolean} true if it is /.well-known/assetlinks.json
 */
export function isWellKnownAssetLink(path) {
  return appConfig.wellKnownPattern.test(path?.toLowerCase());
}

/**
 * Determine if the path from the request should be ignored
 * baser on {@link appConfig.ignoredPagePaths} regexp
 * to avoid send false positives request to syndicator.
 * @param {string} path - request page relative path
 * @returns {boolean} true if should be ignored
 */
export function shouldIgnoreRequest(path) {
  if (isWellKnownAssetLink(path)) {
    return false;
  }
  const pattern = new RegExp(appConfig.ignoredPagePaths.join('|'));
  return !!pattern.test(path?.toLowerCase());
}

/**
 * Updates page state with not found data
 * @param {Object} pageData from api
 * @param {string} path from client request
 * @returns {Object}
 */
export function setNotFoundProps(pageData, path) {
  const currentData = { ...pageData };

  if (!currentData.data) {
    currentData.data = {};
  }
  currentData.notFoundPath = path?.split('?')[0]; // remove query params
  currentData.data.adSettings = {
    adTagValue: 'univision_section_global/search',
  };
  currentData.data.typeFilters = typeFilters;
  currentData.data.dateFilters = dateFilters;

  return currentData;
}

/**
 * Checks if open graph image is valid by checking its
 * status code
 * @param {Object} data page data
 * @param {boolean} isServer is server side
 * @returns {boolean}
 */
export async function isOpenGraphImageValid(data, isServer) {
  // verify if open graph image is valid
  const ogImageUrl = data?.metaTagData?.openGraph?.imageUrl ?? '';
  let hasValidOgImage = true;
  if (ogImageUrl && isServer) {
    try {
      await fetch(ogImageUrl);
    } catch (e) {
      hasValidOgImage = false;
    }
  }

  return hasValidOgImage;
}
