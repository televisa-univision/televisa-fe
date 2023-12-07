import Store from '../../store';
import getEvents from './events-actions';
import setPageData from '../page-actions';
import { fetchSportApi } from '../../../utils/api/fetchApi';

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
    matchId: 123
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

/**
 * helper to test catch error
 */
function wrongExtractor() {
  throw new Error({
    response: {
      status: 'Wrong extractor'
    }
  });
}

describe('getEvents action', () => {
  it('should not set Widget ExtraData if not right data from API', (done) => {
    Store.dispatch(setPageData(pageData));
    expect.assertions(1);
    fetchSportApi.mockReturnValueOnce({
      fetchSportApi: jest.fn(() => new Promise((resolve, reject) => {
        resolve({});
        reject(new Error('something bad happened'));
      }))
    });
    Store.dispatch(getEvents({}, null)).then(() => {
      expect(Store.getState().page.data.widgets[0].extraData).not.toBeDefined();
      done();
    });
  });
  it('should set Widget ExtraData in state', () => {
    Store.dispatch(setPageData(pageData));
    expect.assertions(1);
    Store.dispatch(getEvents(data, () => (['a', 'b']))).then(() => {
      expect(Store.getState().page.data.widgets[0].extraData).toBeDefined();
    });
  });
  it('should set Widget ExtraData error with empty respose from API', (done) => {
    Store.dispatch(setPageData(pageData));
    fetchSportApi.mockReturnValueOnce(null);
    Store.dispatch(getEvents(data, () => (['a', 'b']))).then(() => {
      expect(Store.getState().page.data.widgets[0].extraData).toHaveProperty('error', true);
      done();
    });
  });
  it('should set Widget ExtraData error if not array from extractor', (done) => {
    Store.dispatch(setPageData(pageData));
    Store.dispatch(getEvents(data, () => null)).then(() => {
      expect(Store.getState().page.data.widgets[0].extraData).toHaveProperty('error', true);
      done();
    });
  });
  it('should set extra data with limit for SSR', (done) => {
    delete global.window;
    Store.dispatch(setPageData(pageData));
    Store.dispatch(getEvents(
      data,
      () => (Array.from(new Array(20), (val, index) => index + 1))
    )).then(() => {
      expect(Store.getState().page.data.widgets[0].extraData.events.length).toBe(10);
      done();
    });
  });
  it('should catch error', (done) => {
    Store.dispatch(setPageData(pageData));
    Store.dispatch(getEvents(data, wrongExtractor)).then(() => {
      expect(Store.getState().page.data.widgets[0].extraData).toHaveProperty('error');
      done();
    });
  });
});
