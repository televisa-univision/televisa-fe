/**
 * This is the base Webpack configuration file
 */
const path = require('path');
const webpack = require('webpack');
const loaders = require('@univision/fe-commons/dist/webpack/loaders');

const nodeModulesRoot = path.resolve(__dirname, '../../../node_modules');
const configuration = {
  module: loaders.get(false, nodeModulesRoot),
  devtool: 'source-map',
  resolve: {
    alias: loaders.alias(nodeModulesRoot),
  },
  node: {
    // To be able to use request module
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  }
};

module.exports = configuration;
