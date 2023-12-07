/**
 * Util to read directories sync and async
 */
var Promise = require('bluebird');
var fs = require('fs');
var path = require('path');

/**
 * Sync directory ready
 * @parameters {string} srcpath dir path
 * @returns {Array} with all inside dirs
 */
exports.getDirSync = function(srcpath) {
  return fs.readdirSync(srcpath)
    .filter(file => fs.lstatSync(path.join(srcpath, file)).isDirectory());
};

/**
 * Async directory ready
 * @parameters {string} srcpath dir path
 * @returns {Array} with all inside dirs
 */
exports.getDirAsync = function(srcpath) {
  return new Promise((resolve, reject) => {
    fs.readdir(srcpath, (err, files) => {
      if (err !== null) {
        reject(err);
      } else {
        resolve(files.filter(file => fs.lstatSync(path.join(srcpath, file)).isDirectory()));
      }
    });
  });
};

