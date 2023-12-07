const chalk = require('chalk');
const { log } = require('@univision/fe-utilities/cjs/utils/consola');
const getKey = require('@univision/fe-utilities/cjs/helpers/object/getKey');
const utils = require('./utils');

/**
 * Title styler
 * @param {string} title - Text to style
 */
const renderTitle = (title) => {
  log(`\n${chalk.gray.underline(title)} \n`);
};

/**
 * Object printer
 * @param {Object} obj - Object to print
 */
const renderObj = (obj) => {
  Object.keys(obj).map(key => log(`${key}: ${utils.buffer(key, 14)}${chalk.cyan(obj[key])}`));
};

/**
 * Helper to get user timing data from report
 * @param {Object} data - Report data
 * @returns {Object}
 */
const getUserTiming = (data) => {
  const userTiming = data.audits['user-timings'];
  const metrics = {};
  if (getKey(userTiming, 'details.items.length')) {
    userTiming.details.items.map((item) => {
      if (item.duration) {
        metrics[item.name] = item.duration;
      }
      return true;
    });
  }
  return metrics;
};

/**
 * Print report
 * @param {string} url - Profiled url
 * @param {Object} data - Report data
 * @param {string} fileName - File name of lighthouse report
 * @param {string} contentType - Profiled page content type
 */
const display = ({
  url,
  data,
  fileName,
  contentType,
}) => {
  const stage = process.env.SLS_STAGE || 'prod';
  const lighthouse = data.lighthouseResult;
  const score = utils.scoreColor(data.lighthouseResult.categories.performance.score * 100);

  const summary = {
    Content: contentType,
    Url: url,
    'Performance Score': score,
  };
  log(chalk.gray(utils.divider()));
  renderTitle('Summary');
  renderObj(summary);

  const lighthouseMetrics = {
    'Dom Size': lighthouse.audits['dom-size'].displayValue,
    'Estimated Input Latency': lighthouse.audits['estimated-input-latency'].displayValue,
    'First Contentful Paint': lighthouse.audits['first-contentful-paint'].displayValue,
    'First Contentful Paint 3g': lighthouse.audits['first-contentful-paint-3g'].displayValue,
    'First Meaningful Paint': lighthouse.audits['first-meaningful-paint'].displayValue,
    'First CPU Idle': lighthouse.audits['first-cpu-idle'].displayValue,
    'Largest Contentful Paint': lighthouse.audits['largest-contentful-paint'].displayValue,
    'Speed Index': lighthouse.audits['speed-index'].displayValue,
    'Time To Interactive': lighthouse.audits.interactive.displayValue,
    'Total Blocking Time': lighthouse.audits['total-blocking-time'].displayValue,
    'Unused Css Rules': lighthouse.audits['unused-css-rules'].displayValue,
    ...getUserTiming(lighthouse),
  };
  renderTitle('Lab Data');
  renderObj(lighthouseMetrics);

  if (data.loadingExperience.metrics) {
    const cruxMetrics = {
      'Cummulative Layout shift': utils.toMs(data.loadingExperience.metrics.CUMULATIVE_LAYOUT_SHIFT_SCORE.percentile),
      'First Contentful Paint': utils.toMs(data.loadingExperience.metrics.FIRST_CONTENTFUL_PAINT_MS.percentile),
      'First Input Delay': utils.toMs(data.loadingExperience.metrics.FIRST_INPUT_DELAY_MS.percentile),
      'Largest Contentful Paint': utils.toMs(data.loadingExperience.metrics.LARGEST_CONTENTFUL_PAINT_MS.percentile),
    };
    renderTitle('Field Data');
    renderObj(cruxMetrics);
  }
  let s3Account = stage;
  if (stage === 'uat') {
    s3Account = 'dev';
  }
  // uat: https://s3.amazonaws.com/webapp-performance-dev.univision.com/uat-uvn-section-2020-09-18T18:54:59.288Z.json
  // dev: https://s3.amazonaws.com/webapp-performance-dev.univision.com/dev-tudn-article-2020-09-17T21%3A29%3A45.931Z.json
  // prod: https://s3.amazonaws.com/webapp-performance-prod.univision.com/prod-uvn-video-2020-09-17T20:01:20.479Z.json
  const s3Url = `https://s3.amazonaws.com/webapp-performance-${s3Account}.univision.com/${fileName}`;
  // https://github.com/GoogleChrome/lighthouse/tree/master/lighthouse-viewer
  const lighthouseViewerUrl = `https://googlechrome.github.io/lighthouse/viewer/?jsonurl=${s3Url}`;
  renderTitle('Full Report');
  renderObj({ 'Lighthouse Viewer': lighthouseViewerUrl });
};

module.exports = display;
