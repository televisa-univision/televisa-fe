import express from 'express';
import cors from 'cors';

import serverConfig from 'server/config';
import logger from 'app/utils/logging/serverLogger';
import request from '@univision/fe-commons/dist/utils/api/requestNode';
import { corsOptions, handleError } from 'server/utils/serverUtils';
import * as messages from '@univision/fe-commons/dist/constants/messages';

const router = express.Router();

/**
 * Route for Poll API.
 */
router.get('/poll-api', cors(corsOptions), (req, res) => {
  const apiUrl = process.env.CMS_API_URL;
  // Maps the API url with the Web URL
  const requestDomain = serverConfig.api.domains[apiUrl.replace(/^https?:\/\//i, '')] || apiUrl;
  const requestUrl = `${requestDomain}${serverConfig.api.endpoints.poll(req.query)}`;
  logger.info(`Poll api request: ${requestUrl}`);

  const options = {
    url: requestUrl,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
    },
  };
  request(options)
    .then(({ data, status }) => res.status(status).json(data))
    .catch((err) => {
      const msg = `server error on assets API for url: ${err.url}`;
      handleError(req, res, msg, err);
      res.status(err.status).send(messages.INTERNAL_ERROR);
    });
});

export default router;
