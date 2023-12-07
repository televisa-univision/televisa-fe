// TODO: BEX Migration - Figure out if this file is needed.
// In case it is needed, ask for the categories and the links for each one.
// And start creating the files for each category.

import { genericBandamaxData } from './generic';
import { BANDAMAX_SITE } from '../../../../constants/sites';

/**
 * All /novelas header configuration
 * @param {Object} data - page data
 * @returns {Object}
 */
export const novelas = (data = {}) => {
  const navData = genericBandamaxData(data);

  return {
    title: {
      name: 'Bandanews',
      link: '/bandanews',
      site: BANDAMAX_SITE,
    },
    links: [],
    ...navData,
  };
};

export default novelas;
