import request from 'request'; // eslint-disable-line
import Promise from 'bluebird';

import mockApiData from './mockPageApiData.json';

/**
 * Mocked Page API utility to mock interaction with FeedSyn Page Feed
 * Static methods only, this is not meant to be instantiated
 */
class PageApi {
  /**
   * Get page content from FeedSyn API
   * @param {string} apiUrl - FeedSyn API Url
   * @returns {Promise}
   */
  static getPage(apiUrl) {
    return new Promise((resolve, reject) => {
      process.nextTick(() => {
        if (apiUrl) {
          resolve(mockApiData);
        } else {
          /* eslint prefer-promise-reject-errors: "error" */
          reject(new Error('no apiURL'));
        }
      });
    });
  }
}

export default PageApi;
