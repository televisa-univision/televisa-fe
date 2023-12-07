import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';
import contentTypes from '@univision/fe-commons/dist/constants/contentTypes.json';
import fetch from '@univision/fe-commons/dist/utils/fetch';

/**
 * Temporal 'fake' content type for apps backward compatibility
 */
const BASIC_SOCCER_MATCH = 'basicsoccermatch';

/**
 * Modify page data due a dummy content type added for non-opta games
 * for backward compatibility with apps.
 * @param {Object} pageData - BEX page data
 * @returns {Object} modified page data
 */
function modifyPageData(pageData) {
  const newData = pageData;
  if (!newData?.data.type) {
    return newData;
  }

  // TODO: replace BASIC_SOCCER_MATCH is a dummy/fake content type added for backward compatibility
  // for support non-opta games in old mobile app versions and will be removed
  if (newData.data.type === BASIC_SOCCER_MATCH) {
    newData.data.type = contentTypes.SOCCER_MATCH;
  }

  if (!isValidArray(newData.data.widgets)) {
    return newData;
  }

  const { widgets } = newData.data;
  for (let i = 0, len = widgets.length; i < len; i += 1) {
    const { contents } = widgets?.[i];

    if (isValidArray(contents)) {
      for (let c = 0, clen = contents.length; c < clen; c += 1) {
        if (contents[c]?.type === BASIC_SOCCER_MATCH) {
          contents[c].type = contentTypes.SOCCER_MATCH;
        }
      }
    }
  }

  return newData;
}

/**
 * Page API utility to interact with FeedSyn Page Feed
 * Static methods only, this is not meant to be instantiated
 */
class PageApi {
  /**
   * Fetch the headers for an URL.
   * @param {string} apiUrl - WebApi URL
   * @returns {Promise}
   */
  static getHeaders(apiUrl) {
    return fetch(apiUrl, { method: 'head', fullData: true });
  }

  /**
   * Get page content from FeedSyn API
   * @param {string} apiUrl - FeedSyn API Url
   * @param {function} onError - callback for any error that comes up.
   * @returns {Promise}
   */
  static getPage(apiUrl, onError) {
    return fetch(apiUrl, { fullData: true })
      .then(({ data }) => modifyPageData(data))
      .catch((err) => {
        const message = new Error(`Got failure from page API [${err.status}] ${err.message} url: ${err.url}`);
        if (onError) {
          onError(err);
        }
        return {
          data: {
            error: message,
            status: err.status,
          },
        };
      });
  }
}

export default PageApi;
