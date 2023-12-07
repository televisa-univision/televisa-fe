import {
  getKey, hasKey, exists, isValidNumber, isValidArray, isValidString, capFirstLetter, isValidObject,
} from '@univision/fe-commons/dist/utils/helpers';
import { PODCAST_EPISODE } from '@univision/fe-commons/dist/constants/contentTypes.json';
import * as languages from '@univision/fe-commons/dist/utils/localization/languages';
import formatLocalTime from '@univision/fe-utilities/helpers/date/formatLocalTime';
import weatherIcons from '@univision/fe-icons/dist/components/Icon/mapping/weather';
import { RADIO_DEFAULT_URL } from '@univision/fe-commons/dist/constants/radio';
import { PLACEHOLDER } from '@univision/fe-commons/dist/constants/weather';
import numberOfBytes from '@univision/fe-commons/dist/utils/helpers/numberOfBytes';
import localization from '../localization';

/**
 * Returns the radio station language
 * @param {Object} sourceStation Radio Station object,
 * might be a sourceStation or a brandable object
 * @returns {string}
 */
export function getRadioStationLanguage(sourceStation) {
  let language = languages.ES;
  if (sourceStation) {
    language = sourceStation.primaryBroadcastLanguage;
    if (hasKey(sourceStation, 'radioStation.primaryBroadcastLanguage')) {
      language = sourceStation.radioStation.primaryBroadcastLanguage;
    }
  }
  return language;
}

/**
 * Returns language
 * @param {Object} data BEX API data
 * @returns {string}
 */
export function getLanguage(data = {}) {
  let language = languages.ES;
  if (exists(data.radioStation)) {
    language = getRadioStationLanguage(data.radioStation);
  }
  return language;
}

/**
 * Return radio station share options with default url
 * @param {Object} sharingOptions Radio Station share object,
 * @returns {Object}
 */
export function populateDefaultStationUrl(sharingOptions) {
  if (isValidObject((sharingOptions))) {
    const populatedSharingOptions = { ...sharingOptions };
    const sharingOptionsKeys = Object.keys(populatedSharingOptions);
    sharingOptionsKeys.forEach((key) => {
      if (!sharingOptions[key].url) {
        populatedSharingOptions[key].url = RADIO_DEFAULT_URL;
      }
    });
    return populatedSharingOptions;
  }
  return sharingOptions;
}

/**
 * Return radio station props
 * @param {Object} sourceStation Radio Station object,
 * @returns {Object}
 */
export function getRadioStationProps(sourceStation) {
  return {
    abacast: getKey(sourceStation, 'abacast'),
    alternativeLogo: getKey(sourceStation, 'alternativeLogo'),
    image: getKey(sourceStation, 'image'),
    logo: getKey(sourceStation, 'logo'),
    sharingOptions: populateDefaultStationUrl(getKey(sourceStation, 'sharing.options')),
    socialNetworks: getKey(sourceStation, 'socialNetworks'),
    stationDescription: getKey(sourceStation, 'description'),
    stationTitle: getKey(sourceStation, 'title'),
    uri: getKey(sourceStation, 'uri'),
    uid: getKey(sourceStation, 'uid'),
  };
}

/**
 * Converts Fahrenheit to Celsius to two decimal places.
 * @param {number} temp - temperature value in celsius.
 * @param {string} defaultValue - default value if temperature value is missing.
 * @returns {number} - converted value to celsius.
 */
export function convertFahrenheitToCelsius(temp, defaultValue = PLACEHOLDER) {
  return isValidNumber(temp) ? Math.round((temp - 32) * 5 / 9) : defaultValue;
}

/**
 * Hourly Forecast Extractor
 * @param {Object} forecasts - forecasts object
 * @param {number} [limit] - sets the array limit
 * @param {string} [timeZone] - date time zone
 * @returns {?Array}
 */
export function hourlyForecastExtractor(forecasts, limit, timeZone) {
  const hourlyValues = getKey(forecasts, 'hourly');

  if (!isValidArray(hourlyValues)) return null;

  const arrayLimit = isValidNumber(limit) && hourlyValues.length >= limit
    ? limit
    : hourlyValues.length;

  const hourly = hourlyValues
    .map((item) => {
      if (!isValidObject(item)) return null;

      const { icon, localeTime, tempF } = item;

      // current conditions
      if (localeTime === null) {
        return {
          icon,
          localeTime: localization.get('now'),
          tempF,
        };
      }

      const formatDate = formatLocalTime({ date: localeTime, timeZone, useOneDigitForHours: true });
      const localeTimeFormatted = getKey(formatDate, 'time', PLACEHOLDER);
      const timeUTC = getKey(formatDate, 'timeUTC');

      // forecast data may be cached so filter out any forecasts that are in the past
      if (timeUTC < Date.now()) return null;

      return {
        icon,
        localeTime: localeTimeFormatted,
        tempF,
      };
    })
    .filter(item => item)
    .slice(0, arrayLimit);

  return hourly;
}

/**
 * Precipitation chance message
 * @param {?string} precipType - precipitation type
 * @param {?boolean} [isAbbreviated] - true to return abbreviated value
 * @returns {string}
 */
export function precipMessage(precipType, isAbbreviated) {
  let precipTypeValue;

  if (precipType === 'precip' || precipType === null) {
    precipTypeValue = localization.get(isAbbreviated ? 'precipChanceAbbreviated' : 'precipChance');
  } else if (precipType === 'snow') {
    precipTypeValue = localization.get(isAbbreviated ? 'snowChanceAbbreviated' : 'snowChance');
  } else {
    precipTypeValue = localization.get(isAbbreviated ? 'rainChanceAbbreviated' : 'rainChance');
  }

  return precipTypeValue;
}

/**
 * Daily forecast extractor
 * @param {Object} forecasts - forecasts object
 * @param {number} [limit] - sets the array limit
 * @param {string} [timeZone] - date time zone
 * @returns {?Array}
 */
export function dailyForecastExtractor(forecasts, limit, timeZone) {
  const dailyValues = getKey(forecasts, 'daily');

  if (!isValidArray(dailyValues)) return null;

  const arrayLimit = isValidNumber(limit) && dailyValues.length >= limit
    ? limit
    : dailyValues.length;

  const daily = dailyValues
    .map((item) => {
      if (!isValidObject(item)) return null;

      const {
        icon,
        localeTime,
        maxTempF,
        minTempF,
        phrase,
        precipChance,
        precipType,
      } = item;

      const formatDate = formatLocalTime({ date: localeTime, timeZone });
      const { day: name, abbreviatedDay, isWeekend } = getKey(formatDate, 'weekDay', {});
      const date = isValidObject(formatDate)
        ? `${getKey(formatDate, 'day', '')} ${getKey(formatDate, 'month.abbreviatedMonth', '')}`
        : null;

      return {
        date,
        day: {
          name,
          abbreviatedDay,
        },
        icon: weatherIcons[icon],
        maxTempF,
        minTempF,
        phrase: isValidString(phrase) ? capFirstLetter(phrase.toLowerCase()) : null,
        precipChance: isValidNumber(precipChance) ? `${precipChance}%` : '0%',
        precipMessage: precipMessage(precipType),
        precipIcon: precipType === 'snow' ? 'snowChance' : 'rainChance',
        isWeekend,
      };
    })
    .filter(item => item)
    .slice(0, arrayLimit);

  return daily;
}

/**
 * Returns true if content Tipe is a podcast episode
 * @param {string} contentType - content Type to valid
 * @returns {Bool}
 */
export const isPodcastEpisode = contentType => contentType === PODCAST_EPISODE;

/** Start Weather Alerts formatter group */

/**
 * Return alerts array ordered by severity and date
 * @param {Array} alerts - Alerts inside each grouped county
 * @returns {Array}
 */
function orderBySeverityAndDate(alerts) {
  if (alerts.length <= 1) {
    return alerts;
  }

  const severityCodes = {
    Extreme: 1,
    Severe: 2,
    Moderate: 3,
    Minor: 4,
  };

  return alerts.sort(
    (a, b) => {
      if (severityCodes[a.severity] > severityCodes[b.severity]) return 1;
      if (severityCodes[a.severity] < severityCodes[b.severity]) return -1;
      if (new Date(a.issueTimeLocal) < new Date(b.issueTimeLocal)) return 1;
      return -1;
    }
  );
}

/**
 * Groups elements by the value of the given key
 * @param {Array} array to be grouped.
 * @param {Object} key in the elements to group by.
 * @returns {Object} elements grouped by key attribute.
 */
function groupByKey(array, key) {
  const grouped = {};

  array.forEach((element) => {
    const list = (grouped[element[key]] || []);
    list.push(element);
    grouped[element[key]] = list;
  });

  return grouped;
}

/**
 * Get next Weather Alerts
 * @param {array} unorderedAlerts alerts from api
 * @returns {{alerts, county}[]}
 */
export function formatWeatherAlerts(unorderedAlerts) {
  const grouped = groupByKey(unorderedAlerts, 'areaId');

  const unsorteredAlerts = Object.keys(grouped).map(key => (
    { county: grouped[key][0].areaName, alerts: orderBySeverityAndDate(grouped[key]) }
  ));

  // Sort alphabetically
  return unsorteredAlerts.sort((a, b) => {
    if (a.county < b.county) return -1;
    return 1;
  });
}

/** End Weather Alerts formatter group */

/**
 * Split text in smaller chunks
 * @param {string} text text to be handled
 * @param {number} limit number max of bytes
 * @returns {[string[], string[]]|[*, *]}
 */
export function getTextChunks(text, limit) {
  const chunkPoint = '\n';

  if (!text) {
    return [];
  }

  if (numberOfBytes(text) > limit) {
    const chunks = text.split(chunkPoint);
    if (chunks.length <= 1) {
      return [`${text}${chunkPoint}`];
    }
    const chunksLength = chunks.length;
    const halfIndex = Math.round(chunksLength / 2);
    const firstMiddle = chunks.slice(0, halfIndex);
    const secondMiddle = chunks.slice(halfIndex, chunksLength);
    const firstMiddleChunk = getTextChunks(firstMiddle.join(chunkPoint), limit);
    const secondMiddledChunk = getTextChunks(secondMiddle.join(chunkPoint), limit);

    return [...firstMiddleChunk, ...secondMiddledChunk];
  }

  return [`${text}${chunkPoint}`];
}
