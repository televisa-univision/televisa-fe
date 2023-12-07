'use strict';
const getConfig = require('../../babel.config');

/**
 * Babel config modifier for icons package
 * @param {Object} baseConfig - babel pre-setup config
 * @param {Object} babelEnv - babel custom environment data
 * @param {Object} api - exposes everything Babel itself
 * @returns {Object}
 */
function modifierConfig (baseConfig, babelEnv, api) {
  const env = api.env();
  const isBuild = process.env.BABEL_BUILD;
  const envOpts = { ...babelEnv.envOpts };
  const presets = [
    '@babel/react',
    'module:metro-react-native-babel-preset',
  ];
  const plugins = [
    // Due bug in react-native 0.57.3 the order
    // of this plugins is important
    // see: https://github.com/facebook/react-native/issues/20150#issuecomment-417858270
    '@babel/transform-flow-strip-types',
    ['@babel/proposal-decorators', { legacy: true }],
    ['@babel/proposal-class-properties'],
    '@babel/proposal-object-rest-spread',
    '@babel/transform-object-assign',
    '@babel/transform-runtime',
    // Merge this configuration with root config when the RN it's fixed
    // Stage 0
    '@babel/proposal-function-bind',
    // Stage 1
    '@babel/proposal-export-default-from',
    // Stage 2
    '@babel/proposal-export-namespace-from',
    '@babel/proposal-throw-expressions',
    // Stage 3
    '@babel/syntax-dynamic-import',
    // Stage 4
    '@babel/proposal-optional-chaining',
    '@babel/proposal-nullish-coalescing-operator',
  ];
  const dynamicImport = [
    'dynamic-import-node', { noInterop: true },
  ];
  let { ignore } = baseConfig;

  switch (env) {
    case 'production':
      plugins.push(
        ['react-native-web', { commonjs: true }],
        ['transform-react-remove-prop-types', {
          mode: 'remove',
          removeImport: true,
        }]
      );
      break;
    case 'test':
      plugins.push(dynamicImport);
      break;
    default:
      if (!isBuild) {
        plugins.push(dynamicImport);
      }
      plugins.push('react-hot-loader/babel');
  }

  if (isBuild) {
    ignore = [
      'src/**/*.ios.js',
      'src/**/*.android.js',
      'src/**/*.native.js',
      'src/**/*.spec.js',
      'src/**/*.stories.js',
      'src/**/*.stories.scss',
      'src/**/__tests__',
    ];
  } else {
    envOpts.targets = { node: 'current' };
  }
  presets.push(['@babel/env', envOpts]);

  const config = {
    ...baseConfig,
    ignore,
    plugins,
    presets,
  };

  return config;
}

module.exports = function babelConfig(api) {
  return getConfig(api, modifierConfig);
};
