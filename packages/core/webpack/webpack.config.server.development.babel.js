import { serverConfiguration } from 'universal-webpack';

import getWebpackConfig from './webpack.config';
import { setDevFileServer } from './devServer';
import settings from './universalWebpackSettings.json';

const configuration = serverConfiguration(getWebpackConfig({
  useMiniCssPlugin: false,
  isServer: true,
}), settings);

configuration.devtool = 'eval';
configuration.resolve.alias = {
  ...configuration.resolve.alias,
  // in order to fix known issue in whydidyourender with useselector
  // check https://github.com/welldone-software/why-did-you-render/issues/85
};

// Same as production configuration
// with the only change that all files
// are served by webpack devserver.
export default setDevFileServer(configuration);
