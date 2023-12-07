import soccerPersonReducer, {
  initialState as soccerPersonState,
  fetchSoccerPerson,
} from './soccerPersonSlice';
import { LOADING, SUCCESS, ERROR } from '../../../../constants/status';

describe('soccer-person-slice', () => {
  let initialState;
  const data = {
    personnelId: '1234',
    team: {
      id: '456',
      season: '2002',
    },
  };
  const playerProfile = {
    nationality: 'Argentina',
  };
  beforeEach(() => {
    initialState = soccerPersonState;
  });

  describe('fetchSoccerPerson.pending', () => {
    it('should handle the pending status', () => {
      const state = soccerPersonReducer(
        initialState,
        fetchSoccerPerson.pending(null, { data })
      );
      expect(state.status).toBe(LOADING);
      expect(state.error).toBe(null);
      expect(state.playerProfile).toEqual({});
    });
  });

  describe('fetchSoccerPerson.fulfilled', () => {
    it('should handle the fulfilled status', () => {
      const state = soccerPersonReducer(
        initialState,
        fetchSoccerPerson.fulfilled(playerProfile, null, { data })
      );
      expect(state.playerProfile).toEqual(expect.objectContaining({ nationality: 'Argentina' }));
      expect(state.status).toBe(SUCCESS);
    });
  });

  describe('fetchSoccerPerson.rejected', () => {
    it('should handle the error status', () => {
      const state = soccerPersonReducer(
        initialState,
        fetchSoccerPerson.rejected(new Error('test'))
      );
      expect(state.status).toBe(ERROR);
      expect(state.error.message).toBe('test');
    });
  });
});
