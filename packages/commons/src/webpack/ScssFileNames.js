import fs from 'fs';
import path from 'path';

/**
 * Finds files in a directory, matching the file name with a given regular expression.
 * @param {string} dirPath Starting directory to search (recursively)
 * @param {Object} regExpFilter Regular expression to look for file names
 * @param {Array} results Array to store the results
 * @returns {Array.<*>}
 */
function getFileNames(dirPath, regExpFilter, results = []) {
  let fullFileName;
  const files = fs.readdirSync(dirPath);
  const ignoredPaths = /node_modules|dist|build|\.storybook|assets$/;

  files.forEach((fileName) => {
    fullFileName = path.join(dirPath, fileName);
    if (fs.lstatSync(fullFileName).isDirectory()) {
      if (!ignoredPaths.test(fileName)) {
        getFileNames(fullFileName, regExpFilter, results);
      }
    } else if (regExpFilter.test(fullFileName)) {
      results.push(fileName);
    }
  });

  return results.sort();
}

describe('CSS file names', () => {
  it('Should not exist duplicate scss file names', () => {
    const packagesDirectory = '../../../';
    const regExp = /\.scss$/;
    const scssFiles = getFileNames(packagesDirectory, regExp);
    const duplicatedFiles = scssFiles.filter((elem, pos, arr) => arr.indexOf(elem) !== pos);
    expect(duplicatedFiles).toEqual([]);
  });
});
