import { ActionType } from 'redux-promise-middleware';

/**
 * Action type for setting the forecast data
 * @type {string}
 */
export const SET_WEATHER_FORECAST_BY_LOCAL = 'SET_WEATHER_FORECAST_BY_LOCAL';

/**
 * Action type to fetch weather forecast
 * @type {string}
 */
export const FETCH_WEATHER_FORECAST = 'FETCH_WEATHER_FORECAST';

/**
 * Action type to fetch page data while loading
 * @type {string}
 */
export const FETCH_WEATHER_FORECAST_PENDING = `${FETCH_WEATHER_FORECAST}_${ActionType.Pending}`;

/**
 * Action type to fetch page data once fulfilled
 * @type {string}
 */
export const FETCH_WEATHER_FORECAST_FULFILLED = `${FETCH_WEATHER_FORECAST}_${ActionType.Fulfilled}`;

/**
 * Action type to fetch page data once rejected
 * @type {string}
 */
export const FETCH_WEATHER_FORECAST_REJECTED = `${FETCH_WEATHER_FORECAST}_${ActionType.Rejected}`;

/**
 * Empty type for cases where you want to prompt out of a thunk
 * @type {string}
 */
export const EMPTY_TYPE = 'EMPTY_TYPE';

/**
 * Action type to set isCelsius active in local markets
 * @type {string}
 */
export const SET_ISCELSIUS_ACTIVE = 'SET_ISCELSIUS_ACTIVE';

/**
 * Action type to set isCelsius disable in local markets
 * @type {string}
 */
export const SET_ISCELSIUS_DISABLED = 'SET_ISCELSIUS_DISABLED';

/**
 * Action type to fetch local market content
 * @type {string}
 */
export const FETCH_LOCAL_MARKET_CONTENT = 'FETCH_LOCAL_MARKET_CONTENT';

/**
 * Action type to fetch local market data while loading
 * @type {string}
 */
export const FETCH_LOCAL_MARKET_CONTENT_PENDING = `${FETCH_LOCAL_MARKET_CONTENT}_${ActionType.Pending}`;

/**
 * Action type to fetch local market data once fulfilled
 * @type {string}
 */
export const FETCH_LOCAL_MARKET_CONTENT__FULFILLED = `${FETCH_LOCAL_MARKET_CONTENT}_${ActionType.Fulfilled}`;

/**
 * Action type to fetch local market data once rejected
 * @type {string}
 */
export const FETCH_LOCAL_MARKET_CONTENT__REJECTED = `${FETCH_LOCAL_MARKET_CONTENT}_${ActionType.Rejected}`;

/**
 * Action type to fetch jobs content
 * @type {string}
 */
export const FETCH_JOBS = 'jobs/fetchJobs';

/**
 * Action type to fetch jobs data while loading
 * @type {string}
 */
export const FETCH_JOBS_PENDING = `${FETCH_JOBS}/${ActionType.Pending.toLowerCase()}`;

/**
 * Action type to fetch jobs data once fulfilled
 * @type {string}
 */
export const FETCH_JOBS_FULFILLED = `${FETCH_JOBS}/${ActionType.Fulfilled.toLowerCase()}`;

/**
 * Action type to fetch jobs data once rejected
 * @type {string}
 */
export const FETCH_JOBS_REJECTED = `${FETCH_JOBS}/${ActionType.Rejected.toLowerCase()}`;

/**
 * Action type to set the current local market by selection
 * @type {string}
 */
export const SET_LOCAL_MARKET_BY_LOCATION = 'SET_LOCAL_MARKET_BY_LOCATION';

/**
 * Action type to set the uri content of current local market by selection
 * @type {string}
 */
export const SET_LOCAL_CONTENT_BY_LOCATION = 'SET_LOCAL_CONTENT_BY_LOCATION';

/**
 * Action type to set tu ciudad local market
 */
export const SET_TU_CIUDAD_LOCAL_MARKET = 'SET_TU_CIUDAD_LOCAL_MARKET';

/**
 * Action to set the weather alerts from the api to the store
 * @type {string}
 */
export const SET_WEATHER_ALERTS = 'SET_WEATHER_ALERTS';

/**
 * Action to set the jobs from the api to the store
 * @type {string}
 */
export const SET_JOBS = 'SET_JOBS';

/**
 * Action to update the store the alerts that were read by the user
 * @type {string}
 */
export const UPDATE_UNREAD_WEATHER_ALERTS = 'UPDATE_UNREAD_WEATHER_ALERTS';
