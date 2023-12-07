const fs = require('fs');
const path = require('path');
const blacklist = require('metro').createBlacklist;

const rootPath = path.resolve(__dirname, '../../');
const rootModules = path.resolve(rootPath, 'node_modules');

module.exports = {
  watchFolders: [
    rootModules,
    path.resolve(__dirname, '.storybook'),
    fs.realpathSync(path.resolve(rootModules, '@univision/fe-commons')),
  ],
  getBlacklistRE () {
    return blacklist([
      /react-native\/.*/,
    ]);
  },
};
