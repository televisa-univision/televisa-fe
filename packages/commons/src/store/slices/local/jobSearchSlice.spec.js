import jobsReducer, { fetchJobs } from './jobSearchSlice';

describe('jobs-slice', () => {
  let initialState;
  beforeEach(() => {
    initialState = { jobs: [] };
  });

  describe('fetchJob.fulfilled', () => {
    it('should handle the fulfilled statusx', () => {
      const state = jobsReducer(
        initialState,
        fetchJobs.fulfilled([1, 2], null, null)
      );
      expect(state.jobs).toEqual(expect.objectContaining([1, 2]));
    });
  });
});
