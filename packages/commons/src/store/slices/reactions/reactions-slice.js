/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { fetchReactions } from './reactions-asyncActions';
// eslint-disable-next-line import/no-cycle
import { removeUserReaction, writeReaction } from '../user/user-asyncActions';
import { LOADING, ERROR, SUCCESS } from '../../../constants/status';

export const initialState = {
  allIds: [],
  byId: {},
  error: null,
  status: null,
};

const reducers = {
  resetReactions: () => initialState,
  setReactions: (state, action) => ({ ...state, ...action.payload }),
  incrementCount: (state, action) => {
    const {
      contentId,
      reaction,
    } = action.payload;

    if (reaction) {
      const itemCount = state.byId[contentId]?.counts
        ?.find(item => item.reaction === reaction);

      if (itemCount) {
        itemCount.count += 1;
      } else {
        state.byId[contentId].counts.push({
          reaction,
          count: 1,
        });
      }
    }
  },
  decrementCount: (state, action) => {
    const {
      contentId,
      reaction,
    } = action.payload;

    const itemCount = state.byId[contentId]?.counts
      ?.find(item => item.reaction === reaction);

    if (itemCount) {
      itemCount.count = Math.max(0, itemCount.count - 1);
    }
  },
};

const extraReducers = {
  [fetchReactions.pending]: (state, action) => {
    const { contentIds } = action.meta.arg;
    state.status = LOADING;

    if (Array.isArray(contentIds)) {
      contentIds.forEach((item) => {
        if (!(item in state.byId)) {
          state.byId[item] = {
            contentId: item,
            status: LOADING,
            counts: [],
          };
        }
      });
    }
  },
  [fetchReactions.fulfilled]: (state, action) => {
    const reactions = action.payload;
    // Comes from all requested contentIds in the thunk
    const { contentIds } = action.meta.arg;

    if (Array.isArray(reactions)) {
      reactions.forEach((item) => {
        const { contentId, counts } = item;
        state.byId[contentId] = {
          ...state.byId[contentId],
          counts,
          status: SUCCESS,
        };
      });
    }
    // Removes any possible duplicates, from items already set and items to be added
    state.allIds = [
      ...new Set([
        ...state.allIds,
        ...contentIds,
      ]),
    ];
    state.status = SUCCESS;
  },
  [fetchReactions.rejected]: (state, action) => {
    state.error = action.error;
    state.status = ERROR;
  },
  [writeReaction.pending]: (state) => {
    state.status = LOADING;
  },
  [writeReaction.fulfilled]: (state, action) => {
    const { contentId } = action.payload;
    state.status = SUCCESS;
    state.byId[contentId].status = SUCCESS;
  },
  [writeReaction.rejected]: (state, action) => {
    state.error = action.error;
    state.status = ERROR;
  },
  [removeUserReaction.pending]: (state) => {
    state.status = LOADING;
  },
  [removeUserReaction.fulfilled]: (state, action) => {
    const { contentId } = action.payload;
    state.status = SUCCESS;
    state.byId[contentId].status = SUCCESS;
  },
  [removeUserReaction.rejected]: (state, action) => {
    state.error = action.error;
    state.status = ERROR;
  },
};

const reactionsSlice = createSlice({
  name: 'reactions',
  initialState,
  reducers,
  extraReducers,
});

export const {
  resetReactions,
  setReactions,
  incrementCount,
  decrementCount,
} = reactionsSlice.actions;

export {
  fetchReactions,
  writeReaction,
  removeUserReaction,
};

export default reactionsSlice.reducer;
