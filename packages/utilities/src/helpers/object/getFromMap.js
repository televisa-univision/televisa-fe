/**
 * @module helpers/object/getFromMap
 */
import isValidObject from '../common/isValidObject';
import isValidValue from '../common/isValidValue';

/**
 * Extracts (and execute if it's a function) a given value from an object map
 * @param {string} field the field to get
 * @param {Object} map the mapping of fields
 * @returns {*}
 */
export default function getFromMap(field, map, { usePattern = false, data } = {}) {
  let value;

  if (!isValidObject(map)) {
    return value;
  }

  const mapField = map[field];
  const mapDefault = map.default;

  if (isValidValue(mapField)) {
    value = mapField;
  } else if (usePattern && typeof field === 'string') {
    const foundKey = Object.keys(map).find(mapKey => field.match(mapKey));
    value = map[foundKey];
  }

  if (!isValidValue(value) && isValidValue(mapDefault)) {
    value = mapDefault;
  }

  if (typeof value === 'function') {
    return value(data);
  }

  return value;
}
