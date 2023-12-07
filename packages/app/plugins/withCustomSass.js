const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

let extractCssInitialized = false;

/**
 * Configure webpack and next.js to handle css/sass modules.
 * @public
 * @param {Object} nextConfig - extra next config
 * @param {string|string[]} [nextConfig.sassResources] - sass resources path or paths
 * for 'sass-resources-loader'.
 * @param {Object} [nextConfig.sassOptions] - additional 'sass-loader' options from next
 * or custom config.
 * @param {string} [nextConfig.sassOptions.prependData] - pre-pend data on each sass file.
 * @returns {Object}
 */
function withCustomSass(nextConfig = {}) {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      const { dev, isServer } = options;
      const enrichedConfig = config;
      const {
        sassOptions: {
          prependData: sassPrependData, ...sassOptions
        } = {},
        sassResources,
      } = { ...nextConfig };

      // CSS Modules this is backwards in next.js on the Built-in css/sass support
      // because by default compile global sass and require .module.sass
      // for support sass modules.
      const regexSassModules = /(?<!\.global)\.(scss|sass)$/;
      const regexSassGlobal = /\.global\.(scss|sass)$/;
      // we only support css-modules from sass files
      // .css are by default global, similar to next.js
      const regexCssGlobal = /\.css$/;

      const extraLoaders = isServer ? [] : [ExtractCssChunks.loader];
      const sassPreprocessors = [
        {
          loader: require.resolve('sass-loader'),
          options: {
            // Source maps are required so next.js `resolve-url-loader` can locate
            // files original to their source directory.
            sourceMap: true,
            sassOptions,
            prependData: sassPrependData,
          },
        },
        {
          loader: require.resolve('sass-resources-loader'),
          options: {
            resources: sassResources,
          },
        },
      ];

      // SASS Modules
      // The support must be enabled on the server and client so the class
      // names are available for SSR or Prerendering.
      enrichedConfig.module.rules.push(
        {
          test: regexSassModules,
          // Sass Modules should never have side effects. This setting will
          // allow unused Sass to be removed from the production build.
          // We ensure this by disallowing `:global()` Sass at the top-level
          // via the `local` mode in `css-loader`.
          sideEffects: false,
          use: [
            ...extraLoaders,
            {
              // require.resolve to have the same version of next.js
              loader: require.resolve('css-loader'),
              options: {
                modules: true,
                sourceMap: true,
                importLoaders: 2,
                exportOnlyLocals: isServer,
                localIdentName: dev ? '[name]__[local]___[hash:base64:5]' : '[hash:base64:5]',
              },
            },
            ...sassPreprocessors,
          ],
        },
      );

      // SASS/CSS Global
      if (isServer) {
        // Similar to how next.js doing it internally
        // because the global sass/css is not require on SSR
        enrichedConfig.module.rules.push({
          test: [regexCssGlobal, regexSassGlobal].filter(Boolean),
          use: require.resolve('next/dist/compiled/ignore-loader'),
        });
      } else {
        enrichedConfig.module.rules.push({
          test: regexCssGlobal,
          // A global CSS import always has side effects. Webpack will tree
          // shake the CSS without this option if the issuer claims to have
          // no side-effects.
          // See https://github.com/webpack/webpack/issues/6571
          sideEffects: true,
          use: [
            ...extraLoaders,
            {
              loader: require.resolve('css-loader'),
              options: {
                importLoaders: 1,
                sourceMap: true,
              },
            },
          ],
        }, {
          test: regexSassGlobal,
          // A global Sass import always has side effects. Webpack will tree
          // shake the Sass without this option if the issuer claims to have
          // no side-effects.
          // See https://github.com/webpack/webpack/issues/6571
          sideEffects: true,
          use: [
            ...extraLoaders,
            {
              loader: require.resolve('css-loader'),
              options: {
                importLoaders: 2,
                sourceMap: true,
              },
            },
            ...sassPreprocessors,
          ],
        });
      }

      if (!isServer && !extractCssInitialized) {
        enrichedConfig.plugins.push(
          new ExtractCssChunks({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: dev
              ? 'static/chunks/[name].css'
              : 'static/chunks/[name].[contenthash:8].css',
            chunkFilename: dev
              ? 'static/chunks/[name].chunk.css'
              : 'static/chunks/[name].[contenthash:8].chunk.css',
            hot: dev,
          }),
        );
        extractCssInitialized = true;
      }

      if (!dev) {
        if (!Array.isArray(enrichedConfig.optimization.minimizer)) {
          enrichedConfig.optimization.minimizer = [];
        }

        enrichedConfig.optimization.minimizer.push(
          new OptimizeCssAssetsWebpackPlugin({
            cssProcessorOptions: {
              discardComments: { removeAll: true },
            },
          }),
        );
      }

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options);
      }

      return config;
    },
  });
}

module.exports = withCustomSass;
