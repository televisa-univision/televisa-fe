import Store from '../../store';
import getScoreCells from './scoreCell-actions';
import setPageData from '../page-actions';
import { fetchSportApi } from '../../../utils/api/fetchApi';
import * as messages from '../../../constants/messages';

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
const settingsData = {
  settings: {
    uid: 2,
    soccerCompetitionSeason: {
      soccerCompetition: {
        id: '315',
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

describe('getMatches action', () => {
  beforeEach(() => {
    fetchSportApi.mockClear();
  });

  afterAll(() => {
    fetchSportApi.mockReset();
  });

  it('should not set Widget ExtraData if not right data from API', (done) => {
    Store.dispatch(setPageData(pageData));
    fetchSportApi.mockReturnValueOnce({});
    Store.dispatch(getScoreCells({}, mockExtractor)).then(() => {
      const callArgs = fetchSportApi.mock.calls;

      expect(Store.getState().page.data.widgets[0].extraData).not.toBeDefined();
      expect(callArgs[0][0].uri).toBe('/v1/score-cells/soccer');
      done();
    });
  });

  it('should set Widget ExtraData error with empty respose from API', (done) => {
    Store.dispatch(setPageData(pageData));
    fetchSportApi.mockReturnValueOnce(null);
    Store.dispatch(getScoreCells(settingsData, mockExtractor)).then(() => {
      expect(Store.getState().page.data.widgets[0].extraData).toHaveProperty('error', true);
      done();
    });
  });

  it('should set Widget ExtraData error response from API ', (done) => {
    const error = new Error('Internal Error');
    Store.dispatch(setPageData(pageData));
    fetchSportApi.mockReturnValueOnce(Promise.reject(error));
    Store.dispatch(getScoreCells(settingsData, mockExtractor)).then(() => {
      expect(Store.getState().page.data.widgets[0].extraData).toHaveProperty('error', error);
      done();
    });
  });

  it('should set empty array for Widget ExtraData when not found status', (done) => {
    Store.dispatch(setPageData(pageData));
    fetchSportApi.mockReturnValueOnce(Promise.resolve({ statusText: messages.NOT_FOUND }));
    Store.dispatch(getScoreCells(settingsData, mockExtractor)).then(() => {
      expect(Store.getState().page.data.widgets[0].extraData).toEqual([]);
      done();
    });
  });

  it('should set Widget ExtraData error from client side fetch', (done) => {
    const error = { response: { status: 404 } };
    Store.dispatch(setPageData(pageData));
    fetchSportApi.mockReturnValueOnce(Promise.reject(error));
    Store.dispatch(getScoreCells(settingsData, mockExtractor)).then(() => {
      expect(Store.getState().page.data.widgets[0].extraData).toEqual([]);
      done();
    });
  });

  it('should dispatch the data properly', (done) => {
    Store.dispatch(setPageData(pageData));
    Store.dispatch(getScoreCells(settingsData, mockExtractor)).then(() => {
      expect(Store.getState().page.data.widgets[0].extraData).toBeDefined();
      done();
    });
  });

  it('should should use MX data', (done) => {
    const mockData = {
      ...pageData,
      userLocation: 'MX',
    };

    const mockExtractorSpy = jest.fn().mockImplementation(
      data => (data && data['sports-content'])
    );

    const mockSettings = {
      settings: {
        ...settingsData.settings,
      },
      widgetContext: { isWorldCupMVP: true },
    };
    Store.dispatch(setPageData(mockData));
    Store.dispatch(getScoreCells(mockSettings, mockExtractorSpy)).then(() => {
      expect(Store.getState().page.data.widgets[0].extraData).toBeDefined();
      done();
    });
  });
});
