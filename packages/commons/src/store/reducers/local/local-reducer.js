import * as types from '../../actions/local/local-action-types';
import LocalStorage from '../../../utils/helpers/LocalStorage';
import { CURRENT_LOCAL_MARKET, LOCAL_ISCELSIUS } from '../../../constants/personalization';
import { FAHRENHEIT, CELSIUS } from '../../../constants/weather';
import { SYNC_STORE } from '../../actions/action-types';
import { jobsSlice } from '../../slices/local/jobSearchSlice';

const initialState = {
  isCelsius: null,
  marketByLocation: {
    currentMarket: null,
    contents: {},
  },
  loadingLocalMarket: false,
};

/**
 * Reducers api data
 * @param {Object} state of the application
 * @param {Object} action to be trigger
 * @returns {Object}
 */
export default function localReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_WEATHER_FORECAST_BY_LOCAL:
      return {
        ...state,
        [action.local]: {
          ...state[action.local],
          weatherForecast: { ...action.data },
        },
      };
    case types.FETCH_WEATHER_FORECAST_PENDING:
      return Object.assign({}, state, {
        loading: true,
        error: null,
      });
    case types.FETCH_WEATHER_FORECAST_FULFILLED:
      return Object.assign({}, state, {
        loading: false,
        error: null,
      });
    case types.FETCH_WEATHER_FORECAST_REJECTED:
      return Object.assign({}, state, {
        loading: false,
        error: action.payload,
      });
    case types.SET_ISCELSIUS_ACTIVE:
      LocalStorage.set(LOCAL_ISCELSIUS, CELSIUS);
      return Object.assign({}, state, { isCelsius: true });
    case types.SET_ISCELSIUS_DISABLED:
      LocalStorage.set(LOCAL_ISCELSIUS, FAHRENHEIT);
      return Object.assign({}, state, { isCelsius: false });
    case types.FETCH_LOCAL_MARKET_CONTENT_PENDING:
      return {
        ...state,
        loadingLocalMarket: true,
        error: null,
      };
    case types.FETCH_LOCAL_MARKET_CONTENT__FULFILLED:
      return {
        ...state,
        loadingLocalMarket: false,
        error: null,
      };
    case types.FETCH_LOCAL_MARKET_CONTENT__REJECTED:
      return {
        ...state,
        loadingLocalMarket: false,
        error: action.payload,
      };
    case types.SET_LOCAL_MARKET_BY_LOCATION:
      if (!action.disableStorage) {
        LocalStorage.set(CURRENT_LOCAL_MARKET, action.localMarket);
      }
      return {
        ...state,
        marketByLocation: {
          ...state.marketByLocation,
          currentMarket: action.localMarket,
        },
      };
    case types.SET_TU_CIUDAD_LOCAL_MARKET:
      return {
        ...state,
        marketByLocation: {
          ...state.marketByLocation,
          tuCiudadLocalMarket: action.localMarket,
        },
      };
    case types.SET_LOCAL_CONTENT_BY_LOCATION: {
      const { localMarket, contents } = action;

      return {
        ...state,
        marketByLocation: {
          ...state.marketByLocation,
          contents: {
            ...state.marketByLocation.contents,
            [localMarket]: contents,
          },
        },
      };
    }
    case types.SET_WEATHER_ALERTS: {
      return {
        ...state,
        [action.local]: {
          ...state[action.local],
          weatherAlerts: { ...action.weatherAlerts },
        },
      };
    }
    case SYNC_STORE:
    case types.FETCH_JOBS_REJECTED:
    case types.FETCH_JOBS_PENDING:
    case types.FETCH_JOBS_FULFILLED: {
      return jobsSlice.reducer(state, action);
    }
    case types.UPDATE_UNREAD_WEATHER_ALERTS: {
      return {
        ...state,
        [action.local]: {
          ...state[action.local],
          weatherAlerts: {
            ...state[action.local]?.weatherAlerts,
            unreadWeatherAlerts: [...action.unreadWeatherAlerts],
          },
        },
      };
    }
    default:
      return state;
  }
}
