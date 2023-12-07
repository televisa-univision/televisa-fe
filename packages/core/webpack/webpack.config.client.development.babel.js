import webpack from 'webpack';
import path from 'path';
import { clientConfiguration } from 'universal-webpack';

import settings from './universalWebpackSettings.json';
import getWebpackConfig from './webpack.config';
import webpackWorkbox from './webpack-workbox';

import { addDevServerConfiguration, setDevFileServer } from './devServer';

let configuration = clientConfiguration(getWebpackConfig({ useMiniCssPlugin: false }), settings, {
  development: true,
  cssBundle: false, // Disable CSS loaders, we are configuring it in loaders.js
});
const rootFolder = path.resolve(__dirname, '..');
const swSrc = path.resolve(rootFolder, 'src/app/utils/pwa/service-worker.js');
const swSpaSrc = path.resolve(rootFolder, 'src/app/utils/pwa/service-worker-spa.js');

// Add `webpack-serve` settings.
configuration = addDevServerConfiguration(configuration);

// `webpack-serve` can't set the correct `mode` by itself
// so setting `mode` to `"development"` explicitly.
// https://github.com/webpack-contrib/webpack-serve/issues/94
configuration.mode = 'development';

// Fetch all files from webpack development server.
configuration = setDevFileServer(configuration);

configuration.plugins.push(
  // Prints more readable module names in the browser console on HMR updates.
  new webpack.NamedModulesPlugin(),
  webpackWorkbox.injectManifestPlugin(swSrc, configuration),
);
configuration.devtool = 'eval';
configuration.resolve.alias = {
  ...configuration.resolve.alias,
  // in order to fix known issue in whydidyourender with useselector
  // check https://github.com/welldone-software/why-did-you-render/issues/85
  'react-redux': 'react-redux/lib',
};

// `webpack-serve` can't import the configuration properly
// when using `export default` hence using `module.exports` here.
// https://github.com/webpack-contrib/webpack-serve/issues/81#issuecomment-378469110
// export default configuration
module.exports = configuration;
