const testsConfig = require('./tests.config');

module.exports = {
  ...testsConfig,
  haste: {
    defaultPlatform: 'ios',
    platforms: ['ios', 'native'],
  },
  moduleFileExtensions: ['ios.js', 'native.js', 'js', 'json'],
  testMatch: ['<rootDir>/src/**/__tests__/ios/*.spec.js'],
  coverageDirectory: '<rootDir>/coverage/ios',
};
