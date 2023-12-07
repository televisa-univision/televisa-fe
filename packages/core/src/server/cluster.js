import cluster from 'cluster';
import os from 'os';

import serverConfig from 'server/config';
import logger from 'app/utils/logging/serverLogger';

import { exists } from '@univision/fe-commons/dist/utils/helpers';
import expressServerWorker from './server';

/**
 * Determines if nodejs cluster mode should be enabled
 * on this application
 * @returns {boolean}
 */
function isClusterModeEnabled() {
  return process.env.NODE_ENV === 'production' && serverConfig.clusterModeEnabled;
}

/**
 * Get the number of workers to create for nodejs
 * cluster mode based on amount of cores and environment
 * @returns {number}
 */
function getNumberOfWorkers() {
  let numberOfWorkers = os.cpus().length;
  if (process.env.CI_CLIENT === 'true') {
    numberOfWorkers %= 3;
  }
  return numberOfWorkers;
}

/**
 * Loops through the workerCount creating a new worker
 * per iteration
 * @param {number} workerCount Amount of new workers to create
 */
function createWorker(workerCount) {
  Array(workerCount).fill(0).forEach(() => {
    cluster.fork();
  });
}

/**
 * Function exported by the server's entry point.
 * @param {Object} parameters - may contain some miscellaneous library-specific stuff
 */
export default function(parameters) {
  /**
   * Checks if cluster mode should be enabled and if the process
   * is the cluster's master so we can fork it to create as many
   * child processes as cores we have available.
   */
  if (isClusterModeEnabled() && cluster.isMaster) {
    const workerCount = getNumberOfWorkers();
    logger.info(`Master ${process.pid} is running`);
    logger.info(`workerCount: ${workerCount}`);
    createWorker(workerCount);

    cluster.on('exit', (worker, code, signal) => {
      let message;
      if (code !== 0 && !worker.exitedAfterDisconnect) {
        message = `worker ${worker.process.pid} was killed with error code: ${code}`;
      } else {
        message = `worker ${worker.process.pid} died peacefully with code: ${code}`;
      }
      if (exists(signal)) {
        message = `${message} and signal: ${signal}`;
      }
      logger.info(message);
      createWorker(1);
    });
  } else {
    expressServerWorker(parameters);
  }
}
