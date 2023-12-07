import { serverConfiguration } from 'universal-webpack';
import settings from './universalWebpackSettings.json';
import getWebpackConfig from './webpack.config';

const config = serverConfiguration(getWebpackConfig({
  useMiniCssPlugin: false,
  isServer: true,
}), settings);

config.mode = 'production';
delete config.devtool;
// We don't want to minimize/uglify the server.js
config.optimization.minimize = false;
config.performance = false;

export default config;
