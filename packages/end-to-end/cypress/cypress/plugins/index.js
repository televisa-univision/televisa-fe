const SETTINGS = require('../config');

/**
 * test settings
 * @param {Object} target - ad tag
 * @returns {Object}
 */
function getTestSettings(target) {
  switch (target) {
    case SETTINGS.MOBILE:
      return {
        userAgent: SETTINGS.MOBILE_ANDROID_AGENT,
        testFiles: SETTINGS.MOBILE_TEST_FILE,
        viewportWidth: SETTINGS.MOBILE_SIZE.viewportWidth,
        viewportHeight: SETTINGS.MOBILE_SIZE.viewportHeight,
      };
    default:
    case SETTINGS.DESKTOP:
      return {
        userAgent: SETTINGS.DESKTOP_AGENT,
        testFiles: SETTINGS.DESKTOP_TEST_FILE,
        viewportWidth: SETTINGS.DESKTOP_SIZE.viewportWidth,
        viewportHeight: SETTINGS.DESKTOP_SIZE.viewportHeight,
      };
  }
}

module.exports = (on, config) => {
  const { env: { target }, baseUrl } = config;

  // enables js loading for fixtures
  // there's a current bug tho' and the js files won't reload,
  // untill you close cypress
  on('task', {
    fixture(file) {
      // eslint-disable-next-line import/no-dynamic-require, global-require
      const fileToLoad = require(`../fixtures/${ file }.js`);
      return fileToLoad(baseUrl);
    },
  });

  return Object.assign({}, config, getTestSettings(target));
};
