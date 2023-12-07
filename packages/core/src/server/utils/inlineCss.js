import fs from 'fs';
import path from 'path';
import Promise from 'bluebird';
import recursiveReadDir from 'recursive-readdir';
import logger from 'app/utils/logging/serverLogger';

const ASSETS_DIRECTORY = path.resolve(__dirname, '../../../core/build/assets');

/**
 * Returns chunkName by filePath
 * @param {string} filePath public path
 * @returns {string}
 */
export function getChunkNameByPath(filePath) {
  const match = filePath.match(/(?<=(\.)(\/[\w]+\/)([\w]+\/))(.*)(?=(\.)([\w]+)(\.css))/g);
  if (match) {
    const [chunkName] = match;
    return chunkName;
  }
  return null;
}

/**
 * Make promise version of readFile
 * @param {string} filePath public path
 * @returns {Promise}
 */
function getInlineCssFile({ publicPath, size }) {
  return new Promise((resolve, reject) => {
    fs.readFile(publicPath, 'utf8', (err, data) => {
      if (err) {
        return reject(err);
      }
      const chunkName = getChunkNameByPath(publicPath);
      logger.info(`${chunkName}: ${size}`);
      return resolve({ [`${chunkName}_inlineCss`]: data });
    });
  });
}

/**
 * Returns an array with all files in a list of promises
 * @param {Array} cssList css file list
 * @returns {Array}
 */
async function getCssFileList(cssList) {
  const promiseList = cssList.map(getInlineCssFile);
  const list = await Promise.all(promiseList);
  return list.reduce((acc, obj) => ({ ...acc, ...obj }), []);
}

/**
 * Returns an object with all css files
 * @param {Object} styles css object chunk info
 * @returns {Object}
 */
export default async () => {
  const fileInfoList = await recursiveReadDir(ASSETS_DIRECTORY, ['webpack-chunks.json', 'react-loadable.json']);

  const cssList = fileInfoList
    .filter(file => file.endsWith('.css'))
    .reduce((acc, fileInfo) => {
      const match = fileInfo.match(/(?=\/build\/)(.*)/g);
      if (match) {
        const [publicPath] = match;
        const { size } = fs.statSync(fileInfo);
        acc.push({ publicPath: `.${publicPath}`, size });
      }
      return acc;
    }, []);

  const result = await getCssFileList(cssList);
  return result;
};
