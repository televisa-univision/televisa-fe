import Store from '../../store';
import getBrackets from './brackets-actions';
import setPageData from '../page-actions';
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
    soccerLeague: {
      seasonId: '2019',
      soccerCompetition: {
        name: 'Copa Oro',
        id: '7',
      },
    },
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

describe('getBrackets action', () => {
  beforeEach(() => {
    fetchSportApi.mockClear();
  });

  afterAll(() => {
    fetchSportApi.mockReset();
  });

  it('should not set Widget ExtraData if not have right widget settings', (done) => {
    Store.dispatch(setPageData(pageData));
    Store.dispatch(getBrackets({}, mockExtractor)).then(() => {
      const callArgs = fetchSportApi.mock.calls;

      expect(Store.getState().page.data.widgets[0].extraData).toBeUndefined();
      expect(callArgs[0]).toBeUndefined();
      done();
    });
  });

  it('should set Widget ExtraData error if not have required parameters', (done) => {
    Store.dispatch(setPageData(pageData));
    Store.dispatch(getBrackets({ settings: { uid: 2 } }, mockExtractor)).then(() => {
      const callArgs = fetchSportApi.mock.calls;
      const { extraData } = Store.getState().page.data.widgets[0];

      expect(extraData).toHaveProperty('error', new Error('Missing required params'));
      expect(callArgs[0]).toBeUndefined();
      done();
    });
  });

  it('should set Widget ExtraData with the brackets/tournament data', (done) => {
    const response = {
      'sports-content': [{ key: 1 }, { key: 2 }],
    };

    fetchSportApi.mockReturnValueOnce(response);
    Store.dispatch(setPageData(pageData));
    Store.dispatch(getBrackets(competitionData, mockExtractor)).then(() => {
      const callArgs = fetchSportApi.mock.calls;
      const { extraData } = Store.getState().page.data.widgets[0];

      expect(extraData).toBeDefined();
      expect(extraData.tournamentData).toHaveLength(2);
      expect(callArgs[0][0].uri).toBe('/v1/schedule-results/soccer');
      expect(callArgs[0][0].params).toStrictEqual({ competitionKey: '7', seasonKey: '2019' });
      done();
    });
  });

  it('should set Widget ExtraData with the brackets/standings data', (done) => {
    const response = {
      'sports-content': [{ key: 1 }, { key: 2 }],
    };

    fetchSportApi.mockReturnValueOnce(response);
    Store.dispatch(setPageData(pageData));
    Store.dispatch(getBrackets(competitionData, mockExtractor, 'groupPhase')).then(() => {
      const callArgs = fetchSportApi.mock.calls;
      const { extraData } = Store.getState().page.data.widgets[0];

      expect(extraData).toBeDefined();
      expect(extraData.standingsData).toHaveLength(2);
      expect(callArgs[0][0].uri).toBe('/v1/standings/soccer/2019/7');
      done();
    });
  });

  it('should set Widget ExtraData error with wrong respose from API', (done) => {
    Store.dispatch(setPageData(pageData));
    fetchSportApi.mockReturnValueOnce({});
    Store.dispatch(getBrackets(competitionData, mockExtractor)).then(() => {
      const { extraData } = Store.getState().page.data.widgets[0];

      expect(extraData).toHaveProperty('error');
      done();
    });
  });

  it('should set Widget ExtraData error with empty respose from API', (done) => {
    Store.dispatch(setPageData(pageData));
    fetchSportApi.mockReturnValueOnce(null);
    Store.dispatch(getBrackets(competitionData, mockExtractor)).then(() => {
      const { extraData } = Store.getState().page.data.widgets[0];

      expect(extraData).toHaveProperty('error', true);
      done();
    });
  });

  it('should set Widget ExtraData error response from API ', (done) => {
    const error = new Error('Not Found');
    Store.dispatch(setPageData(pageData));
    fetchSportApi.mockReturnValueOnce(Promise.reject(error));
    Store.dispatch(getBrackets(competitionData, mockExtractor)).then(() => {
      const { extraData } = Store.getState().page.data.widgets[0];

      expect(extraData).toHaveProperty('error', error);
      done();
    });
  });

  it('should set Widget ExtraData error from client side fetch', (done) => {
    const error = { response: { status: 400 } };
    Store.dispatch(setPageData(pageData));
    fetchSportApi.mockReturnValueOnce(Promise.reject(error));
    Store.dispatch(getBrackets(competitionData, mockExtractor)).then(() => {
      const { extraData } = Store.getState().page.data.widgets[0];

      expect(extraData).toHaveProperty('error', error);
      done();
    });
  });
});
