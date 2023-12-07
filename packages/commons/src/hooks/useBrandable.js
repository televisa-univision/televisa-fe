import { useSelector } from 'react-redux';

import isEqual from '@univision/fe-utilities/helpers/common/isEqual';
import isValidObject from '@univision/fe-utilities/helpers/common/isValidObject';

import { radioStationSelector, tvStationSelector } from '../store/selectors/brandable-selectors';

/**
 * State equality method for the brandable selectors
 * @param {Object} prev - previous state
 * @param {Object} next - next state
 * @returns {boolean}
 */
export const brandableComparison = (prev, next) => isEqual(prev, next);

/**
 * Gets the appropiate brandable (tv station or radio station) from store
 * This is a replacement for the getBrandable helper
 * @returns {Object}
 */
const useBrandable = () => {
  const tvStation = useSelector(tvStationSelector, brandableComparison);
  const radioStation = useSelector(radioStationSelector, brandableComparison);

  if (isValidObject(tvStation)) {
    return tvStation;
  }

  if (isValidObject(radioStation)) {
    return radioStation;
  }

  return {};
};

export default useBrandable;
