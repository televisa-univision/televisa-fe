import Store from '../../store';
import getTeams from './teamsGrid-actions';
import setPageData from '../page-actions';
import { cloneDeep } from '../../../utils/helpers';
import { fetchSportApi } from '../../../utils/api/fetchApi';

/**
 * Mock for return value ones
 * @param {*} data - the fetch response
 * @param {Error} error - the error for fetch reject
 * @returns {Function}
 */
function mockReturnValue (data, error) {
  return jest.fn(() => new Promise((resolve, reject) => {
    resolve(data || {});
    reject(error || new Error('something bad happened'));
  }));
}

/**
 * Mock for extractor
 * @param {Object} data - the response data
 * @returns {Array}
 */
const mockExtractor = data => (
  data && data['sports-content']
);

// Mock data
const competitionData = {
  settings: {
    uid: 2,
    soccerCompetitionSeason: {
      seasonId: '2017',
      soccerCompetition: {
        id: '199'
      }
    }
  }
};
const pageData = {
  data: {
    widgets: [
      {
        settings:
        {
          uid: 2
        }
      },
      {
        settings:
        {
          uid: 4
        }
      }
    ]
  }
};

jest.mock(
  '../../../utils/api/fetchApi',
  () => ({ fetchSportApi: mockReturnValue({ 'sports-content': 'abc' }) })
);

describe('getTeams action', () => {
  beforeEach(() => {
    fetchSportApi.mockClear();
  });

  afterAll(() => {
    fetchSportApi.mockReset();
  });

  it('should not set Widget ExtraData if not have right widget settings', (done) => {
    Store.dispatch(setPageData(pageData));
    Store.dispatch(getTeams({}, mockExtractor)).then(() => {
      const callArgs = fetchSportApi.mock.calls;

      expect(Store.getState().page.data.widgets[0].extraData).toBeUndefined();
      expect(callArgs[0]).toBeUndefined();
      done();
    });
  });

  it('should set Widget ExtraData error if not have required parameters', (done) => {
    Store.dispatch(setPageData(pageData));
    Store.dispatch(getTeams({ settings: { uid: 2 } }, mockExtractor)).then(() => {
      const callArgs = fetchSportApi.mock.calls;
      const { extraData } = Store.getState().page.data.widgets[0];

      expect(extraData).toHaveProperty('error', new Error('Missing required params'));
      expect(callArgs[0]).toBeUndefined();
      done();
    });
  });

  it('should set Widget ExtraData with the team list', (done) => {
    const response = {
      'sports-content': [{ key: 1 }, { key: 2 }]
    };

    fetchSportApi.mockReturnValueOnce(response);
    Store.dispatch(setPageData(pageData));
    Store.dispatch(getTeams(competitionData, mockExtractor)).then(() => {
      const callArgs = fetchSportApi.mock.calls;
      const { extraData } = Store.getState().page.data.widgets[0];

      expect(extraData).toBeDefined();
      expect(extraData.data).toHaveLength(2);
      expect(callArgs[0][0].uri).toBe('/v1/rosters/soccer/2017');
      expect(callArgs[0][0].params).toEqual({
        competitionKey: '199',
        limit: 100,
      });
      done();
    });
  });

  it('should set Widget ExtraData for Collapsed version', (done) => {
    const competitionCollapsed = cloneDeep(competitionData);
    const response = {
      'sports-content': [{ key: 1 }, { key: 2 }]
    };

    competitionCollapsed.settings.displayType = {
      value: 'Collapsed'
    };

    fetchSportApi.mockReturnValueOnce(response);
    Store.dispatch(setPageData(pageData));
    Store.dispatch(getTeams(competitionCollapsed, mockExtractor)).then(() => {
      const callArgs = fetchSportApi.mock.calls;
      const { extraData } = Store.getState().page.data.widgets[0];

      expect(extraData).toBeDefined();
      expect(extraData.data).toHaveLength(2);
      expect(callArgs[0][0].uri).toBe('/v1/rosters/soccer/2017');
      expect(callArgs[0][0].params).toEqual({
        competitionKey: '199',
        limit: 200
      });
      done();
    });
  });

  it('should set Widget ExtraData error with wrong respose from API', (done) => {
    Store.dispatch(setPageData(pageData));
    fetchSportApi.mockReturnValueOnce({});
    Store.dispatch(getTeams(competitionData, mockExtractor)).then(() => {
      const { extraData } = Store.getState().page.data.widgets[0];

      expect(extraData).toHaveProperty('error');
      done();
    });
  });

  it('should set Widget ExtraData error with empty respose from API', (done) => {
    Store.dispatch(setPageData(pageData));
    fetchSportApi.mockReturnValueOnce(null);
    Store.dispatch(getTeams(competitionData, mockExtractor)).then(() => {
      const { extraData } = Store.getState().page.data.widgets[0];

      expect(extraData).toHaveProperty('error', true);
      done();
    });
  });

  it('should set Widget ExtraData error response from API ', (done) => {
    const error = new Error('Not Found');
    Store.dispatch(setPageData(pageData));
    fetchSportApi.mockReturnValueOnce(Promise.reject(error));
    Store.dispatch(getTeams(competitionData, mockExtractor)).then(() => {
      const { extraData } = Store.getState().page.data.widgets[0];

      expect(extraData).toHaveProperty('error', error);
      done();
    });
  });

  it('should set Widget ExtraData error from client side fetch', (done) => {
    const error = { response: { status: 400 } };
    Store.dispatch(setPageData(pageData));
    fetchSportApi.mockReturnValueOnce(Promise.reject(error));
    Store.dispatch(getTeams(competitionData, mockExtractor)).then(() => {
      const { extraData } = Store.getState().page.data.widgets[0];

      expect(extraData).toHaveProperty('error', error);
      done();
    });
  });
});
