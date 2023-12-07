import express from 'express';
import cors from 'cors';

import { corsOptions, setHeaders, setTransactionName } from 'server/utils/serverUtils';
import serverConfig from 'server/config';
import logger from 'app/utils/logging/serverLogger';
import {
  hasKey, getKey, isValidNumber, isValidArray, isValidObject,
} from '@univision/fe-commons/dist/utils/helpers';
import request from '@univision/fe-commons/dist/utils/api/requestNode';
import * as messages from '@univision/fe-commons/dist/constants/messages';
import LocalizationManager from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import { ES, EN } from '@univision/fe-commons/dist/utils/localization/languages';
import weatherConstants from '@univision/fe-commons/dist/constants/marketCoordinates.json';
import { PLACEHOLDER } from '@univision/fe-commons/dist/constants/weather';

const router = express.Router();
const pathId = '/weather';
const ttl = 900;
const ttlError = 120;
const HOURS = 'hour';
const DAYS = 'day';
const CURRENT = 'current';
const ONE_DAY = 24;
const NUMBER_FORMAT_ERROR_MSG = 'Option value is not in correct number format';
const TEN_DAYS_WITH_GEOCODE = 'TEN_DAYS_WITH_GEOCODE';
const CURRENT_WITH_GEOCODE = 'CURRENT_WITH_GEOCODE';
const HOURLY_WITH_GEOCODE = 'HOURLY_WITH_GEOCODE';
const WEATHER_WIDGET_STATION_TYPE = 'station';
const WEATHER_WIDGET_GEOCODE_TYPE = 'geocode';

const DAY_ABBREVIATION = [
  {
    name: 'Lunes',
    abbre: 'Lun',
  },
  {
    name: 'Martes',
    abbre: 'Mar',
  },
  {
    name: 'Miércoles',
    abbre: 'Mié',
  },
  {
    name: 'Jueves',
    abbre: 'Jue',
  },
  {
    name: 'Viernes',
    abbre: 'Vie',
  },
  {
    name: 'Sábado',
    abbre: 'Sáb',
  },
  {
    name: 'Domingo',
    abbre: 'Dom',
  },
];
const PUERTORICO = {
  name: 'Puerto Rico',
  abbr: 'PR',
  minZipCodeUpper: 900,
  maxZipCodeUpper: 999,
  minZipCodeLower: 600,
  maxZipCodeLower: 799,
};
/**
 * Checks if the zipCode puerto rico or not.
 * @param {string} zipCode - Zip code against which the validation need to be handle.
 * @returns {boolean} - returns true if success and false if it fails.
 */
const isPuertoRicoZipCode = (zipCode) => {
  const zip = Number(zipCode);
  return (zip >= PUERTORICO.minZipCodeUpper && zip <= PUERTORICO.maxZipCodeUpper)
    || (zip >= PUERTORICO.minZipCodeLower && zip <= PUERTORICO.maxZipCodeLower);
};

/**
 * Converts Fahrenheit to Celsius to two decimal places.
 * @param {number} temp - temperature value in celsius.
 * @param {string} defaultValue - default value if temperature value is missing.
 * @returns {number} - converted value to celsius.
 */
function convertFahrenheitToCelsius(temp, defaultValue = PLACEHOLDER) {
  return isValidNumber(temp) ? Math.round((temp - 32) * 5 / 9) : defaultValue;
}

/**
 * gets the status code response
 * @param {string} statusCode - api statusCode
 * @returns {string}
 */
function getStatusMessage(statusCode) {
  // https://docs.google.com/document/d/13HTLgJDpsb39deFzk_YCQ5GoGoZCO_cRYzIxbwvgJLI/edit#heading=h.1fz9td1o0a9u
  switch (statusCode) {
    case 200:
      return messages.STATUS_200;
    case 400:
      return messages.STATUS_400;
    case 401:
      return messages.STATUS_401;
    case 403:
      return messages.STATUS_403;
    case 404:
      return messages.STATUS_404;
    case 204:
      return messages.STATUS_204;
    default:
      return messages.STATUS_500;
  }
}

/**
 * Parse response data for the details api of WSI alerts.
 * @param {Object|array} response - response from WSI alerts api.
 * @returns {{detailKey: *, productIdentifier: *, phenomena: *, texts: *}}
 */
function parseAlertDetails(response) {
  const texts = getKey(response, 'alertDetail.texts', []).map((text) => {
    return {
      languageCode: text.languageCode,
      description: text.description,
    };
  });

  return {
    detailKey: getKey(response, 'alertDetail.detailKey'),
    productIdentifier: getKey(response, 'alertDetail.productIdentifier'),
    phenomena: getKey(response, 'alertDetail.phenomena'),
    texts,
  };
}

/**
 * WSI Headline api response parsing.
 * @param {Object|array} response - response from WSI alerts headline api
 * @returns {Object}
 */
function parseAlertHeadlineResponse(response) {
  return response.alerts.map((alert) => {
    return {
      detailKey: getKey(alert, 'detailKey'),
      phenomena: getKey(alert, 'phenomena'),
      eventDescription: getKey(alert, 'eventDescription'),
      severity: getKey(alert, 'severity'),
      severityCode: getKey(alert, 'severityCode'),
      effectiveTimeLocal: getKey(alert, 'effectiveTimeLocal'),
      effectiveTimeLocalTimeZone: getKey(alert, 'effectiveTimeLocalTimeZone'),
      expireTimeLocal: getKey(alert, 'expireTimeLocal'),
      expireTimeLocalTimeZone: getKey(alert, 'expireTimeLocalTimeZone'),
      flood: getKey(alert, 'flood'),
      latitude: getKey(alert, 'latitude'),
      longitude: getKey(alert, 'longitude'),
      areaName: getKey(alert, 'areaName'),
      headlineText: getKey(alert, 'headlineText'),
      countryCode: getKey(alert, 'countryCode'),
      countryName: getKey(alert, 'countryName'),
      source: getKey(alert, 'source'),
      timeZone: getKey(alert, 'ianaTimeZone'),
    };
  });
}

/**
 * Format current weather conditions for api
 * @param {Object} response - response from weather api
 * @returns {Object}
 */
function parseCurrentResponse(response) {
  return {
    location: getKey(response, 'observation.obs_name', ' '),
    condition: getKey(response, 'observation.wx_phrase', ' '),
    temp: getKey(response, 'observation.temp', PLACEHOLDER),
    maxTemp: getKey(response, 'observation.max_temp', PLACEHOLDER),
    minTemp: getKey(response, 'observation.min_temp', PLACEHOLDER),
    dayInd: getKey(response, 'observation.day_ind', 'D'),
    feelsLike: getKey(response, 'observation.feels_like', PLACEHOLDER),
    /**
     * icon codes
     * https://docs.google.com/document/d/1dNCf6nF6cjm4oOxQxjtqNuAvG_iEe5f9MQH1xlCeV4s/edit
     */
    icon: getKey(response, 'observation.wx_icon'),
    humidity: getKey(response, 'observation.rh', PLACEHOLDER),
    windDirection: getKey(response, 'observation.wdir_cardinal', ' '),
    windSpeedMph: getKey(response, 'observation.wspd', PLACEHOLDER),
  };
}

/**
 * Format hourly basis weather forecast data for api
 * @param {Object} response - response from weather api
 * @param {boolean} withExtras - should add additional fields
 * @returns {Array}
 */
function parseHourlyResponse(response, withExtras = false) {
  return response.dayOfWeek.map((day, index) => {
    const dayAbbre = DAY_ABBREVIATION.find(value => value.name === day);
    const abbreviation = dayAbbre ? dayAbbre.abbre : null;
    const temp = getKey(response, `temperature.${index}`);
    const localeTime = getKey(response, `validTimeLocal.${index}`);
    return {
      day,
      dayAbbreviation: abbreviation,
      temp: isValidNumber(temp) ? temp : PLACEHOLDER,
      tempWithUnits: {
        fahrenheit: isValidNumber(temp) ? temp : PLACEHOLDER,
        celsius: convertFahrenheitToCelsius(temp, PLACEHOLDER),
      },
      iconCode: getKey(response, `iconCode.${index}`),
      humidity: getKey(response, `relativeHumidity.${index}`, PLACEHOLDER),
      windSpeed: getKey(response, `windSpeed.${index}`, PLACEHOLDER),
      windDirection: getKey(response, `windDirectionCardinal.${index}`, PLACEHOLDER),
      timeUTC: getKey(response, `validTimeUtc.${index}`, PLACEHOLDER),
      narrative: getKey(response, `wxPhraseLong.${index}`, PLACEHOLDER),
      // add colon to UTC offset so that it will be parsable by Safari/RN Date
      localeTime: localeTime ? `${localeTime.slice(0, localeTime.length - 2)}:${localeTime.slice(localeTime.length - 2)}` : PLACEHOLDER,
      dayNight: getKey(response, `dayOrNight.${index}`, PLACEHOLDER),
      precipChance: getKey(response, `precipChance.${index}`, PLACEHOLDER),
      ...((withExtras) ? { precipType: getKey(response, `precipType.${index}`, PLACEHOLDER) } : {}),
    };
  });
}

/**
 * Format daily basis weather forecast data for api.
 * @param {Object} response - response from weather api
 * @param {boolean} withExtras - should add additional fields
 * @returns {Array}
 */
function parseDailyResponse(response, withExtras = false) {
  const array = [];
  let nightTime = false;
  if (isValidArray(response.daypart)) {
    response.daypart.forEach((daypart) => {
      daypart.iconCode.forEach((iconCode, index) => {
        const evenIndex = index % 2 === 0 ? index : -1;
        if (evenIndex !== -1) {
          let nightIndex = evenIndex;
          /**
           * If the value of dayOrNight is missing which
           * happens around 3:00pm local time, then fetch
           * value of night data from the api response.
           */
          if (!hasKey(daypart, `dayOrNight.${index}`)) {
            nightIndex = evenIndex + 1;
            nightTime = true;
          }
          const icon = getKey(daypart, `iconCode.${nightIndex}`, PLACEHOLDER);
          const windSpeed = getKey(daypart, `windSpeed.${nightIndex}`, PLACEHOLDER);
          const windDirection = getKey(daypart, `windDirectionCardinal.${nightIndex}`, PLACEHOLDER);
          const humidity = getKey(daypart, `relativeHumidity.${nightIndex}`, PLACEHOLDER);
          const narrative = getKey(daypart, `wxPhraseLong.${nightIndex}`, PLACEHOLDER);
          const precipChance = getKey(daypart, `precipChance.${nightIndex}`, PLACEHOLDER);
          const dayNight = getKey(daypart, `dayOrNight.${nightIndex}`, PLACEHOLDER);
          const precipType = getKey(daypart, `precipType.${nightIndex}`, PLACEHOLDER);
          array.push({
            iconCode: icon,
            humidity,
            windSpeed,
            windDirection,
            narrative,
            precipChance,
            dayNight,
            ...((withExtras) ? { precipType } : {}),
          });
        }
      });
    });
  }

  if (isValidArray(response.dayOfWeek)) {
    response.dayOfWeek.forEach((day, index) => {
      const object = array[index];
      const dayAbbre = DAY_ABBREVIATION.find(value => value.name === day);
      const abbreviation = dayAbbre ? dayAbbre.abbre : null;
      const tempMax = getKey(response, `temperatureMax.${index}`);
      const tempMin = getKey(response, `temperatureMin.${index}`);
      const localeTime = getKey(response, `validTimeLocal.${index}`);
      array[index] = Object.assign(
        {},
        {
          day,
          dayAbbreviation: abbreviation,
          tempMax: isValidNumber(tempMax) ? tempMax : PLACEHOLDER,
          tempMin: isValidNumber(tempMin) ? tempMin : PLACEHOLDER,
          tempMaxWithUnits: {
            fahrenheit: isValidNumber(tempMax) ? tempMax : PLACEHOLDER,
            celsius: convertFahrenheitToCelsius(tempMax, PLACEHOLDER),
          },
          tempMinWithUnits: {
            fahrenheit: isValidNumber(tempMin) ? tempMin : PLACEHOLDER,
            celsius: convertFahrenheitToCelsius(tempMin, PLACEHOLDER),
          },
          // set time so that it will be the same day in most local time zones and parsable
          // by Safari/RN Date
          localeTime: localeTime ? `${localeTime.split('T')[0]}T10:00:00` : PLACEHOLDER,
          timeUTC: getKey(response, `validTimeUtc.${index}`, PLACEHOLDER),
          sunriseTimeLocal: getKey(response, `sunriseTimeLocal.${index}`, PLACEHOLDER),
          sunriseTimeUtc: getKey(response, `sunriseTimeUtc.${index}`, PLACEHOLDER),
          sunsetTimeLocal: getKey(response, `sunsetTimeLocal.${index}`, PLACEHOLDER),
          sunsetTimeUtc: getKey(response, `sunsetTimeUtc.${index}`, PLACEHOLDER),
          ...((withExtras) ? { precipType: getKey(response, `precipType.${index}`, PLACEHOLDER) } : {}),
        },
        object
      );
    });
  }
  /**
   * Changing current day or night to today and tonight respectively.
   * Today to Hoy
   * Tonight to Esta Noche
   */
  const firstRow = array[0];
  if (firstRow) {
    firstRow.day = !nightTime ? LocalizationManager.get('today') : LocalizationManager.get('tonight');
    firstRow.dayAbbreviation = array[0].day;
  }
  return array;
}

/**
 * Parse response from the weather api according to the option provided, i.e current, hours or days
 * @param {Object} response : json data need to be parsed into corresponding
 * @returns {Object} parsed Json object
 */
function parseJsonResponse(response) {
  if (response.observation) {
    return parseCurrentResponse(response);
  } if (response.daypart) {
    return parseDailyResponse(response);
  } if (response.dayOfWeek) {
    return parseHourlyResponse(response);
  }
  return {};
}

/**
 * Parse response from the weather search location api
 * @param {Object} response : json data need to be parsed into corresponding
 * @returns {Object} parsed Json object
 */
function parseSearchApiResponse(response) {
  const data = [];
  if (hasKey(response, 'location.placeId') && Array.isArray(response.location.placeId)) {
    response.location.placeId.forEach((_, index) => {
      if (getKey(response, `location.adminDistrictCode.${index}`)
        || getKey(response, `location.countryCode.${index}`) === PUERTORICO.abbr) {
        const object = {};
        object.placeId = getKey(response, `location.placeId.${index}`);
        object.state = getKey(response, `location.adminDistrictCode.${index}`) || PUERTORICO.abbr;
        object.city = getKey(response, `location.city.${index}`);
        object.longitude = getKey(response, `location.longitude.${index}`);
        object.latitude = getKey(response, `location.latitude.${index}`);
        object.zipCode = getKey(response, `location.postalCode.${index}`);
        object.ianaTimeZone = getKey(response, `location.ianaTimeZone.${index}`);
        data.push(object);
      }
    });
  } else {
    data.push({
      placeId: getKey(response, 'location.placeId'),
      city: getKey(response, 'location.city'),
      state: getKey(response, 'location.adminDistrictCode') || PUERTORICO.abbr,
      zipCode: getKey(response, 'location.postalCode'),
      latitude: getKey(response, 'location.latitude'),
      longitude: getKey(response, 'location.longitude'),
      ianaTimeZone: getKey(response, 'location.ianaTimeZone'),
    });
  }
  return data;
}

/**
 * This method create weather api url based on option provided
 * @param {string} option - option needed can be current, hours, days
 * @param {string} zipCode - area for which weather forecasting is required.
 * @param {string} languageCode - language locale needed for the response.
 * @param {string} countryCode - Code of the Country for which TWC api data will be fetched.
 * @returns {string} fully constructed api url of weather.com
 */
function getRequestUrl(option, zipCode, languageCode, countryCode = 'US') {
  let uriKey = null;
  if (option.indexOf(HOURS) !== -1) {
    uriKey = HOURS;
  } else if (option.indexOf(DAYS) !== -1) {
    uriKey = DAYS;
  } else if (option.indexOf(CURRENT) !== -1) {
    uriKey = CURRENT;
  } else if (option === TEN_DAYS_WITH_GEOCODE) {
    uriKey = TEN_DAYS_WITH_GEOCODE;
  } else if (option === CURRENT_WITH_GEOCODE) {
    uriKey = CURRENT_WITH_GEOCODE;
  } else if (option === HOURLY_WITH_GEOCODE) {
    uriKey = HOURLY_WITH_GEOCODE;
  }

  switch (uriKey) {
    case HOURS: {
      let hours = option.substring(0, option.lastIndexOf(HOURS));
      let prefix = HOURS;
      hours = Number(hours);
      if (Number.isNaN(hours) === true) {
        throw NUMBER_FORMAT_ERROR_MSG;
      } else if (hours >= ONE_DAY) {
        hours = Math.round(hours / ONE_DAY);
        prefix = DAYS;
      }
      return `${serverConfig.api.endpoints.weather.hourly.zipcode(
        zipCode,
        hours + prefix,
        languageCode,
        countryCode
      )}&apiKey=${process.env.WEATHER_API_KEY}`;
    }
    case HOURLY_WITH_GEOCODE: {
      const geocode = zipCode;
      return serverConfig.api.endpoints.weather.hourly.geocode('2day', geocode, languageCode);
    }
    case CURRENT: {
      return `${serverConfig.api.endpoints.weather.current.zipcode(zipCode, languageCode, countryCode)}&apiKey=${
        process.env.WEATHER_API_KEY
      }`;
    }
    case DAYS: {
      return `${serverConfig.api.endpoints.weather.daily.zipcode(zipCode, option, languageCode, countryCode)}&apiKey=${
        process.env.WEATHER_API_KEY
      }`;
    }
    case TEN_DAYS_WITH_GEOCODE: {
      const geocode = zipCode;
      return serverConfig.api.endpoints.weather.daily.geocode('10day', languageCode, geocode);
    }
    case CURRENT_WITH_GEOCODE: {
      const geocode = zipCode;
      return serverConfig.api.endpoints.weather.current.geocode(geocode, languageCode);
    }
    default:
      return undefined;
  }
}

/**
 * Fetches api endpoint based on the option provided.
 * @param {string} option - Option passed down from the api can be details, geocode, country
 * @param {string} languageCode - the language required from the WSI api.
 * @param {string|any} code - the value provided for the respective option.
 * @returns {string} - endpoint created for the alert url.
 */
function getAlertsUrl(option, languageCode, code) {
  switch (option) {
    case 'details': {
      return `${serverConfig.api.endpoints.weather.alerts.details(code, languageCode)}&apiKey=${process.env.WEATHER_API_KEY}`;
    }
    case 'geocode': {
      return `${serverConfig.api.endpoints.weather.alerts.headline.geocode(code, languageCode)}&apiKey=${process.env.WEATHER_API_KEY}`;
    }
    case 'country': {
      return `${serverConfig.api.endpoints.weather.alerts.headline.country(code, languageCode)}&apiKey=${process.env.WEATHER_API_KEY}`;
    }
    default:
      return undefined;
  }
}

/**
 * Handles request for weather and search weather location api
 * @param {string} res - Response
 * @param {string} requestUrl -  Request Url
 * @param {function} parseResponse - Method to parse the json response from weather api
 */
function handleRequest(res, requestUrl, parseResponse) {
  if (!hasKey(process, 'env.WEATHER_API_KEY')) {
    logger.error(messages.INVALID_KEY);
    res.status(401).send(messages.INVALID_KEY);
  } else if (requestUrl === undefined) {
    logger.error(messages.NOT_FOUND);
    res.status(404).send(messages.NOT_FOUND);
  } else {
    logger.info('Requested url : ', requestUrl);

    request(requestUrl)
      .then(({ data, status }) => {
        const statusMessage = getStatusMessage(status);
        let body = null;
        logger.info('Weather API request success, [Status Code]', status);
        if (status === 200 && data) {
          body = parseResponse(data);
          setHeaders(res, ttl);
        } else {
          setHeaders(res, ttlError);
        }
        res.status(200).send({
          statusCode: status,
          statusMessage,
          data: body,
        });
      })
      .catch((err) => {
        logger.error(`message: ${err.message}, url: ${err.url}`);
        res.status(err.status).send({
          statusCode: err.status,
          statusMessage: getStatusMessage(err.status),
          data: null,
        });
      });
  }
}

/**
 * Proxy route for all routes to alerts API of WSI.
 * @example https://fe.integration.y.univision.com/proxy/api/cached/weather/alerts/details/en-US/ded9c05d-e91f-335a-9f91-d91b9f41858c
 * @example https://fe.integration.y.univision.com/proxy/api/cached/weather/alerts/country/en-US/US
 * @example https://fe.integration.y.univision.com/proxy/api/cached/weather/alerts/geocode/en-US/44.23,-68.22
 */
router.get(`${pathId}/alerts/:option/:languageCode/:code`, cors(corsOptions), (req, res) => {
  const { option, languageCode, code } = req.params;

  logger.info('alerts api ', option, languageCode, code);

  setTransactionName('get/weather-api/alerts', `${option}/${languageCode}/${code}`);

  /**
   * Check url for null, if true then return 404 error.
   */
  if (/(null|undefined)/.test(languageCode + option + code)) {
    logger.error(messages.STATUS_400);
    res.status(400).send({
      statusCode: 400,
      statusMessage: messages.STATUS_400,
      data: null,
    });
    return;
  }

  const requestUrl = getAlertsUrl(option, languageCode, code);
  handleRequest(res, requestUrl, (jsonData) => {
    let data;
    if (option === 'details') {
      data = parseAlertDetails(jsonData);
    } else {
      data = parseAlertHeadlineResponse(jsonData);
    }
    return data;
  });
});

/**
 * Route to access weather API. Proxied here to avoid CORS and authentication issues.
 * @example http://localhost:8080/proxy/api/cached/weather/current/en-US/00725
 */
router.get(`${pathId}/:option/:languageCode/:zipCode`, cors(corsOptions), (req, res) => {
  const { option, languageCode, zipCode } = req.params;
  logger.info('weather zip code', zipCode, option, languageCode);

  setTransactionName('get/weather-api', `${option}/${languageCode}/${zipCode}`);
  /**
   * Check url for null, if true then return 404 error.
   */

  if (/(null|undefined)/.test(languageCode + option + zipCode)) {
    logger.error(messages.STATUS_400);
    res.status(400).send({
      statusCode: 400,
      statusMessage: messages.STATUS_400,
      data: null,
    });
    return;
  }

  // WSI forecast API requires "PR" country code for Puerto Rico postal codes
  // but current conditions API requires "US" country code
  const isCurrentConditions = option === CURRENT;
  const countryCode = isPuertoRicoZipCode(zipCode) && !isCurrentConditions ? PUERTORICO.abbr : 'US';
  const requestUrl = getRequestUrl(option, zipCode, languageCode, countryCode);

  /**
   * Setting language code for localization perspective.
   */
  const language = languageCode.includes(EN) ? EN : ES;
  LocalizationManager.setLanguage(language);

  handleRequest(res,
    requestUrl,
    parseJsonResponse);
});

/**
 * Route to search weather location.
 */
router.get(`${pathId}/location/search/:filter/:value/:languageCode`, cors(corsOptions), (req, res) => {
  const { languageCode, filter, value } = req.params;

  // check validation of filter parameter
  if (['locid', 'postalkey', 'geocode', 'cityname'].includes(filter) === false) {
    logger.error(messages.STATUS_400);
    res.status(400).send(messages.STATUS_400);
    return;
  }

  logger.info('search weather location parameters : filter : value : languageCode', filter, value, languageCode);

  setTransactionName('get/weather-api/location/search', `${filter}/${value}/${languageCode}`);

  const requestUrl = `${serverConfig.api.endpoints.weather.searchLocation[filter](
    value,
    languageCode
  )}&apiKey=${process.env.WEATHER_API_KEY}`;

  handleRequest(res,
    requestUrl,
    parseSearchApiResponse);
});

/**
 * Hourly API response formatter
 * @param {array} hourlyData - hourly forecast data
 * @param {array} currentData - current conditions data
 * @returns {array} - formatted forecasts
 */
function hourlyApiResponseFormatter(hourlyData, currentData) {
  const formatted = hourlyData.map(({ iconCode, temp, localeTime }) => ({
    localeTime,
    tempF: temp,
    icon: iconCode,
  }));

  // add current conditions as first hourly "forecast"
  formatted.unshift({
    localeTime: null,
    tempF: currentData.temp,
    icon: currentData.icon,
  });

  // return 24 hours plus one hour in case the first forecast needs to be excluded by the client
  // because the forecast is in the past (which may occur because this proxy response is cached)
  return formatted.slice(0, 25);
}

/**
 * Daily API response formatter
 * @param {array} forecasts - array of forecasts
 * @returns {array} - formatted forecasts
 */
function dailyApiResponseFormatter(forecasts) {
  return forecasts.map(forecast => ({
    localeTime: forecast.localeTime,
    icon: forecast.iconCode,
    precipChance: forecast.precipChance,
    precipType: forecast.precipType,
    phrase: forecast.narrative,
    minTempF: forecast.tempMinWithUnits.fahrenheit,
    maxTempF: forecast.tempMaxWithUnits.fahrenheit,
  })).slice(1); // remove the current day's daily forecast since we only need hourly for current day
}

/**
 * Gets current day from daily forecasts
 * @param {array} dailyForecasts - data from daily API
 * @returns {Object} - current day
*/
function getCurrentDay(dailyForecasts) {
  return dailyForecasts[0];
}

/**
 * Current API response formatter
 * @param {Object} currentData - array of forecasts
 * @param {Array} dailyData - daily data
 * @returns {Object} - formatted current weather conditions
 */
function currentApiResponseFormatter(currentData, dailyData) {
  const currentDay = getCurrentDay(dailyData);
  return {
    tempF: currentData.temp,
    icon: currentData.icon,
    phrase: currentData.condition,
    maxTempF: currentDay.tempMax,
    minTempF: currentDay.tempMin,
    humidity: currentData.humidity,
    windDirection: currentData.windDirection,
    windSpeedMph: currentData.windSpeedMph,
    precipChance: currentDay.precipChance,
    precipType: currentDay.precipType,
  };
}

/**
 * All API response formatter
 * @param {Object} currentData - currentData response object
 * @param {array} hourlyData - currentData response object
 * @param {array} dailyData - currentData response object
 * @returns {Object} - all formatted API responses
 */
function allApiResponseFormatter(currentData, hourlyData, dailyData) {
  if (
    [isValidObject(currentData), isValidArray(hourlyData), isValidArray(dailyData)].includes(false)
  ) {
    return {};
  }
  return {
    ...currentApiResponseFormatter(
      currentData,
      dailyData,
    ),
    forecasts: {
      hourly: hourlyApiResponseFormatter(hourlyData, currentData),
      daily: dailyApiResponseFormatter(dailyData),
    },
  };
}

/**
 * Fetches daily weather forecasts for the next 10 days
 * @param {string} geocode - location in the format "latitude,longitude"
 * @param {string} languageCode - the language required from the WSI api.
 * @returns {Promise<*>} - daily API's returned and parsed response
 */
function fetchDailyData(geocode, languageCode) {
  const url = getRequestUrl(TEN_DAYS_WITH_GEOCODE, geocode, languageCode);
  return request(url).then(({ data }) => {
    return parseDailyResponse(data, true);
  });
}

/**
 * Fetches current weather conditions
 * @param {string} geocode - location in the format "latitude,longitude"
 * @param {string} languageCode - the language required from the WSI api.
 * @returns {Promise<*>} - daily API's returned and parsed response
 */
function fetchCurrentData(geocode, languageCode) {
  const url = getRequestUrl(CURRENT_WITH_GEOCODE, geocode, languageCode);
  return request(url).then(({ data }) => {
    return parseCurrentResponse(data);
  });
}

/**
 * Fetches hourly weather forecasts for the next 48 hours
 * @param {string} geocode - location in the format "latitude,longitude"
 * @param {string} languageCode - the language required from the WSI api.
 * @returns {Promise<*>} - daily API's returned and parsed response
 */
function fetchHourlyData(geocode, languageCode) {
  const url = getRequestUrl(HOURLY_WITH_GEOCODE, geocode, languageCode);
  return request(url).then(({ data }) => {
    return parseHourlyResponse(data, true);
  });
}

/**
 * Validates Weather Constants Code
 * @param {string} code - Weather Constant code
 * @returns {string} - Validated weather constant code
 */
function formatCode(code) {
  return String(code).trim().toUpperCase();
}

/**
 * Parses params by locationType
 * @param {Object} params - Incomming HTTP params
 * @returns {Object} - Parsed Params
 */
function parseParams({ locationType, languageCode, location }) {
  logger.info('weather api merged current daily hourly : locationType : languageCode : location',
    locationType, languageCode, location);
  let geocode = null;
  if (locationType === WEATHER_WIDGET_GEOCODE_TYPE) {
    geocode = location;
  } else if (locationType === WEATHER_WIDGET_STATION_TYPE) {
    const codeFormatted = formatCode(location);
    const weatherConstant = weatherConstants[codeFormatted];
    if (hasKey(weatherConstant, 'lat') && hasKey(weatherConstant, 'long')) {
      geocode = `${weatherConstant.lat},${weatherConstant.long}`;
    }
  }
  return {
    geocode,
    languageCode,
  };
}

router.get(`${pathId}/widgets/:locationType/:languageCode/:location`, cors(corsOptions), (req, res) => {
  const { geocode, languageCode } = parseParams(req.params);
  if (geocode === null) {
    setHeaders(res, ttlError);
    logger.error('Weather API error: there was not geocode found.');
    res.status(400).send({
      statusCode: 400,
      statusMessage: messages.STATUS_400,
      data: null,
    });
  } else {
    Promise.all([
      fetchCurrentData(geocode, languageCode),
      fetchHourlyData(geocode, languageCode),
      fetchDailyData(geocode, languageCode),
    ]).then((allData) => {
      return allApiResponseFormatter(...allData);
    }).then((data) => {
      setHeaders(res, ttl);
      res.status(200).send(data);
    }).catch((error) => {
      setHeaders(res, ttlError);
      logger.error(`Weather API error. ${error}`);
      res.status(400).send({
        statusCode: 400,
        statusMessage: messages.STATUS_400,
        data: null,
      });
    });
  }
});

export default router;
