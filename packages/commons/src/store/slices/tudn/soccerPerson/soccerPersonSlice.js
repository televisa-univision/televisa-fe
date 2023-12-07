import { createSlice } from '@reduxjs/toolkit';
import { fetchSoccerPerson } from './soccerPersonAsyncActions';
import { LOADING, ERROR, SUCCESS } from '../../../../constants/status';
import * as types from '../../../actions/action-types';

export const initialState = {
  playerProfile: {},
  error: null,
  status: null,
};

const extraReducers = {
  [fetchSoccerPerson.pending]: (prevState) => {
    const state = prevState;
    state.status = LOADING;
  },
  [fetchSoccerPerson.fulfilled]: (prevState, action) => {
    const state = prevState;
    state.playerProfile = action.payload;
    state.status = SUCCESS;
  },
  [fetchSoccerPerson.rejected]: (prevState, action) => {
    const state = prevState;
    state.error = action.error;
    state.status = ERROR;
  },
  [types.SYNC_STORE]: (prevState, action) => {
    const state = prevState;
    state.playerProfile = action.data?.sports?.playerProfile || {};
  },
};

const soccerPersonSlice = createSlice({
  name: 'soccerPerson',
  initialState,
  reducers: {},
  extraReducers,
});

export {
  fetchSoccerPerson,
};

export default soccerPersonSlice.reducer;
