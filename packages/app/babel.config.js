const getConfig = require('../../babel.config');

/**
 * Babel config modifier for app package
 * @param {Object} baseConfig - babel pre-setup config
 * @param {Object} babelEnv - babel custom environment data
 * @returns {Object}
 */
function modifierConfig (baseConfig, babelEnv) {
  const { SERVERLESS, DEPLOY_ENV } = process.env;
  const showClassName = DEPLOY_ENV === 'development' || !SERVERLESS;
  // Babel present for next.js
  const presets = [['next/babel', {
    'preset-env': babelEnv.envOpts,
  }]];

  const babelStyledComponents = ['babel-plugin-styled-components', {
    ssr: true,
    minify: true,
    displayName: showClassName,
    fileName: showClassName,
  }];

  const restPlugins = baseConfig.plugins.filter(plugin => (Array.isArray(plugin) ? plugin[0] !== 'babel-plugin-styled-components' : true));

  return {
    ...baseConfig,
    plugins: [...restPlugins, babelStyledComponents],
    presets,
  };
}

module.exports = function babelConfig(api) {
  return getConfig(api, modifierConfig);
};
