/**
 * This is the base Webpack configuration file
 */
const path = require('path');
const webpack = require('webpack');
const loaders = require('@univision/fe-commons/dist/webpack/loaders');

const storybook = path.resolve(__dirname, './.storybook');
const nodeModulesRoot = path.resolve(__dirname, '../../../node_modules');

const configuration = {
  // Default source map option
  module: loaders.get(false, nodeModulesRoot),
  resolve: {
    modules: ['node_modules'],
    alias: {
      storybook,
      "react-native": "react-native-web",
      "@storybook/react-native": "@storybook/react",
      ...loaders.alias(nodeModulesRoot),
    },
    extensions: [".web.js", ".js", ".json", ".web.jsx", ".jsx"]
  },
  node: {
    // To be able to use request module
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  }
};

module.exports = configuration;
