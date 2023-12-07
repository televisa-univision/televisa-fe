const fs = require('fs');
const path = require('path');
const packageJson = require('../package.json');

const reactNativeWebPath = 'node_modules/react-native-web/dist/cjs';
const pkgFolder = path.resolve(__dirname, '../');
const rootFolder = path.resolve(__dirname, '../../../');
let reactNativeWebMapper = path.resolve(pkgFolder, reactNativeWebPath);

if (!fs.existsSync(reactNativeWebMapper)) {
  reactNativeWebMapper = path.resolve(rootFolder, reactNativeWebPath);
}

module.exports = {
  rootDir: '../',
  moduleNameMapper: {
    '^react-native$': reactNativeWebMapper,
    "^@univision\\/([^/]+)/(?!(dist|src|esm))(.*)": "@univision/$1/esm/$3",
    '^config(.*)$': '<rootDir>/config$1',
  },
  modulePathIgnorePatterns: [
    '<rootDir>/dist/',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|react-native-linear-gradient|react-native-svg)/)',
  ],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/config/',
    '<rootDir>/doc/',
    '<rootDir>/dist/',
    'node_modules/',
    '__tests__',
  ],
  ...packageJson.jest,
};
