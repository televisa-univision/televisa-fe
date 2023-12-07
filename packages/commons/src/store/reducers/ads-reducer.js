import * as types from '../actions/action-types';

const countAdBySize = {
  1: 1,
  3: 1,
  160: 1,
  255: 1,
  300: 1,
  320: 1,
  728: 1,
  970: 1,
};

const initialState = {
  ads: [
    // slotName: '',
    // sizes: [],
    // slotID: '',
    // device: '',
    // displayed: false
    // refreshable: false
  ],
  count: 0,
  displayAboveTheFold: false,
  isNativeAdEmpty: false,
  sequenceOrder: countAdBySize,
  topAdInserted: false,
  topAdInsertedFrom: null,
  hideAds: [],
};

/**
 * Reducers related to ads
 * @param {Object} state of the application
 * @param {Object} action to be trigger
 * @returns {Object}
 */
export default function adsReducer(state = initialState, action) {
  switch (action.type) {
    case types.REGISTER_SLOT:
      return {
        ...state,
        ads: [...state.ads, action.ad],
      };

    case types.UPDATE_NATIVE_AD_EMPTY:
      return {
        ...state,
        isNativeAdEmpty: action.isEmpty,
      };

    case types.DISPLAY_AD:
      return Object.assign({}, state, {
        ads: state.ads.map((ad) => {
          if (ad.slotID === action.id) {
            return Object.assign({}, ad, { displayed: true });
          }
          return ad;
        }),
      });

    case types.RESET_SLOTS:
      if (action.fullReset) {
        return Object.assign({}, state, {
          ads: [],
          hideAds: [],
          count: 0,
          displayAboveTheFold: false,
          isNativeAdEmpty: false,
          sequenceOrder: countAdBySize,
          topAdInserted: false,
          topAdWidgetId: null,
          nativeCalled: false,
          shouldRefresh: false,
          topAdInsertedFrom: null,
        });
      }
      return Object.assign({}, state, { ads: [], count: 0 });

    case types.DISPLAY_ADS_ABOVE_THE_FOLD:
      return {
        ...initialState,
        ...state,
        displayAboveTheFold: true,
      };

    case types.INCREASE_SEQUENCE:
      return Object.assign({}, state, {
        sequenceOrder: {
          ...state.sequenceOrder,
          [action.size]: state.sequenceOrder[action.size] + 1,
        },
      });

    case types.SET_NATIVE:
      return Object.assign({}, state, { nativeCalled: action.setting });

    case types.SHOULD_AD_REFRESH:
      return Object.assign({}, state, { shouldRefresh: action.setting });

    case types.INSERT_TOP_AD:
      if (state.topAdWidgetId) {
        return state;
      }
      return Object.assign({}, state, {
        topAdInserted: true,
        topAdInsertedFrom: action.from,
        topAdWidgetId: action.id,
      });

    case types.REMOVE_TOP_AD:
      return Object.assign({}, state, {
        topAdInserted: false,
        topAdInsertedFrom: null,
        topAdWidgetId: null,
      });

    case types.HIDE_AD_BY_IDS: {
      const ids = action.ids.length ? action.ids : [];
      return Object.assign({}, state, { hideAds: ids });
    }

    case types.INCREASE_AD_COUNT: {
      return Object.assign({}, state, { count: state.count + 1 });
    }

    case types.SYNC_STORE:
      return action.data.dfpAds ? { ...action.data.dfpAds } : state;

    default:
      return state;
  }
}
