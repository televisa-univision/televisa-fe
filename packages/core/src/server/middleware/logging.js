import serverLogger from 'app/utils/logging/serverLogger';
import uuid from 'uuid/v1';
import onFinished from 'on-finished';
import { exists } from '@univision/fe-commons/dist/utils/helpers';

/**
 * Returns the loglevel string based on the response status code
 * @param {Object} res current response object
 * @returns {string} loglevel
 */
const getLogLevel = (res) => {
  let logLevel = 'info';
  if (res?.statusCode >= 400) {
    logLevel = 'error';
  }
  return logLevel;
};

/**
 * Provides additional error information to logging middleware
 * @private
 * @param {Object} res request response
 * @property {string} res.body deserialized request body response
 * @property {string} res.errorMessage error information possibly added by another middleware
 * @returns {Object}
 */
export const getErrorExtraInfo = (res) => {
  if (res?.statusCode >= 400) {
    const result = {};
    const { errorMessage } = res;
    if (errorMessage) result.errorMessage = errorMessage;
    try {
      const body = res.body ? JSON.parse(res.body) : null;
      result.body = body;
    } catch (e) {
      result.body = `Body content-type is not JSON. ${e}`;
    }
    return result;
  }
  return undefined;
};

/**
 * Logging middleware that's in charge of logging every request
 * that comes in to the application
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 */
const logger = (req, res, next) => {
  const requestId = uuid();
  res.header('X-Request-Id', requestId);

  /**
   * Callback to log requests
   */
  function logRequest() {
    if (exists(req) && exists(res)) {
      const url = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
      const data = {
        status: res.statusCode,
        requestId,
        url,
        remoteAddress: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        method: req.method,
        httpVersion: req.httpVersion,
        errorExtra: getErrorExtraInfo(res),
        ...req.headers,
      };
      serverLogger[getLogLevel(res)](`Accepted request for ${url}`, data);
    }
  }

  onFinished(res, logRequest);
  next();
};

export default logger;
