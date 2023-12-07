const testsConfig = require('./tests.config');

module.exports = {
  ...testsConfig,
  haste: {
    defaultPlatform: 'web',
    platforms: ['android', 'native'],
  },
  moduleFileExtensions: ['android.js', 'native.js', 'js', 'json'],
  testMatch: ['<rootDir>/src/**/__tests__/android/*.spec.js'],
  coverageDirectory: '<rootDir>/coverage/android',
};
