const path = require('path');
const dotenv = require('dotenv');
const withPlugins = require('next-compose-plugins');
const withTm = require('next-transpile-modules');
const withVideos = require('next-videos');
const WebpackBar = require('webpackbar');
const StatsPlugin = require('stats-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const withImages = require('./plugins/withImages');
const withFonts = require('./plugins/withFonts');
const withTexts = require('./plugins/withTexts');
const withCustomLoadableManifest = require('./plugins/withCustomLoadableManifest');
const withCustomSass = require('./plugins/withCustomSass');

// Only load dotenv when ENVIRONMENT is not defined (local development)
if (typeof process.env.ENVIRONMENT === 'undefined') {
  const appEnv = dotenv.config();
  if (appEnv.error) {
    appEnv.error.description = 'App need `.env` for local development, Be sure to copy `.env.example` to `.env`.';
    throw appEnv.error;
  }
}

const {
  ANALYZE,
  APP_VERSION,
  ASSETS_PREFIX,
  DEBUG,
  PROGRESS,
  SERVERLESS,
  SOURCEMAP,
  STATS,
} = process.env;
const mainExtension = 'main.js';
const rootAssets = path.resolve(__dirname, '../commons/src/assets');
const nodeModulesRoot = path.resolve(__dirname, '../../node_modules');
const fontsInclude = `${rootAssets}/styles/fonts/base64`;
const sassResources = `${rootAssets}/styles/_common.next.scss`;

// Tanspiling original src files to be able to do
// tree shaking and client / server isolation
// by checking window object in code
// also review alias section
const withTranspileModules = withTm([
  '@univision/fe-commons',
  '@univision/fe-components-base',
  '@univision/shared-components',
  '@univision/fe-deportes',
  '@univision/fe-graphql-services',
  '@univision/fe-icons',
  '@univision/fe-local',
  '@univision/fe-prendetv',
  '@univision/fe-utilities',
  '@univision/fe-video',
  // External libs as es6 to allow tree shaking
  // This will be safe to remove on Node.js >= 13
  'react-native-web',
]);

/**
 * Get custom webpack loaders
 * @private
 * @returns {Object[]} webpack loaders configuration
 */
function getLoaders() {
  return [
    {
      // Ignore tests and mocks
      test: /(__mocks__|__tests__|\.spec.js|\.native.js|\.js.map)/,
      loader: 'ignore-loader',
    },
  ];
}

/**
 * Get custom webpack configuration
 * @private
 * @param {Object} config - predefined next.js webpack configuration
 * @returns {Object} final webapck configuration
 */
function webpackConfig(config, { dev, isServer, defaultLoaders }) {
  const newConfig = { ...config };

  newConfig.module.rules.push(...getLoaders({ isServer, defaultLoaders }));

  if (!isServer) {
    newConfig.node = {
      // To be able to use packages with server
      // dependencies on client like commons
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
    };

    if (!dev) {
      // set min and max for shared chunks to avoid small and big chunks
      // uses stat size from bundle analyzr as reference
      newConfig.optimization.splitChunks.cacheGroups.shared.maxSize = 500000;
      newConfig.optimization.splitChunks.cacheGroups.shared.minSize = 100000;
      newConfig.optimization.splitChunks.cacheGroups.commons.maxSize = 500000;
    }
  }

  newConfig.resolve.alias = {
    ...config.resolve.alias,
    // in order to fix known issue in whydidyourender with useselector
    // check https://github.com/welldone-software/why-did-you-render/issues/85
    'react-redux': dev ? 'react-redux/lib' : 'react-redux',
    // Add URL alias to support node URL api on client
    // this will be enable on the next version of next.js
    url: require.resolve('native-url'),
    // Resolving src map to be able to do
    // tree shaking and client / server isolation
    // by checking window object in code
    '@univision/fe-commons/dist': path.resolve(nodeModulesRoot, '@univision/fe-commons/src'),
    '@univision/fe-components-base/dist': path.resolve(nodeModulesRoot, '@univision/fe-components-base/src'),
    '@univision/fe-deportes/dist': path.resolve(nodeModulesRoot, '@univision/fe-deportes/src'),
    '@univision/fe-graphql-services/dist': path.resolve(nodeModulesRoot, '@univision/fe-graphql-services/src'),
    '@univision/fe-local/dist': path.resolve(nodeModulesRoot, '@univision/fe-local/src'),
    '@univision/fe-icons/dist': path.resolve(nodeModulesRoot, '@univision/fe-icons/src'),
    '@univision/fe-prendetv/dist': path.resolve(nodeModulesRoot, '@univision/fe-prendetv/src'),
    '@univision/fe-utilities/esm': path.resolve(nodeModulesRoot, '@univision/fe-utilities/src'),
    '@univision/fe-utilities': path.resolve(nodeModulesRoot, '@univision/fe-utilities/src'),
    '@univision/fe-video/dist': path.resolve(nodeModulesRoot, '@univision/fe-video/src'),
  };

  if (ANALYZE) {
    newConfig.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: isServer
          ? '../analyze/server.html'
          : './analyze/client.html',
      }),
    );
  }

  if (STATS) {
    // To analyze bundle on https://github.com/webpack/analyse
    newConfig.plugins.push(
      new StatsPlugin('stats.json', {
        chunkModules: true,
        exclude: [/node_modules[\\/]react/],
      }),
    );
  }

  if (SOURCEMAP) {
    newConfig.devtool = 'source-map';
    newConfig.output.sourceMapFilename = '[file].map';
    // TODO: Validate next-source-maps when stable, right now it doesn't support TerserPlugin
    // https://github.com/zeit/next-plugins/tree/master/packages/next-source-maps
    // eslint-disable-next-line
    for (const plugin of newConfig.optimization.minimizer) {
      if (plugin.constructor.name === 'TerserPlugin') {
        plugin.options.sourceMap = true;
        break;
      }
    }
  }

  if (dev && PROGRESS) {
    newConfig.plugins.push(
      new WebpackBar({
        fancy: true,
        profile: true,
        basic: false,
      }),
    );
  }

  // Non minified version for dev purposes
  if (DEBUG) {
    newConfig.optimization.minimize = false;
    delete newConfig.optimization.minimizer;
  }
  return newConfig;
}

/**
 * Get configuration for serverless/lambda, this allows to have
 * different page name based on environment
 * For example: lambda should use index.js to catch all routes
 * while nextjs locally will need [...proxy].js
 * similar to assets prefix: app will use S3 bucket just in lambda
 * @returns {Object?}
 */
function getServerlessConfig() {
  return SERVERLESS && {
    assetPrefix: ASSETS_PREFIX || '',
    pageExtensions: [mainExtension, 'serverless.js'],
  };
}

module.exports = withPlugins([
  [withCustomSass, {
    sassResources,
  }],
  [withFonts, {
    include: fontsInclude,
  }],
  [withImages, {
    imagesFolder: 'images',
  }],
  [withTranspileModules],
  [withTexts],
  [withVideos],
  [withCustomLoadableManifest],
], {
  compress: true,
  distDir: 'build',
  experimental: { optimizeImages: true },
  // exclude non js pages like styles, spec from next.js build
  // see: https://github.com/zeit/next.js/issues/1914
  pageExtensions: [mainExtension, 'page.js'],
  target: 'serverless',
  webpack: webpackConfig,
  env: {
    // Only variable hardcoded on build time
    // standard to all envs
    APP_VERSION: APP_VERSION || '2',
    SERVERLESS,
  },
  ...getServerlessConfig(),
});
