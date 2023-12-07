import express from 'express';
import robots from 'server/assets/text/robots.txt';
import robotsTudn from 'server/assets/text/robots_tudn.txt';
import robotsVix from 'server/assets/text/robots_vix.txt';
import WebApiRequest from '../webapi/WebApiRequest';
import { isTudnHost } from '../utils/sites';

const router = express.Router();

const domainsAllowed = [
  'https://www.univision.com',
  'https://univision.com',
  'https://www.tudn.com',
  'https://tudn.com',
];

const vixDomains = [
  'https://mulher.com.br',
  'https://www.mulher.com.br',
  'https://delicioso.com.br',
  'https://www.delicioso.com.br',
  'https://zappeando.com.br',
  'https://www.zappeando.com.br',
  'https://tasaudavel.com.br',
  'https://www.tasaudavel.com.br',
];

/**
 * Middleware for responding to requests for the web application's
 * robot.txt for lower environments for univision
 * or robots.txt for TUDN production
 */
router.get('/robots.txt', (req, res, next) => {
  const { env } = process;
  const hostDomain = WebApiRequest.getContentDomain(req);

  if (vixDomains.includes(hostDomain) && env.DEPLOY_ENV === 'production') {
    res.header('Content-Type', 'text/plain');
    res.send(robotsVix);
  } else if (isTudnHost(hostDomain) && env.DEPLOY_ENV === 'production') {
    res.header('Content-Type', 'text/plain');
    res.send(robotsTudn);
  } else if (!domainsAllowed.includes(hostDomain)) {
    res.header('Content-Type', 'text/plain');
    res.send(robots);
  } else {
    next();
  }
});

export default router;
