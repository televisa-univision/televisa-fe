import { ALL, MX, US } from '../../constants/userLocation';
import {
  isValidArray,
  isValidString,
} from '.';

/**
 * Validates the provided value agaisnt a list of valid values to
 * provide with a value user location
 * @param {string|array} value location value
 * @returns {string} valid location value
 */
function getUserLocationValue(value) {
  if (!value) {
    return US;
  }

  let locationValue;

  if (isValidArray(value)) {
    [locationValue] = value;
  } else {
    locationValue = value;
  }

  // Fix for akamai so we can override with query param
  locationValue = isValidString(locationValue) ? locationValue.substring(0, 2) : US;

  return [ALL, MX, US].includes(locationValue)
    ? locationValue
    : US;
}

export default getUserLocationValue;
