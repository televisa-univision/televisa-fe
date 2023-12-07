import { server } from 'universal-webpack';
import settings from '../../webpack/universalWebpackSettings.json';
import getWebpackConfig from '../../webpack/webpack.config';

server(getWebpackConfig({ useMiniCssPlugin: false }), settings);
