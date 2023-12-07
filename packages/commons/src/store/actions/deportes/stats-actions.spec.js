import Store from '../../store';
import getStats from './stats-actions';
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
    matchId: '9',
    soccerMatchStatus: 'FULL',
  },
};

const pageData = {
  data: {
    widgets: [
      {
        settings:
          {
            uid: 2,
            matchId: '9',
            soccerMatchStatus: 'FULL',
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

describe('getPreMatch action', () => {
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
    Store.dispatch(getStats({}, d => d)).then(() => {
      expect(Store.getState().page.data.widgets[0].extraData).not.toBeDefined();
      done();
    });
  });
  it('should set Widget ExtraData error with wrong respose from API', (done) => {
    Store.dispatch(setPageData(pageData));
    fetchSportApi.mockReturnValueOnce({});
    Store.dispatch(getStats(data, mockExtractor)).then(() => {
      expect(Store.getState().page.data.widgets[0].extraData).toHaveProperty('error');
      done();
    });
  });
  it('should set Widget ExtraData error with empty respose from API', (done) => {
    Store.dispatch(setPageData(pageData));
    fetchSportApi.mockReturnValueOnce(null);
    Store.dispatch(getStats(data, mockExtractor)).then(() => {
      expect(Store.getState().page.data.widgets[0].extraData).toHaveProperty('error', true);
      done();
    });
  });
  it('should set Widget ExtraData error response from API ', (done) => {
    const error = new Error('Not Found');
    Store.dispatch(setPageData(pageData));
    fetchSportApi.mockReturnValueOnce(Promise.reject(error));
    Store.dispatch(getStats(data, mockExtractor)).then(() => {
      expect(Store.getState().page.data.widgets[0].extraData).toHaveProperty('error', error);
      done();
    });
  });
  it('should set Widget ExtraData error from client side fetch', (done) => {
    const error = { response: { status: 404 } };
    Store.dispatch(setPageData(pageData));
    fetchSportApi.mockReturnValueOnce(Promise.reject(error));
    Store.dispatch(getStats(data, mockExtractor)).then(() => {
      expect(Store.getState().page.data.widgets[0].extraData).toHaveProperty('error', error);
      done();
    });
  });
  it('should set Widget ExtraData in state', (done) => {
    Store.dispatch(setPageData(pageData));
    expect.assertions(1);
    Store.dispatch(getStats(data, mockExtractor)).then(() => {
      expect(Store.getState().page.data.widgets[0].extraData).toBeDefined();
      done();
    });
  });
});
