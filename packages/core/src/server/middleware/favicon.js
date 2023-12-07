import path from 'path';
import favicon from 'serve-favicon';

import { isTudnHost } from '../utils/sites';

/**
 * Middleware for dynamic favicon per site/domain
 * @param {Object} req - Express.js server request
 * @param {Object} res - Express.js server response
 * @param {function} next - middleware callback
 */
function getFavicon(req, res, next) {
  const host = req.get('host');
  let favName = 'favicon.ico';
  if (isTudnHost(host)) {
    favName = 'favicon_tudn.ico';
  }
  favicon(path.join(__dirname, '../..', `/${favName}`))(req, res, next);
}

export default getFavicon;
