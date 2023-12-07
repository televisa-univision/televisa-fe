// TODO: BEX Migration - Figure out if this file is needed.
// In case it is needed, ask for the categories and the links for each one.
// And start creating the files for each category.

import { genericTelehitData } from './generic';
import { TELEHIT_SITE } from '../../../../constants/sites';

/**
 * All /programas header configuration
 * @param {Object} data - page data
 * @returns {Object}
 */
export default (data = {}) => {
  const navData = genericTelehitData(data);

  return {
    title: {
      name: 'Programas',
      link: '/programas',
      site: TELEHIT_SITE,
    },
    links: [],
    ...navData,
  };
};
