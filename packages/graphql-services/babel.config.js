const getConfig = require('../../babel.config');

/**
 * Babel config modifier for app package
 * @param {Object} baseConfig - babel pre-setup config
 * @param {Object} babelEnv - babel custom environment data
 * @returns {Object}
 */
function modifierConfig (baseConfig, babelEnv) {
  return {
    ...baseConfig,
    presets: [['@babel/env', { ...babelEnv.envOpts, modules: 'commonjs' }]],
  };
}

module.exports = function babelConfig(api) {
  return getConfig(api, modifierConfig);
};
