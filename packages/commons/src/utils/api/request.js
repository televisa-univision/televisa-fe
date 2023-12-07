import 'whatwg-fetch'; // fetch polyfill for IE 11
import getKey from '@univision/fe-utilities/helpers/object/getKey';
import isValidFunction from '@univision/fe-utilities/helpers/common/isValidFunction';
import * as messages from '../../constants/messages';

/**
 * convert an object to URL query parameters
 * @param   {string} uri the base URL
 * @param   {Object} obj the parameters to stringify
 * @returns {string} the new URL
 */
export const queryBuilder = (uri, obj = {}) => {
  const params = [];
  const keys = Object.keys(obj);
  if (!uri || !keys.length) return uri;

  keys.forEach((prop) => {
    const val = obj[prop];
    if (val === null || val === undefined || val === '') return;
    if (prop === 'url') {
      params.push(`${prop}=${val}`);
    } else {
      params.push(`${prop}=${encodeURIComponent(val)}`);
    }
  });

  // Does the uri already have a query?
  const uriQ = uri + (uri.indexOf('?') === -1 ? '?' : '&');

  return uriQ + params.join('&');
};

/**
 * Wrapper around native fetch for easier client-side API calls
 * @param  {Object} options         options of the request
 * @param  {string} options.method  the REST method of the request
 * @param  {string} options.uri     the API endpoint of the request
 * @param  {Object} options.body    the payload of the request
 * @param  {Object} options.params  the query string of the request
 * @param  {Object} options.headers headers to send along with the request
 * @returns {Promise}               a promise that returns the response body or response error
 */
async function request({
  method: _method = 'GET',
  uri,
  body: _body,
  params,
  headers,
  mode,
}) {
  let body = _body;
  const method = _method.toUpperCase();
  let url = uri;

  if (body) body = JSON.stringify(body);
  if (params) url = queryBuilder(url, params);
  const opts = { method };
  if (headers) {
    opts.headers = headers;

    if (headers.Authorization) {
      opts.credentials = 'include';
    }
  }
  if (body) opts.body = body;
  if (mode) opts.mode = mode;

  try {
    const response = await fetch(url, opts);

    // try to get response as JSON first, then fallback to text
    const responseBody = await response.json()
      .catch(() => response.text())
      .catch(() => null);

    /**
     * If ok flag is false, then throw error similar to {@link ./requestNode}
     */
    if (!response?.ok) {
      const {
        statusText,
        status,
        headers: responseHeaders,
      } = response;

      const responseErr = new Error(statusText);
      responseErr.status = status;
      responseErr.url = url;
      responseErr.headers = responseHeaders;
      responseErr.payload = responseBody;

      throw responseErr;
    }

    return responseBody;
  } catch (e) {
    throw e;
  }
}

/**
 * Wrapper around wrapper for client-side API/AJAX calls
 * Sometimes, credentials are hard-coded in API request endpoints and need to be sripped out
 * This rewrites the request URI such that credentials will be seamlessly removed
 * @param {Object} args to pass to request()
 * @param {string} prefix to use for rewritten requests
 * @returns {Promise} from request()
 */
export async function requestWithBasicAuth(args = {}, prefix = '//') {
  if (!args || !Object.keys(args).length || !args.uri) { // blank object
    return false; // no args
  }

  const localArgs = args;
  const hostPattern = /\/\/([^/]+)/g;
  let host = localArgs.uri.match(hostPattern);

  localArgs.headers = localArgs.headers || {};

  if (!!host && host.length) {
    host = host.shift().substring(prefix.length);
  } else {
    host = '';
  }

  if (host.indexOf('@') >= 0) { // url has hardcoded credentials -> BAD
    host = host.split('@'); // xxx:yyy@host.com -> ['xxx:yyy', 'host.com']
    localArgs.headers.Authorization = `Basic ${btoa(host.shift())}`;
    localArgs.uri = localArgs.uri.replace(hostPattern, prefix + host.shift());
  }

  return request(localArgs);
}

/**
 * Wrapper around request on node for server-side API calls
 * @param {(string|Object)} opts - the request options or url to fetch
 * @param  {string} opts.method - the REST method of the request
 * @param  {string} opts.uri - the API endpoint of the request
 * @param  {Object} opts.body - the payload of the request
 * @param  {Object} opts.params - the query string of the request
 * @param  {Object} opts.headers - headers to send along with the request
 * @returns {Promise} - a promise that returns the response body or response error
 */
export async function requestServer(opts) {
  // eslint-disable-next-line import/no-cycle
  const requestModule = await import(/* webpackChunkName: "requestNode" */ './requestNode');
  // eslint-disable-next-line import/no-cycle
  const loggerModule = await import(/* webpackChunkName: "requestNode" */ '../logging/serverLogger');
  const requestFn = getKey(requestModule, 'default', requestModule);
  const { error: errorLogger } = getKey(loggerModule, 'default', loggerModule);
  if (isValidFunction(requestFn)) {
    if (opts.fullData) {
      return requestFn(opts);
    }
    return requestFn(opts)
      .then(({ data }) => data)
      .catch((err) => {
        errorLogger({ message: `${messages.SERVER_REQUEST_ERROR}: ${err.message}`, url: err.url });
        throw err;
      });
  }
  // trying to log the error, but if dynamic import fails the logger also fails
  if (errorLogger) {
    errorLogger({ message: `${messages.SERVER_DYNAMIC_IMPORT_ERROR}` });
  }
  return null;
}

export default request;
