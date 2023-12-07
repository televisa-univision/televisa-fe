require('dotenv').config();
const fs = require('fs');
const getKey = require('@univision/fe-utilities/cjs/helpers/object/getKey');
const variables = require('./variables.json');
const environmentEnvVars = require('./environmentEnvVars.json');
const stageEnvVars = require('./stageEnvVars.json');

/**
 * Abstracts the AWS JavaScript SDK and common use cases for
 * doing deployments on ECS
 *
 * Docs: https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/_index.html
 */
class Deploy {
  /**
   * Init AWS configs and credentials
   */
  constructor() {
    this.variables = Object.assign({}, variables);
    if (process.env.CIRCLE_BRANCH) {
      console.log(`Operating over branch: ${process.env.CIRCLE_BRANCH}`);
      this.environmentEnvVars = environmentEnvVars[process.env.CIRCLE_BRANCH];
    }
    // Use stage configuration if serverless deployment
    // the SLS_STAGE env var will be defined on lambda deployment only
    if (process.env.SLS_STAGE) {
      console.log(`Using Stage: ${process.env.SLS_STAGE}`);
      this.stageEnvVars = stageEnvVars[process.env.SLS_STAGE];
    }
  }

  /**
   * Utility for generating shell env variable export statements
   * @param {string} key - Key to validate
   * @param {string} value - Value to be assigned
   * @returns {string}
   */
  getEnvExport(key, value) {
    return `export ${key}=${value};\n`;
  }

  /**
   * Utility for generating entries for .env file
   * @param {string} key - Key to validate
   * @param {string} value - Value to be assigned
   * @returns {string}
   */
  getEnvFileEntry(key, value) {
    return `${key}=${value}\n`;
  }

  /**
   * Generates exports for env variables and adds them to the systems bash env
   */
  prepareEnvs() {
    const envFileStream = fs.createWriteStream('docker.env', { flags: 'w' });
    const exportStream = fs.createWriteStream(process.env.BASH_ENV || 'bashrc.txt', { flags: 'w' });
    // Gets variables (environment specific configured on config.js)
    // and adds them to the bash env file.
    Object.keys(this.variables).forEach((key) => {
      const variable = this.variables[key];
      // Only process the variables not processed above as secrets from aws secrets manager
      if (!variable.processed) {
        // Treat the value on the per env file first as a key to the actual secret
        // (e.g. on circle you might define AWS_ACCESS_KEY_ID_DEV in circle)
        // Then use the actual value on the per environment file.
        // Finally, get whatever's on process.env under that key.
        let envVar = this.environmentEnvVars;
        // Prioritizing stage var for serverless deployment
        if (this.stageEnvVars) {
          envVar = this.stageEnvVars;
        }
        const value = process.env[getKey(envVar, key)]
          || getKey(envVar, key, process.env[key]);
        if (value) {
          if (variable.bash || variable.inTask) {
            // We'll put on the bash file pretty much everything
            exportStream.write(this.getEnvExport(key, value));
          }
          if (variable.inTask) {
            // We'll put on the env file only what we need for the task
            // definition and for the docker container
            envFileStream.write(this.getEnvFileEntry(key, value));
          }
        }
      }
    });

    exportStream.write(this.getEnvExport('AWS_ECR_IMAGE_NAME', 'unvision-fe'));
    exportStream.end();
    envFileStream.end();
  }

  /**
   * Test function to expose env vars
   */
  test() {
    this.prepareEnvs();
  }
}

const deploy = new Deploy();
module.exports = deploy;
