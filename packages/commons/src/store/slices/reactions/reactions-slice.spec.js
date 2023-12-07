import reactionsReducer, {
  initialState as reactionsState,
  resetReactions,
  setReactions,
  fetchReactions,
  writeReaction,
  removeUserReaction,
  incrementCount,
  decrementCount,
} from './reactions-slice';
import { LOADING, SUCCESS, ERROR } from '../../../constants/status';

// To avoid a reducers error on testing
jest.mock('../../reducers', () => jest.fn());

describe('reactions-slice', () => {
  let initialState;

  beforeEach(() => {
    initialState = reactionsState;
  });

  describe('resetReactions', () => {
    it('should reset to the initialState', () => {
      const state = {
        ...initialState,
        status: SUCCESS,
      };
      const action = resetReactions();
      expect(reactionsReducer(state, action)).toEqual(initialState);
    });
  });

  describe('fetchReactions.pending', () => {
    it('should handle the pending status', () => {
      let state = reactionsReducer(
        initialState,
        fetchReactions.pending(null, { contentIds: null })
      );
      expect(state.status).toBe(LOADING);
      expect(state.error).toBe(null);
      expect(state.allIds).toHaveLength(0);

      state = reactionsReducer(
        state,
        fetchReactions.pending(null, { contentIds: ['test'] })
      );
      expect(state.status).toBe(LOADING);
      expect(state.error).toBe(null);
      expect(state.allIds).toHaveLength(0);

      // To verify duplicates don't occur
      state = reactionsReducer(
        state,
        fetchReactions.pending(null, { contentIds: ['test'] })
      );
      expect(state.status).toBe(LOADING);
      expect(state.error).toBe(null);
      expect(state.allIds).toHaveLength(0);
    });
  });

  describe('fetchReactions.fulfilled', () => {
    it('should handle the fulfilled status', () => {
      const contentIds = ['test', 'test-2'];
      const state = reactionsReducer(
        initialState,
        fetchReactions.fulfilled([
          { contentId: 'test', counts: [] },
          { contentId: 'test-2', counts: [] },
        ], null, { contentIds })
      );
      expect(state.allIds).toHaveLength(2);
      expect(state.status).toBe(SUCCESS);
    });
    it('should not duplicate ids', () => {
      const contentIds = ['test'];
      let state = {
        ...initialState,
        byId: {
          test: { contentId: 'test', counts: [] },
        },
        allIds: ['test'],
      };
      state = reactionsReducer(
        state,
        fetchReactions.fulfilled([
          { contentId: 'test', counts: [1, 2] },
        ], null, { contentIds }),
      );
      expect(state.status).toBe(SUCCESS);
      expect(state.allIds).toHaveLength(1);
      expect(state.byId.test.counts).toHaveLength(2);
    });
    it('should not write any reactions if response is not an array', () => {
      const contentIds = ['test'];
      const state = reactionsReducer(
        initialState,
        fetchReactions.fulfilled('test', null, { contentIds })
      );
      expect(state.status).toBe(SUCCESS);
      expect(state.allIds).toHaveLength(1);
    });
  });

  describe('fetchReactions.rejected', () => {
    it('should handle the error status', () => {
      const state = reactionsReducer(
        initialState,
        fetchReactions.rejected(new Error('test'))
      );
      expect(state.status).toBe(ERROR);
      expect(state.error.message).toBe('test');
    });
  });

  describe('setReactions', () => {
    it('should set the reaction new state', () => {
      const state = {
        ...initialState,
      };
      const newState = {
        allIds: [
          'Test',
        ],
        byId: {
          a: 'Test',
        },
        error: null,
        status: LOADING,
      };
      const action = setReactions(newState);
      expect(reactionsReducer(state, action)).toEqual(newState);
    });
  });
  describe('writeReactions.pending', () => {
    it('should handle the pending status', () => {
      const state = reactionsReducer(
        initialState,
        writeReaction.pending({ contentIds: null })
      );
      expect(state.status).toBe(LOADING);
      expect(state.error).toBe(null);
      expect(state.allIds).toHaveLength(0);
    });
  });
  describe('writeReactions.rejected', () => {
    it('should handle the error status', () => {
      const state = reactionsReducer(
        initialState,
        writeReaction.rejected(new Error('test'))
      );
      expect(state.status).toBe(ERROR);
      expect(state.error.message).toBe('test');
    });
  });
  describe('writeReactions.fulfilled', () => {
    it('should handle the fulfilled status', () => {
      const newState = {
        ...initialState,
        byId: {
          test: { contentId: 'test', counts: [{ reaction: 'LOVE', count: 1 }] },
        },
        allIds: ['test'],
      };
      const state = reactionsReducer(
        newState,
        writeReaction.fulfilled(
          { contentId: 'test', reaction: 'LOVE', currentUserReaction: 'LOVE' },
        )
      );
      expect(state.byId.test.status).toBe(SUCCESS);
      expect(state.status).toBe(SUCCESS);
    });
  });
  describe('removeUserReaction.pending', () => {
    it('should handle the pending status', () => {
      const state = reactionsReducer(
        initialState,
        removeUserReaction.pending({ contentIds: null })
      );
      expect(state.status).toBe(LOADING);
      expect(state.error).toBe(null);
      expect(state.allIds).toHaveLength(0);
    });
  });
  describe('removeUserReaction.rejected', () => {
    it('should handle the error status', () => {
      const state = reactionsReducer(
        initialState,
        removeUserReaction.rejected(new Error('test'))
      );
      expect(state.status).toBe(ERROR);
      expect(state.error.message).toBe('test');
    });
  });
  describe('removeUserReaction.fulfilled', () => {
    it('should handle the fulfilled status', () => {
      const newState = {
        ...initialState,
        byId: {
          test: { contentId: 'test', counts: [{ reaction: 'LOVE', count: 1 }] },
        },
        allIds: ['test'],
      };
      const state = reactionsReducer(
        newState,
        removeUserReaction.fulfilled(
          { contentId: 'test', reaction: null, currentUserReaction: 'LOVE' },
        )
      );
      expect(state.byId.test.status).toBe(SUCCESS);
      expect(state.status).toBe(SUCCESS);
    });
  });

  describe('incrementCount', () => {
    it('should add to the existing count', () => {
      const newState = {
        ...initialState,
        byId: {
          test: {
            counts: [{
              reaction: 'LOVE',
              count: 0,
            }],
          },
        },
      };
      const state = reactionsReducer(
        newState,
        incrementCount({ contentId: 'test', reaction: 'LOVE' })
      );
      expect(state.byId.test.counts[0].count).toBe(1);
    });
    it('should add a new count', () => {
      const newState = {
        ...initialState,
        byId: {
          test: {
            counts: [{
              reaction: 'LOVE',
              count: 0,
            }],
          },
        },
      };
      const state = reactionsReducer(
        newState,
        incrementCount({ contentId: 'test', reaction: 'SAD' })
      );
      expect(state.byId.test.counts).toHaveLength(2);
      expect(state.byId.test.counts[1]).toEqual({
        reaction: 'SAD',
        count: 1,
      });
    });
    it('should not modify the count if no reaction is provided', () => {
      const newState = {
        ...initialState,
        byId: {
          test: {
            counts: [{
              reaction: 'LOVE',
              count: 0,
            }],
          },
        },
      };
      const state = reactionsReducer(
        newState,
        incrementCount({ contentId: 'test' })
      );
      expect(state.byId.test.counts[0].count).toBe(0);
    });
  });
  describe('decrementCount', () => {
    const newState = {
      ...initialState,
      byId: {
        test: {
          counts: [{
            reaction: 'LOVE',
            count: 1,
          }],
        },
      },
    };

    it('should modify the reactions count properly', () => {
      const state = reactionsReducer(
        newState,
        decrementCount({ contentId: 'test', reaction: 'LOVE' })
      );
      expect(state.byId.test.counts[0].count).toBe(0);
    });
    it('should not modify any counts if reaction is not found', () => {
      const state = reactionsReducer(
        newState,
        decrementCount({ contentId: 'test', reaction: 'LIKE' })
      );
      expect(state.byId.test.counts[0].count).toBe(1);
    });
    it('should not modify count if content id is not found', () => {
      const state = reactionsReducer(
        newState,
        decrementCount({ reaction: 'LOVE' })
      );
      expect(state.byId.test.counts[0].count).toBe(1);
    });
  });
});
