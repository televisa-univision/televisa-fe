/**
 * This is the base Webpack configuration file
 */
const path = require('path');
const webpack = require('webpack');
const loaders = require('@univision/fe-commons/dist/webpack/loaders');

// Package root
const rootFolder = path.resolve(__dirname, '..');
// Used for webpack aliases
const app = path.resolve(rootFolder, './src/app');
const serverPath = path.resolve(rootFolder, './src/server');
const storybook = path.resolve(rootFolder, './.storybook');
const components = path.resolve(app, './components');
const nodeModulesRoot = path.resolve(__dirname, '../../../node_modules');

const configuration = {
  module: loaders.get(false, nodeModulesRoot),
  resolve: {
    alias: {
      app,
      server: serverPath,
      components,
      storybook,
      ...loaders.alias(nodeModulesRoot),
    }
  },
  node: {
    // To be able to use request module
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  }
};

module.exports = configuration;
