import Matcher, { types } from '../Matcher';
// eslint-disable-next-line import/no-cycle
import { getKey } from '../../..';

/**
 * Returns true if the current show matches any of the expectedTypes
 * @param {string|Array} expectedType show type
 * @returns {Matcher}
 */
export default function matchesShowType(expectedType) {
  return new Matcher(types.TAG_HIERARCHY, ({ data }) => {
    const showType = getKey(data, 'show.showType');
    if (Array.isArray(expectedType)) {
      return expectedType.indexOf(showType) > -1;
    }
    return showType === expectedType;
  });
}
