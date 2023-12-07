import Features from '.';
import Store from '../../store/store';
import setPageData from '../../store/actions/page-actions';
import * as storeHelpers from '../../store/storeHelpers';
import { LONGFORMAT } from '../../constants/pageCategories';

describe('Features', () => {
  describe('env', () => {
    it('should return an object with the features for the current env', () => {
      process.env.FEATURES = 'p1=Hello World&p2=true&p3=false';
      expect(Features.env()).toEqual({
        p1: 'Hello World',
        p2: 'true',
        p3: 'false',
      });
    });

    it('should return an empty object if env variable is not defined', () => {
      delete process.env.FEATURES;
      expect(Features.env()).toEqual({});
    });

    it('should enable local rebranding if market is enabled', () => {
      const pageData = {
        data: {
          brandable: {
            tvStation: {
              uri: '/local/san-francisco-kdtv',
            },
          },
        },
      };
      Store.dispatch(setPageData(pageData));
      expect(Features.localMarkets.shouldUseRebranding()).toBe(true);
    });

    it('should not enable local rebranding if market is disabled', () => {
      const pageData = {
        data: {
          brandable: {
            tvStation: {
              uri: '/local/san-francisco-kdtv/test',
            },
          },
        },
      };
      Store.dispatch(setPageData(pageData));
      expect(Features.localMarkets.shouldUseRebranding()).toBe(false);
    });

    it('should return true when is Univision site and not page category TV', () => {
      Store.dispatch(setPageData({
        domain: 'https://univision.com',
        pageCategory: LONGFORMAT,
      }));
      expect(Features.header.buttonUniNow()).toBe('enVivoTvIcon');
    });

    it('should return true by default', () => {
      expect(Features.deportes.isTudn()).toBe(true);
    });
  });

  describe('header features', () => {
    it('should return false hideHeaderFooter by default', () => {
      expect(Features.header.hideHeaderFooter()).toBe(false);
    });
    it('should return true when param hideHeaderFooter is true', () => {
      Store.dispatch(setPageData({
        requestParams: { hideHeaderFooter: true },
      }));
      expect(Features.header.hideHeaderFooter()).toBe(true);
    });
    it('should return true when the param useUniNow exist', () => {
      storeHelpers.isUnivisionSite = jest.fn(() => true);
      storeHelpers.getPageCategory = jest.fn(() => 'show');
      expect(Features.header.buttonUniNow()).toBe('enVivoTvIcon');
      jest.resetAllMocks();
    });

    it('should return false when is univision site', () => {
      storeHelpers.isUnivisionSite = jest.fn(() => false);
      storeHelpers.getPageCategory = jest.fn(() => 'show');
      expect(Features.header.buttonUniNow()).toBe(null);
      jest.resetAllMocks();
    });

    it('should return false when is local site', () => {
      storeHelpers.isUnivisionSite = jest.fn(() => true);
      storeHelpers.getPageCategory = jest.fn(() => 'local-tv');
      expect(Features.header.buttonUniNow()).toBe(null);
      jest.resetAllMocks();
    });
  });

  describe('televisa features', () => {
    it('should return false by default if parent is not Televisa Site', () => {
      const pageData = {};
      Store.dispatch(setPageData(pageData));
      expect(Features.televisa.isTelevisaSite()).toBe(false);
    });

    it('should return true if parent is Televisa Site', () => {
      const pageData = {
        parentSite: 'televisa',
      };
      Store.dispatch(setPageData(pageData));
      expect(Features.televisa.isTelevisaSite()).toBe(true);
    });
  });
});
