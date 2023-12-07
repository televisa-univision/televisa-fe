// TODO: BEX Migration - Figure out if this file is needed.
// In case it is needed, ask for the categories and the links for each one.
// And start creating the files for each category.

import { genericBandamaxData } from './generic';
import { BANDAMAX_SITE } from '../../../../constants/sites';

/**
 * All /programas header configuration
 * @param {Object} data - page data
 * @returns {Object}
 */
export default (data = {}) => {
  const navData = genericBandamaxData(data);

  return {
    title: {
      name: 'Tendencias',
      link: '/tendencias',
      site: BANDAMAX_SITE,
    },
    links: [],
    ...navData,
  };
};
