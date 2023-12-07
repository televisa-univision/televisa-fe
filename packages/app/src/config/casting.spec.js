import getCastingConfig from './casting';

describe('Casting config', () => {
  it('should return casting configuration object', () => {
    const config = getCastingConfig();

    expect(config).toEqual(
      expect.objectContaining({
        urls: {
          TVSS: 'https://auth.univision.com',
          TVSS_SUFFIX: 'api/v3/video-auth/url-signature-tokens',
          PUBADS: 'https://pubads.g.doubleclick.net/ondemand/hls/content',
          PUBADS_ADTAG: 'https://pubads.g.doubleclick.net/gampad/ads',
        },
        tagManager: {
          gtmId: 'GTM-M9TSL87',
        },
      }),
    );
  });
});
