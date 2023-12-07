/**
 * Configure webpack and next.js to handle Text with this plugin.
 * @public
 * @param {Object} nextConfig - configuration for text/raw plugin.
 * @param {Object} [nextConfig.assetPrefix] - prefix of public path as AS3 url.
 * @param {Object} [nextConfig.textFolder='text'] - output/public path name
 * @param {Object} [nextConfig.textName='[name].[contenthash].[ext]'] - file name of
 * exported Text.
 * @returns {Object}
 */
function withTexts(nextConfig = {}) {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      const { isServer } = options;
      const outputPath = isServer ? '../' : '';
      const enrichedConfig = config;
      const textConfig = Object.assign({
        assetPrefix: '',
        textsFolder: 'text',
        textsName: '[name].[contenthash].[ext]',
      }, nextConfig);

      enrichedConfig.module.rules.push({
        test: /\.txt$/,
        exclude: textConfig.exclude,
        use: [
          {
            loader: require.resolve('raw-loader'),
            options: {
              publicPath: `${textConfig.assetPrefix}/_next/static/${textConfig.textsFolder}`,
              outputPath: `${outputPath}static/${textConfig.textsFolder}`,
              name: textConfig.textsName,
              esModule: textConfig.esModule || false,
            },
          },
        ],
      });

      if (typeof textConfig.webpack === 'function') {
        return textConfig.webpack(config, options);
      }

      return config;
    },
  });
}

module.exports = withTexts;
