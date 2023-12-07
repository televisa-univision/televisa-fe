/**
 * @module babel.config
 */
const getConfig = require('../../babel.config');

/**
 * Babel config modifier for app package
 * @param {Object} baseConfig - babel pre-setup config
 * @param {Object} babelEnv - babel custom environment data
 * @returns {Object}
 */
function modifierConfig (baseConfig, babelEnv) {
  const { TARGET } = process.env;
  const envOpts = {
    ...babelEnv.envOpts,
    modules: false,
    targets: {
      // 'raw' version to allow final compiler/transpiler decide the target
      node: 'current',
    },
  };
  const plugins = [];

  if (!TARGET) {
    return baseConfig;
  }
  if (TARGET === 'cjs') {
    envOpts.modules = 'commonjs';
    plugins.push('babel-plugin-add-module-exports');
  }

  return {
    ...baseConfig,
    presets: [['@babel/env', envOpts]],
    plugins: [
      ...babelEnv.basePlugins,
      ...plugins,
    ],
  };
}

module.exports = function babelConfig(api) {
  return getConfig(api, modifierConfig);
};
