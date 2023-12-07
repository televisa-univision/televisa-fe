import deepFreeze from 'deep-freeze';
import * as types from '../actions/action-types';
import adsReducer from './ads-reducer';
import * as AdTypes from '../../utils/ads/ad-types';

jest.mock('../store', () => ({}));

describe('Ads Reducer', () => {
  let initialState;

  const newAdSettings = {
    targeting: {
      vertical: 'noticias',
      tag: ['noticias', 'jorge ramos', 'venezuela'],
    },
  };

  beforeEach(() => {
    initialState = {
      ads: [
        {
          slotID: '1234',
          displayed: false,
        },
      ],
      displayAboveTheFold: false,
      hideAds: [],
      count: 0,
      settings: {},
      shouldRefresh: true,
      topAdInsertedFrom: 'AnotherPlace',
    };
    deepFreeze(initialState);
  });

  describe('UPDATE_NATIVE_AD_EMPTY action', () => {
    it('should return isNativeAdEmpty updated', () => {
      expect(adsReducer(initialState, {
        type: types.UPDATE_NATIVE_AD_EMPTY,
        isEmpty: true,
      }).isNativeAdEmpty).toBeTruthy();
    });
  });

  describe('DISPLAY_AD action', () => {
    it('should return same ad if id not found', () => {
      expect(adsReducer(initialState, {
        type: types.DISPLAY_AD,
        id: 'abc',
        displayed: true,
      })).toEqual(initialState);
    });
  });

  describe('SET_NATIVE action', () => {
    it('should return nativeCalled equal true', () => {
      const stateWithNative = adsReducer(initialState, {
        type: types.SET_NATIVE,
        setting: true
      });
      expect(stateWithNative.nativeCalled).toBe(true);
    });
  });

  describe('HIDE_AD_BY_IDS action', () => {
    it('should return HIDE_AD_BY_IDS as array if ids is not valid', () => {
      expect(adsReducer(initialState, {
        type: types.HIDE_AD_BY_IDS,
        ids: false,
      })).toEqual(initialState);
    });
    it('should return the ids if are valid', () => {
      expect(adsReducer(initialState, {
        type: types.HIDE_AD_BY_IDS,
        ids: [AdTypes.SLIDESHOW_BOT_AD],
      })).not.toEqual(initialState);
    });
  });

  describe('SHOULD_AD_REFRESH action', () => {
    it('should return SHOULD_AD_REFRESH equal true', () => {
      expect(adsReducer(initialState, {
        type: types.SHOULD_AD_REFRESH,
        setting: true,
      })).toEqual(initialState);
    });
  });

  describe('INSERT_TOP_AD action', () => {
    it('should return topAdInserted equal true and topAdInsertedFrom equal null', () => {
      const stateWithTopAd = adsReducer(initialState, {
        type: types.INSERT_TOP_AD,
        from: null,
      });
      expect(stateWithTopAd.topAdInserted).toBe(true);
      expect(stateWithTopAd.topAdInsertedFrom).toBe(null);
    });

    it('should not insert top ad if there was already inserted', () => {
      const stateWithTopAd = adsReducer({
        ...initialState,
        topAdWidgetId: 'test',
      }, {
        type: types.INSERT_TOP_AD,
        topAdWidgetId: 'test12',
      });
      expect(stateWithTopAd.topAdWidgetId).toBe('test');
    });

    it('should return topAdInserted equal true and topAdInsertedFrom equal SectionAd', () => {
      const stateWithTopAd = adsReducer(initialState, {
        type: types.INSERT_TOP_AD,
        from: 'SectionAd',
      });
      expect(stateWithTopAd.topAdInserted).toBe(true);
      expect(stateWithTopAd.topAdInsertedFrom).toBe('SectionAd');
    });
  });

  describe('REMOVE_TOP_AD action', () => {
    it('should return topAdInserted equal false and topAdInsertedFrom equal null', () => {
      const stateWithTopAd = adsReducer(initialState, {
        type: types.REMOVE_TOP_AD,
      });
      expect(stateWithTopAd.topAdInserted).toBe(false);
      expect(stateWithTopAd.topAdInsertedFrom).toBe(null);
    });
  });

  describe('SET_PAGE_DATA action', () => {
    const updateSettingsAction = {
      type: types.SET_PAGE_DATA,
      data: {
        data: {
          adSettings: newAdSettings,
        },
      },
    };

    deepFreeze(updateSettingsAction);

    it('should update the ad settings', () => {
      const expected = {
        ...initialState,
      };
      const reduced = adsReducer(initialState, updateSettingsAction);

      expect(reduced).toEqual(expected);
    });

    it('should return the current settings if settings in action are invalid', () => {
      const updatedState = adsReducer(initialState, updateSettingsAction);
      const invalidAction = {
        type: types.SET_PAGE_DATA,
        data: null,
      };
      const reduced = adsReducer(updatedState, invalidAction);

      expect(reduced).toEqual(updatedState);
    });
  });

  describe('FETCH_PAGE_DATA_FULFILLED action', () => {
    const updateSettingsAction = {
      type: types.FETCH_PAGE_DATA_FULFILLED,
      payload: {
        data: {
          adSettings: newAdSettings,
        },
      },
    };

    deepFreeze(updateSettingsAction);

    it('should update the ad settings', () => {
      const expected = {
        ...initialState,
      };
      const reduced = adsReducer(initialState, updateSettingsAction);

      expect(reduced).toEqual(expected);
    });

    it('should return the current settings if settings in action are invalid', () => {
      const updatedState = adsReducer(initialState, updateSettingsAction);
      const invalidAction = {
        type: types.FETCH_PAGE_DATA_FULFILLED,
        payload: null,
      };
      const reduced = adsReducer(updatedState, invalidAction);

      expect(reduced).toEqual(updatedState);
    });
  });

  describe('SYNC_STORE action', () => {
    it('Should sync store data', () => {
      const result = adsReducer({}, {
        type: types.SYNC_STORE,
        data: {
          dfpAds: { displayAboveTheFold: false },
        },
      });
      expect(result).toHaveProperty('displayAboveTheFold', false);
    });
  });

  describe('RESET_SLOTS action', () => {
    it('should set the Store to a state that enables all the ads-related features once again if fullReset is true.', () => {
      const state = {
        sequenceOrder: {
          1: 1,
          3: 5,
          160: 1,
          255: 1,
          300: 1,
          320: 4,
          728: 1,
          970: 2,
        },
        ads: [0, 1, 2],
        hideAds: [3, 4, 5],
        count: 3,
        shouldRefresh: true,
        displayAboveTheFold: true,
        topAdInserted: true,
        nativeCalled: true,
        topAdInsertedFrom: 1,
      };
      const reduced = adsReducer(state, {
        type: types.RESET_SLOTS,
        fullReset: true,
      });
      expect(reduced).toEqual({
        sequenceOrder: {
          1: 1,
          3: 1,
          160: 1,
          255: 1,
          300: 1,
          320: 1,
          728: 1,
          970: 1,
        },
        ads: [],
        hideAds: [],
        count: 0,
        isNativeAdEmpty: false,
        shouldRefresh: false,
        displayAboveTheFold: false,
        topAdInserted: false,
        nativeCalled: false,
        topAdInsertedFrom: null,
        topAdWidgetId: null,
      });
    });
    it('should only reset the ads slot when fullReset is false.', () => {
      const state = {
        sequenceOrder: {
          1: 5,
          3: 1,
          160: 1,
          255: 1,
          300: 1,
          320: 4,
          728: 1,
          970: 2,
        },
        ads: [0, 1, 2],
        hideAds: [3, 4, 5],
        count: 3,
        shouldRefresh: true,
        displayAboveTheFold: true,
        topAdInserted: true,
        nativeCalled: true,
        topAdInsertedFrom: 1,
      };
      const reduced = adsReducer(state, {
        type: types.RESET_SLOTS,
      });
      expect(reduced).toEqual({
        ...state,
        ads: [],
        count: 0,
      });
    });
  });

  describe('INCREASE_AD_COUNT action', () => {
    it('should increase ad count', () => {
      const reduced = adsReducer(initialState, {
        type: types.INCREASE_AD_COUNT,
      });
      expect(reduced.count).toBe(1);
    });
  });
});
