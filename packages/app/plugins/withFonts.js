/**
 * Configure webpack and next.js to handle fonts from css/sass and from path.
 * @public
 * @param {Object} nextConfig - configuration for this plugin.
 * @param {Object} [nextConfig.assetPrefix] - prefix of public path as AS3 url.
 * @param {Object} [nextConfig.fontsFolder='fonts'] - output/public path name
 * @param {Object} [nextConfig.inlineFontLimit=8192] - size limit to inline fonts.
 * @param {Object} [nextConfig.fontsName='[name].[hash].[ext]'] - file name of exported fonts.
 * @returns {Object}
 */
function withFonts(nextConfig = {}) {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      const { isServer } = options;
      const outputPath = isServer ? '../' : '';
      const enrichedConfig = config;
      const fontsConfig = Object.assign({
        assetPrefix: '',
        fontsFolder: 'fonts',
        inlineFontLimit: 8192,
        fontsName: '[name].[hash].[ext]',
      }, nextConfig);

      enrichedConfig.module.rules.push({
        // for base64 .woff2 fonts
        test: /\.(woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        include: fontsConfig.include,
        exclude: fontsConfig.exclude,
        use: require.resolve('url-loader'),
      }, {
        // for non base64 .woff2
        test: /\.(woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: {
          loader: require.resolve('file-loader'),
          options: {
            limit: fontsConfig.inlineFontLimit,
            fallback: require.resolve('url-loader'),
            publicPath: `${fontsConfig.assetPrefix}/_next/static/chunks/${fontsConfig.fontsFolder}`,
            outputPath: `${outputPath}static/chunks/${fontsConfig.fontsFolder}`,
            name: fontsConfig.fontsName,
          },
        },
      });

      if (typeof fontsConfig.webpack === 'function') {
        return fontsConfig.webpack(config, options);
      }

      return config;
    },
  });
}

module.exports = withFonts;
