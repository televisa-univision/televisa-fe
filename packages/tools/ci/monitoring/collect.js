const fs = require('fs');
const psi = require('psi');
const { log } = require('@univision/fe-utilities/cjs/utils/consola');
const config = require('./config');
const display = require('./display');

/**
 * Run psi report
 * @param {string} url - Url to test
 * @param {string} fileName - Initial name for json file
 * @param {string} contentType - Content type
 * @returns {Promise<void>}
 */
const runReport = async ({ url, fileName, contentType }) => {
  // Get the PageSpeed Insights report
  log(`Running profile on... ${url}`);
  const params = config.disableThirdParties ? '?disableThirdParty=true' : '';
  const { data } = await psi(`${url}${params}`, {
    // Coming from circleCI context
    key: process.env.PSI_KEY,
  });
  const resultDirectory = `${__dirname}${config.resultsPath}`;
  const fname = `${fileName}-${data.lighthouseResult.fetchTime}.json`;
  const destination = `${resultDirectory}/${fname}`;
  // Saving only lighthouse fragment to be able to visualize on
  // https://googlechrome.github.io/lighthouse/viewer/?jsonurl=https://s3.amazonaws.com/webapp-performance-test.univision.com/lighthouse/lighthouse-sample.json
  fs.writeFileSync(destination, JSON.stringify(data.lighthouseResult));
  display({
    url,
    data,
    fileName: fname,
    contentType,
  });
};

/**
 * Collect report urls
 * @returns {Promise<void>}
 */
const collectReports = () => {
  const stage = process.env.SLS_STAGE || 'prod';
  const testSettings = [];
  Object.keys(config.paths).forEach((site) => {
    Object.keys(config.paths[site]).forEach((contentType) => {
      const domain = config.domains[site][stage];
      const url = `${domain}${config.paths[site][contentType]}`;
      const fileName = `${stage}-${site}-${contentType}`;
      testSettings.push({ url, fileName, contentType });
    });
  });
  if (testSettings.length) {
    return Promise.all(
      testSettings.map(test => runReport({
        url: test.url,
        fileName: test.fileName,
        contentType: test.contentType,
      }))
    )
      .then(() => log('Done!'))
      .catch((error) => {
        log(error);
      });
  }
  return null;
};

module.exports = collectReports;
