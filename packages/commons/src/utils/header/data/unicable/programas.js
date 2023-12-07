// TODO: BEX Migration - Figure out if this file is needed.
// In case it is needed, ask for the categories and the links for each one.
// And start creating the files for each category.

import { genericUnicableData } from './generic';
import { UNICABLE_SITE } from '../../../../constants/sites';

/**
 * All /programas header configuration
 * @param {Object} data - page data
 * @returns {Object}
 */
export default (data = {}) => {
  const navData = genericUnicableData(data);

  return {
    title: {
      name: 'Programas',
      link: '/programas',
      site: UNICABLE_SITE,
    },
    links: [],
    ...navData,
  };
};
