import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';
import isValidValue from '@univision/fe-utilities/helpers/common/isValidValue';
import getKey from '@univision/fe-utilities/helpers/object/getKey';
import hasKey from '@univision/fe-utilities/helpers/object/hasKey';
import * as types from '../actions/action-types';
import { FETCH_WEATHER_FORECAST_FULFILLED } from '../actions/local/local-action-types';
// eslint-disable-next-line import/no-cycle
import { getWidgetIndexById } from '../storeHelpers';
// eslint-disable-next-line import/no-cycle
import customShow from '../../utils/brandable/customShow';

/**
 * Adjust the page data for BEX. This function should be removed and this logic should
 * be in the web-api itself.
 * @param {Object} action dispatched
 * @param {Object} action.payload.data API data
 * @param {Object|null} action.payload.navData Data for the header
 * @param {Object|null} action.payload.themeData Data for the theming
 * @param {Object} action.meta Metadata for the action
 * @returns {Object}
 */
export function adjustPageDataForBEX(action) {
  const data = getKey(action, 'payload.data', {});

  // TODO: Update the web-api to return the expected values
  //  rather than manipulating the data here
  if (!Array.isArray(data.tagHierarchy)) {
    const tagHierarchy = data.hierarchy || [{
      name: getKey(data, 'adSettings.adTagValue'),
      title: data.title,
      uri: data.uri,
    }];

    data.tagHierarchy = tagHierarchy;
    const lastTagIndex = tagHierarchy.length - 1;

    if (isValidArray(tagHierarchy)) {
      data.primaryTag = {
        ...tagHierarchy[lastTagIndex],
        link: tagHierarchy[lastTagIndex].uri,
      };
    }
  }

  if (hasKey(data, 'adSettings.disableAds') && !hasKey(data, 'isSensitive')) {
    data.isSensitive = data.adSettings.disableAds;
  }

  if (typeof getKey(data, 'articleType') === 'string') {
    data.articleType = data.articleType.toLowerCase();
  }

  return {
    data,
  };
}

/**
 * Reducers api data
 * @param {Object} state of the application
 * @param {Object} action to be trigger
 * @returns {Object}
 */
export default function pageReducer(state = {}, action) {
  switch (action.type) {
    case types.SET_PAGE_DATA:
      return Object.assign({}, state, action.data);
    case types.SET_THEME_DATA: {
      const newState = Object.assign({}, state);
      newState.theme = action.theme;
      return newState;
    }
    case types.SET_PRE_LOADABLE_COMPONENTS:
      return Object.assign({}, state, { loadableComponents: action.loadableComponents });
    case types.SET_AMP:
      return Object.assign({}, state, { isAMP: action.isAMP });
    case types.SET_AD_SKIN:
    case types.REMOVE_AD_SKIN:
      return Object.assign({}, state, { hasAdSkin: action.hasAdSkin });
    case types.SET_HEADER_DATA: {
      const { navData } = action;
      const headerTitle = getKey(navData, 'sectionTitle', null);
      return Object.assign({}, state, { headerTitle, navData });
    }
    case types.SET_WIDGET_EXTRA_DATA:
    {
      const newState = Object.assign({}, state, {});
      const widgetIndex = getWidgetIndexById(state, action.id);
      if (widgetIndex === -1) {
        return newState;
      }

      if (action.settings) {
        const currentSettings = newState.data.widgets[widgetIndex].settings;
        const newSettings = Object.assign({}, currentSettings, action.settings);
        const contents = getKey(newState.data.widgets, [widgetIndex, 'contents']);
        newState.data.widgets[widgetIndex].settings = newSettings;
        if (isValidValue(action.contentId) && contents) {
          newState.data.widgets[widgetIndex].contents
            .find(content => content.uid === action.contentId)
            .extraData = action.data;
        }
      } else {
        newState.data.widgets[widgetIndex].extraData = action.data;
      }
      return newState;
    }
    case types.ADD_WIDGETS:
    {
      const newState = Object.assign({}, state);
      if (isValidArray(action.widgets) && newState.data) {
        newState.data.widgets = action.widgets;
      }
      return newState;
    }
    case types.EXTEND_BRANDABLE_SHOW: {
      const customShowData = customShow();
      if (!hasKey(action.data, 'brandable.show') && hasKey(customShowData, action.pageCategory)) {
        const brandable = customShowData[action.pageCategory];
        const extendedData = Object.assign({}, action.data, { ...brandable });
        // return new data object
        return Object.assign({}, state, { data: extendedData });
      }
      return state;
    }
    case types.SET_BREAKPOINT_VALUES: {
      const [bpSize, bpWidth, bpDevice] = action.data;
      return Object.assign({}, state, {
        breakpoint: {
          size: bpSize,
          width: bpWidth,
          device: bpDevice,
        },
      });
    }
    case types.FETCH_PAGE_DATA_PENDING:
      // We only care about changes initiated by a SPA navigation
      if (getKey(action, 'meta.initiator') !== 'spa') {
        return state;
      }
      return Object.assign({}, state, {
        loading: true,
        error: null,
      });
    case types.GET_PAGE_API_CONTENT_FULFILLED:
    case types.FETCH_PAGE_DATA_FULFILLED:
    {
      const initiator = getKey(action, 'meta.initiator');
      let navigationCount = state.navigationCount || 0;
      if (initiator === 'spa') {
        navigationCount += 1;
      }
      // NOTE: define if once fulfilled the state must be flushed or not (as in this case)
      return Object.assign({}, state, {
        ...adjustPageDataForBEX(action),
        loading: false,
        error: null,
        initiator,
        navigationCount,
      });
    }
    case types.FETCH_PAGE_DATA_REJECTED:
      return Object.assign({}, state, {
        loading: false,
        error: action.payload,
      });
    case types.SYNC_STORE:
      return { ...action.data.page, historyAction: state.historyAction };

    case types.GET_PAGE_API_CONTENT_ERROR:
      return { ...state, error: true, message: action.payload };

    case types.FETCH_RECOMMENDED_VIDEOS_FULFILLED:
      return { ...state, videoPage: action.payload };

    case types.SET_CURRENT_LANGUAGE: {
      const newState = Object.assign({}, state);
      newState.language = action.language;
      return newState;
    }
    case FETCH_WEATHER_FORECAST_FULFILLED:
    {
      // if there is not payload, it means was an error in the fetch
      const forecast = action?.payload ?? { error: true };
      const data = state?.data ?? {};
      data.tvStation = { ...data.tvStation, forecast };

      return {
        ...state,
        data,
      };
    }
    default:
      return state;
  }
}
