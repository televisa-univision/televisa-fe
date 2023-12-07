import * as subNavTypes from '../../../../constants/subNavTypes';
import genericNavData from '../genericNavData';

/**
 * custom generic data
 * @param {Object} data objetc custom
 * @returns {Object}
 */
export const customGenericData = (data) => {
  return {
    ...genericNavData(data),
    globalNavTop: true,
  };
};

export default (data = {}) => {
  return {
    ...customGenericData(data),
    subNavType: subNavTypes.EMPTY_SUBNAV,
  };
};
