import Store from '../../store/store';
import setPageData from '../../store/actions/page-actions';
import * as appStore from '../../config/appstore';
import { getFromMapping, getSmartBannerData, getTracking } from '.';

let state;
const baseDomain = 'https://www.univision.com';
appStore.default.test = () => ({
  prefix: 'testapp',
  title: 'test app',
});

/** @test {smartapp} */
describe('smartapp test', () => {
  beforeEach(() => {
    state = {
      data: {
        type: 'section',
        vertical: 'Noticias',
        brandable: {
          radioStation: {},
          tvStation: {},
        },
      },
      navData: {
        logoUrl: undefined,
      },
    };
  });

  describe('getFromMapping', () => {
    it('should return null if `mapping` is not a valid object', () => {
      const url = 'valid';
      const mapping = {};
      const pageCategory = 'univision';
      const value = getFromMapping(mapping, pageCategory, url);
      expect(value).toBeNull();
    });
    it('should return same value if returned `url` is not a valid string', () => {
      const url = 'valid';
      const mapping = {
        valid: 1234,
      };
      const pageCategory = 'univision';
      const value = getFromMapping(mapping, pageCategory, url);
      expect(value).toEqual(1234);
    });
    it('should return mapped value if it exists using `url`', () => {
      const url = 'valid';
      const mapping = {
        valid: 'value',
      };
      const pageCategory = 'univision';
      const value = getFromMapping(mapping, pageCategory, url);
      expect(value).toEqual('value');
    });
    it('should return mapped value if it exists using `pageCategory` fallback', () => {
      const url = 'valid';
      const mapping = {
        univision: 'value',
      };
      const pageCategory = 'univision';
      const value = getFromMapping(mapping, pageCategory, url);
      expect(value).toEqual('value');
    });
    it('should return undefined if url is invalid', () => {
      const url = '/invalid';
      const mapping = {
        '/': 'value',
      };
      const pageCategory = 'univision';
      const value = getFromMapping(mapping, pageCategory, url);
      expect(typeof value).toBe('undefined');
    });
    it('should return undefined if url is null and pageCategory fallback is not available', () => {
      const url = null;
      const mapping = {
        '/': 'value',
      };
      const pageCategory = 'univision';
      const value = getFromMapping(mapping, pageCategory, url);
      expect(typeof value).toBe('undefined');
    });
  });

  describe('getSmartBannerData', () => {
    it('should return null without data', () => {
      expect(getSmartBannerData()).toBeNull();
    });

    it('should return null without allowed category/uri', () => {
      state.data.uri = baseDomain;
      state.data.vertical = 'Global';
      state.pageCategory = 'univision';
      expect(getSmartBannerData(state)).toBeNull();
    });

    it('should return null without valid page data', () => {
      state.pageCategory = 'univision';
      state.data = undefined;
      expect(getSmartBannerData(state)).toBeNull();
    });

    it('should return null if pageCategory or contentType is not defined', () => {
      state.data.type = undefined;

      const data = getSmartBannerData(state);
      expect(data).toBeNull();
    });

    it('should return smart banner for uforia', () => {
      state.pageCategory = 'radio';
      const data = getSmartBannerData(state);

      expect(data.prefix).toEqual('uforiaapp');
    });

    it('should not return smart banner for conecta', () => {
      state.data.uri = `${baseDomain}/conecta`;
      state.data.vertical = 'Entretenimiento';
      const data = getSmartBannerData(state);

      expect(data).toEqual(null);
    });

    it('should return smart banner data with univision now', () => {
      state.data.longform = true;
      const data = getSmartBannerData(state);

      expect(data.prefix).toEqual('univisionnow');
    });

    it('should return deepLink if have valid contentType and uid', () => {
      state.data.type = 'article';
      state.data.uid = '00596';
      const data = getSmartBannerData(state);

      expect(data).toHaveProperty('deepLink', 'noticiasapp://article/00596');
    });

    it('should return smart banner from URL mapping', () => {
      state.pageCategory = 'republica deportiva';
      state.data.uri = `${baseDomain}/shows/republica-deportiva`;
      const data = getSmartBannerData(state);

      expect(data).toHaveProperty('bannerCategory', 'entretenimiento');
    });

    it('should return smart banner from Category mapping', () => {
      state.pageCategory = 'novela';
      state.data.uri = `${baseDomain}/other/amar-a-muerte`;
      const data = getSmartBannerData(state);

      expect(data).toHaveProperty('bannerCategory', 'univision now');
    });

    it('should return smart banner from Tudn category', () => {
      state.pageCategory = 'deportes';
      state.data.uri = `${baseDomain}/deportes`;
      state.data.vertical = 'Deportes';
      state.requestParams = { tudn: 'true' };
      Store.dispatch(setPageData(state));
      const data = getSmartBannerData(state);

      expect(data).toHaveProperty('bannerCategory', 'deportes');
      expect(data).toHaveProperty('title', 'TUDN');
      expect(data).toHaveProperty('icon', 'tudnApp');
    });

    it('should return smart banner from Category mapping and funtion config', () => {
      state.pageCategory = 'test';
      state.data.vertical = 'test';
      state.data.uri = null;
      const data = getSmartBannerData(state);

      expect(data).toHaveProperty('title', 'test app');
      expect(data).toHaveProperty('prefix', 'testapp');
    });

    it('should not return smart banner data with not mapping parent section', () => {
      state.data.vertical = 'news';
      state.navData.logoUrl = '/news';
      const data = getSmartBannerData(state);

      expect(data).toBeNull();
    });

    it('should return smart banner data with noticias if it\'s a children section', () => {
      state.navData.logoUrl = '/noticias';
      const data = getSmartBannerData(state);

      expect(data).toHaveProperty('bannerCategory', 'noticias');
      expect(data).toHaveProperty('ios', expect.any(Object));
    });

    it('should return smart banner data with noticias from legacy "primaryTopic" value', () => {
      state.vertical = 'Noticias';
      const data = getSmartBannerData(state);

      expect(data).toHaveProperty('bannerCategory', 'noticias');
    });

    it('should return smart banner with a local app from uri', () => {
      state.pageCategory = 'local-tv';
      state.data.uri = `${baseDomain}/local/nueva-york-wxtv`;
      state.data.vertical = 'Local';
      Store.dispatch(setPageData(state));
      const data = getSmartBannerData(state);

      expect(data).toHaveProperty('bannerCategory', 'local-nueva-york-wxtv');
      expect(data).toHaveProperty('prefix', 'localnewyorkapp');
      expect(data).toHaveProperty('ios', expect.any(Object));
    });
  });

  describe('getTracking', () => {
    it('should return a valid IOS traking for noticias', () => {
      Store.dispatch(setPageData(state));
      const data = getSmartBannerData(state);
      const trackingIos = getTracking(data.trackingId);
      const expectedValue = ', affiliate-data=at=1010lNJb&ct=smart_banner_noticias';
      expect(trackingIos).toEqual(expectedValue);
    });

    it('should return a empty if not have valid tracking Id', () => {
      const trackingIos = getTracking();
      expect(trackingIos).toEqual('');
    });
  });
});
