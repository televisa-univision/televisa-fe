// TODO: BEX Migration - Figure out if this file is needed.
// In case it is needed, ask for the categories and the links for each one.
// And start creating the files for each category.

import { genericCanal5Data } from './generic';
import { CANAL5_SITE } from '../../../../constants/sites';

/**
 * All /novelas header configuration
 * @param {Object} data - page data
 * @returns {Object}
 */
export default (data = {}) => {
  const navData = genericCanal5Data(data);

  return {
    title: {
      name: 'Novelas',
      link: '/novelas',
      site: CANAL5_SITE,
    },
    links: [],
    ...navData,
  };
};
