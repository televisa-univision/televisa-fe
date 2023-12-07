const recursiveReadDir = require('recursive-readdir');
const path = require('path');

const s3Upload = require('./s3Uploader');

const ROOT_DIRECTORY = path.resolve(__dirname, '../../../');
/**
 * Creates s3 file format and send it to the bucket
 * @param {string} filePath current file path
 * @param {Object} options options to be used
 * @param {string} options.packageName storybook package
 * @param {string} options.assetsDirectory current asset storage directory
 * @param {string} options.bucketName bucket to send files
 * @param {string} options.path root path in the bucket
 * @returns {void}
 */
function sendFileToS3(filePath, {
  packageName,
  assetsDirectory,
  bucketName,
  rootPath,
}) {
  const asset = {
    path: filePath,
    name: `${rootPath}/${packageName}/${filePath.substring(assetsDirectory.length + 1)}`,
  };

  // Uploads the assets to the S3 Bucket.
  s3Upload([asset], bucketName);
}

/**
 * reads directory and send current files to s3
 * @param {Array} packages used to read files
 * @param {Object} options used to read files
 * @param {string} options.bucketName s3 bucket
 * @param {string} options.rootPath where files will be placed in s3
 */
const uploadDirectoryByPackage = async (packages, { bucketName, rootPath }) => {
  if (!Array.isArray(packages)) return;

  packages.forEach(async (packageName) => {
    const assetsDirectory = `${ROOT_DIRECTORY}/${packageName}/dist/${rootPath}`;
    const filesPath = await recursiveReadDir(assetsDirectory);

    if (Array.isArray(filesPath)) {
      filesPath.forEach((filePath) => {
        sendFileToS3(filePath, {
          packageName,
          assetsDirectory,
          bucketName,
          rootPath,
        });
      });
    }
  });
};

module.exports = uploadDirectoryByPackage;
