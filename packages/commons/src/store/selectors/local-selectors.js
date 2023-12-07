import { createSelector } from 'reselect';

import isValidObject from '@univision/fe-utilities/helpers/common/isValidObject';
import isValidFunction from '@univision/fe-utilities/helpers/common/isValidFunction';

import marketCoordinates from '../../constants/marketCoordinates.json';
import { getKey } from '../../utils/helpers';
import appstore, { appsMapping } from '../../config/appstore';

/**
 * Gets state data from the store
 * @private
 * @param {Object} state store instance or state data
 * @returns {Object} state data
 */
const getState = (state) => {
  if (!isValidObject(state)) {
    return state;
  }
  return isValidFunction(state.getState) ? state.getState() : state;
};

/**
 * Gets local object from store
 * @param {Object} state redux state
 * @returns {Object} current page
 */
export const localSelector = state => getKey(state, 'local', {});

/**
 * Gets local market by location object from store
 * @param {Object} state redux state
 * @returns {Object} current page
 */
export const marketByLocationSelector = state => getKey(state, 'local.marketByLocation', {});

/**
 * Gets the current market by location
 * @returns {?string}
 */
export const currentMarketByLocationSelector = createSelector(
  marketByLocationSelector,
  market => getKey(market, 'currentMarket')
);

/**
 * Gets tuciudad current market
 * @returns {?string}
 */
export const tuCiudadLocalMarketSelector = createSelector(
  marketByLocationSelector,
  market => getKey(market, 'tuCiudadLocalMarket')
);

/**
 * Gets the uri content of the current market by location
 * @returns {Object}
 */
export const contentByLocationSelector = createSelector(
  marketByLocationSelector,
  currentMarketByLocationSelector,
  (marketLocation, currentMarket) => getKey(marketLocation, `contents.${currentMarket}`)
);

/**
 * Gets current local market
 * @param {Object} state - redux state
 * @returns {?string}
 */
export const currentMarketSelector = state => getKey(state, 'page.data.tvStation.call', currentMarketByLocationSelector(state));

/**
 * Gets current local market
 * @param {Object} state - redux state
 * @returns {?string}
 */
export const currentMarketUriSelector = state => getKey(state, 'page.data.tvStation.uri', getKey(marketCoordinates, `${currentMarketSelector(state)}.uri`));

/**
 * Gets current local market icon
 * @param {Object} state - redux state
 * @returns {Object}
 */
export const currentLocalMarketIconSelector = createSelector(
  currentMarketSelector,
  currentMarketUriSelector,
  (market, absoluteUri) => {
    const uri = absoluteUri.replace(/^(?:\/\/|[^/]+)*\//, '/');
    const keyApp = appsMapping[`^${uri}`];

    return {
      icon: getKey(appstore, `${keyApp}.icon`, market),
      uri,
    };
  }
);

/**
 * Gets current local market settings
 * @returns {Object}
 */
export const localMarketSelector = createSelector(
  localSelector,
  currentMarketSelector,
  (local, currentMarket) => getKey(local, currentMarket, {})
);

/**
 * Return true if weather forecast is already set
 * @param {string} currentMarket market object
 * @returns {boolean} if weather forecast is set
 */
export const hasWeatherForecast = createSelector(
  localMarketSelector,
  currentMarket => currentMarket?.weatherForecast !== undefined,
);

/**
 * Get local weather forecast by local market key
 * @param {string} currentMarket market object
 * @returns {Object} weather forecast object
 */
export const localWeatherForecastSelector = createSelector(
  localMarketSelector,
  currentMarket => currentMarket?.weatherForecast || {},
);

/**
 * Gets the scale unit selected by the user
 * @returns {?boolean}
 */
export const isCelsius = createSelector(
  localSelector,
  local => getKey(local, 'isCelsius', null)
);

/**
 * Returns true of weather alert is already set
 * @param {Object} currentMarket market object
 * @returns {boolean} if weather alert is set
 */
export const hasWeatherAlerts = createSelector(
  localMarketSelector,
  currentMarket => currentMarket?.weatherAlerts !== undefined,
);

/**
 * Gets weather alert object from store
 * @param {Object} currentMarket market object
 * @returns {Object} weather alert object
 */
export const weatherAlertsSelector = createSelector(
  localMarketSelector,
  currentMarket => currentMarket?.weatherAlerts || {},
);

/**
 * Gets unread weather alerts from store
 * @param {Object} state redux state
 * @returns {array} unread weather alerts
 */
export const unreadWeatherAlertsSelector = createSelector(
  weatherAlertsSelector,
  weatherAlerts => weatherAlerts?.unreadWeatherAlerts || [],
);

/**
 * Gets the current forecast populated in the SSR
 * @param {Object} state redux state
 * @returns {Object} current forecast
 */
export const weatherForecastSelector = createSelector(
  localWeatherForecastSelector,
  getState,
  (localWeather, state) => {
    // if localWeather has valid props use the local data
    // otherwise look for the forecast in the pageData
    if (isValidObject(localWeather)) return localWeather;

    return state.page?.data?.tvStation?.forecast ?? {};
  }
);

/**
 * Gets the jobs search results from the store
 * @param {Object} state redux state
 * @returns {Object} current forecast
 */
export const jobSearchSelector = createSelector(
  localSelector,
  local => local?.jobs || [],
);
