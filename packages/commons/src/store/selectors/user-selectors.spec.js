import deepFreeze from 'deep-freeze';
import * as selector from './user-selectors';

const state = {
  user: {
    accessToken: 'test',
    id: 'test',
    anonymous: true,
    location: {
      data: {
        CountryData: {
          country_code: 'MX',
        },
      },
    },
    horoscopes: {
      favorites: [],
      cardsData: [],
      visibleFavoritesCount: 0,
      status: null,
      widgetKey: -1,
    },
    reactions: {
      allIds: [],
      byId: {},
    },
  },
};

deepFreeze(state);

describe('user-selectors', () => {
  describe('userSelector', () => {
    it('should return an empty object by default', () => {
      expect(selector.userSelector()).toEqual({});
    });
    it('should return the corresponding values from the store', () => {
      expect(selector.userSelector(state)).toEqual(state.user);
    });
    it('should return the corresponding values from the store instance ', () => {
      const store = {
        getState: jest.fn(() => state),
      };
      expect(selector.userSelector(store)).toEqual(state.user);
    });
  });
  describe('userLocationSelector', () => {
    it('should return an empty undefined by default', () => {
      expect(selector.userLocationSelector()).toBeUndefined();
    });
    it('should return user location data from the store', () => {
      expect(selector.userLocationSelector(state)).toEqual(state.user.location.data);
    });
  });
  describe('accessTokenSelector', () => {
    it('should return the corresponding values from the store', () => {
      expect(selector.accessTokenSelector(state)).toEqual(state.user.accessToken);
    });
  });
  describe('horoscopesCardDataSelector', () => {
    it('should return the corresponding value from the store', () => {
      expect(selector.horoscopesCardDataSelector(state)).toEqual(state.user.horoscopes.cardsData);
    });
  });
  describe('userReactionsSelector', () => {
    it('should return the corresponding value from the store', () => {
      expect(selector.userReactionsSelector(state))
        .toEqual(state.user.reactions.byId);
    });
  });
  describe('reactionByContentIdCreator', () => {
    it('should return the corresponding value from the store', () => {
      const modifiedState = {
        ...state,
        user: {
          reactions: {
            byId: {
              test: { reaction: 'TEST' },
            },
          },
        },
      };
      const props = { contentId: 'test' };
      const userReactionByIdSelector = selector.makeUserReactionByIdSelector();
      expect(userReactionByIdSelector(modifiedState, props)).toBe('TEST');
    });
  });
});
