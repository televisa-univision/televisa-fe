import express from 'express';
import cors from 'cors';

import request from '@univision/fe-commons/dist/utils/api/requestNode';
import logger from 'app/utils/logging/serverLogger';
import { corsOptions } from 'server/utils/serverUtils';
import dims from '@univision/fe-commons/dist/utils/images/dims';

const router = express.Router();

/**
 * Route for getting Picture from dims. Proxied here to avoid CORS issues.
 */
router.get('/picture', cors(corsOptions), (req, res) => {
  const { href } = req.query;
  // check for amp; params when request comes with unencoded params
  // for instance https://univision.com/proxy/api/cached/picture?href=https%3A%2F%2Fst1.uvnimg.com%2Fe4%2F6b%2F4dd3ccef45c79c2eef3f0e58ae13%2Fee40a1941ba1402cacfd82c37b7f1823&amp;width=1920&amp;height=1080&amp;ratio_width=186&amp;ratio_height=125&amp;resize_option=Fill%20Area&amp;format=webp
  const x = req.query['amp;focus_point_x'] ?? req.query.focus_point_x;
  const y = req.query['amp;focus_point_y'] ?? req.query.focus_point_y;
  const width = req.query['amp;width'] ?? req.query.width;
  const height = req.query['amp;height'] ?? req.query.height;
  const ratioWidth = req.query['amp;ratio_width'] ?? req.query.ratio_width;
  const ratioHeight = req.query['amp;ratio_height'] ?? req.query.ratio_height;
  const resizeOption = req.query['amp;resize_option'] ?? req.query.resize_option;
  const format = req.query['amp;format'] ?? req.query.format;

  if (!href || !ratioWidth || !ratioHeight || !width || !height) {
    res.statusMessage = `Missing param in request to picture proxy. URL: ${req.originalUrl}, UserAgent: ${req.headers?.['user-agent']}`;
    return res.status(400).end();
  }

  const effectiveConfig = {
    baseUrl: req.clientConfig.dims.baseUrl,
    sharedSecret: req.clientConfig.dims.sharedSecret,
    quality: 75,
  };
  const focus = x && y && { x, y };
  let imageUrl;

  try {
    imageUrl = dims.generateUrl(
      effectiveConfig,
      {
        publicUrl: href,
        width: Number(width),
        height: Number(height),
        focus,
      },
      {
        width: Number(ratioWidth),
        height: Number(ratioHeight),
        quality: effectiveConfig.quality,
        resizeOption,
        format,
      }
    );
  } catch (error) {
    logger.error(`Got failure generating image url ${error.message} url: ${error.url}`);
    return res.status(error.status).end();
  }

  return request({
    url: imageUrl,
    responseType: 'arraybuffer',
  }).then((response) => {
    if (response.status === 200) {
      res.setHeader('Content-Type', response.headers?.['content-type']);
      res.send(response?.data);
    }
  }).catch((err) => {
    logger.error(`Got failure fetching image ${err.message} url: ${err.url}`);
    res.status(err.status).end();
  });
});

export default router;
