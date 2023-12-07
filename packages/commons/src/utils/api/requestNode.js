import axios from 'axios';
import logger from '../logging/serverLogger';
import { isValidObject } from '../helpers';
import * as messages from '../../constants/messages';

const timeoutSeconds = 8;
const instance = axios.create();
instance.defaults.timeout = timeoutSeconds * 1000;

/**
 * Set Default options for request
 * @param {(Object|string)} options - request options or URL
 * @returns {Object}
 */
const getDefaultOptions = (options) => {
  let config = {};
  if (isValidObject(options)) {
    config = {
      ...options,
      params: options.qs || options.params,
      url: options.uri || options.url,
      method: options.method || 'GET',
      data: options.body || options.data,
    };
  } else if (typeof options === 'string') {
    config = {
      url: options,
    };
  }
  return config;
};

/**
 * Wrapper to request module with default
 * timeout and callback to logging the timeout error
 * @param {(Object|string)} options - request options or URL
 * @param {Function} callback - callback handler with error, res and body
 * @returns {Promise} request instance
 */
const RequestNode = (options) => {
  const config = getDefaultOptions(options);
  const { url } = config;
  return instance.request(config)
    .catch((err) => {
      const {
        code,
        message = messages.SERVER_REQUEST_ERROR,
        response: {
          status = 500,
          headers,
          data,
        } = {},
      } = err;

      if (code === 'ETIMEDOUT' || code === 'ESOCKETTIMEDOUT' || code === 'ECONNABORTED') {
        logger.error(`timeout error - code: ${code} message: ${message} url: ${url}`);
      }
      // custom error to avoid circular structure to JSON in err.response axios
      // https://github.com/axios/axios/issues/836
      const customError = new Error(message);
      customError.status = status;
      customError.url = url;
      customError.headers = headers;
      customError.payload = data;

      throw customError;
    });
};

export default RequestNode;
