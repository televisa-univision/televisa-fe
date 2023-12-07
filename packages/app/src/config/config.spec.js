import { getClientConfig } from '.';

describe('App config', () => {
  it('should return the client config based on the env variables', () => {
    process.env.API_ENV = 'uat2';
    process.env.DEPLOY_ENV = 'DEPLOY_ENV';
    process.env.CASTING_RECEIVER_ID = 'CASTING_RECEIVER_ID';
    process.env.CMS_API_URL = 'CMS_API_URL';
    process.env.GRAPHQL_API_URL = 'GRAPHQL_API_URL';
    process.env.PROXY_API_URL = 'PROXY_API_URL';
    process.env.VIDEO_HUB_ENV = 'VIDEO_HUB_ENV';
    process.env.VIDEO_HUB_PROFILE = 'VIDEO_HUB_PROFILE';
    process.env.VIDEO_HUB_API_KEY = 'VIDEO_HUB_API_KEY';
    process.env.MULTI_DOMAIN_DISABLED = 'false';

    expect(getClientConfig()).toEqual({
      apiEnv: 'uat2',
      castingReceiverId: process.env.CASTING_RECEIVER_ID,
      deploy: {
        env: process.env.DEPLOY_ENV,
        multiSite: true,
        buildMode: process.env.NODE_ENV,
      },
      dims: {
        baseUrl: 'https://uat2.x.univision.com/dims4/default/',
        sharedSecret: '2bbd31304d3e4a2a72bd064722797943',
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
        webAppState: '/proxy/api/cached/web-app-state',
        localMarketContent: `${process.env.CMS_API_URL}/web-api/local-market-content`,
        picture: '/proxy/api/cached/picture',
        archive: `${process.env.CMS_API_URL}/api/archive`,
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

  it('should return the right dim value', () => {
    process.env.DEPLOY_ENV = 'production';

    expect(getClientConfig().dims).toEqual({
      baseUrl: 'https://st1.uvnimg.com/dims4/default/',
      sharedSecret: 'the2pahSh6ohh7rooGh8looghi7ge7ie',
    });
  });
});
