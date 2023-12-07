import express from 'express';
import cors from 'cors';

import {
  corsOptions,
  setHeaders,
  setTransactionName,
} from 'server/utils/serverUtils';
import sportsRequest from '@univision/fe-commons/dist/utils/api/proxyDefinition';
import * as messages from '@univision/fe-commons/dist/constants/messages';

const router = express.Router();

/**
 * Time to live for the cache
 * @type {number}
 */
const ttl = 30;
const pathId = '/sports';

/**
 * Helper to get the url segment for better APM report
 * @param {string} path to be send
 */
const sendApiUrlSegment = (path) => {
  if (typeof path === 'string') {
    const endpoint = path.split('/').slice(1, 5).join('/');
    setTransactionName('get', endpoint);
  }
};

/**
 * Route to access sport API. Proxied here to avoid CORS and authentication issues.
 */
router.get(`${pathId}/*`, cors(corsOptions), (req, res) => {
  setHeaders(res, ttl);
  res.set('Content-Type', 'application/json');
  // Send to APM
  sendApiUrlSegment(req.path);
  sportsRequest({
    path: req.path.replace(pathId, ''),
    query: req.query,
    fullData: true,
  })
    .then(({ data, status }) => res.status(status).json(data))
    .catch((err) => {
      const { status = 408 } = err;
      const responseBody = status === 404
        ? { statusText: messages.NOT_FOUND } : { statusText: messages.INTERNAL_ERROR };

      res.errorMessage = err.message || `Request failed with status code ${status}`;
      res.stack = err.stack;
      res.status(status).json(responseBody);
    });
});

export default router;
