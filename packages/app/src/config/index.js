import { appleSiteAssociationPattern, wellKnownPattern } from '@univision/fe-commons/src/constants/mobileAppsSettings';
import ignorePaths from './ignorePaths';

/**
 * !!!!!!! WARNING !!!!!!!
 * DO NOT PUT ANYTHING IN THIS FILE THAT YOU DO NOT WANT EXPOSED
 * ON THE CLIENT. EG, NO PASSWORDS, API KEYS, OR SECRET SAUCE RECIPES.
 */
export const appConfig = {
  ignoredPagePaths: ignorePaths,
  appleSiteAssociationPattern,
  wellKnownPattern,
  api: {
    endpoints: {
      ampIframe: 'https://static.univision.com/amp/amp-iframe-html.htm?url=',
      ampIframeRawHtml: 'https://cdn4.uvnimg.com/10/ad/3066c9494574a515a4292ac5a0db/amp-iframe-html.html?url=',
    },
  },
  routes: {
    proxy: {
      cached: '/proxy/api/cached',
      uncached: '/proxy/api/uncached',
    },
  },
  features: {
    section: {
      seoContentItemsCount: 35,
    },
  },
  // query string, dateFilter on search page and
  // autoplay for embed videos
  allowedRequestParams: ['q', 'd', 'autoplay'],
};

/**
 * Returns the config required for the client side.
 * @returns {Object}
 */
export function getClientConfig() {
  return {
    apiEnv: process.env.API_ENV,
    castingReceiverId: process.env.CASTING_RECEIVER_ID,
    deploy: {
      env: process.env.DEPLOY_ENV,
      multiSite: true,
      buildMode: process.env.NODE_ENV,
    },
    dims: {
      baseUrl: process.env.DEPLOY_ENV === 'production' ? 'https://st1.uvnimg.com/dims4/default/' : 'https://uat2.x.univision.com/dims4/default/',
      sharedSecret: process.env.DEPLOY_ENV === 'production' ? 'the2pahSh6ohh7rooGh8looghi7ge7ie' : '2bbd31304d3e4a2a72bd064722797943',
    },
    graphql: process.env.GRAPHQL_API_URL,
    ssoIframeUrl: process.env.SSO_IFRAME_URL,
    proxy: process.env.PROXY_API_URL,
    syndicator: {
      uri: process.env.CMS_API_URL,
      content: `${process.env.CMS_API_URL}/web-api/content`,
      video: `${process.env.CMS_API_URL}/feed/video-api`,
      search: `${process.env.CMS_API_URL}/web-api/search`,
      widget: `${process.env.CMS_API_URL}/web-api/widget`,
      webAppState: `${appConfig.routes.proxy.cached}/web-app-state`,
      localMarketContent: `${process.env.CMS_API_URL}/web-api/local-market-content`,
      archive: `${process.env.CMS_API_URL}/api/archive`,
      picture: `${appConfig.routes.proxy.cached}/picture`,
    },
    videoHub: {
      env: process.env.VIDEO_HUB_ENV,
      profile: process.env.VIDEO_HUB_PROFILE,
    },
    tracking: {
      spaMonitoring: process.env.SPA_MONITORING_ENABLED === 'true',
    },
    version: process.env.VERSION,
  };
}

export default appConfig;
