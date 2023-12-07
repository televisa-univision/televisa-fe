import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import renderUtils from 'server/utils/renderUtils';
import BasicTemplate from '../../../app/components/shell/BasicTemplate';
import { getClientConfig } from '../../config';

const router = express.Router();

/**
 * Provides the html code for the iFrame we will use to provide
 * Single Sign On across Univision apps
 * ACP(Authorization Code Propagation)
 * Authorization Code is an OAuth authorization flow
 * To propagate that authorization code through whole the univision
 * ecosystem, where each app could request for the user's credentials
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {function} next express middleware callback
 */
export const getSsoAcpFlow = (req, res, next) => {
  try {
    const assets = renderUtils.getCurrentAssets('ssoAcpFlow', req.assets, req.path);
    const page = (
      <BasicTemplate
        scripts={[assets.javascript]}
        initialState={{
          graphql: getClientConfig().graphql,
        }}
      />
    );
    const html = renderToString(page);
    res.status(200).send(`<!doctype html>\n${html}`).end();
  } catch (e) {
    next(e);
  }
};

router.get('/sso-acp-flow', getSsoAcpFlow);

export default router;
