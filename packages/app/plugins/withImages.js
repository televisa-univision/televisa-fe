/**
 * Configure webpack and next.js to handle images with this plugin.
 * @public
 * @param {Object} nextConfig - configuration for fonts plugin.
 * @param {Object} [nextConfig.assetPrefix] - prefix of public path as AS3 url.
 * @param {Object} [nextConfig.imagesFolder='images'] - output/public path name
 * @param {Object} [nextConfig.inlineImageLimit=8192] - size limit for inline images.
 * @param {Object} [nextConfig.imagesName='[name].[contenthash].[ext]'] - file name of
 * exported images.
 * @returns {Object}
 */
function withImages(nextConfig = {}) {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      const { isServer } = options;
      const outputPath = isServer ? '../' : '';
      const enrichedConfig = config;
      const imageConfig = Object.assign({
        assetPrefix: '',
        inlineImageLimit: 8192,
        imagesFolder: 'images',
        imagesName: '[name].[contenthash].[ext]',
      }, nextConfig);

      enrichedConfig.module.rules.push({
        test: /\.(jpe?g|png|svg|gif|ico|webp|jp2)$/,
        exclude: imageConfig.exclude,
        use: [
          {
            loader: require.resolve('file-loader'),
            options: {
              limit: imageConfig.inlineImageLimit,
              fallback: require.resolve('url-loader'),
              publicPath: `${imageConfig.assetPrefix}/_next/static/${imageConfig.imagesFolder}`,
              outputPath: `${outputPath}static/${imageConfig.imagesFolder}`,
              name: imageConfig.imagesName,
              esModule: imageConfig.esModule || false,
            },
          },
        ],
      });

      if (typeof imageConfig.webpack === 'function') {
        return imageConfig.webpack(config, options);
      }

      return config;
    },
  });
}

module.exports = withImages;
