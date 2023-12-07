import express from 'express';
import cors from 'cors';
import { corsOptions } from 'server/utils/serverUtils';
// eslint-disable-next-line import/no-extraneous-dependencies
import { conflicts } from 'yargs';

const router = express.Router();

/**
 * Route for getting MediaNet album art details. Proxied here to avoid CORS issues.
 */
router.get(['/comscore-pageview', '/comscore'], cors(corsOptions), (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Edge-Control', '!no-store,cache-maxage=365d,downstream-ttl=0');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,PATCH,OPTIONS');
  res.setHeader('Cache-Control', 'no-cache');
  res.send('pageview_candidate');
});

export default router;
