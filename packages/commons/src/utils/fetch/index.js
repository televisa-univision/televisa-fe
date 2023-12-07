import request, { requestServer } from '../api/request';

/**
 * Isomorphic fetch switches between fetch & axios for client & server.
 * TODO: next.js use unfetch/node-fetch evaluate 'node-fetch'
 * to avoid unnecessary client dependencies from axios
 * @async
 * @param {string} url - url to fetch.
 * @param {Object} options - fetch options like method, headers etc.
 * @see https://fetch.spec.whatwg.org/#fetch-api
 * @returns {Promise<Object>}
 */
async function isomorphicFetch(url, options) {
  const fetchOpts = {
    uri: url,
    ...options,
  };
  if (typeof window === 'undefined') {
    return requestServer(fetchOpts);
  }

  return request(fetchOpts);
}

export default isomorphicFetch;
