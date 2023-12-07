import deepFreeze from 'deep-freeze';
import * as Selector from './ads-selectors';

const state = {
  dfpAds: {
    ads: [],
    count: 0,
    displayAboveTheFold: false,
    sequenceOrder: 1,
    topAdInserted: false,
    topAdInsertedFrom: null,
    isNativeAdEmpty: true,
    hideAds: [],
  },
};

deepFreeze(state);

describe('ads-selectors', () => {
  describe('dfpAdsSelector', () => {
    it('should return the expected value', () => {
      expect(Selector.dfpAdsSelector(state)).toEqual(state.dfpAds);
    });
  });
  describe('isTopAdInsertedSelector', () => {
    it('should return the expected value', () => {
      expect(Selector.isTopAdInsertedSelector(state)).toBe(false);
    });
  });
  describe('topAdInsertedFromSelector', () => {
    it('should return the expected value', () => {
      expect(Selector.topAdInsertedFromSelector(state)).toBeUndefined();
    });
  });
  describe('isTopAdOnListInsertedSelector', () => {
    const adsState = {
      dfpAds: {
        ads: [{
          position: 'TOP',
        }],
      },
    };
    it('should return true if there is a top ad in collection', () => {
      expect(Selector.isTopAdOnListInsertedSelector(adsState)).toBe(true);
    });
    it('should return false if ads collection is empty', () => {
      expect(Selector.isTopAdOnListInsertedSelector({ dfpAds: { ads: [] } })).toBe(false);
    });
    it('should return false if ads collection do not have top ad', () => {
      const midAdsState = {
        dfpAds: {
          ads: [{
            position: 'MID',
          }],
        },
      };
      expect(Selector.isTopAdOnListInsertedSelector(midAdsState)).toBe(false);
    });
  });
  describe('isNativeAdEmptySelector', () => {
    it('should return the expected value', () => {
      expect(Selector.isNativeAdEmptySelector(state)).toEqual(state.dfpAds.isNativeAdEmpty);
    });
  });
  describe('topAdWidgetIdSelector', () => {
    it('should return the expected value', () => {
      expect(Selector.topAdWidgetIdSelector(state)).toEqual(state.dfpAds.topAdWidgetId);
    });
  });
  describe('hideAdsSelector', () => {
    it('should return the expected value', () => {
      expect(Selector.hideAdsSelector(state)).toEqual(state.dfpAds.hideAds);
    });
  });
  describe('shouldRefreshAdsSelector', () => {
    it('should return the expected value', () => {
      expect(Selector.shouldRefreshAdsSelector(state)).toEqual(false);
    });
  });
  describe('getAdCountSelector', () => {
    it('should return the expected value', () => {
      expect(Selector.getAdCountSelector(state)).toEqual(state.dfpAds.count);
    });
  });
  describe('timeBannerSelector', () => {
    it('should return the expected value', () => {
      const adsState = {
        dfpAds: {
          ads: [
            {
              position: 'LOGO',
              sizes: [[1, 8]],
              slotID: 'div-gpt-ad-logo-1234',
            },
            {
              position: 'FOOTER',
              sizes: [[728, 90]],
              slotID: 'div-gpt-ad-footer-5678',
            },
          ],
        },
      };

      const expectedValue = adsState.dfpAds.ads.filter(
        timeAd => (timeAd.position === 'LOGO')
          && (String(timeAd.sizes[0]) === String([1, 8]))
          && timeAd.slotID.includes('div-gpt-ad-logo')
      );

      expect(Selector.timeBannerSelector(adsState)).toEqual(expectedValue);
    });
  });
});
