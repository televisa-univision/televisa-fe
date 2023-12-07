const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const fs = require('fs');

const rootFolder = path.resolve(__dirname, '../');

/**
 * Helper to get class type based on build type
 * @returns {string}
 */
function getClassNameType() {
  const baseName = '[hash:base64:5]';
  let classNameType = `[name]__[local]___${baseName}`;
  if (process.env.NODE_ENV === 'production') {
    classNameType = baseName;
  }
  if (typeof process.env.DEPLOY_ENV !== 'undefined' && process.env.DEPLOY_ENV === 'test') {
    classNameType = '[name]__[local]';
  }
  return classNameType;
}

/**
 * Helper to get sass with an option of local css or not
 * @param {boolean} localEnabled - true enable modules
 * @param {boolean} useExtractText - true use CSS extract plugin if is production
 * @returns {string[]}
 */
function getSassLoader(localEnabled, useExtractText) {
  let addModules = '';
  if (localEnabled) {
    addModules = 'modules=true&';
  }

  return [
    useExtractText && process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
    `css-loader?${addModules}localIdentName=${getClassNameType()}`,
    'sass-loader',
    `sass-resources-loader?resources=${rootFolder}/assets/styles/_common.scss`,
  ];
}

/**
 * Helper to get package real path
 * @param {(Object|string[])} pkgs - list of packages to get real path
 * @param {string} nodeModulesRoot - node modules path to perform the check
 * @returns {string[]}
 */
function getRealpathPackages(pkgs, nodeModulesRoot) {
  const getPath = (pkg) => {
    const pkgPath = path.resolve(nodeModulesRoot, pkg);
    if(!fs.existsSync(pkgPath)) {
      return;
    }
    return fs.realpathSync(pkgPath);
  };

  if (!pkgs) {
    return pkgs;
  }

  if (typeof pkgs === 'object' && !Array.isArray(pkgs)) {
    const pkgsKey = Object.keys(pkgs);
    return pkgsKey.reduce((result, alias) => {
      const pkgPath = getPath(pkgs[alias]);
      if(pkgPath) {
        result[alias] = pkgPath;
      };
      return result;
    }, {});
  }

  return pkgs.reduce((result, pkg) => {
    const pkgPath = getPath(pkg);
    if(pkgPath) {
      result.push(pkgPath);
    };
    return result;
  }, [])
}

/**
 * Helper to add loaders configuration
 * @param {boolean} useExtractText - true use CSS extract plugin if is production
 * @param {string} nodeModulesRoot - package node_modules path
 * @returns {Array} with all loaders
 */
exports.get = (useExtractText, nodeModulesRoot) => {

  return {
    exprContextCritical: false,
    rules: [
      {
        test: /\.js$/,
        exclude: [/dist/, /node_modules/, /\.spec.js$/, /\.ios.js$/, /\.android.js$/, /\.native.js$/],
        include: [
          /packages\/core/,
          ...getRealpathPackages([
            '@univision/fe-local',
            '@univision/fe-commons',
            '@univision/fe-components-base',
            '@univision/fe-graphql-services',
            '@univision/fe-deportes',
            '@univision/shared-components',
            '@univision/fe-video',
            '@univision/fe-icons',
          ], nodeModulesRoot)
        ],
        loader: 'babel-loader',
      },
      // for base64 .woff2 fonts
      {
        test: /\.(woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        include: `${rootFolder}/assets/styles/fonts/base64`,
        use: 'url-loader',
      },
      // for non base64 .woff2
      {
        test: /\.(woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'file-loader?name=styles/fonts/[name].[ext]',
      },
      // for images
      {
        test: /\.(jpg|png|gif|mp4)$/,
        use: 'file-loader?name=styles/images/[name].[contenthash].[ext]',
      },
      {
        test: /\.svg$/,
        exclude: `${rootFolder}/assets/icons/svg`,
        use: 'file-loader?name=styles/images/[name].[contenthash].[ext]',
      },
      // Some legacy icons
      {
        test: /\.svg$/,
        include: `${rootFolder}/assets/icons/svg`,
        use: 'raw-loader',
      },
      // for styles
      {
        test: /\.(scss|css)$/,
        include: `${rootFolder}/assets/styles/`,
        use: getSassLoader(false, useExtractText),
      },
      {
        test: /\.(scss|css)$/,
        exclude: `${rootFolder}/assets/styles/`,
        use: getSassLoader(true, useExtractText),
      },
      // for .js.map files
      {
        test: /\.js\.map$/,
        use: 'raw-loader'
      },
      // Other
      {
        test: /\.txt$/,
        use: 'raw-loader',
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
      },
    ],
  };
};

exports.alias = (nodeModulesRoot, { esm = true } = {}) => {
  // workaround until webpack v5 https://github.com/webpack/webpack/issues/9509
  return getRealpathPackages({
    '@univision/fe-utilities/esm': `@univision/fe-utilities/${esm ? 'esm' : 'cjs'}`,
    '@univision/fe-utilities': `@univision/fe-utilities/${esm ? 'esm' : 'cjs'}`,
  }, nodeModulesRoot);
}
