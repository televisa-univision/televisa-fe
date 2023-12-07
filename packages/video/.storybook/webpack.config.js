/**
 * This is the base Webpack configuration file
 */
const path = require('path');
const webpack = require('webpack');
const loaders = require('@univision/fe-commons/dist/webpack/loaders');

// Package root
const rootFolder = path.resolve(__dirname, '..');
// Used for webpack aliases
const appPath = path.resolve(rootFolder, './src/app');
const configPath = path.resolve(rootFolder, './config');
const componentsPath = path.resolve(rootFolder, './src/app/components');
const storybookPath = path.resolve(rootFolder, './.storybook');
const nodeModulesRoot = path.resolve(__dirname, '../../../node_modules');

const configuration = {
  module: loaders.get(false, nodeModulesRoot),
  resolve: {
    alias: {
      app: appPath,
      config: configPath,
      components: componentsPath,
      storybook: storybookPath,
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
