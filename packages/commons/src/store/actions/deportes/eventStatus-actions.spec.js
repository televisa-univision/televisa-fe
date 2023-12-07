import configureStore from '../../configureStore';
import getEventStatus from './eventsStatus-actions';
import setPageData from '../page-actions';
import fetchApi, { fetchSportApi } from '../../../utils/api/fetchApi';
import * as clientLogging from '../../../utils/logging/clientLogging';
import promiseMock from '../../../utils/jest/helpers';

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
 * Helper to set the api data
 * @param {string} status of the match
 * @returns {{sports-content: {sports-event: {event-metadata: {event-status: *}}}}}
 */
function mockApiData(status) {
  return {
    'sports-content': {
      schedule: [{
        'sports-event': [{
          'event-metadata': {
            'event-status': status,
          },
        }],
      }],
    },
  };
}

/**
 * Helper to set the api syndicator data
 * @param {string} streamEnd of the match
 * @returns {{streamEndTime: *}}
 */
function mockSyndicatorData(streamEnd) {
  return {
    streamEndTime: streamEnd,
    streamStartTime: '20:00',
  };
}

/**
 * Mock extractor response
 * @param {string} optaStatus - match status with opta format
 * @param {string} cmsStatus - match status with BEX format
 */
function getExtractor(optaStatus = 'mid-event', cmsStatus = 'LIVE') {
  return () => ({ optaStatus, cmsStatus });
}

jest.useFakeTimers();
jest.mock(
  '../../../utils/api/fetchApi',
  () => ({
    __esModule: true,
    default: mockReturnValue(mockSyndicatorData('22:00')),
    fetchSportApi: mockReturnValue(mockApiData('mid-event')),
  })
);

const getWidgetsMap = jest.fn(() => [{
  type: 'testWidget', settings: { uid: 1 },
}, {
  type: 'testWidget2', settings: { uid: 2 },
}]);

const pageData = {
  pageCategory: 'soccermatch-pre',
  data: {
    matchId: 123,
    soccerMatchStatus: 'PRE-MATCH',
  },
};

let loggerSpy;

describe('getEventStatus action', () => {
  beforeEach(() => {
    loggerSpy = jest.spyOn(clientLogging, 'clientLevelLogging').mockImplementation(() => jest.fn());
  });
  afterEach(() => {
    store.dispatch(setPageData(pageData));
    fetchSportApi.mockClear();
  });
  afterAll(() => {
    fetchSportApi.mockReset();
  });
  it('should not set soccermatch status if have bad response', (done) => {
    store.dispatch(setPageData({}));
    fetchSportApi.mockReturnValue({});
    store.dispatch(getEventStatus(getWidgetsMap)).then(() => {
      expect(store.getState().page).toEqual({});
      done();
    });
  });
  it('should return API status if extractor return empty', (done) => {
    /**
     * Empty extractor test
     */
    const extractor = () => {};
    store.dispatch(setPageData({}));
    fetchSportApi.mockReturnValue({});
    store.dispatch(getEventStatus(getWidgetsMap, extractor)).then(() => {
      const pageState = store.getState();
      expect(pageState.page.pageCategory).toBe('soccermatch-pre');
      expect(pageState.page.data.soccerMatchStatus).toBe('PRE-MATCH');
      done();
    });
  });
  it('should set soccermatch status if response status is different form page status', (done) => {
    const extractor = getExtractor();
    store.dispatch(setPageData(pageData));
    fetchSportApi.mockReturnValue(mockApiData('mid-event'));
    store.dispatch(getEventStatus(getWidgetsMap, extractor)).then(() => {
      const pageState = store.getState();
      expect(pageState.page.pageCategory).toBe('soccermatch-mid');
      expect(pageState.page.data.soccerMatchStatus).toBe('LIVE');
      expect(pageState.page.data.eventStatus).toBe('mid-event');
      done();
    });
  });
  it('should set soccermatch status live if has flag to force live', (done) => {
    const extractor = getExtractor('post-event', 'FULL');
    store.dispatch(setPageData({
      ...pageData,
      requestParams: { enableSoccerGame: 'active' },
    }));
    fetchSportApi.mockReturnValue(mockApiData('post-event'));
    store.dispatch(getEventStatus(getWidgetsMap, extractor)).then(() => {
      const pageState = store.getState();
      expect(pageState.page.pageCategory).toBe('soccermatch-mid');
      expect(pageState.page.data.soccerMatchStatus).toBe('LIVE');
      expect(pageState.page.data.eventStatus).toBe('mid-event');
      done();
      store.dispatch(setPageData({ requestParams: null }));
    });
  });
  it('should not set soccermatch status if response status is the same form page status', (done) => {
    const extractor = getExtractor('pre-event', 'PRE-MATCH');
    store.dispatch(setPageData(pageData));
    fetchSportApi.mockReturnValue(mockApiData('pre-event'));
    store.dispatch(getEventStatus(getWidgetsMap, extractor)).then(() => {
      const pageState = store.getState();
      expect(pageState.page.pageCategory).toBe('soccermatch-pre');
      expect(pageState.page.data.soccerMatchStatus).toBe('PRE-MATCH');
      expect(pageState.page.data.eventStatus).toBe('pre-event');
      done();
    });
  });
  it('should not not fetch sports data if not have valid match Id or is a non-opta game', (done) => {
    const extractor = getExtractor();
    const nonOptaPageData = {
      ...pageData,
      data: {
        ...pageData.data,
        matchId: null,
      },
    };
    store.dispatch(setPageData(nonOptaPageData));
    store.dispatch(getEventStatus(getWidgetsMap, extractor)).then(() => {
      const pageState = store.getState();
      expect(fetchSportApi).not.toHaveBeenCalled();
      expect(fetchApi).toHaveBeenCalled();
      expect(pageState.page.pageCategory).toBe('soccermatch-mid');
      expect(pageState.page.data.soccerMatchStatus).toBe('LIVE');
      expect(pageState.page.data.eventStatus).toBe('mid-event');
      expect(pageState.page.data.streamEndTime).toBe('22:00');
      expect(pageState.page.data.streamStartTime).toBe('20:00');
      done();
    });
  });
  it('should keep the previous widget data when set soccermatch status', (done) => {
    const widgetData = { type: 'testWidget', settings: { uid: 1 }, extraData: { status: 'test' } };
    store.dispatch(setPageData({
      ...pageData,
      data: {
        test: 'value',
        ...pageData.data,
        widgets: [widgetData],
      },
    }));
    fetchSportApi.mockReturnValue(mockApiData('post-event'));
    store.dispatch(getEventStatus(getWidgetsMap)).then(() => {
      const pageState = store.getState();
      expect(pageState.page.data.widgets).toHaveLength(1);
      expect(pageState.page.data.widgets[0]).toHaveProperty('extraData', widgetData.extraData);
      done();
    });
    store.dispatch(getEventStatus('test')).then(() => {
      const pageState = store.getState();
      expect(pageState.page.data.widgets).toHaveLength(1);
      expect(pageState.page.data.widgets[0]).toHaveProperty('extraData', widgetData.extraData);
      done();
    });
  });
  it('should keep the previous widget data when set soccermatch status', (done) => {
    const extractor = getExtractor();
    const widgetData = { type: 'testWidget', settings: { uid: 1 }, extraData: { status: 'test' } };
    store.dispatch(setPageData({
      ...pageData,
      data: {
        ...pageData.data,
        widgets: [widgetData],
      },
    }));
    fetchSportApi.mockReturnValue(mockApiData('post-event'));
    store.dispatch(getEventStatus(getWidgetsMap, extractor)).then(() => {
      const pageState = store.getState();
      expect(pageState.page.data.widgets).toHaveLength(2);
      expect(pageState.page.data.widgets[0]).toHaveProperty('extraData', widgetData.extraData);
      done();
    });
  });
  it('should not call getWidgetsMap if its not a function', (done) => {
    const extractor = getExtractor();
    store.dispatch(setPageData({ pageCategory: 'soccermatch-pre' }));
    fetchSportApi.mockReturnValue(mockApiData('post-event'));
    store.dispatch(getEventStatus('Not Function', extractor)).then(() => {
      const pageState = store.getState();
      expect(pageState.page.data.widgets).toHaveLength(0);
      done();
    });
  });
  it('should catch fetch api/sports error when is thrown', async () => {
    fetchApi.mockReturnValue(promiseMock({
      reject: new Error('test'),
    }));
    const extractor = getExtractor();
    const nonOptaPageData = {
      ...pageData,
      data: {
        ...pageData.data,
        matchId: null,
      },
    };
    jest.runAllTimers();
    try {
      store.dispatch(setPageData(nonOptaPageData));
      await store.dispatch(getEventStatus(getWidgetsMap, extractor));
    } catch (err) {
      expect(err.message).toEqual('test');
      expect(loggerSpy).toHaveBeenCalled();
    }
  });
});
