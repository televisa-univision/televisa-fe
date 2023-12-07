/**
 * This is the base Webpack configuration file
 */
const path = require('path');
const webpack = require('webpack');
const loaders = require('@univision/fe-commons/dist/webpack/loaders');

const rootFolder = path.resolve(__dirname, '..');
const storybook = path.resolve(rootFolder, './.storybook');
const nodeModulesRoot = path.resolve(__dirname, '../../../node_modules');
const configuration = {
  module: loaders.get(false, nodeModulesRoot),
  resolve: {
    alias: {
      storybook,
      ...loaders.alias(nodeModulesRoot),
    }
  },
  devtool: 'source-map',
  node: {
    // To be able to use request module
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  }
};

module.exports = configuration;
