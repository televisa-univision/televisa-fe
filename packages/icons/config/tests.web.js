const testsConfig = require('./tests.config');

module.exports = {
  ...testsConfig,
  haste: {
    defaultPlatform: 'web',
    platforms: ['web'],
  },
  moduleFileExtensions: ['web', 'js', 'json'],
  testMatch: ['<rootDir>/src/**/__tests__/web/*.spec.js'],
  testEnvironment: 'jest-environment-jsdom-global',
  coverageDirectory: '<rootDir>/coverage/web',
};
