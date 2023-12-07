import request from '@univision/fe-commons/dist/utils/api/requestNode';
import { setHeaders, handleError } from 'server/utils/serverUtils';

const ttl = 31536000; // 1 year

/**
 * Try to fetch an asset using the S3 Bucket configured for the current env, if any.
 * It will delegate to the next callback to handle the request if S3 returns a 404.
 *
 * @param {Object} req Node Request object
 * @param {Object} res Node Response object
 * @param {function} next Callback to the next handler.
 */
export default (req, res, next) => {
  if (!process.env.AWS_S3_ASSETS_BUCKET) {
    next();
  } else {
    const { path } = req;
    const options = {
      url: `https://${process.env.AWS_S3_ASSETS_BUCKET}${path}`,
      responseType: 'arraybuffer',
    };
    request(options)
      .then(({ data, headers }) => {
        res.setHeader('Content-Type', headers['content-type']);
        res.setHeader('Content-Length', headers['content-length']);
        res.setHeader('X-Asset-Source', 'S3');
        setHeaders(res, ttl);
        res.status(200).send(data);
      }).catch((err) => {
        const msg = `server error on assets API for url: ${err.url}`;
        handleError(req, res, msg, err);
        next();
      });
  }
};
