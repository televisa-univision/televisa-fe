import statusCodes from '@univision/fe-commons/dist/constants/statusCodes';

/**
 * HTTP error response objects
 * @extends Error
 */
class HttpError extends Error {
  /**
   * Create new HttpError object and extend error data
   * @constructor
   * @param {(string|Error)} err - error message or Error instance
   * @param {Object} options - additional data or options to reference the error
   * @param {number} [options.statusCode=500] - status code number
   * @param {Object} [options.data] - additional information about the error
   * @param {Object} [options.constructor] - to reference the error in a particular constructor
   */
  constructor(err, options = {}) {
    let message;
    let stack;

    if (err instanceof Error) {
      ({ stack } = err);
      message = options.message || err.message;
    } else if (typeof err === 'string') {
      message = err;
    }

    super(message);

    const { statusCode = 500, data, constructor = this.constructor } = options;

    // Keep the our class name
    this.name = this.constructor.name;
    Object.defineProperty(this, 'typeof', { value: constructor });

    // The stack to external called
    Error.captureStackTrace(this, constructor);
    if (stack) {
      // Keep the original stack if a error instance
      this.stack = `${this.stack}\n${stack}`;
    }
    this.data = data;
    this.format(statusCode, message);
  }

  /**
   * Format error payload/data
   * @param {number} statusCode - error/response status code
   * @param {string} message - error to expose in payload and in internal error instance,
   * on error 500 we hide this message on the payload
   * @returns {Object}
   */
  format (statusCode, message) {
    let code = parseInt(statusCode || this.code, 10);

    if (!code) {
      code = 500;
    }

    const [type, status] = statusCodes[code] || [];

    this.code = code;
    this.type = type || 'UNKNOWN';
    this.payload = {
      statusCode: code,
      error: status || 'Unknown error',
    };

    if (!this.message) {
      this.message = this.payload.error;
    }

    if (code === 500) {
      // Hide the internal error from response
      this.payload.message = 'Internal server error occurred';
    } else {
      this.payload.message = message || this.message;
    }

    return this;
  }
}

/**
 * Get HttpError object with Bad Request 400
 * @param {string} message - error message
 * @param {Object} data - additional error information
 * @returns {HttpError}
 */
HttpError.badRequest = function badRequest(message, data) {
  return new HttpError(message, { statusCode: 400, data, constructor: badRequest });
};

/**
 * Get HttpError object with Forbidden 403
 * @param {string} message - error message
 * @param {Object} data - additional error information
 * @returns {HttpError}
 */
HttpError.forbidden = function forbidden(message, data) {
  return new HttpError(message, { statusCode: 403, data, constructor: forbidden });
};

/**
 * Get HttpError object with Not Found 404
 * @param {string} message - error message
 * @param {Object} data - additional error information
 * @returns {HttpError}
 */
HttpError.notFound = function notFound(message, data) {
  return new HttpError(message, { statusCode: 404, data, constructor: notFound });
};

/**
 * Get HttpError object with Internal Error
 * @param {string} message - error message
 * @param {Object} data - additional error information
 * @param {number} [statusCode=500] - custom internal error status code
 * @returns {HttpError}
 */
HttpError.internal = function internal(message, data, statusCode = 500) {
  return new HttpError(message, { statusCode, data, constructor: internal });
};

export default HttpError;
