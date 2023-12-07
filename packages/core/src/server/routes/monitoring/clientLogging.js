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

router.post('/client-side-logging', express.json(), cors(corsOptions), (req, res) => {
  const { level, message, stackTrace = '' } = req.body;
  const context = {
    level,
    message: decodeAndClean(message),
    stack: decodeAndClean(stackTrace),
    isLegacy: false,
  };
  const error = new HttpError(context, 500);
  const body = `Client side ${context.level}: ${context.message} @ ${req.headers.referer}`;
  handleError(req, res, body, error, { errorType: 'Client' });
  setHeaders(res);
  res.status(200).send(body).end();
});

export default router;
