import winston from 'winston';

/**
 * Wrapper for Server Side Logging library
 */
class ServerLogger {
  /**
   * New server side logger object with transport settings
   */
  constructor() {
    const transports = [ServerLogger.consoleTransport];
    const { createLogger: Winston } = winston;
    return new Winston({ transports });
  }

  /**
   * Holds the time format to be displayed on each log file/console entry
   * @returns {string} returns UTC String representation of current date.
   */
  static tsFormat = () => (new Date()).toUTCString();

  /**
   * Standard console transport
   */
  static consoleTransport = new winston.transports.Console({
    timestamp: ServerLogger.tsFormat,
    level: 'debug',
    handleExceptions: true,
    json: false,
    prettyPrint: true,
    colorize: true,
  });
}

/**
 * Export logger as a singleton
 */
export default new ServerLogger();
