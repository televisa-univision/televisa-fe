/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import {
  LOADING,
  SUCCESS,
  ERROR,
} from '../../../constants/status';
// eslint-disable-next-line import/no-cycle
import {
  fetchAnonUser,
  fetchFavoriteHoroscopes,
  getUserLocation,
  removeUserReaction,
  updateFavoriteHoroscopes,
  writeReaction,
} from './user-asyncActions';
// eslint-disable-next-line import/no-cycle
import { fetchReactions } from '../reactions/reactions-slice';

const name = 'user';
export const initialState = {
  accessToken: null,
  anonymous: false,
  error: null,
  location: {
    status: null,
    data: {},
  },
  sub: null,
  horoscopes: {
    favorites: [],
    cardsData: [],
    visibleFavoritesCount: 0,
    requestingUrl: null,
    status: null,
    widgetKey: null,
  },
  reactions: {
    allIds: [],
    byId: {},
    status: null,
  },
};

const reducers = {
  setUserState: (state, action) => {
    return { ...state, ...action.payload };
  },
  resetUserState: () => {
    return initialState;
  },
  setUserReaction: (state, action) => {
    const { contentId, reaction } = action.payload;

    state.reactions.byId[contentId] = {
      contentId,
      reaction,
      status: LOADING,
    };
  },
  unsetUserReaction: (state, action) => {
    const { contentId } = action.payload;

    state.reactions.byId[contentId] = {
      contentId,
      reaction: null,
      status: LOADING,
    };
  },
};

const extraReducers = {
  [fetchAnonUser.fulfilled]: (state, action) => {
    const user = action.payload;
    state.accessToken = user.accessToken;
    state.anonymous = true;
    state.sub = user.sub;
    state.error = null;
  },
  [fetchAnonUser.rejected]: (state, action) => {
    state.error = action.error;
  },

  [fetchFavoriteHoroscopes.pending]: (state) => {
    state.horoscopes.status = LOADING;
  },
  [fetchFavoriteHoroscopes.fulfilled]: (state, action) => {
    const {
      ids, widgetKey, items,
    } = action.payload;
    const { requestingUrl } = action?.meta?.arg ?? {};
    const { horoscopes } = state;
    horoscopes.status = SUCCESS;
    horoscopes.widgetKey = widgetKey;
    horoscopes.requestingUrl = requestingUrl ?? null;
    if (ids?.length) {
      horoscopes.favorites = ids.map(id => ({
        id, status: SUCCESS, enabled: true,
      }));
    }
    if (items?.length) {
      horoscopes.cardsData = items;
      horoscopes.visibleFavoritesCount = items?.length;
    }
  },
  [fetchFavoriteHoroscopes.rejected]: (state) => {
    state.horoscopes.status = ERROR;
  },
  [updateFavoriteHoroscopes.pending]: (state, action) => {
    const { id, isRemove } = action.meta.arg;
    const {
      favorites,
      cardsData,
      visibleFavoritesCount,
    } = state.horoscopes;
    const index = favorites.findIndex(fav => fav.id === id);
    if (index >= 0 && isRemove) {
      favorites[index].status = LOADING;
      favorites[index].enabled = false;
    }
    if (index < 0 && !isRemove) {
      favorites.push({ id, status: LOADING, enabled: true });
      const addIndex = favorites.length - 1;

      if (
        addIndex > 0 // Use original first item as placeholder
        && addIndex < visibleFavoritesCount
      ) {
        cardsData.splice(addIndex, 0, {}); // Add placeholder on adding
      }
    }
  },
  [updateFavoriteHoroscopes.fulfilled]: (state, action) => {
    const items = action.payload;
    const { id, isRemove } = action.meta.arg;
    const {
      favorites,
    } = state.horoscopes;
    const index = favorites.findIndex(fav => fav.id === id);
    if (index >= 0) {
      if (isRemove) {
        favorites.splice(index, 1);
      } else {
        favorites[index].status = SUCCESS;
        favorites[index].enabled = true;
      }
      state.horoscopes.cardsData = items;
    }
  },
  [getUserLocation.pending]: (prevState) => {
    const state = prevState;
    state.location.status = LOADING;
  },
  [getUserLocation.fulfilled]: (prevState, action) => {
    const state = prevState;
    state.location.data = action.payload;
    state.location.status = SUCCESS;
  },
  [getUserLocation.rejected]: (prevState) => {
    const state = prevState;
    state.location.status = ERROR;
  },
  [updateFavoriteHoroscopes.rejected]: (state, action) => {
    const { id, isRemove } = action.meta.arg;
    const {
      favorites,
      cardsData,
      visibleFavoritesCount,
    } = state.horoscopes;
    const index = favorites.findIndex(fav => fav.id === id);
    if (index >= 0) {
      if (isRemove) {
        favorites[index].status = ERROR;
        favorites[index].enabled = true;
      } else {
        favorites.splice(index, 1);
        if (
          index > 0 // Original first item is used as placeholder we can't remove it
          && index < visibleFavoritesCount) {
          cardsData.splice(index, 1); // Remove placeholder if adding fail
        }
      }
    }
  },
  [fetchReactions.pending]: (state) => {
    state.reactions.status = LOADING;
  },
  [fetchReactions.fulfilled]: (state, action) => {
    const reactions = action.payload;
    const { contentIds } = action.meta.arg;

    if (Array.isArray(reactions)) {
      reactions.forEach((item) => {
        const { contentId, userReaction: reaction } = item;
        state.reactions.byId[contentId] = {
          ...state.reactions.byId[contentId],
          reaction,
          status: SUCCESS,
        };
      });
    }
    state.reactions.allIds = [
      ...new Set([
        ...state.reactions.allIds,
        ...contentIds,
      ]),
    ];
    state.reactions.status = SUCCESS;
  },
  [fetchReactions.rejected]: (state, action) => {
    state.reactions.error = action.error;
    state.reactions.status = ERROR;
  },
  [writeReaction.pending]: (state, action) => {
    const { contentId } = action.meta.arg;
    state.reactions.byId[contentId].status = LOADING;
  },
  [writeReaction.fulfilled]: (state, action) => {
    const { contentId } = action.payload;
    state.reactions.byId[contentId].status = SUCCESS;
  },
  [writeReaction.rejected]: (state, action) => {
    const { contentId } = action.meta.arg;

    if (contentId in state.reactions.byId) {
      state.reactions.byId[contentId].status = ERROR;
      state.reactions.byId[contentId].error = action.error;
    }
  },
  [removeUserReaction.pending]: (state) => {
    state.reactions.status = LOADING;
  },
  [removeUserReaction.fulfilled]: (state, action) => {
    const { contentId } = action.payload;
    state.reactions.status = SUCCESS;
    state.reactions.byId[contentId].status = SUCCESS;
  },
  [removeUserReaction.rejected]: (state, action) => {
    const { contentId } = action.meta.arg;

    state.reactions.status = ERROR;
    state.reactions.byId[contentId].status = ERROR;
    state.reactions.byId[contentId].error = action.error;
  },
};

const userSlice = createSlice({
  name,
  initialState,
  reducers,
  extraReducers,
});

/**
 * Export all action creators
 */
export const {
  resetUserState,
  setUserReaction,
  setUserState,
  unsetUserReaction,
} = userSlice.actions;

/**
 * Export all async action creators
 */
export {
  fetchAnonUser,
  fetchFavoriteHoroscopes,
  getUserLocation,
  removeUserReaction,
  updateFavoriteHoroscopes,
  writeReaction,
};

export default userSlice.reducer;
