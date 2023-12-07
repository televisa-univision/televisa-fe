import { createSelector } from 'reselect';

import { getKey } from '../../utils/helpers';

/**
 * Gets the current dfp ads configuration from the store
 * @param {Object} state redux state
 * @returns {Object} current page
 */
export const dfpAdsSelector = state => getKey(state, 'dfpAds', {});

/**
 * Gets the native add set value from store
 * @param {Object} state redux state
 * @returns {boolean} nativeCalled
 */
export const wasNativeAddCalledSelector = state => getKey(state, 'dfpAds.nativeCalled');

/**
 * Gets the flag to identify if the native ad is empty
 * @param {Object} state redux state
 * @returns {Object} current page
 */
export const isNativeAdEmptySelector = state => getKey(state, 'dfpAds.isNativeAdEmpty');

/**
 * Gets the current top ad inserted flag from the store
 * @param {Object} state redux state
 * @returns {Object} current page
 */
export const isTopAdInsertedSelector = state => getKey(state, 'dfpAds.topAdInserted');

/**
 * Gets the current widget id for the top ad inserted flag from the store
 * @param {Object} state redux state
 * @returns {Object} current page
 */
export const topAdWidgetIdSelector = state => getKey(state, 'dfpAds.topAdWidgetId');

/**
 * Gets the current top ad insertion position from the store
 * @param {Object} state redux state
 * @returns {Object} current page
 */
export const topAdInsertedFromSelector = state => getKey(state, 'dfpAds.topAdInsertedFrom');

/**
 * Gets hide ads from dfpAds
 * @param {Object} state redux state
 * @returns {Object} current page
 */
export const hideAdsSelector = createSelector(
  dfpAdsSelector,
  dfpAds => getKey(dfpAds, 'hideAds', []),
);

/**
 * Gets time ads dfpAds
 * @param {Object} state redux state
 * @returns {Object} current page
 */
export const timeBannerSelector = createSelector(
  dfpAdsSelector,
  dfpAds => getKey(dfpAds, 'ads', []).filter(
    timeAd => (timeAd.position === 'LOGO')
      && (String(timeAd.sizes[0]) === String([1, 8]))
      && timeAd.slotID.includes('div-gpt-ad-logo')
  ),
);

/**
 * Gets shouldRefresh from dfpAds
 * @param {Object} state redux state
 * @returns {Object} current page
 */
export const shouldRefreshAdsSelector = createSelector(
  dfpAdsSelector,
  dfpAds => getKey(dfpAds, 'shouldRefresh', false),
);

/**
 * Selector to get top ad from ad collection instead of
 * topAdInsertedFromSelector on line 32
 * // TODO: This will become obsolete aftr migrating to nextjs
 * @param {Object} state redux state
 * @returns {Object} current page
 */
export const isTopAdOnListInsertedSelector = createSelector(
  dfpAdsSelector,
  (dfpAds) => {
    const ads = getKey(dfpAds, 'ads');
    if (ads.length) {
      const found = ads.findIndex(ad => ad.position === 'TOP');
      if (found !== -1) {
        return true;
      }
    }
    return false;
  },
);

/**
 * Gets ad order
 * @param {Object} state redux state
 * @returns {Object} current page
 */
export const getAdCountSelector = createSelector(
  dfpAdsSelector,
  dfpAds => getKey(dfpAds, 'count', 0),
);
