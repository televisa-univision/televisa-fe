import {
  favoriteDataSelector,
  favoritesIdsSelector,
  favHoroscopesEnabledSelector,
  personalizedWidgetKeySelector,
} from './favorite-selectors';
import { HOROSCOPES } from '../../constants/personalizationType';

const state = {
  user: {
    horoscopes: {
      favorites: [{ id: 1, enabled: true }, { id: 2, enabled: true }],
    },
  },
  page: {
    requestParams: { favoriteHoroscopesExperience: 'true' },
    data: {
      widgets: [
        { settings: { uid: 'testKey', personalizationType: HOROSCOPES } },
        { settings: { uid: 'testKey2', personalizationType: HOROSCOPES } },
      ],
    },
  },
};
describe('favorite-selector', () => {
  it('should favoriteDataSelector returns the expected value', () => {
    expect(favoriteDataSelector(state, 'user.horoscopes.favorites'))
      .toEqual(state.user.horoscopes.favorites);

    expect(favoriteDataSelector(state, 'invalid path'))
      .toEqual(undefined);
  });

  it('should favoritesIdsSelector returns the expected value', () => {
    const firstResult = favoritesIdsSelector(state, 'user.horoscopes.favorites');
    const expected = state.user.horoscopes.favorites.map(fav => fav.id);
    expect(firstResult).toEqual(expected);

    const secondResult = favoritesIdsSelector(state, 'user.horoscopes.favorites');
    // value memoized properly
    expect(firstResult === secondResult).toBeTruthy();
  });

  it('should favoritesIdsSelector returns empty array if not favorites', () => {
    const firstResult = favoritesIdsSelector(state, 'user.horoscopes.favoritess');
    expect(firstResult).toEqual([]);
  });

  it('should favHoroscopesEnabledSelector be enabled', () => {
    const result = favHoroscopesEnabledSelector({
      page: {
        data: {
          hierarchy: [{}, { uri: 'https://www.univision.com/horoscopos' }],
          widgets: [
            { settings: { uid: 'testKey', personalizationType: HOROSCOPES } },
          ],
        },
        requestParams: {
          favoriteHoroscopesExperience: 'true',
        },
      },
      user: {
        accessToken: 'TestToken',
      },
    }, { personalizationType: HOROSCOPES });
    expect(result).toEqual(true);
  });

  it('should return the index of the first personalized widget', () => {
    const widgetKey = state.page.data.widgets[0].settings.uid;
    expect(personalizedWidgetKeySelector(
      state,
      { personalizationType: HOROSCOPES }
    )).toEqual(widgetKey);
  });

  it('should return -1 if something is wrong', () => {
    expect(personalizedWidgetKeySelector(state, { personalizationType: 'InvalidType' })).toEqual(null);
    expect(personalizedWidgetKeySelector(null, HOROSCOPES)).toEqual(null);

    state.page.data.widgets[0].settings.personalizationType = null;
    state.page.data.widgets[1].settings.personalizationType = null;
    expect(personalizedWidgetKeySelector(state, { personalizationType: HOROSCOPES })).toEqual(null);
  });
});
