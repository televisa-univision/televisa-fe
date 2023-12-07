import { getClientConfig } from './config';

describe('Config', () => {
  it('should return the client config based on the env variables', () => {
    process.env.DEPLOY_ENV = 'DEPLOY_ENV';
    process.env.CMS_API_URL = 'CMS_API_URL';
    process.env.GRAPHQL_API_UR = 'GRAPHQL_API_UR';
    process.env.VIDEO_HUB_ENV = 'VIDEO_HUB_ENV';
    process.env.VIDEO_HUB_PROFILE = 'VIDEO_HUB_PROFILE';
    process.env.VIDEO_HUB_API_KEY = 'VIDEO_HUB_API_KEY';
    process.env.MULTI_DOMAIN_DISABLED = 'false';

    expect(getClientConfig()).toEqual({
      deploy: {
        env: process.env.DEPLOY_ENV,
        multiSite: process.env.MULTI_DOMAIN_DISABLED !== 'true',
      },
      dims: {
        baseUrl: 'https://uat2.x.univision.com/dims4/default/',
        sharedSecret: '2bbd31304d3e4a2a72bd064722797943',
      },
      graphql: process.env.GRAPHQL_API_URL,
      syndicator: {
        uri: process.env.CMS_API_URL,
        content: `${process.env.CMS_API_URL}/web-api/content`,
        video: `${process.env.CMS_API_URL}/feed/video-api`,
        search: `${process.env.CMS_API_URL}/web-api/search`,
        widget: `${process.env.CMS_API_URL}/web-api/widget`,
        webAppState: '/proxy/api/cached/web-app-state',
        localMarketContent: `${process.env.CMS_API_URL}/web-api/local-market-content`,
      },
      videoHub: {
        env: process.env.VIDEO_HUB_ENV,
        profile: process.env.VIDEO_HUB_PROFILE,
      },
      tracking: {
        spaMonitoring: process.env.SPA_MONITORING_ENABLED === 'true',
      },
    });
  });
});
