import genericLasEstrellasData from './generic';
import { ELNU9VE_SITE } from '../../../../constants/sites';

/**
 * All /novelas header configuration
 * @param {Object} data - page data
 * @returns {Object}
 */
export default (data = {}) => {
  const navData = genericLasEstrellasData(data);

  return {
    title: {
      name: 'Novelas',
      link: '/novelas',
      site: ELNU9VE_SITE,
    },
    links: [],
    ...navData,
  };
};
