import isValidString from '@univision/fe-utilities/helpers/common/isValidString';

import request from '../api/request';
import config from '../../config';

import { loggingLevels, getLoggingLevel } from './loggingLevels';

const CLIENT_SIDE_LOGGING_ENDPOINT = 'client-side-logging';

/**
 * Encode a base64 so it can be used in a request url.
 * @param {string} base64Input Base64 string
 * @returns {string}
 */
export const urlEncode = (base64Input) => {
  if (!isValidString(base64Input)) {
    return '';
  }
  return base64Input.replace(/\+/g, '.').replace(/\//g, '_').replace(/=/g, '-');
};

/**
 * Decode a base64 so it can be used in a request url.
 * @param {string} base64Input Base64 string
 * @returns {string}
 */
export const urlDecode = (base64Input) => {
  if (!isValidString(base64Input)) {
    return '';
  }
  return base64Input.replace(/\./g, '+').replace(/_/g, '/').replace(/-/g, '=');
};

/**
 * Logs information, warnings and errors client side
 * @param {Object} options - options for the method
 * @param {*} error - error to be reported
 * @param {string} info - info about the error to be reported
 * @param {string} level - level to be reported (info, warn, error)
 * @returns {Promise}
 */
export const clientLevelLogging = ({
  error, info, level = loggingLevels.error,
}) => {
  // Ignore IE and unit test (jsdom)
  if (
    !global.window?.navigator?.userAgent
    || /MSIE|Edge|Trident|jsdom/.test(global.window.navigator.userAgent)
  ) {
    return Promise.resolve();
  }
  /* eslint no-underscore-dangle: 0 */
  const proxy = window?.__NEXT_DATA__?.props?.pageProps?.initialState?.page?.config?.proxy || '';
  const errorLog = error || new Error('Missing error information');
  const message = errorLog?.message || errorLog;
  const errorMessage = proxy ? `[nextjs] ${message}` : message;
  const encodedMessage = urlEncode(btoa(errorMessage));
  const stack = urlEncode(btoa(errorLog?.stack || ''));
  const loggingLevel = getLoggingLevel(level);

  /* eslint-disable no-console */
  console[loggingLevel](error);
  console.info(info);

  return request({
    uri: `${proxy}${config.routes.proxy.uncached}/${CLIENT_SIDE_LOGGING_ENDPOINT}`,
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: {
      level: loggingLevel,
      message: encodedMessage,
      stackTrace: stack,
    },
  });
};

/**
 * Legacy wrapper for client logging
 * @param {*} error - error to be reported
 * @param {*} info - information about the error thrown
 * @returns {Promise}
 */
const clientLogging = (error, info) => {
  return clientLevelLogging({ error, info });
};

export default clientLogging;
