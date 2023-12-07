import genericTudnData from './generic';
import * as subNavTypes from '../../../../constants/subNavTypes';

/**
 * Soccer Person header configuration
 * @param {Object} data - page data
 * @returns {Object}
 */
export default (data = {}) => {
  const defaultNav = genericTudnData(data);
  return {
    ...defaultNav,
    subNavType: subNavTypes.EMPTY_SUBNAV,
  };
};
