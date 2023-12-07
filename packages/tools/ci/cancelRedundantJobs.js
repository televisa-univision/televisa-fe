const fetch = require('node-fetch');

const PROJECT_NAME = 'univision-fe';
const ORG_NAME='univision';
const CIRCLE_BASE_URL = `https://circleci.com/api/v1.1/project/github/${ORG_NAME}/${PROJECT_NAME}`;
const QUERY_PARAMS = `circle-token=${process.env.CIRCLE_TOKEN}`;
const BRANCHES_ALWAYS_BUILT = ['tag-hotfix/master', 'master', 'feat/integration', 'feat/performance'];
/**
 * These will be set and used later on to determine what to cancel
 */
let lastBuildDate, currentBuild;

/**
 * Gets the endpoint for cancelling a build based on a build object.
 * @param {Object} build build object from circleci api response
 * @return {string} api endpoint for cancelling the build
 */
const getCancelEndpointUrl = (build) => {
  return `${CIRCLE_BASE_URL}/${build.build_num}/cancel?${QUERY_PARAMS}`;
};

/**
 * Filtering function where the cancellation logic is created.
 * Cancel a build if
 *  1. it's older than the latest one,
 *  2. it's not the current one, and
 *  3. it's either running or waiting to run.
 * @param build
 * @return {boolean}
 */
function filterBuild(build) {
  if (build) {
    if (build.vcs_revision === process.env.CIRCLE_SHA1) {
      currentBuild = build;
    }
    const currentJobDate = build.committer_date;
    const shouldCancel = (build.status === 'running' || build.status === 'not_running') && build.vcs_revision !== process.env.CIRCLE_SHA1 && (currentJobDate < lastBuildDate);
    console.log(`should we cancel job: ${build.build_num} with status: ${build.status} for commit: ${build.vcs_revision}? ==> ${shouldCancel}`);
    return shouldCancel;
  }
}

/**
 * Gets all of the circleci builds running for the branch being built by this build.
 * @return {Promise.<void>}
 */
async function getRunningBuilds() {
  const url = `${CIRCLE_BASE_URL}/tree/${process.env.CIRCLE_BRANCH}?${QUERY_PARAMS}`;
  const circleApiResponse = await (await fetch(url)).json();
  lastBuildDate = new Date(Math.max(...circleApiResponse.map(build => new Date(build.committer_date))));
  return circleApiResponse.filter(filterBuild);
}

/**
 * Main function in charge of orchestrating the cancellation of builds
 * and cancelling the current one if not the most recent.
 * @return {Promise.<void>}
 */
async function cancelRunningBuilds() {
  if (typeof process.env.CIRCLE_PULL_REQUEST === 'undefined' || process.env.CIRCLE_PULL_REQUEST === null) {
    if (!BRANCHES_ALWAYS_BUILT.includes(process.env.CIRCLE_BRANCH)) {
      console.log(`No PR open for this branch. Cancelling build ${process.env.CIRCLE_BUILD_NUM}`);
      fetch(getCancelEndpointUrl({ build_num: process.env.CIRCLE_BUILD_NUM}), { method: 'POST' });
    }
  }
  console.log(`Build ${process.env.CIRCLE_BUILD_NUM} is running`);
  const runningBuilds = await getRunningBuilds();
  runningBuilds.forEach(build => {
    console.log(`Cancelling Build: ${build.build_num}`);
    fetch(getCancelEndpointUrl(build), { method: 'POST' });
  });
  if (currentBuild.committer_date < lastBuildDate) {
    console.log(`Cancelling Build: ${build.build_num}`);
    fetch(getCancelEndpointUrl(currentBuild), { method: 'POST' });
  }
}

cancelRunningBuilds();
