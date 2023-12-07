/* eslint-disable no-console */
// TODO: This will be moved to Utils package eventually

const consoleMessageTypes = {
  log: '\x1b[30m',
  warn: '\x1b[33m',
  success: '\x1b[32m',
  error: '\x1b[31m',
};

/**
 * Create a console function that can print in colors
 * @param {string} type console type
 * @returns {Function} that print to console with colors
 */
const log = (type) => {
  return (...args) => console.log(consoleMessageTypes[type], ...args);
};

const colorConsole = {
  log: log('log'),
  error: log('error'),
  warn: log('warn'),
  success: log('success'),
};

module.exports = colorConsole;
