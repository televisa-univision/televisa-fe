const ReactLoadableManifestGenerator = require('./reactLoadableManifestGenerator');

/**
 * Middle layer to add CustomLoadableManifest plugin to nextjs.
 * @public
 * @param {Object} nextConfig - configuration for this plugin.
 * @param {Object} [nextConfig.fileName] - Generated json file name.
 * @param {Object} [nextConfig.chunksPattern] - Regex for webpackChunkName on SSR
 * @returns {Object}
 */
function withCustomLoadableManifest(nextConfig = {}) {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      const { isServer } = options;
      const pluginOpts = Object.assign({
        fileName: 'react-loadable-manifest.json',
      }, nextConfig);
      // Loadable is only generated on client build
      if (!isServer) {
        let i = 0;
        // eslint-disable-next-line
        for (const plugin of config.plugins) {
          // Removing existing ReactLoadablePlugin plugin
          if (plugin.constructor.name === 'ReactLoadablePlugin') {
            config.plugins.splice(i, 1);
          }
          i += 1;
        }
        // This is a modified version of ReactLoadablePlugin
        // to generate an optimized version of react-loadable-manifest.json
        // since the original has been growing unlimitedly increasing the size of
        // lambda function and preventing them to be deployed
        config.plugins.push(
          new ReactLoadableManifestGenerator(pluginOpts),
        );
      }
      if (typeof pluginOpts.webpack === 'function') {
        return pluginOpts.webpack(config, options);
      }
      return config;
    },
  });
}

module.exports = withCustomLoadableManifest;
