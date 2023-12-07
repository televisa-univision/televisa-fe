import * as types from '../../../constants/personalizationType';
import { favoritesMapper, isValidType } from './favoritesMapper';

describe('FavoriteSelectorConnector', () => {
  it('should every key in favoritesReduxMapper be a personalization type', () => {
    Object.keys(favoritesMapper).forEach((favType) => {
      expect(types[favType]).toBeDefined();
    });
  });

  it('should every required property be defined', () => {
    Object.keys(favoritesMapper).forEach((favType) => {
      const favoriteMeta = favoritesMapper[favType];
      expect(favoriteMeta.favoritesEntry).toBeDefined();
      expect(favoriteMeta.cardsDataEntry).toBeDefined();
      expect(favoriteMeta.fetchStatusEntry).toBeDefined();
      expect(favoriteMeta.fetchFavoritesAction).toBeDefined();
      expect(favoriteMeta.updateFavoriteAction).toBeDefined();
    });
  });

  it('should isValidType return properly if valid or not', () => {
    expect(isValidType(types.HOROSCOPES)).toBeTruthy();
    expect(isValidType('Invalid')).toBeFalsy();
  });
});
