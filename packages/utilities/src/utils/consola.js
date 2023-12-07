/**
 * @module utils/consola
 */

const messageLevels = {
  log: '\x1b[0m',
  warn: '\x1b[33m',
  success: '\x1b[32m',
  error: '\x1b[31m',
};

/**
 * Get `console` function with color by level
 * @private
 * @param {string} level console level
 * @returns {Function} that print to console with colors
 */
function getFnType(level) {
  /**
   * Create consola logger
   * @private
   * @param {...*} args - original console function arguments
   * @returns {Function} - that print to console with colors
   */
  const consola = (...args) => {
    const logger = console;
    const loggerLevel = level in console ? level : 'info';
    return logger[loggerLevel].call(this, messageLevels[level], ...args);
  };
  return consola;
}

/**
 * The `consola` object provides access to the browser's/node debugging console,
 * and exposes the same [methods]{@link https://developer.mozilla.org/en-US/docs/Web/API/Console}
 * but with colors on some such as `log`, `error`, `warn` and
 * and custom one `success` with info level.
 * @public
 * @example consola.success('a cool logger: %s', 'uvn')
 */
const consola = {
  /**
   * For general output of logging information.
   * You may use [string substitution]{@link https://developer.mozilla.org/en-US/docs/Web/API/console#Using_string_substitutions}
   * and additional arguments with this method.
   * @public
   * @memberof module:utils/consola
   * @method log
   */
  log: getFnType('log'),
  /**
   * Outputs an error message.
   * You may use [string substitution]{@link https://developer.mozilla.org/en-US/docs/Web/API/console#Using_string_substitutions}
   * and additional arguments with this method.
   * @public
   * @memberof module:utils/consola
   * @method error
   */
  error: getFnType('error'),
  /**
   * Outputs a warning message.
   * You may use [string substitution]{@link https://developer.mozilla.org/en-US/docs/Web/API/console#Using_string_substitutions}
   * and additional arguments with this method.
   * @public
   * @memberof module:utils/consola
   * @method warn
   */
  warn: getFnType('warn'),
  /**
   * Outputs a success message at info level, this is custom method not part of console API.
   * You may use [string substitution]{@link https://developer.mozilla.org/en-US/docs/Web/API/console#Using_string_substitutions}
   * and additional arguments with this method.
   * @public
   * @memberof module:utils/consola
   * @method success
   */
  success: getFnType('success'),
};

export default consola;
