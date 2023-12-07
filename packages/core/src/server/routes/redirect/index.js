import express from 'express';

const router = express.Router();
const allowDomains = [
  'tudn.com',
  'tudn.tv',
  'mulher.com.br',
  'delicioso.com.br',
  'tasaudavel.com.br',
  'zappeando.com.br',
  'lasestrellas.tv',
];

/**
 * Redirect route for TUDN origin to Akamai (www)
 * @param {Object} req request from Express server
 * @param {Object} res request from Express server
 * @param {function} next express middleware callback
 */
function redirectRoute(req, res, next) {
  const host = req.get('host');
  const wwwRegExp = /^www\..+/i;

  if (allowDomains.includes(host) && !wwwRegExp.test(host)) {
    res.redirect(301, `https://www.${host}${req.url}`);
  } else {
    next();
  }
}

router.all('*', redirectRoute);

export default router;
