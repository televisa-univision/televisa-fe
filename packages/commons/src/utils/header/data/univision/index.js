import * as subNavTypes from '../../../../constants/subNavTypes';
import genericNavData from '../genericNavData';

export default (data = {}) => {
  return {
    ...genericNavData(data),
    subNavType: subNavTypes.EMPTY_SUBNAV,
  };
};
