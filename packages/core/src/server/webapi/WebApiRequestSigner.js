import crypto from 'crypto';

import WebApiType from './WebApiType';

const WebApiRequestSigner = {
  /**
   * Generate a FeedSyn hash
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
  generateHash(requestedUrl, type = WebApiType.CONTENT, method = 'GET') {
    const hash = crypto.createHash('sha1');
    const hashCode = `${method}${process.env.CMS_API_CLIENT_ID}/web-api${type}?`
      + `client_id=${process.env.CMS_API_CLIENT_ID}&url=${requestedUrl}`
      + `${process.env.CMS_API_SECRET}`;

    hash.update(hashCode);
    return hash.digest('hex');
  },

  /**
   * Returns the signature required by the Web Api
   * @param {string} requestedUrl - Url requested from the webapp
   * @param {string} type - FeedSyn type ('page' or 'layout')
   * @param {string} method - HTTP method (ie: 'GET' or 'POST')
   * @returns {string}
   */
  sign(requestedUrl, type = WebApiType.CONTENT, method = 'GET') {
    return `&client_id=${process.env.CMS_API_CLIENT_ID}&signature=${this.generateHash(
      requestedUrl,
      type,
      method
    )}`;
  },
};

export default WebApiRequestSigner;
