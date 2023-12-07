import { HOROSCOPES } from '../../../constants/personalizationType';
import {
  updateFavoriteHoroscopes,
  fetchFavoriteHoroscopes,
} from './user-actions';

/**
 * Mapper object to determine Favorites redux entry in state
 * and the action that will toggle favorite preferences
 */
export const favoritesMapper = {
  [HOROSCOPES]: {
    favoritesEntry: 'user.horoscopes.favorites',
    fetchStatusEntry: 'user.horoscopes.status',
    cardsDataEntry: 'user.horoscopes.cardsData',
    widgetKeyEntry: 'user.horoscopes.widgetKey',
    fetchFavoritesAction: fetchFavoriteHoroscopes,
    updateFavoriteAction: updateFavoriteHoroscopes,
  },
};

/**
 * Determines it a personalization type is valid
 * To be valid should be properly configured in
 * the favoritesMapper object
 * @param {string} personalizationType personalization type
 * @returns {boolean}
 */
export const isValidType = (personalizationType) => {
  return personalizationType in favoritesMapper;
};

export default favoritesMapper;
