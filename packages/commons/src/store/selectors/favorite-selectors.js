import { createSelector } from 'reselect';

import getKey from '@univision/fe-utilities/helpers/object/getKey';
import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';

import famosos from '../../utils/helpers/taxonomy/famosos';
import { HOROSCOPE } from '../../constants/pageCategories';
import features from '../../config/features/section';
import { actualHierarchySelector } from './page-selectors';
import { HOROSCOPES } from '../../constants/personalizationType';

/**
 * Select favorites values dynamically from the state
 * @param {Object} state redux state
 * @param {string} path path to read inside redux state
 * @returns {any}
 */
export const favoriteDataSelector = (state, path) => getKey(state, path);

/**
 * Extract favorites ids from an array of favorites objects
 * @returns {Array.<string>}
 */
export const favoritesIdsSelector = createSelector(
  favoriteDataSelector,
  favorites => (isValidArray(favorites) ? favorites
    .filter(fav => fav.enabled)
    .map(fav => fav.id) : [])
);

/**
 * Look up by the first personalized of an specific type
 * in widgets list
 * @param {Object} state redux state
 * @param {Object} props props
 * @property {string} props.personalizationType
 * @returns {string} null if not found
 */
export const personalizedWidgetKeySelector = (state, props) => {
  const widget = state?.page?.data?.widgets?.find(
    wid => wid?.settings?.personalizationType === props?.personalizationType
  );
  return widget?.settings?.uid ?? null;
};

/**
 * Determines if favorite horoscopes experience is enabled
 * @returns {boolean}
 */
export const favHoroscopesEnabledSelector = createSelector(
  features.isFavoriteHoroscopesEnabled,
  actualHierarchySelector,
  state => personalizedWidgetKeySelector(state, { personalizationType: HOROSCOPES }),
  (isFavHoroscopesEnabled, actualHierarchy, widgetKey) => {
    return isFavHoroscopesEnabled
    && widgetKey
    && famosos[HOROSCOPE].some(matcher => matcher.match({ tag: actualHierarchy }));
  }
);
