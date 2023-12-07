/** Allowed logging levels */
export const loggingLevels = Object.freeze({
  error: 'error',
  warn: 'warn',
  info: 'info',
});

/**
 * Checks if provided logging level is allowed, if not it will fallback to error level
 * @param {string} level - logging level
 * @returns {string}
 */
export function getLoggingLevel(level) {
  return loggingLevels[level] || loggingLevels.error;
}

export default loggingLevels;
