import userReducer, {
  initialState as initialStateCopy,
  setUserState,
  fetchAnonUser,
  fetchFavoriteHoroscopes,
  updateFavoriteHoroscopes,
  getUserLocation,
  resetUserState,
  writeReaction,
  removeUserReaction,
  setUserReaction,
  unsetUserReaction,
} from './user-slice';
import { cloneDeep } from '../../../utils/helpers';
import {
  LOADING,
  SUCCESS,
  ERROR,
} from '../../../constants/status';
import { fetchReactions } from '../reactions/reactions-slice';

let initialState;
const widgetKey = 1;

// To avoid a reducers error on testing
jest.mock('../../store');

// Information about how reduxjs/toolkit creates the actions
// pending, fulfilled and rejected
// https://github.com/reduxjs/redux-toolkit/blob/3c26c05fc35d7006794605eeb6016fd62cead55b/src/createAsyncThunk.ts#L243

describe('user-slice', () => {
  beforeEach(() => {
    initialState = cloneDeep(initialStateCopy);
  });

  describe('fetchAnonymousUser action', () => {
    it('should Rejected return an error', () => {
      const action = fetchAnonUser.rejected(new Error('Test'));
      expect(userReducer(initialState, action).error.message).toEqual('Test');
    });

    it('should Fulfilled return the loading flag to false and error null', () => {
      const action = fetchAnonUser.fulfilled({
        accessToken: 'test',
        sub: 'test',
      });
      expect(userReducer(initialState, action)).toEqual({
        ...initialState,
        anonymous: true,
        accessToken: 'test',
        sub: 'test',
      });
    });
  });

  describe('setUserState action', () => {
    it('should alter the state properly', () => {
      const action = setUserState({
        accessToken: '123',
      });
      expect(userReducer(initialState, action)).toEqual({
        ...initialState,
        accessToken: '123',
      });
    });
  });

  describe('fetchFavoriteHoroscopes action', () => {
    it('should Pending set pending status', () => {
      const action = fetchFavoriteHoroscopes.pending();
      const { horoscopes } = userReducer(initialState, action);
      expect(horoscopes.status).toEqual(LOADING);
    });

    it('should Pending keep the state if ids or items are not array', () => {
      const action = fetchFavoriteHoroscopes.fulfilled({ ids: null, widgetKey: 1, items: null });
      const { horoscopes } = userReducer(initialState, action);
      expect(horoscopes).toEqual({
        ...initialState.horoscopes,
        widgetKey: 1,
        status: SUCCESS,
      });
    });

    it('should Rejected set rejected status', () => {
      const action = fetchFavoriteHoroscopes.rejected();
      const { horoscopes } = userReducer(initialState, action);
      expect(horoscopes.status).toEqual(ERROR);
    });

    it('should Fulfilled return the proper state', () => {
      const action = fetchFavoriteHoroscopes.fulfilled({
        ids: ['1'], widgetKey, items: [{}],
      }, null, { requestingUrl: 'http://www.univision.com' });
      const newState = userReducer(initialState, action);
      expect(newState).toEqual({
        ...initialState,
        horoscopes: {
          favorites: [{ id: '1', status: SUCCESS, enabled: true }],
          cardsData: [{}],
          visibleFavoritesCount: 1,
          requestingUrl: 'http://www.univision.com',
          status: SUCCESS,
          widgetKey,
        },
      });
    });
  });

  describe('updateFavoriteHoroscopes action', () => {
    beforeEach(() => {
      initialState.horoscopes.cardsData = [{}, {}, {}];
      initialState.horoscopes.visibleFavoritesCount = 3;
    });

    describe('Pending', () => {
      beforeEach(() => {
        initialState.horoscopes.favorites = [{ id: '1', status: SUCCESS, enabled: true }];
      });

      it('should set LOADING status when removing', () => {
        const state = userReducer(
          initialState,
          updateFavoriteHoroscopes.pending(null, { id: '1', isRemove: true })
        );
        expect(state.horoscopes.favorites).toEqual([{ id: '1', status: LOADING, enabled: false }]);
      });

      it('should add a new favorite with proper status, when adding ', () => {
        const state = userReducer(
          initialState,
          updateFavoriteHoroscopes.pending(null, { id: '2', isRemove: false })
        );
        expect(state.horoscopes.favorites).toEqual([
          { id: '1', status: SUCCESS, enabled: true },
          { id: '2', status: LOADING, enabled: true },
        ]);
      });

      it('should add a cardsData placeholder, when adding ', () => {
        const cardsCount = initialState.horoscopes.cardsData.length;
        const state = userReducer(
          initialState,
          updateFavoriteHoroscopes.pending(null, { id: '2', isRemove: false })
        );
        const index = state.horoscopes.favorites.length - 1;
        expect(state.horoscopes.cardsData.length).toEqual(cardsCount + 1);
        expect(state.horoscopes.cardsData[index]).toEqual({});
      });

      it('should not to add a cardsData placeholder, when adding favorite is not visible', () => {
        initialState.horoscopes.cardsData = [{}];
        initialState.horoscopes.visibleFavoritesCount = 1;
        const cardsCount = 1;
        const state = userReducer(
          initialState,
          updateFavoriteHoroscopes.pending(null, { id: '2', isRemove: false })
        );
        expect(state.horoscopes.cardsData.length).toEqual(cardsCount);
      });
    });

    describe('Rejected', () => {
      beforeEach(() => {
        initialState.horoscopes.favorites = [{ id: '1', status: LOADING, enabled: true }];
      });

      it('should do nothing if signId is not in favorites', () => {
        const state = userReducer(
          initialState,
          updateFavoriteHoroscopes.rejected(null, null, { id: '2', isRemove: true })
        );
        expect(state).toEqual(initialState);
      });

      it('should update status to ERROR when was removing', () => {
        const state = userReducer(
          initialState,
          updateFavoriteHoroscopes.rejected(null, null, { id: '1', isRemove: true })
        );
        expect(state.horoscopes.favorites).toEqual([{ id: '1', status: ERROR, enabled: true }]);
      });

      it('should remove favorite when was adding', () => {
        const state = userReducer(
          initialState,
          updateFavoriteHoroscopes.rejected(null, null, { id: '1', isRemove: false })
        );
        expect(state.horoscopes.favorites).toEqual([]);
      });

      it('should remove cardsData placeholder when was adding', () => {
        const cardsDataSize = initialState.horoscopes.cardsData.length;
        let state = userReducer(
          initialState,
          updateFavoriteHoroscopes.pending(null, { id: '2', isRemove: false })
        );
        state = userReducer(
          state,
          updateFavoriteHoroscopes.rejected(null, null, { id: '2', isRemove: false })
        );
        expect(state.horoscopes.cardsData.length).toEqual(cardsDataSize);
      });

      it('should not remove cardsData placeholder when was adding and is not visible', () => {
        initialState.horoscopes.cardsData = [{}];
        initialState.horoscopes.visibleFavoritesCount = 1;
        let state = userReducer(
          initialState,
          updateFavoriteHoroscopes.pending(null, { id: '2', isRemove: false })
        );
        expect(state.horoscopes.cardsData.length).toEqual(1);
        state = userReducer(
          state,
          updateFavoriteHoroscopes.rejected(null, null, { id: '2', isRemove: false })
        );
        expect(state.horoscopes.cardsData.length).toEqual(1);
      });
    });

    describe('Fulfilled', () => {
      beforeEach(() => {
        initialState.horoscopes.favorites = [{ id: '1', status: LOADING, enabled: true }];
        initialState.horoscopes.cardsData = [{}, {}, {}];
      });

      it('should do nothing if signId is not in favorites', () => {
        const state = userReducer(
          initialState,
          updateFavoriteHoroscopes.fulfilled(null, null, { id: '2', isRemove: true })
        );
        expect(state).toEqual(initialState);
      });

      it('should remove favorite when is removing', () => {
        const state = userReducer(
          initialState,
          updateFavoriteHoroscopes.fulfilled(null, null, { id: '1', isRemove: true })
        );
        expect(state.horoscopes.favorites).toEqual([]);
      });

      it('should update status when adding', () => {
        const state = userReducer(
          initialState,
          updateFavoriteHoroscopes.fulfilled(null, null, { id: '1', isRemove: false })
        );
        expect(state.horoscopes.favorites).toEqual([{ id: '1', status: SUCCESS, enabled: true }]);
      });

      it('should replace all cards data with latest cards data', () => {
        const newCardsData = [{ type: 'test' }, { type: 'test1' }, { type: 'test2' }];
        let state = userReducer(
          initialState,
          updateFavoriteHoroscopes.pending(null, { id: '2', isRemove: false })
        );
        state = userReducer(
          state,
          updateFavoriteHoroscopes.fulfilled(newCardsData, null, { id: '2', isRemove: false })
        );
        expect(state.horoscopes.cardsData).toEqual([{ type: 'test' }, { type: 'test1' }, { type: 'test2' }]);
      });

      it('should remove the favorite and push latest cardsData from removed index to the end', () => {
        const newCardsData = [{ type: 'test' }, { type: 'test1' }, { type: 'test2' }];
        let state = userReducer(
          initialState,
          updateFavoriteHoroscopes.pending(null, { id: '1', isRemove: true })
        );
        state = userReducer(
          state,
          updateFavoriteHoroscopes.fulfilled(newCardsData, null, { id: '1', isRemove: true })
        );
        expect(state.horoscopes.cardsData).toEqual(newCardsData);
      });
    });
  });

  describe('getUserLocation extra reducers', () => {
    it('should return status error on rejected', () => {
      const action = getUserLocation.rejected(new Error('Test'));
      const result = userReducer(initialState, action);
      expect(result).toHaveProperty('location.status', ERROR);
    });

    it('should return status loading on pending', () => {
      const action = getUserLocation.pending();
      const result = userReducer(initialState, action);
      expect(result).toHaveProperty('location.status', LOADING);
    });

    it('should return status success and rigth data on fulfilled', () => {
      const locationData = {
        CountryData: { country_code: 'MX' },
      };
      const action = getUserLocation.fulfilled(locationData);
      const result = userReducer(initialState, action);
      expect(result).toHaveProperty('location.data', locationData);
    });
  });

  describe('resetUserState', () => {
    it('should reset the user state properly', () => {
      const action = resetUserState();
      expect(userReducer(initialState, action)).toEqual(initialState);
    });
  });

  describe('writeReaction', () => {
    beforeEach(() => {
      initialState = {
        ...initialState,
        reactions: {
          allIds: ['test'],
          byId: {
            test: {
              contentId: 'test',
              reaction: null,
            },
          },
        },
      };
    });

    describe('pending', () => {
      it('should handle the pending status', () => {
        const state = userReducer(
          initialState,
          writeReaction.pending(null, { contentId: 'test' })
        );
        expect(state.reactions.byId.test.status).toBe(LOADING);
      });
    });

    describe('fulfilled', () => {
      it('should handle the fulfilled status', () => {
        const state = userReducer(
          initialState,
          writeReaction.fulfilled(
            { contentId: 'test', reaction: 'test' },
            null,
            { contentId: 'test' }
          )
        );
        expect(state.reactions.byId.test.status).toBe(SUCCESS);
      });
    });

    describe('rejected', () => {
      it('should handle the rejected status', () => {
        const state = userReducer(
          initialState,
          writeReaction.rejected(
            new Error('test'),
            null,
            { contentId: 'test' }
          )
        );
        expect(state.reactions.byId.test.error.message).toBe('test');
        expect(state.reactions.byId.test.status).toBe(ERROR);
      });
      it('should not write an error status for a non existent item', () => {
        const modifiedState = { ...initialState };
        modifiedState.reactions.allIds = [];
        delete modifiedState.reactions.byId.test;
        const state = userReducer(
          modifiedState,
          writeReaction.rejected(
            new Error('test'),
            null,
            { contentId: 'test' }
          )
        );
        expect(state.reactions.byId.test).not.toBeDefined();
      });
    });
  });

  describe('fetchReactions', () => {
    describe('pending', () => {
      it('should handle the pending status', () => {
        const state = userReducer(
          initialState,
          fetchReactions.pending(null, { contentIds: null })
        );
        expect(state.reactions.status).toBe(LOADING);
      });
    });
    describe('rejected', () => {
      it('should handle the rejected status', () => {
        const state = userReducer(
          initialState,
          fetchReactions.rejected(
            new Error('test'),
            null,
            { contentIds: [] }
          )
        );
        expect(state.reactions.error.message).toBe('test');
        expect(state.reactions.status).toBe(ERROR);
      });
    });

    describe('fulfilled', () => {
      const contentIds = ['test', 'test2', 'test3'];
      const reactionPayload = [
        { contentId: 'test', userReaction: 'test' },
        { contentId: 'test2', userReaction: 'test' },
        { contentId: 'test3', userReaction: 'test' },
      ];
      it('should handle the fulfilled status', () => {
        const state = userReducer(
          initialState,
          fetchReactions.fulfilled(reactionPayload, null, { contentIds })
        );
        expect(state.reactions.allIds).toHaveLength(3);
        expect(state.reactions.status).toBe(SUCCESS);
      });
      it('should not write data if payload is not an array', () => {
        const state = userReducer(
          initialState,
          fetchReactions.fulfilled('test', null, { contentIds: ['test'] })
        );
        expect(state.reactions.allIds).toHaveLength(1);
        expect(state.reactions.status).toBe(SUCCESS);
      });
      it('should not duplicate ids', () => {
        const sameIdPayload = [
          { contentId: 'test3', userReaction: 'HAPPY' },
        ];
        let state = userReducer(
          initialState,
          fetchReactions.fulfilled(reactionPayload, null, { contentIds })
        );
        state = userReducer(state, fetchReactions.pending(null, { contentIds: ['test3'] }));
        state = userReducer(
          state,
          fetchReactions.fulfilled(sameIdPayload, null, { contentIds: ['test3'] })
        );
        expect(state.reactions.allIds).toHaveLength(3);
        expect(state.reactions.byId.test3.reaction).toBe('HAPPY');
      });
    });
  });

  describe('removeUserReaction', () => {
    describe('pending', () => {
      const state = userReducer(
        initialState,
        removeUserReaction.pending(
          null, { contentId: 'test' }
        )
      );
      expect(state.reactions.status).toBe(LOADING);
    });

    describe('fullfilled', () => {
      it('should handle the fulfilled status', () => {
        const state = userReducer(
          {
            ...initialState,
            reactions: {
              allIds: ['test'],
              byId: {
                test: {
                  contentId: 'test',
                  reaction: 'LOVE',
                },
              },
            },
          },
          removeUserReaction.fulfilled(
            { contentId: 'test', reaction: 'test' },
          )
        );
        expect(state.reactions.status).toEqual(SUCCESS);
        expect(state.reactions.byId.test.status).toBe(SUCCESS);
      });
    });

    describe('rejected', () => {
      it('should handle the rejected status', () => {
        const state = userReducer(
          {
            ...initialState,
            reactions: {
              allIds: ['test'],
              byId: {
                test: {
                  contentId: 'test',
                  reaction: 'LOVE',
                },
              },
            },
          },
          removeUserReaction.rejected(
            new Error('test'),
            null,
            { contentId: 'test' },
          )
        );
        expect(state.reactions.byId.test.status).toBe(ERROR);
        expect(state.reactions.byId.test.error.message).toBe('test');
      });
    });
  });

  describe('setUserReaction', () => {
    it('should alter the state properly', () => {
      const state = userReducer(
        initialState,
        setUserReaction({ contentId: 'test', reaction: 'LOVE' })
      );
      expect(state.reactions.byId.test).toEqual(
        expect.objectContaining({
          contentId: 'test',
          reaction: 'LOVE',
        })
      );
    });
  });

  describe('unsetUserReaction', () => {
    it('should alter the state properly', () => {
      const state = userReducer(
        initialState,
        unsetUserReaction({ contentId: 'test' })
      );
      expect(state.reactions.byId.test).toEqual(
        expect.objectContaining({
          contentId: 'test',
          reaction: null,
        })
      );
    });
  });
});
