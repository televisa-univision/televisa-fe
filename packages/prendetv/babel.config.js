const config = require('../../babel.config');

// This file is required because the build and jest run per-package and
// without this file babel-loader and babel-jest requires extra configuration
// see: https://babeljs.io/docs/en/config-files#jest
module.exports = config;
