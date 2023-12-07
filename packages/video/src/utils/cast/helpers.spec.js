import * as fetch from '@univision/fe-commons/dist/utils/fetch';
import formatVideoData from './castHelpers';

// urls from config
const configUrls = {
  TVSS: 'https://auth.univision.com',
  TVSS_SUFFIX: 'api/v3/video-auth/url-signature-tokens',
  PUBADS: 'https://pubads.g.doubleclick.net/ondemand/hls/content',
  PUBADS_ADTAG: 'https://pubads.g.doubleclick.net/gampad/ads',
};

// media data passed in from the device
const mediaData1 = {
  media: {
    contentId: '6665',
    contentUrl: 'exampleurl',
    customData: {
      googleAdTag: 'sample google ad tag',
      skipAds: true,
    },
  },
};

const mediaDataShowLiveAds = {
  media: {
    contentId: '6665',
    contentUrl: 'exampleurl',
    customData: {
      googleAdTag: 'sample google ad tag',
      playLiveAds: true,
    },
  },
};

const mediaData2 = {
  media: {
    contentId: '6665',
    customData: {
      googleAdTag: 'sample google ad tag',
      skipAds: true,
      cmsId: '334',
      videoId: '6665',
      daiToken: 'token',
    },
  },
};

const mediaData2MX = {
  media: {
    contentId: '6665',
    customData: {
      googleAdTag: 'sample google ad tag',
      skipAds: true,
      mcpOrigin: 'MX',
      cmsId: '334',
      videoId: '6665',
      daiToken: 'token',
      tvssdomain: 'somedomain',
    },
  },
};

const mediaData3 = {
  media: {
    contentId: '6665',
    customData: {
      googleAdTag: 'sample google ad tag',
      skipAds: false,
      cmsId: '334',
      daiToken: 'token',
      tvssdomain: 'someDomain',
    },
  },
};

const mediaDataMX = {
  media: {
    contentId: '6665',
    customData: {
      googleAdTag: 'sample google ad tag',
      skipAds: false,
      mcpOrigin: 'MX',
      cmsId: '334',
      daiToken: 'token',
      videoId: '6665',
      tvssdomain: 'someDomain',
    },
  },
};

const mediaDataWeb = {
  media: {
    contentId: 'someId',
    entity: 'https://nomvauth.univision.com/api/v3/video-auth/url-signature-token-by-id?mcpid=4168697&daiSetting=&videoId=4168697&cmsId=2554571&daiToken=BE921757186A0B331740FB8B7C7687B46CBFE8F1DE23B218E3DC0C9C18C62C75&daiAssetKey=123456&googleAdTag=iu%3D%252F6881%252Frd.univision_section_test%252Fdeportes%252Ffutbol%26cust_params%3Dvertical%253Dtest%2526spaStart%253Dtrue%2526user_agent%253DMozilla%252F5.0%2B%2528Macintosh%253B%2BIntel%2BMac%2BOS%2BX%2B10_15_7%2529%2BAppleWebKit%252F537.36%2B%2528KHTML%252C%2Blike%2BGecko%2529%2BChrome%252F97.0.4692.71%2BSafari%252F537.36%2526pw%253D837%2526ph%253D471%2526contenttype%253Dsection%2526permutive%253D56649%252C58513%252C58522%252C58952%252C59076%252C59078%252C59246%252C59253%252C60282%252C60888%252C65306%252C66658%252C67775%252C67777%252C69842%252C75581%252C75589%252C75598%252C75604%252C75610%252C83607%26description_url%3Dhttps%253A%252F%252Fwww.tudn.com%252Ffutbol%252Ftest-section-tudn%253FenableCasting%253Dtrue',
  },
};

const mediaDataWeb2 = {
  media: {
    contentId: 'someId',
    contentUrl: 'https://tkx.mp.lura.live',
    entity: 'https://tkx.mp.lura.live',
  },
};

const mediaDataWeb3 = {
  media: {
    contentId: 'someId',
    entity: 'https://nomvauth.univision.com/api/v3/video-auth/url-signature-token-by-id?mcpid=4168697&daiSetting=&videoId=&cmsId=2554571&daiToken=BE921757186A0B331740FB8B7C7687B46CBFE8F1DE23B218E3DC0C9C18C62C75&googleAdTag=iu%3D%252F6881%252Frd.univision_section_test%252Fdeportes%252Ffutbol%26cust_params%3Dvertical%253Dtest%2526spaStart%253Dtrue%2526user_agent%253DMozilla%252F5.0%2B%2528Macintosh%253B%2BIntel%2BMac%2BOS%2BX%2B10_15_7%2529%2BAppleWebKit%252F537.36%2B%2528KHTML%252C%2Blike%2BGecko%2529%2BChrome%252F97.0.4692.71%2BSafari%252F537.36%2526pw%253D837%2526ph%253D471%2526contenttype%253Dsection%2526permutive%253D56649%252C58513%252C58522%252C58952%252C59076%252C59078%252C59246%252C59253%252C60282%252C60888%252C65306%252C66658%252C67775%252C67777%252C69842%252C75581%252C75589%252C75598%252C75604%252C75610%252C83607%26description_url%3Dhttps%253A%252F%252Fwww.tudn.com%252Ffutbol%252Ftest-section-tudn%253FenableCasting%253Dtrue',
  },
};

const mediaDataWeb4 = {
  media: {
    contentId: 'someId',
  },
};

const mediaDataWeb5 = {
  media: {
    contentId: 'someId',
    entity: 'https://nomvauth.univision.com/api/v3/video-auth/url-signature-token-by-id?mcpid=4168697&daiSetting=&videoId=1234&cmsId=2554571&daiToken=&googleAdTag=iu%3D%252F6881%252Frd.univision_section_test%252Fdeportes%252Ffutbol%26cust_params%3Dvertical%253Dtest%2526spaStart%253Dtrue%2526user_agent%253DMozilla%252F5.0%2B%2528Macintosh%253B%2BIntel%2BMac%2BOS%2BX%2B10_15_7%2529%2BAppleWebKit%252F537.36%2B%2528KHTML%252C%2Blike%2BGecko%2529%2BChrome%252F97.0.4692.71%2BSafari%252F537.36%2526pw%253D837%2526ph%253D471%2526contenttype%253Dsection%2526permutive%253D56649%252C58513%252C58522%252C58952%252C59076%252C59078%252C59246%252C59253%252C60282%252C60888%252C65306%252C66658%252C67775%252C67777%252C69842%252C75581%252C75589%252C75598%252C75604%252C75610%252C83607%26description_url%3Dhttps%253A%252F%252Fwww.tudn.com%252Ffutbol%252Ftest-section-tudn%253FenableCasting%253Dtrue',
  },
};

const mediaDataWeb6 = {
  media: {
    contentId: 'someId',
    entity: 'https://nomvauth.univision.com/api/v3/video-auth/url-signature-token-by-id?mcpid=4168697&daiSetting=&videoId=123&cmsId=2554571&daiToken=BE921757186A0B331740FB8B7C7687B46CBFE8F1DE23B218E3DC0C9C18C62C75',
  },
};

const mediaDataAssetKey = {
  media: {
    contentId: '6665',
    contentUrl: 'https://tkx.mp.lura.live',
    customData: {
      daiAssetKey: '1234567',
      skipAds: true,
      cmsId: '334',
      daiToken: 'token',
      videoId: '6665',
      tvssdomain: 'someDomain',
    },
  },
};

const mediaDataAssetKey2 = {
  media: {
    contentUrl: 'https://tkx.mp.lura.live',
    customData: {
      daiAssetKey: '1234567',
      skipAds: true,
      cmsId: '334',
      daiToken: 'token',
      tvssdomain: 'someDomain',
    },
  },
};

const streamManagerRes = {
  breakClips: [
    {
      duration: 20,
      id: 'b0a1',
    },
  ],
  breaks: [{
    breakClipIds: [],
    id: 'b0',
    isEmbedded: true,
    isWatched: true,
    position: 0,
  }],
};

const daiApi = {
  VODStreamRequest: () => ({}),
  LiveStreamRequest: () => ({}),
};

const streamManager = {
  requestStream: (mediaData, streamData) => {
    if (streamData?.videoId || streamData?.assetKey) {
      return Promise.resolve(streamManagerRes);
    }
    return Promise.reject(streamData);
  },
};

jest.useFakeTimers();

describe('cast helpers', () => {
  it('format data with content url', () => {
    return formatVideoData(mediaData1, configUrls).then((data) => {
      expect(data).toStrictEqual({
        ...mediaData1,
        media: {
          ...mediaData1.media,
          vmapAdsRequest: {},
        },
      });
    });
  });
  it('format data with content url and live stream ads', () => {
    return formatVideoData(mediaDataShowLiveAds, configUrls).then((data) => {
      expect(data).toStrictEqual({
        ...mediaDataShowLiveAds,
        media: {
          ...mediaDataShowLiveAds.media,
          vmapAdsRequest: {
            adTagUrl: 'https://pubads.g.doubleclick.net/gampad/ads?sample google ad tag',
          },
        },
      });
    });
  });
  it('format data for web, parse url to get custom params', async () => {
    return formatVideoData(mediaDataWeb, configUrls, streamManager, daiApi).then((data) => {
      expect(data).toBe(streamManagerRes);
    });
  });
  it('format data for web, url with no video id', async () => {
    return formatVideoData(mediaDataWeb3, configUrls, streamManager, daiApi).then((data) => {
      expect(data.entity).toBe(mediaDataWeb3.entity);
      expect(data.media.vmapAdsRequest.adTagUrl).toBeDefined();
    });
  });
  it('format data for web, url with no api key', async () => {
    return formatVideoData(mediaDataWeb5, configUrls, streamManager, daiApi).then((data) => {
      expect(data).toBe(streamManagerRes);
    });
  });
  it('format data for web, url with no ad tag', async () => {
    return formatVideoData(mediaDataWeb6, configUrls, streamManager, daiApi).then((data) => {
      expect(data).toBe(streamManagerRes);
    });
  });
  it('format data with live dai asset key', async () => {
    return formatVideoData(mediaDataAssetKey, configUrls, streamManager, daiApi).then((data) => {
      expect(data).toBe(streamManagerRes);
    });
  });
  it('format data with live dai asset key - fallback', async () => {
    const streamManagerReject = {
      requestStream: (mediaData, streamData) => {
        return Promise.reject(streamData);
      },
    };
    return formatVideoData(mediaDataAssetKey2, configUrls, streamManagerReject, daiApi)
      .then((data) => {
        expect(data).toBe(mediaDataAssetKey2);
      });
  });
  it('format with no custom data, live', async () => {
    return formatVideoData(mediaDataWeb2).then((data) => {
      expect(data).toStrictEqual({ ...mediaDataWeb2, media: { ...mediaDataWeb2.media, streamType: 'LIVE' } });
    });
  });
  it('format with no custom data', async () => {
    return formatVideoData(mediaDataWeb4).then((data) => {
      expect(data).toStrictEqual({ ...mediaDataWeb4, media: { ...mediaDataWeb4.media, streamType: '' } });
    });
  });
  it('format with custom data, skip ads', async () => {
    jest.spyOn(fetch, 'default').mockImplementation(async () => {
      return Promise.resolve({
        data: [
          {
            renditionUrl: 'responseURL',
          },
        ],
      });
    });
    return formatVideoData(mediaData2, configUrls).then((data) => {
      expect(data).toStrictEqual({ ...mediaData2, media: { ...mediaData2.media, contentUrl: 'responseURL', vmapAdsRequest: {} } });
    });
  });
  it('format with custom data, skip ads, MX', async () => {
    jest.spyOn(fetch, 'default').mockImplementation(async () => {
      return Promise.resolve({
        data: [
          {
            renditionUrl: 'responseURL',
          },
        ],
      });
    });
    return formatVideoData(mediaData2MX, configUrls, streamManager, daiApi).then((data) => {
      expect(data).toStrictEqual({ ...mediaData2MX, media: { ...mediaData2MX.media, contentUrl: 'responseURL', vmapAdsRequest: {} } });
    });
  });
  it('format with custom data, skip ads, tvss fail', async () => {
    jest.spyOn(fetch, 'default').mockImplementation(async () => {
      return Promise.reject();
    });
    return formatVideoData(mediaData2, configUrls).then((data) => {
      expect(data).toStrictEqual({ ...mediaData2, media: { ...mediaData2.media, contentUrl: '', vmapAdsRequest: {} } });
    });
  });
  it('format with custom data', async () => {
    jest.spyOn(fetch, 'default').mockImplementation(async () => {
      return Promise.resolve({
        data: [
          {
            renditionUrl: 'responseURL',
          },
        ],
      });
    });
    return formatVideoData(mediaData3, configUrls, streamManager, daiApi).then((data) => {
      expect(data).toStrictEqual({
        media: {
          ...mediaData3.media,
          contentUrl: 'responseURL',
          vmapAdsRequest: { adTagUrl: 'https://pubads.g.doubleclick.net/gampad/ads?sample google ad tag' },
        },
      });
    });
  });
  it('format with custom data, MX', async () => {
    jest.spyOn(fetch, 'default').mockImplementation(async () => {
      return Promise.resolve({
        data: [
          {
            renditionUrl: 'responseURL',
          },
        ],
      });
    });
    return formatVideoData(mediaDataMX, configUrls, streamManager, daiApi).then((data) => {
      expect(data).toStrictEqual(streamManagerRes);
    });
  });
  it('format with custom data, tvss fail', async () => {
    jest.spyOn(fetch, 'default').mockImplementation(async () => {
      return Promise.reject();
    });
    return formatVideoData(mediaData3, configUrls, streamManager, daiApi).then((data) => {
      expect(data).toStrictEqual({
        media: {
          ...mediaData3.media,
          contentUrl: '',
          vmapAdsRequest: { adTagUrl: 'https://pubads.g.doubleclick.net/gampad/ads?sample google ad tag' },
        },
      });
    });
  });
});
