/* eslint-disable import/no-extraneous-dependencies */
import { batch } from 'react-redux';

import { getWeatherAlertsHeadlines } from '@univision/fe-graphql-services/dist/requests/queries/weatherAlertQueries';
import getWeatherForecastByTVStation from '@univision/fe-graphql-services/dist/requests/queries/getWeatherForecastByTVStation';

import * as types from './local-action-types';
import {
  contentByLocationSelector,
  currentMarketByLocationSelector,
  currentMarketSelector,
  hasWeatherForecast,
  isCelsius,
  hasWeatherAlerts,
  unreadWeatherAlertsSelector,
} from '../../selectors/local-selectors';
import marketCoordinates from '../../../constants/marketCoordinates';
import { getKey } from '../../../utils/helpers';
import { pageUriSelector } from '../../selectors/page-selectors';
import { CURRENT_LOCAL_MARKET, LOCAL_ISCELSIUS } from '../../../constants/personalization';
import {
  FAHRENHEIT,
  CELSIUS,
  READ_WEATHER_ALERTS_IDS,
  WEATHER_ALERT_SEVERITIES,
} from '../../../constants/weather';
import fetchContent, { FETCH_TYPE_LOCAL_MARKET_CONTENT } from '../../../utils/api/content/fetch';
import LocalStorage from '../../../utils/helpers/LocalStorage';
import Store from '../../store';
import fetchGraphql from '../../../utils/api/graphql';
import clientLogging from '../../../utils/logging/clientLogging';
import { WEATHER_ALERTS_ERROR, WEATHER_FORECAST_ERROR } from '../../../constants/messages';
import * as languages from '../../../utils/localization/languages';

/**
 * Action to set the initial value of isCelsius
 * @returns {Object}
 */
export function setScaleUnit() {
  const storeValue = isCelsius(Store.getState());
  const localStorageValue = LocalStorage.get(LOCAL_ISCELSIUS);

  // Sets the storage for the first time
  if (!localStorageValue && storeValue === null) {
    return { type: types.SET_ISCELSIUS_DISABLED };
  }

  // storeValue needs to be compared to false
  // otherwise by using !storeValue null could be
  // evaluated as true and never set isCelsius as
  // false in the store
  // This logic works when the user changes from
  // one market to another in the SPA
  if ((storeValue && localStorageValue === CELSIUS)
    || (storeValue === false && localStorageValue === FAHRENHEIT)) {
    return { type: types.EMPTY_TYPE };
  }

  // Sets the store with the values from the
  // local storage
  return {
    type: localStorageValue === CELSIUS
      ? types.SET_ISCELSIUS_ACTIVE
      : types.SET_ISCELSIUS_DISABLED,
  };
}

/**
 * Action to set weather forecast data by local market
 * @param {string} local local market key
 * @param {array} data for next 24h
 * @returns {Object}
 */
export function setWeatherForecastByLocal(local, data) {
  return {
    type: types.SET_WEATHER_FORECAST_BY_LOCAL,
    data,
    local,
  };
}

/**
 * Action to wrap the fetchContent utility, updating page data if fulfilled
 * @returns {Object}
 */
export function fetchWeatherData() {
  const state = Store.getState();

  if (hasWeatherForecast(state)) {
    return { type: types.EMPTY_TYPE };
  }

  const localMarket = currentMarketSelector(state);

  return (dispatch) => {
    if (!marketCoordinates?.[localMarket]) {
      return dispatch({
        type: types.FETCH_WEATHER_FORECAST_REJECTED,
        payload: true,
      });
    }

    return dispatch({
      type: types.FETCH_WEATHER_FORECAST,
      payload: fetchGraphql({
        query: getWeatherForecastByTVStation,
        variables: { tvStation: localMarket, language: languages.ES.toUpperCase() },
        serverUri: state?.page?.config?.graphql,
      }).then((response) => {
        const data = response?.getWeatherForecastByTvStation ?? {};
        dispatch(setScaleUnit());
        dispatch(setWeatherForecastByLocal(localMarket, data));

        return data;
      }).catch((err) => {
        // we don't want the entire response to be rejected in web-app-state
        // https://github.com/televisa-univision/univision-fe/blob/a9b09ccd3a424ac248fbf34e7bfae49b30159757/packages/core/src/server/routes/page/page.js#L142
        // eslint-disable-next-line no-param-reassign
        err.message = `${WEATHER_FORECAST_ERROR} fetchWeatherForecast rejected: ${err.message}`;

        clientLogging(err);
      }),
    });
  };
}

/**
 * Sets isCelsius as true
 * @returns {Object}
 */
export function setIsCelsiusActive() {
  return {
    type: types.SET_ISCELSIUS_ACTIVE,
  };
}

/**
 * Sets isCelsius as false
 * @returns {Object}
 */
export function setIsCelsiusDisabled() {
  return {
    type: types.SET_ISCELSIUS_DISABLED,
  };
}

/**
 * Set the local market based in the user DMA
 * @param {string} localMarket - local market call
 * @param {Object} options - additional options
 * @param {boolean} options.disableStorage - if true, it won't save in local storage
 * @returns {Object}
 */
export function setCurrentMarketByLocation(localMarket, options) {
  const { disableStorage = false } = options || {};

  return {
    type: types.SET_LOCAL_MARKET_BY_LOCATION,
    localMarket,
    disableStorage,
  };
}

/**
 * Set the local market for tu ciudad based in the user DMA
 * @param {string} localMarket - local market call
 * @returns {Object}
 */
export function setTuCiudadLocalMarket(localMarket) {
  return {
    type: types.SET_TU_CIUDAD_LOCAL_MARKET,
    localMarket,
  };
}

/**
 * Set the local content based in the user DMA
 * @param {string} localMarket - local market call
 * @param {Array} contents - array with the local content
 * @returns {Object}
 */
export function setContentByMarketLocation(localMarket, contents) {
  return {
    type: types.SET_LOCAL_CONTENT_BY_LOCATION,
    localMarket,
    contents,
  };
}

/**
 * Action to wrap the fetchContent utility, updating page data if fulfilled
 * @param {Object} options - object for options
 * @param {boolean} options.disableStorage - if true, it won't save in local storage
 * @returns {Object}
 */
export function fetchLocalMarketContent(options) {
  const { disableStorage = false } = options || {};

  return async (dispatch, getState) => {
    const state = getState();
    const localStorageMarket = LocalStorage.get(CURRENT_LOCAL_MARKET);
    const currentMarketByLocation = currentMarketByLocationSelector(state);
    const contentByLocation = contentByLocationSelector(state);
    const storeUri = pageUriSelector(state);
    const localMarketId = currentMarketByLocation
      && getKey(marketCoordinates, `${currentMarketByLocation}.localMarketId`);
    const extraParams = { ...(disableStorage && { localMarketId }) };

    if (storeUri
      && ((!currentMarketByLocation)
      || !contentByLocation)
    ) {
      const { value: localResponse } = await dispatch({
        type: types.FETCH_LOCAL_MARKET_CONTENT,
        payload: fetchContent(
          storeUri,
          FETCH_TYPE_LOCAL_MARKET_CONTENT,
          extraParams
        ),
      });
      const localMarket = getKey(localResponse, 'call', null);
      const contents = getKey(localResponse, 'contents', []);

      if (localMarket) {
        batch(() => {
          if (!disableStorage && !localStorageMarket) {
            dispatch(setCurrentMarketByLocation(localMarket));
          }
          dispatch(setTuCiudadLocalMarket(localMarket));
          dispatch(setContentByMarketLocation(localMarket, contents));
        });
      }
    }

    return null;
  };
}

/**
 * Get unread alerts comparing the api from localStorage
 * @param {array} baseAlerts base alerts to be filtered
 * @param {array} readAlerts alerts read by the user
 * @returns {array}
 */
const filterWeatherAlerts = (baseAlerts, readAlerts) => {
  return baseAlerts.filter((weatherAlert) => {
    return !readAlerts.includes(weatherAlert.detailKey);
  });
};

/**
 * Find alert with defined severity
 * @param {Object} alert high risk alert
 * @returns {boolean}
 */
const getExtremeAlert = (alert) => {
  return alert.severity === WEATHER_ALERT_SEVERITIES.EXTREME;
};

/**
 * Fetch weather alerts from api
 * @param {array} areaIds ids of the affected areas
 * @param {string} country country to be searched
 * @param {array} ignoreSeverity severity that should be ignored
 * @param {string} limit number limit of alerts
 * @param {number} language language of the alerts
 * @returns {function(...[*]=)}
 */
export function fetchWeatherAlerts(areaIds, country, ignoreSeverity, limit, language) {
  const state = Store.getState();

  if (hasWeatherAlerts(state)) return { type: types.EMPTY_TYPE };

  return async (dispatch) => {
    try {
      const localMarketInitials = currentMarketSelector(state);
      const { weatherAlertAreaIds } = marketCoordinates[localMarketInitials];
      const response = await fetchGraphql({
        query: getWeatherAlertsHeadlines,
        variables: {
          areaIds: areaIds || weatherAlertAreaIds,
          country,
          ignoreSeverity,
          language,
          limit,
        },
        serverUri: state?.page?.config?.graphql,
      });
      const { alerts, totalCount } = response?.getWeatherAlertsHeadlines;
      const alertsLocalStorage = LocalStorage.getObject(`${localMarketInitials}_${READ_WEATHER_ALERTS_IDS}`) || {};
      const readWeatherAlertsIds = alertsLocalStorage?.readWeatherAlertsIds || [];
      const unreadWeatherAlerts = filterWeatherAlerts(alerts, readWeatherAlertsIds);
      const extremeAlert = alerts.find(getExtremeAlert);

      return dispatch({
        type: types.SET_WEATHER_ALERTS,
        local: localMarketInitials,
        weatherAlerts: {
          totalCount,
          extremeAlert,
          unreadWeatherAlerts,
        },
      });
    } catch (err) {
      err.message = `${WEATHER_ALERTS_ERROR} fetchWeatherAlerts rejected: ${err.message}`;
      clientLogging(err);
      throw err;
    }
  };
}

/**
 * Action to update the alerts read by the user
 * @param {array} readAlerts alerts read by the user
 * @returns {array} unreadAlerts
 */
export function updateUnreadAlerts(readAlerts) {
  const state = Store.getState();
  const unreadWeatherAlerts = unreadWeatherAlertsSelector(state);
  const readWeatherAlertsIds = readAlerts.map(alert => alert.detailKey);
  const localMarketInitials = currentMarketSelector(state);
  LocalStorage.setObject(`${localMarketInitials}_${READ_WEATHER_ALERTS_IDS}`, { readWeatherAlertsIds });
  const filteredUnreadAlerts = filterWeatherAlerts(unreadWeatherAlerts, readWeatherAlertsIds);

  return {
    type: types.UPDATE_UNREAD_WEATHER_ALERTS,
    local: localMarketInitials,
    unreadWeatherAlerts: filteredUnreadAlerts,
  };
}
