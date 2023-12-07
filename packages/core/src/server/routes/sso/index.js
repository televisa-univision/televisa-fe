import Datadog from 'app/utils/datadog';
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import renderUtils from 'server/utils/renderUtils';
import * as sso from '@univision/fe-commons/dist/constants/sso';
import isValidString from '@univision/fe-utilities/helpers/common/isValidString';
import { handleError } from 'server/utils/serverUtils';
import BasicTemplate from '../../../app/components/shell/BasicTemplate';
import {
  CONTENT_SECURITY_POLICY,
} from '../../constants/headers';

const router = express.Router();

/**
 * Determines if a domain is a valid ancestor
 * This is used to determine witch parent sites can get the
 * real html and javascript code for the child iframe.
 * @param {string} domain to determines if it is a valid ancestor
 * @returns {boolean}
 */
export const isValidAncestor = (domain) => {
  return isValidString(domain)
  && sso.iFrameAncestorsRegex.some(ancestorRegex => ancestorRegex.test(domain));
};

/**
 * Add headers for the request that provide the html for the iFrame
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/frame-ancestors
 * @param {Object} res Response object
 */
export const addHeaders = (res) => {
  // eslint-disable-next-line babel/no-unused-expressions
  res?.setHeader(CONTENT_SECURITY_POLICY, `frame-ancestors ${sso.iFrameAncestors.join(' ')}`);
};

/**
 * Provides the html code for the iFrame we will use to provide
 * Single Sign On across Univision apps
 * It adds the ContentSecurityPolicy header with frame-ancestors option to provide
 * a strong security mechanism against malicious pages.
 * Referrer validation only serves as a weak security mechanism for older browsers
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {function} next express middleware callback
 */
export const getSsoIFrame = (req, res, next) => {
  const ddSpan = Datadog.addSpan('getSsoIFrame');
  addHeaders(res); // disable iframe in the browser for invalid ancestors

  try {
    if (isValidAncestor(req.get('referrer'))) {
      const assets = renderUtils.getCurrentAssets('ssoIFrame', req.assets, req.path);
      const page = (
        <BasicTemplate
          scripts={[assets.javascript]}
        />
      );
      const html = renderToString(page);
      res.status(200).send(`<!doctype html>\n${html}`).end();
    } else {
      // This will run when the referrer is invalid. Notice if you directly open this route
      // in the browser the referrer will be undefined, so invalid also.
      handleError(req, res, 'Invalid host or invalid referrer is trying to get the Univision SSO IFrame code.', null);
      res.status(403).end();
    }
    Datadog.closeSpan(ddSpan);
  } catch (e) {
    Datadog.closeSpan(ddSpan);
    next(e);
  }
};

router.get('/sso-iframe', getSsoIFrame);

export default router;
