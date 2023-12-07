import express from 'express';
import cors from 'cors';

import {
  corsOptions,
  decodeAndClean,
  handleError,
  setHeaders,
} from 'server/utils/serverUtils';
import HttpError from '../../utils/api/httpError';

const router = express.Router();
const ttl = 31536000; // 1 year

/**
 * Route where the rendering of the React components will happen
 */
router.get('/client-side-error/:message/:stackTrace?', cors(corsOptions), (req, res) => {
  const { message, stackTrace = '' } = req.params;
  const context = {
    message: decodeAndClean(message),
    stack: decodeAndClean(stackTrace),
    isLegacy: true,
  };
  const error = new HttpError(context, 500);
  const body = `[legacy logging] Client side error: ${context.message} @ ${req.headers.referer}`;
  handleError(req, res, body, error, { errorType: 'Client' });
  setHeaders(res, ttl);
  res.status(200).send(body).end();
});

export default router;
