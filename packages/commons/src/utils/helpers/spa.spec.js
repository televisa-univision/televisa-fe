import * as hasKey from '@univision/fe-utilities/helpers/object/hasKey';

import * as spaHelpers from './spa';
import * as pageSelectors from '../../store/selectors/page-selectors';
import * as storeHelpers from '../../store/storeHelpers';
import { FORCE_REDIRECT, SPA_MODE } from '../../constants/spa';

describe('SPA helpers', () => {
  describe('shouldSkipSpa', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'location', {
        value: {
          href: 'https://www.univision.com/',
          assign: jest.fn(),
        },
        writable: true,
      });
    });
    it('should return true by default', () => {
      expect(spaHelpers.shouldSkipSpa()).toBe(true);
      expect(spaHelpers.shouldSkipSpa({})).toBe(true);
    });
    it('should not skip SPA for valid paths', () => {
      expect(spaHelpers.shouldSkipSpa({ url: '/radio/' })).toBe(false);
    });

    it('should not validate max nav exceeded on SSR', () => {
      const oldWindow = global.window;
      delete global.window;
      spyOn(storeHelpers, 'getNavigationCount').and.returnValue(1000);
      expect(spaHelpers.shouldSkipSpa({ url: '/radio/' })).toBe(false);
      global.window = oldWindow;
    });

    it('should skip SPA if max nav exceeded', () => {
      spyOn(storeHelpers, 'getNavigationCount').and.returnValue(1000);
      expect(spaHelpers.shouldSkipSpa({ url: '/radio/' })).toBe(true);
    });

    it('should not skip SPA if max nav exceeded but there is a media playing', () => {
      spyOn(storeHelpers, 'getNavigationCount').and.returnValue(1000);
      spyOn(storeHelpers, 'isPlayingMedia').and.returnValue(true);
      expect(spaHelpers.shouldSkipSpa({ url: '/radio/' })).toBe(false);
    });

    it('should not skip SPA if domain is TUDN and the user currently is in TUDN', () => {
      global.window.location.href = 'https://www.tudn.com';
      expect(spaHelpers.shouldSkipSpa({ url: 'https://www.tudn.com/radio' })).toBe(false);
    });

    it('should skip SPA if domain external', () => {
      expect(spaHelpers.shouldSkipSpa({ url: 'https://www.google.com/radio' })).toBe(true);
    });

    it('should not skip SPA if the flag to skip SPA is sent', () => {
      // if spaMode is set to false
      spyOn(storeHelpers, 'hasFeatureFlag').and.returnValue(true);
      window.location.href = 'https://www.tudn.com';
      expect(spaHelpers.shouldSkipSpa({ url: 'https://www.tudn.com/futbol' })).toBe(true);
    });

    it('should skip SPA for AMP pages', () => {
      window.location.href = 'https://www.tudn.com';
      expect(spaHelpers.shouldSkipSpa({ url: 'https://www.tudn.com/amp/radio' })).toBe(true);
    });

    it('should skip SPA for Embed pages', () => {
      expect(spaHelpers.shouldSkipSpa({ url: 'https://www.tudn.com/radio/embed' })).toBe(true);
    });

    it('should skip SPA if domain is mailto', () => {
      expect(spaHelpers.shouldSkipSpa({ url: 'mailto:www.univision.com' })).toBe(true);
    });

    it('should not skip SPA if the path is is supported.', () => {
      expect(spaHelpers.shouldSkipSpa({ url: 'https://www.univision.com/radio' })).toBe(false);
      expect(spaHelpers.shouldSkipSpa({ url: '/radio' })).toBe(false);
    });

    it('should skip SPA if the user is navigating to a different site.', () => {
      // From Univision to TUDN
      window.location.href = 'https://www.univision.com/noticias';
      expect(spaHelpers.shouldSkipSpa({ url: 'https://www.tudn.com' })).toBe(true);
      // From TUDN to Univision
      window.location.href = 'https://www.tudn.com';
      expect(spaHelpers.shouldSkipSpa({ url: 'https://www.univision.com' })).toBe(true);
    });

    it('should skip SPA if page category is Verizon 360', () => {
      jest.spyOn(storeHelpers, 'getPageCategory').mockReturnValueOnce('verizon 360');
      expect(spaHelpers.shouldSkipSpa({ url: 'https://www.tudn.com/verizon-360-tudn' })).toBe(true);
    });

    it('should skip SPA if mailto link', () => {
      expect(spaHelpers.shouldSkipSpa({ url: 'mailto://test@test.com' })).toBe(true);
    });

    it('should skip SPA if whatsapp link', () => {
      expect(spaHelpers.shouldSkipSpa({ url: 'whataspp://send?text=test' })).toBe(true);
    });
  });
  describe('errorHandler', () => {
    delete window.location;
    window.location = {
      assign: jest.fn(),
    };
    const isSpaSpy = jest.spyOn(pageSelectors, 'isSpaSelector');
    const getPageUrlSpy = jest.spyOn(storeHelpers, 'getPageUrl');

    beforeEach(() => {
      jest.clearAllMocks();
      window.location.assign.mockClear();
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });
    it('should assign location href the / by default', () => {
      isSpaSpy.mockReturnValueOnce(false);
      spaHelpers.errorHandler();
      expect(window.location.assign).toHaveBeenCalledWith(`/?${SPA_MODE}=false&${FORCE_REDIRECT}=true`);
    });
    it('should redirect out of spa', () => {
      const sampleUrl = 'http://www.univision.com/noticias?testparam=true';
      isSpaSpy.mockReturnValueOnce(true);
      getPageUrlSpy.mockReturnValueOnce(sampleUrl);
      spaHelpers.errorHandler();
      expect(window.location.assign).toHaveBeenCalledWith(`${sampleUrl}&${SPA_MODE}=false&${FORCE_REDIRECT}=true`);
    });
    it('should redirect to homepage if store url is not defined', () => {
      isSpaSpy.mockReturnValueOnce(true);
      getPageUrlSpy.mockReturnValueOnce(null);
      spaHelpers.errorHandler();
      expect(window.location.assign).toHaveBeenCalledWith(`/?${SPA_MODE}=false&${FORCE_REDIRECT}=true`);
    });
    it('should redirect only if location assign is defined', () => {
      const hasKeySpy = jest.spyOn(hasKey, 'default');
      hasKeySpy.mockReturnValueOnce(false);
      spaHelpers.errorHandler();
      expect(window.location.assign).toHaveBeenCalledTimes(0);
    });
    it('should not redirect multiple times', () => {
      global.window = Object.create(window);
      const url = `http://univision.com?${FORCE_REDIRECT}=true`;
      Object.defineProperty(window, 'location', {
        value: {
          href: url,
          assign: jest.fn(),
        },
      });
      spaHelpers.errorHandler();
      expect(window.location.assign).toHaveBeenCalledTimes(0);
    });
  });

  describe('getRequestParamsForSpa', () => {
    it('should handle invalid parameters', () => {
      expect(spaHelpers.getRequestParamsForSpa({})).toEqual({});
    });

    it('should remove invalid request params', () => {
      expect(spaHelpers.getRequestParamsForSpa({
        requestParams: {
          url: 'test',
        },
      })).toEqual({});
    });

    it('should returns params from the allowed list', () => {
      const requestParams = {
        q: 'test',
        page: 'test',
        id: 'test',
      };
      expect(spaHelpers.getRequestParamsForSpa({
        requestParams,
        enableAllowedParams: true,
      })).toEqual(requestParams);
    });

    it('should remove all params when not in the allowed list', () => {
      const requestParams = {
        test: 'test',
      };
      expect(spaHelpers.getRequestParamsForSpa({
        requestParams,
        enableAllowedParams: true,
      })).toEqual({});
    });
  });

  describe('getRequestParamsForSpa', () => {
    it('should handle invalid parameters', () => {
      expect(typeof spaHelpers.fetchSpaState({})).toBe('object');
    });
  });

  describe('errorFormatter', () => {
    it('should handle invalid parameters', () => {
      expect(spaHelpers.errorFormatter()).toEqual({});
      expect(spaHelpers.errorFormatter({})).toEqual({});
    });
    it('should format error for SPA', () => {
      const store = {};
      const error = {
        message: 'Error message',
      };
      jest.spyOn(pageSelectors, 'isSpaSelector').mockReturnValueOnce(true);
      expect(spaHelpers.errorFormatter({ store, error })).toEqual({
        message: '[SPA Error] Error message',
      });
    });
  });

  describe('areInSameSitesDomain', () => {
    it('should return false by default', () => {
      expect(spaHelpers.areInSameSitesDomain()).toBe(false);
    });
    it('should return true when urls are relative', () => {
      const firstUrl = '/test';
      const secondUrl = '/foo';
      expect(spaHelpers.areInSameSitesDomain(firstUrl, secondUrl)).toBe(true);
      expect(spaHelpers.areInSameSitesDomain(null, secondUrl)).toBe(true);
      expect(spaHelpers.areInSameSitesDomain(firstUrl, null)).toBe(true);
    });
    it('should return false when urls are different with valid domains', () => {
      const firstUrl = 'https://uat.tudn.com';
      const secondUrl = 'https://uat2.x.univision.com';
      expect(spaHelpers.areInSameSitesDomain(firstUrl, secondUrl)).toBe(false);
    });
    it('should return true when urls are same with valid domains', () => {
      const firstUrl = 'https://www.univision.com';
      const secondUrl = 'https://uat2.x.univision.com';
      expect(spaHelpers.areInSameSitesDomain(firstUrl, secondUrl)).toBe(true);
    });
    it('should return false when urls are same with invalid domains', () => {
      const firstUrl = 'https://test.com';
      const secondUrl = 'https://uat.test.com';
      expect(spaHelpers.areInSameSitesDomain(firstUrl, secondUrl)).toBe(false);
    });
  });

  describe('isInSitesDomain', () => {
    it('should return false by default', () => {
      expect(spaHelpers.isInSitesDomain()).toBe(false);
    });
    it('should return false when url has no valid domain', () => {
      expect(spaHelpers.isInSitesDomain('https://test.com')).toBe(false);
    });
    it('should return true when urs has valid domain', () => {
      expect(spaHelpers.isInSitesDomain('https://uat.tudn.com')).toBe(true);
    });
  });
});
