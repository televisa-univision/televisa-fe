import { TUDN_SITE } from '../../../../constants/sites';
import genericTudnData from './generic';

/**
 * Soccer match header configuration
 * @param {Object} data - page data
 * @returns {Object}
 */
export default (data = {}) => {
  const defaultNav = genericTudnData(data);
  const {
    title,
    shortTitle,
  } = data;

  return {
    ...defaultNav,
    title: {
      ...defaultNav.title,
      name: shortTitle || title,
      alignCenter: true,
      site: TUDN_SITE,
    },
  };
};
