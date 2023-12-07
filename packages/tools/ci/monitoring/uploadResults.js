const recursiveReadDir = require('recursive-readdir');
const logger = require('@univision/fe-utilities/cjs/utils/consola');
const s3Upload = require('../utils/s3Uploader');
const config = require('./config');

/**
 * Creates a list of the results to upload.
 *
 * @returns {Promise<Array>}
 */
async function getResults() {
  const results = [];
  const resultDirectory = `${__dirname}${config.resultsPath}`;
  const filesPath = await recursiveReadDir(resultDirectory);
  if (Array.isArray(filesPath)) {
    filesPath.forEach((filePath) => {
      results.push({
        path: filePath,
        name: filePath.substring(resultDirectory.length + 1),
      });
    });
  }
  return results;
}

/**
 * Uploads the assets to the S3 Bucket.
 * It logs stats info about the uploaded files.
 * @returns {Promise<void>}
 */
const uploadResults = async () => {
  const stage = process.env.SLS_STAGE || 'prod';
  const bucketName = config.bucketName[stage];
  if (!bucketName) {
    logger.error('This environment is not configured to upload assets to S3. AWS_S3_ASSETS_BUCKET is missing.');
  }
  const results = await getResults();
  if (!results.length) {
    logger.error('Not results found.');
  } else {
    s3Upload(results, bucketName);
  }
};

module.exports = uploadResults;
