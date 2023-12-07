/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const recursiveReadDir = require('recursive-readdir');
const S3 = require('aws-sdk/clients/s3');
const mimeTypes = require('mime-types');

const BUCKET_NAME = process.env.AWS_S3_ASSETS_BUCKET;
const ASSETS_DIRECTORY = path.resolve(__dirname, '../../../core/build/assets');

const config = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
};

const s3 = new S3(config);

/**
 * Creates a list of the assets to upload.
 *
 * @returns {Promise<Array>}
 */
async function getAssetsPath() {
  const assets = [];
  const filesToIgnore = ['webpack-chunks.json', 'react-loadable.json'];
  const filesPath = await recursiveReadDir(ASSETS_DIRECTORY, filesToIgnore);
  if (Array.isArray(filesPath)) {
    filesPath.forEach((filePath) => {
      assets.push({
        path: filePath,
        name: filePath.substring(ASSETS_DIRECTORY.length + 1),
      });
    });
  }

  return assets;
}

/**
 * Uploads the assets to the S3 Bucket.
 * It logs stats info about the uploaded files.
 *
 * @returns {Promise<void>}
 */
const upload = async () => {
  const assets = await getAssetsPath();
  let bytesUploaded = 0;
  let filesUploaded = 0;
  let filesProcessed = 0;
  let counter = 0;
  assets.forEach(({ name: assetName, path: assetPath }) => {
    fs.readFile(assetPath, (fileError, fileData) => {
      if (fileError) {
        counter += 1;
        console.error('Error reading file.', fileError);
      } else {
        fs.stat(assetPath, (statErr, { size: fileSize }) => {
          const buffer = Buffer.from(fileData, 'binary');
          const params = {
            Bucket: BUCKET_NAME,
            Key: assetName,
            Body: buffer,
            ContentType: mimeTypes.contentType(path.basename(assetName)),
          };

          s3.upload(params, (s3Error, s3Data) => {
            counter += 1;
            filesProcessed += 1;
            if (s3Error) {
              console.error(`${filesProcessed} of ${assets.length} assets.`, s3Error);
            } else {
              filesUploaded += 1;
              bytesUploaded += fileSize;
              console.log(`${filesProcessed} of ${assets.length} assets.`, s3Data);
            }

            if (counter === assets.length) {
              console.log(`\n\nUploaded ${filesUploaded} of ${assets.length} assets (${Math.round(bytesUploaded / 1024 / 1024 * 100) / 100} MB).`);
            }
          });
        });
      }
    });
  });
};

if (!BUCKET_NAME) {
  console.error('This environment is not configured to upload assets to S3. AWS_S3_ASSETS_BUCKET is missing.');
} else {
  upload();
}
