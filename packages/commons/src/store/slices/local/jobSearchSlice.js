import { createSlice } from '@reduxjs/toolkit';

import { fetchJobs } from './jobSearchAsyncActions';

export const initialState = {
  jobs: [],
};

export const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchJobs.fulfilled]: (state, action) => {
      const newState = state;
      newState.jobs = action?.payload || [];
    },
    SYNC_STORE: (state, action) => {
      const newState = state;
      newState.jobs = action?.data?.local?.jobs || [];
    },
  },
});

export {
  fetchJobs,
};

export default jobsSlice.reducer;
