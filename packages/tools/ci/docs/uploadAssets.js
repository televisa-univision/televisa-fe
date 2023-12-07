const logger = require('@univision/fe-utilities/cjs/utils/consola');

const uploadDirectoryByPackage = require('../utils/directoryUploader');

const BUCKET_NAME = process.env.AWS_S3_ASSETS_BUCKET;
// valid packages with jsdoc config
const PACKAGES = ['utilities'];

/**
 * Creates and send a list of the assets to S3.
 * @returns {void}
 */
async function uploadAssets() {
  if (!BUCKET_NAME) {
    logger.error('This environment is not configured to upload assets to S3. AWS_S3_ASSETS_BUCKET is missing.');
  }

  await uploadDirectoryByPackage(PACKAGES, {
    bucketName: BUCKET_NAME,
    rootPath: 'docs',
  });
}

module.exports = uploadAssets;
