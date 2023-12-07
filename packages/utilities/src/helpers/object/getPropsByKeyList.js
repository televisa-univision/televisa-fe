/**
 * @module helpers/object/getPropsByKeyList
 */
import isValidObject from '../common/isValidObject';
import isValidArray from '../common/isValidArray';

/**
 * Returns an object with props based on list key
 * @param {Object} props component
 * @param {Array} keys props to be returned
 * @returns {Object}
 */
export default function getPropsByKeyList(props, keys) {
  if (!isValidArray(keys) || !isValidObject(props)) return {};

  return keys.reduce((acc, curr) => {
    acc[curr] = props[curr];

    return acc;
  }, {});
}
