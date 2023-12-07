import pascalcase from 'pascalcase';

import { hasKey } from '@univision/fe-commons/dist/utils/helpers';

// Default domain
const domain = 'http://cdn1.uvnimg.com/weather-widget';

// TEMPORARY List of exceptions (typos, etc)
const exceptions = {
  NorthCarolina: 'Raleigh',
  Philadelphia: 'Philly',
  PuertoRico: 'PuertoRicoi',
  SanFrancisco: 'AreadelaBahia',
  WUVG: 'WUGV',
};

/**
 * Parse `uri` from api for use as `City` in `url` schema
 * eg: /los-angeles/kmex
 * @param {string} uri The url received from  API
 * @returns {Object} includes `call` and `city` strings
 */
export const getLocalMarketFromUri = (uri) => {
  // `/los-angeles/kmex/` => `los-angeles/kmex`
  const cleanUri = uri.charAt(0) === '/' ? uri.substr(1) : uri;

  // City
  let city = cleanUri.slice(0, cleanUri.indexOf('/')).replace(/[^0-9a-z]/gi, ' ');
  city = pascalcase(city);

  // Call
  const call = cleanUri.slice(cleanUri.indexOf('/') + 1, cleanUri.length).toUpperCase();

  return {
    call: hasKey(exceptions, call) ? exceptions[call] : call,
    city: hasKey(exceptions, city) ? exceptions[city] : city,
  };
};

/**
 * Get alt text for weather image
 * @param {string} uri to get city from
 * @param {Object} option to get alt text from
 * @returns {string}
 */
export const getWeatherImageAlt = (uri, { alt }) => {
  let { city } = getLocalMarketFromUri(uri);
  // Adds a space between words
  city = city.replace(/([A-Z])/g, ' $1').trim();
  return `${alt} ${city}`;
};

/**
 * Constructs the URI of the Weather Image
 * @param {string} uri of the market to parse
 * @param {string} type of weather widget p
 * @param {string} option that will be constructed
 * @param {string} timestamp to include in image url
 * @returns {string} url of the image to display
 */
export const getWeatherImageUrl = (uri, type, option, timestamp) => {
  const { call, city } = getLocalMarketFromUri(uri);
  const { format, name } = option;

  // Tropical Weather Conditions is the only weather widget with a different url schema
  const isTropical = type === 'noticiascardtropicalweatherconditions';
  const tropical = 'TROPICAL';

  // Weather image url constructor
  return isTropical
    ? `${domain}/${name}_${tropical}.jpg?ts=${timestamp}`
    : `${domain}/${name}_${city}_${call}.${format}?ts=${timestamp}`;
};
