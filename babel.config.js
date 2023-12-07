'use strict';
const path = require('path');

/**
 * Check if babel loader is used
 * @param {Object} caller - babel internal called
 * @returns {boolean}
 */
function getBabelCaller(caller) {
  const callerName = caller && caller.name;
  return {
    'babel-loader': 'loader',
    'babel-jest': 'jest',
    '@babel/register': 'register',
    '@babel/cli': 'cli',
  }[callerName] || callerName;
}

/**
 * Check is should keep comments like webpack chunk names
 * @param {boolean} comments - true should keep all comments
 * @returns {boolean}
 */
function shouldPrintComment(comments) {
  return value => (comments || /@license|@preserve|webpack[A-Z]\w/.test(value));
}

/**
 * Get babel configuration for the UVN packages
 * @param {Object} api -  object exposes everything Babel itself
 * exposes from its index module, along with config-file specific APIs
 * @param {Function} modifier - callback to modify/extend babel configuration
 * the callback receives 'baseConfig' with the pre-setup babel config and
 * 'babelEnv' with custom babel env settings like 'callerType', 'pkg' and 'preset-env' data
 * and babel 'api'
 * @returns {Object}
 */
module.exports = function babelConfig(api, modifier) {
  const env = api.env();
  const { TARGET, DEPLOY_ENV } = process.env;
  const pkg = path.basename(process.cwd());
  const callerType = api.caller(getBabelCaller);
  const envOpts = {
    corejs: '2',
    modules: false,
    targets: '> 0.05% in my stats',
    useBuiltIns: 'usage',
  };
  const presets = [
    '@babel/react',
  ];
  const basePlugins = [
    '@babel/proposal-object-rest-spread',
    // Stage 0
    '@babel/proposal-function-bind',
    // Stage 1
    '@babel/proposal-export-default-from',
    // Stage 2
    ['@babel/proposal-decorators', { legacy: true }],
    '@babel/proposal-export-namespace-from',
    '@babel/proposal-throw-expressions',
    // Stage 3
    ['@babel/proposal-class-properties', { loose: false }],
    '@babel/syntax-dynamic-import',
    // Stage 4
    '@babel/proposal-optional-chaining',
    '@babel/proposal-nullish-coalescing-operator',
    // Transform
    '@babel/transform-runtime',
  ];
  const dynamicImport = [
    'dynamic-import-node', { noInterop: true },
  ];
  const plugins = [...basePlugins];
  let ignore = [
    'src/**/*.spec.js',
  ];
  let sourceMaps = false;
  let comments = false;

  // Configuration per package, babel overrides don't work
  // because the build run under every package (not from root)
  if (pkg !== 'video' || pkg !== 'icons') {
    plugins.push(
      ['react-native-web', { commonjs: false }],
      ['babel-plugin-styled-components', {
        ssr: true,
        minify: true,
      }]
    );
  }

  // Don't ignore it for the webpack storybook builds on test environments
  if (callerType !== 'loader' || DEPLOY_ENV === 'production') {
    ignore.push('src/**/*.stories.js', 'src/**/*.stories.scss');
  }

  // custom env options for server side
  if (callerType === 'register') {
    envOpts.modules = 'commonjs';
    envOpts.targets = { node: 'current' };
  } else if (callerType === 'jest' || TARGET === 'cjs') {
    envOpts.modules = 'commonjs';
  }
  presets.push(['@babel/env', envOpts]);

  // until upgrade to Node.js >= 13 that support
  // package.json export resolution directory
  // see: https://github.com/nodejs/node/issues/14970#issuecomment-571887546
  if (callerType === 'cli') {
    plugins.push(['babel-plugin-module-resolver', {
      root: [`./packages/${pkg}/src`],
      alias: {
        '@univision/fe-utilities': '@univision/fe-utilities/esm',
      },
    }]);
  }

  // Plugin and config per NODE_ENV
  switch (env) {
    case 'production':
      plugins.push(['transform-react-remove-prop-types', {
        mode: 'remove',
        removeImport: true,
      }]);
      break;
    case 'test':
      plugins.push(dynamicImport);
      ignore = [
        'src/**/*.stories.js',
        'src/**/*.stories.scss',
      ];
      break;
    default:
      sourceMaps = true;
      comments = true;
      plugins.push('react-hot-loader/babel');
  }

  const babelEnv = {
    callerType,
    basePlugins,
    envOpts,
    pkg,
  };

  const config = {
    shouldPrintComment: shouldPrintComment(comments),
    sourceMaps,
    comments,
    presets,
    plugins,
    ignore,
  };

  if (typeof modifier !== 'function') {
    return config;
  }

  return {
    ...config,
    ...modifier(config, babelEnv, api),
  };
};
