/**
 * This is the base Webpack configuration file
 */

// Only load dotenv when ENVIRONMENT is not defined (local development)
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const loaders = require('@univision/fe-commons/dist/webpack/loaders');

const dirUtil = require('../scripts/dirReader');

if (typeof process.env.ENVIRONMENT === 'undefined') {
  // Initial setup of the dotenv library to load environment variables to the nodejs process.
  dotenv.config();
}

let profileAlias = {};

if (process.env.NODE_ENV === 'production' && process.env.REACT_PROFILE_PRODUCTION_ENABLED === 'true') {
  // allow to enable React Profile on production mode
  // https://es.reactjs.org/blog/2018/09/10/introducing-the-react-profiler.html
  profileAlias = {
    'react-dom$': 'react-dom/profiling',
    'scheduler/tracing': 'scheduler/tracing-profiling',
  };
}

// Project root
const rootFolder = path.resolve(__dirname, '..');

// Used for webpack aliases
const appPath = path.resolve(rootFolder, './src/app');
const configPath = path.resolve(rootFolder, './config');
const serverPath = path.resolve(rootFolder, './src/server');
const componentsPath = path.resolve(rootFolder, './src/app/components');
const pagesPath = path.resolve(rootFolder, './src/app/components/pages');
const excludeDirs = ['SsoIFrame', 'SsoAcpFlow'];

const dirList = dirUtil.getDirSync(pagesPath).filter(dirName => !excludeDirs.includes(dirName));

const entry = {
  main: './src/app/components/pages/Section/start.js',
  ssoIFrame: './src/app/components/pages/SsoIFrame/start.js',
  ssoAcpFlow: './src/app/components/pages/SsoAcpFlow/start.js',
};
const entryPath = './src/app/components/pages';
const entryFileName = 'start.js';
const bundleList = [];

if (typeof dirList !== 'undefined' && dirList.length > 0) {
  dirList.forEach((dir) => {
    const bundleName = dir.charAt(0).toLowerCase() + dir.slice(1);
    bundleList.push(bundleName);
    entry[bundleName] = ['./webpack/webpack-public-path.js', `${entryPath}/${dir}/${entryFileName}`];
  });
}

const assetsPathFragment = '/assets/';
const publicPath = typeof process.env.CDN_URL !== 'undefined' && process.env.NODE_ENV === 'production'
  ? `${process.env.CDN_URL}${assetsPathFragment}` : assetsPathFragment;

const nodeModulesRoot = path.resolve(__dirname, '../../../node_modules');
const nameType = '[name].[hash].js';
module.exports = ({ useMiniCssPlugin = false, isServer } = {}) => ({
  // resolve all relative paths from the project root folder
  context: rootFolder,
  // https://webpack.github.io/docs/multiple-entry-points.html
  entry,
  output: {
    // filesystem path for static files
    path: path.resolve(rootFolder, 'build/assets'),
    // network path for static files
    publicPath,
    // file name pattern for entry scripts
    filename: nameType,
    // file name pattern for chunk scripts,
    chunkFilename: nameType,
    jsonpFunction: 'webpackJsonpUnivision',
  },
  module: loaders.get(useMiniCssPlugin, nodeModulesRoot),
  resolve: {
    modules: [nodeModulesRoot, 'node_modules'],
    alias: {
      '@univision/fe-local': fs.realpathSync(path.resolve(nodeModulesRoot, '@univision/fe-local')),
      '@univision/fe-commons': fs.realpathSync(path.resolve(nodeModulesRoot, '@univision/fe-commons')),
      '@univision/fe-components-base': fs.realpathSync(path.resolve(nodeModulesRoot, '@univision/fe-components-base')),
      '@univision/fe-deportes': fs.realpathSync(path.resolve(nodeModulesRoot, '@univision/fe-deportes')),
      '@univision/fe-graphql-services': fs.realpathSync(path.resolve(nodeModulesRoot, '@univision/fe-graphql-services')),
      '@univision/fe-video': fs.realpathSync(path.resolve(nodeModulesRoot, '@univision/fe-video')),
      '@univision/fe-icons': fs.realpathSync(path.resolve(nodeModulesRoot, '@univision/fe-icons')),
      '@univision/shared-components': fs.realpathSync(path.resolve(nodeModulesRoot, '@univision/shared-components')),
      app: appPath,
      config: configPath,
      server: serverPath,
      components: componentsPath,
      ...profileAlias,
      ...loaders.alias(nodeModulesRoot, { esm: !isServer }),
    },
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.resolve(rootFolder, 'src/server/assets/static/'),
        to: path.resolve(rootFolder, 'build/assets/public'),
      },
    ]),
    new webpack.DefinePlugin({
      'process.env.BUILD_TIME': JSON.stringify(new Date().getTime()),
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
  externals: {
    pg: true,
    // These four below are required to make Jest play well with Webpack
    cheerio: 'window',
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
  },
  node: {
    // To be able to use request module
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    global: true,
  },
  optimization: {
    moduleIds: 'hashed',
    splitChunks: {
      maxAsyncRequests: 100,
      maxInitialRequests: 10,
      cacheGroups: {
        default: false,

        iconsLegacy: {
          test: /(@univision\/shared-components\/.*\/(iconsNative|IconsNative)[\\/]|icons\/\w+\/(?!iconsNative\/\w+\/+))/,
          name: 'icons',
          chunks(chunk) {
            return bundleList.includes(chunk.name);
          },
        },

        react: {
          test: /node_modules\/?(react|redux|react-native-web)/,
          name: 'react',
          chunks: 'all',
        },

        vendors: {
          test: /node_modules\/(?!(@univision|moment-timezone|moment|react|redux))/,
          name: 'vendors',
          filename: '[name].[contenthash].js',
          chunks(chunk) {
            return bundleList.includes(chunk.name);
          },
        },

        moment: {
          test: /node_modules\/?(moment)/,
          name: 'moment',
          chunks: 'all',
        },

        uvn: {
          test: /@univision\/?((fmg-video-sdk*\/.*\.(?!css$)[^.]+$)|shared-components)/,
          name: 'uvn',
          chunks: 'all',
        },

        ...(() => {
          // provisional until fe-commons support chunks again;
          // reuse the existing custom webpackChunkName
          // see: packages/icons/src/assets/iconsNative/index.js
          return [
            'general', 'channels', 'content',
            'localesApps', 'mainApps', 'socialNetworks',
            'weather', 'sports',
          ].reduce((result, name) => {
            const testRegExp = new RegExp(`@univision/fe-icons/.*/iconsNative/${name}`);
            const chunkName = `icons${name}`;
            return {
              ...result,
              [chunkName]: {
                test: testRegExp,
                name: chunkName,
                filename: 'icons/[name].[contenthash].js',
                chunks(chunk) {
                  return bundleList.includes(chunk.name);
                },
              },
            };
          }, {});
        })(),
      },
    },
  },
});
