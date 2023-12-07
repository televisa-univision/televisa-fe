import * as types from './action-types';

/**
 * Register Slot action
 * @param {Object} ad from component
 * @returns {Object}
 */
export function registerSlot(ad) {
  return {
    type: types.REGISTER_SLOT,
    ad,
  };
}

/**
 * Register Slot action
 * @param {string} adId from the ad registred
 * @param {boolean} isEmpty to either render ad or not.
 * @returns {Object}
 */
export function updateNativeAdEmpty({ isEmpty }) {
  return {
    type: types.UPDATE_NATIVE_AD_EMPTY,
    isEmpty,
  };
}

/**
 * Reset Slot action
 * @returns {Object}
 */
export function resetSlots({ fullReset } = { fullReset: false }) {
  return {
    type: types.RESET_SLOTS,
    fullReset,
  };
}

/**
 * Display ad action
 * @param {string} id from component
 * @returns {Object}
 */
export function displayAd(id) {
  return {
    type: types.DISPLAY_AD,
    id,
  };
}

/**
 * Display above the fold action
 * @returns {Object}
 */
export function displayAdsAboveTheFold() {
  return {
    type: types.DISPLAY_ADS_ABOVE_THE_FOLD,
  };
}

/**
 * Increase order of ad calls
 * @param {number} size ad width size
 * @returns {Object}
 */
export function increaseSequence(size) {
  return {
    type: types.INCREASE_SEQUENCE,
    size,
  };
}

/**
 * Add native add call flag
 * @param {bool} setting true to refresh false to not
 * @returns {Object}
 */
export function setNativeCalled(setting) {
  return {
    type: types.SET_NATIVE,
    setting,
  };
}

/**
 * Use to stop refresh
 * @param {bool} setting true to refresh false to not
 * @returns {{type: string, setting: *}}
 */
export function shouldRefresh(setting) {
  return {
    type: types.SHOULD_AD_REFRESH,
    setting,
  };
}

/**
 * Use to hide multiple ads by id
 * @param {array} ids ad ids to hide
 * @returns {Object}
 */
export function hideAdByIds(ids) {
  return {
    type: types.HIDE_AD_BY_IDS,
    ids,
  };
}

/**
 * Use to flag that a top ad has been inserted
 * @param {string} from used to specify where the top ad was inserted from
 * @param {string} id from the widget context
 * @returns {{type: string}}
 */
export function insertTopAd(from = null, id) {
  return {
    from,
    id,
    type: types.INSERT_TOP_AD,
  };
}

/**
 * Use to flag that a top ad has been inserted
 * @param {bool} setting true to hide ads and false to not
 * @returns {{type: string}}
 */
export function removeTopAd() {
  return {
    type: types.REMOVE_TOP_AD,
  };
}

/**
 * Use to increase ad count for slots name
 * @param {bool} setting true to hide ads and false to not
 * @returns {{type: string}}
 */
export function increaseAdCount() {
  return {
    type: types.INCREASE_AD_COUNT,
  };
}
