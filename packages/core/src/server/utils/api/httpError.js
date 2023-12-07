import getKey from '@univision/fe-utilities/helpers/object/getKey';
import loggingLevels from '@univision/fe-commons/dist/utils/logging/loggingLevels';

/**
 * HTTP Error
 * Custom Http Error to capture the status code for node
 * @access public
 * @extends {Error}
 */
export default class HttpError extends Error {
  /**
   * HTTP Error constructor
   * @param {Object} data error info data
   * @param {number} status http status code
   */
  constructor(data, status) {
    super(getKey(data, 'message', ''));
    this.context = {
      url: getKey(data, 'url', ''),
      statusCode: status,
      stack: getKey(data, 'stack', ''),
      level: getKey(data, 'level', loggingLevels.error),
    };
  }
}
