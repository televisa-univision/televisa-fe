import Store from '../../store';
import getStandings from './standings-actions';
import setPageData from '../page-actions';
import { fetchSportApi } from '../../../utils/api/fetchApi';

/**
 * Mock for return value ones
 * @param {*} data - the fetch response
 * @param {Error} error - the error for fetch reject
 * @returns {Function}
 */
function mockReturnValue(data, error) {
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

jest.mock(
  '../../../utils/api/fetchApi',
  () => ({
    fetchSportApi: jest.fn(() => new Promise((resolve, reject) => {
      resolve({ 'sports-content': 'abc' });
      reject(new Error('something bad happened'));
    }))
  })
);

const data = {
  settings: {
    uid: 2,
    highlightedCompetitionSeasons: [
      {
        seasonId: 25,
        soccerCompetition: {
          id: 1
        }
      }
    ]
  },
};

const query = {
  leagueId: 199,
  leagueSeasonId: 2017,
};

const pageData = {
  data: {
    widgets: [
      {
        settings:
        {
          uid: 2,
          highlightedCompetitionSeasons: [
            {
              seasonId: 25,
              soccerCompetition: {
                id: 1
              }
            }
          ]
        }
      },
      {
        settings:
        {
          uid: 4,
        }
      }
    ]
  }
};

jest.mock(
  '../../../utils/api/fetchApi',
  () => ({ fetchSportApi: mockReturnValue({ 'sports-content': 'abc' }) })
);

describe('getStandings action', () => {
  beforeEach(() => {
    fetchSportApi.mockClear();
  });

  afterAll(() => {
    fetchSportApi.mockReset();
  });
  it('should not set Widget ExtraData if not right data from API', (done) => {
    Store.dispatch(setPageData(pageData));
    expect.assertions(1);
    fetchSportApi.mockReturnValueOnce({
      fetchSportApi: jest.fn(() => new Promise((resolve, reject) => {
        resolve({});
        reject(new Error('something bad happened'));
      }))
    });
    Store.dispatch(getStandings({}, d => d, query)).then(() => {
      expect(Store.getState().page.data.widgets[0].extraData).not.toBeDefined();
      done();
    });
  });
  it('should not set Widget ExtraData if no query', (done) => {
    Store.dispatch(setPageData(pageData));
    expect.assertions(1);
    fetchSportApi.mockReturnValueOnce({
      fetchSportApi: jest.fn(() => new Promise((resolve, reject) => {
        resolve({});
        reject(new Error('something bad happened'));
      }))
    });
    Store.dispatch(getStandings({}, d => d)).then(() => {
      expect(Store.getState().page.data.widgets[0].extraData).not.toBeDefined();
      done();
    });
  });
  it('should set Widget ExtraData error with wrong respose from API', (done) => {
    Store.dispatch(setPageData(pageData));
    fetchSportApi.mockReturnValueOnce({});
    Store.dispatch(getStandings(data, mockExtractor)).then(() => {
      expect(Store.getState().page.data.widgets[0].extraData).toHaveProperty('error');
      done();
    });
  });
  it('should set Widget ExtraData error with empty respose from API', (done) => {
    Store.dispatch(setPageData(pageData));
    fetchSportApi.mockReturnValueOnce(null);
    Store.dispatch(getStandings(data, mockExtractor)).then(() => {
      expect(Store.getState().page.data.widgets[0].extraData).toHaveProperty('error', {});
      done();
    });
  });
  it('should set Widget ExtraData error response from API ', (done) => {
    Store.dispatch(setPageData(pageData));
    fetchSportApi.mockReturnValueOnce(Promise.reject());
    Store.dispatch(getStandings(data, mockExtractor, query)).then(() => {
      expect(Store.getState().page.data.widgets[0].extraData).toHaveProperty('error', true);
      done();
    });
  });
  it('should set Widget ExtraData error from client side fetch', (done) => {
    const error = { response: { status: 404 } };
    Store.dispatch(setPageData(pageData));
    fetchSportApi.mockReturnValueOnce(Promise.reject(error));
    Store.dispatch(getStandings(data, mockExtractor)).then(() => {
      expect(Store.getState().page.data.widgets[0].extraData).toHaveProperty('error');
      done();
    });
  });
  it('should set Widget ExtraData in state with query', (done) => {
    Store.dispatch(setPageData(pageData));
    expect.assertions(1);
    Store.dispatch(getStandings(data, mockExtractor, query)).then(() => {
      expect(Store.getState().page.data.widgets[0].extraData).toBeDefined();
      done();
    });
  });
  it('should set Widget ExtraData in state with empty query data', (done) => {
    Store.dispatch(setPageData(pageData));
    expect.assertions(1);
    Store.dispatch(getStandings(data, mockExtractor, {})).then(() => {
      expect(Store.getState().page.data.widgets[0].extraData).toBeDefined();
      done();
    });
  });
  it('should set Widget ExtraData in state with error', (done) => {
    const error = { statusText: 'Missing required params' };
    Store.dispatch(setPageData(pageData));
    expect.assertions(1);
    Store.dispatch(getStandings(data, mockExtractor, { leagueId: query.leagueId })).then(() => {
      expect(Store.getState().page.data.widgets[0].extraData).toHaveProperty('error', error);
      done();
    });
  });
});
