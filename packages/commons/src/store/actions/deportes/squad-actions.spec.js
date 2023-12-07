import configureStore from '../../configureStore';
import getSquad from './squad-actions';
import setPageData from '../page-actions';
import { fetchSportApi } from '../../../utils/api/fetchApi';

const store = configureStore();

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
    competition: 199,
    team: 1283,
    season: 2018,
  },
};
const pageData = {
  data: {
    widgets: [
      {
        settings:
          {
            uid: 2,
          },
      },
      {
        settings:
          {
            uid: 4,
          },
      },
    ],
  },
};

jest.mock(
  '../../../utils/api/fetchApi',
  () => ({ fetchSportApi: mockReturnValue({ 'sports-content': 'abc' }) })
);

describe('getSquad action', () => {
  beforeEach(() => {
    fetchSportApi.mockClear();
  });

  afterAll(() => {
    fetchSportApi.mockReset();
  });

  it('should not set Widget ExtraData if not have right widget settings', (done) => {
    store.dispatch(setPageData(pageData));
    store.dispatch(getSquad({}, mockExtractor)).then(() => {
      const callArgs = fetchSportApi.mock.calls;

      expect(store.getState().page.data.widgets[0].extraData).toBeUndefined();
      expect(callArgs[0]).toBeUndefined();
      done();
    });
  });

  it('should set Widget ExtraData error if not have required parameters', (done) => {
    store.dispatch(setPageData(pageData));
    store.dispatch(getSquad({ settings: { uid: 2 } }, mockExtractor)).then(() => {
      const callArgs = fetchSportApi.mock.calls;
      const { extraData } = store.getState().page.data.widgets[0];

      expect(extraData).toHaveProperty('error', new Error('Missing required params'));
      expect(callArgs[0]).toBeUndefined();
      done();
    });
  });

  it('should set Widget ExtraData with the team list', (done) => {
    const response = {
      'sports-content': [{ key: 1 }, { key: 2 }],
    };

    fetchSportApi.mockReturnValueOnce(response);
    store.dispatch(setPageData(pageData));
    store.dispatch(getSquad(competitionData, mockExtractor)).then(() => {
      const callArgs = fetchSportApi.mock.calls;
      const { extraData } = store.getState().page.data.widgets[0];

      expect(extraData).toBeDefined();
      expect(extraData.data).toHaveLength(2);
      expect(callArgs[0][0].uri).toBe('/v1/rosters/soccer/2018');
      expect(callArgs[0][0].params).toEqual({
        competitionKey: 199,
        teamKey: 1283,
      });
      done();
    });
  });

  it('should set Widget ExtraData error with wrong respose from API', (done) => {
    store.dispatch(setPageData(pageData));
    fetchSportApi.mockReturnValueOnce({});
    store.dispatch(getSquad(competitionData, mockExtractor)).then(() => {
      const { extraData } = store.getState().page.data.widgets[0];

      expect(extraData).toHaveProperty('error');
      done();
    });
  });

  it('should set Widget ExtraData error with empty respose from API', (done) => {
    store.dispatch(setPageData(pageData));
    fetchSportApi.mockReturnValueOnce(null);
    store.dispatch(getSquad(competitionData, mockExtractor)).then(() => {
      const { extraData } = store.getState().page.data.widgets[0];

      expect(extraData).toHaveProperty('error', true);
      done();
    });
  });

  it('should set Widget ExtraData error response from API ', (done) => {
    const error = new Error('Not Found');
    store.dispatch(setPageData(pageData));
    fetchSportApi.mockReturnValueOnce(Promise.reject(error));
    store.dispatch(getSquad(competitionData, mockExtractor)).then(() => {
      const { extraData } = store.getState().page.data.widgets[0];

      expect(extraData).toHaveProperty('error', error);
      done();
    });
  });

  it('should set Widget ExtraData error from client side fetch', (done) => {
    const error = { response: { status: 400 } };
    store.dispatch(setPageData(pageData));
    fetchSportApi.mockReturnValueOnce(Promise.reject(error));
    store.dispatch(getSquad(competitionData, mockExtractor)).then(() => {
      const { extraData } = store.getState().page.data.widgets[0];

      expect(extraData).toHaveProperty('error', error);
      done();
    });
  });
});
