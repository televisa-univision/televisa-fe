import configureMockStore from 'redux-mock-store';

import getPlayerProfile from '@univision/fe-graphql-services/dist/requests/queries/sports/getPlayerProfile';

import * as fetchGraphQL from '../../../../utils/api/graphql';
import * as clientLogging from '../../../../utils/logging/clientLogging';
import promiseMock from '../../../../utils/jest/helpers';

import { fetchSoccerPersonAction } from './soccerPersonAsyncActions';
import * as slice from './soccerPersonSlice';

const mockFetch = {
  getPlayerProfile: {
    age: 34,
    nationality: 'Argentina',
    dateOfBirth: '24 de junio de 1987',
    club: 'Barcelona FC',
    teamLogo: 'https://st1.uvnimg.com/90/6c/a2052a6d437cadae358dc2a5484d/fc-barcelona-2x.png',
    position: 'Delantero | 10',
    profile: '170cm / 72kg',
  },
};

const data = {
  personnelId: '1',
  teamSeason: {
    teamId: 'team1',
    soccerCompetitionSeason: {
      seasonId: '2002',
    },
  },
};

jest.useFakeTimers();

describe('soccer person async creators', () => {
  const mockStore = configureMockStore();
  const soccerPersonState = slice.initialState;
  const pageState = {
    config: {
      graphql: 'test',
    },
  };
  let store;
  let initialState;
  let fetchSpy;
  let loggerSpy;

  beforeEach(() => {
    initialState = {
      content: soccerPersonState,
      page: pageState,
    };
    store = mockStore(initialState);
    fetchSpy = jest.spyOn(fetchGraphQL, 'fetchGraphQL');
    loggerSpy = jest.spyOn(clientLogging, 'default').mockImplementation(() => jest.fn());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchSoccerPersonActions', () => {
    it('should call properly fetchGraphQL', async () => {
      fetchSpy.mockReturnValue(promiseMock({
        resolve: mockFetch,
      }));
      jest.runAllTimers();
      const soccerPerson = await fetchSoccerPersonAction(
        { data }, { getState: store.getState }
      );
      const { teamSeason, personnelId } = data;
      const { soccerCompetitionSeason, teamId } = teamSeason;
      expect.assertions(2);
      expect(fetchSpy).toHaveBeenCalledWith({
        query: getPlayerProfile,
        variables: { teamId, seasonId: soccerCompetitionSeason?.seasonId, playerId: personnelId },
        serverUri: initialState.page.config.graphql,
      });
      expect(soccerPerson).toEqual(expect.objectContaining({ nationality: 'Argentina' }));
    });

    it('should reject when an error is thrown', async () => {
      fetchSpy.mockReturnValue(promiseMock({
        reject: new Error('test'),
      }));
      jest.runAllTimers();
      expect.assertions(2);
      try {
        await fetchSoccerPersonAction(
          { data }, { getState: store.getState }
        );
      } catch (err) {
        expect(err.message).toEqual('Soccer Person Service Error:  fetchSoccerPerson rejected: test');
        expect(loggerSpy).toHaveBeenCalled();
      }
    });

    it('should not call fetchAuthGraphQL when data is empty', async () => {
      const playerProfile = await fetchSoccerPersonAction({
        data: null,
      }, { getState: store.getState });
      expect.assertions(2);
      expect(fetchSpy).not.toHaveBeenCalled();
      expect(playerProfile).toEqual({});
    });
  });
});
