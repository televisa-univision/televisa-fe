import path from 'path';
import webpack from 'webpack';
import { clientConfiguration } from 'universal-webpack';

import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import settings from './universalWebpackSettings.json';
import getWebpackConfig from './webpack.config';
import webpackWorkbox from './webpack-workbox';

const configuration = clientConfiguration(getWebpackConfig({ useMiniCssPlugin: true }), settings, {
  development: false,
  cssBundle: false, // Disable CSS loaders, we are configuring it in loaders.js
});
// Just minify for selected envs.
const shouldMinifyJs = !(process.env.CI_CLIENT === 'true');
delete configuration.devtool;

const rootFolder = path.resolve(__dirname, '..');
const swSrc = path.resolve(rootFolder, 'src/app/utils/pwa/service-worker.js');

configuration.devtool = 'none';
configuration.mode = 'production';
configuration.optimization.namedChunks = true;
configuration.optimization.minimizer = [
  // Compresses CSS files
  new OptimizeCSSAssetsPlugin({}),
];
const nameType = '[name].[contenthash].js';
configuration.output.filename = nameType;
configuration.output.chunkFilename = nameType;

if (shouldMinifyJs) {
  configuration.optimization.minimizer.push(
    new TerserPlugin({
      extractComments: false,
      parallel: 2,
      sourceMap: false,
      cache: true,
      terserOptions: {
        output: {
          comments: false,
        },
        compress: {
          warnings: false,
        },
      },
    }),
  );
}

configuration.plugins.push(
  new MiniCssExtractPlugin({
    filename: '[name].[hash].css',
  }),
  // Set NODE_ENV to production
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
    },
  }),

  // clears the output folder
  new CleanWebpackPlugin(),

  // For production mode
  // https://moduscreate.com/webpack-2-tree-shaking-configuration/
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false,
  }),
  webpackWorkbox.injectManifestPlugin(swSrc, configuration),
);

export default configuration;
