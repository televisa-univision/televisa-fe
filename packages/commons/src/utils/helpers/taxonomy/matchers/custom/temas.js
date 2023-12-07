import getKey from '@univision/fe-utilities/helpers/object/getKey';

import Matcher, { types } from '../Matcher';
import contentTypes from '../../../../../constants/contentTypes';

const includedTagTypes = [
  contentTypes.TAG,
  contentTypes.TAGNODE,
];

/**
 * Returns true if uri includes temas and is not person type
 * exluding deportes for now as they still have the old header
 * @param {string} siteName - name of the current sites request
 * @returns {Matcher}
 */
export default function matchesTemasPage(siteName) {
  return new Matcher(types.CUSTOM, ({ data, site }) => {
    const type = getKey(data, 'type', '');
    return includedTagTypes.includes(type)
      && (!siteName || siteName === site);
  });
}
