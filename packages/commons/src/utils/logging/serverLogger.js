import winston from 'winston';
import Store from '../../store/store';
import { getRequestId } from '../../store/storeHelpers';
import packageJson from '../../../package.json';

/**
 * Wrapper class for Server Side Logging library
 */
export class ServerLogger {
    /**
   * Constructor implementing a logger singleton
   */
  constructor() {
    this.log_data = null;

    const custom = winston.format(info => ({
      ...info,
      requestId: info.requestId || getRequestId(Store),
      release: packageJson.version,
    }))();

    const logger = winston.createLogger({
      transports: [
        new winston.transports.Console(),
      ],
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json(),
        winston.format.timestamp(),
        custom,
      ),
    });

    this.logger = logger;
  }

  /**
   * Constructor implementing a logger singleton
   * @returns {Object} Logger object
   */
  getLogger() {
    return this.logger;
  }

  /**
   * Info msg
   * @param {string} message message to display
   */
  async info(message) {
    this.logger.log('info', message);
  }

    /**
   * Debug msg
   * @param {string} message message to display
   */
  async debug(message) {
    this.logger.log('debug', message);
  }

    /**
   * Error msg
   * @param {string} message message to display
   */
  async error(message) {
    this.logger.log('error', message);
  }
}

export default new ServerLogger().getLogger();
