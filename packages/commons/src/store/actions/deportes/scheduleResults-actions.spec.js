import configureStore from '../../configureStore';
import * as VideoUtils from '../../../utils/video';
import { fetchSportApi } from '../../../utils/api/fetchApi';
import setPageData from '../page-actions';
import getScheduleEvent from './scheduleResults-actions';

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
const matchData = {
  settings: {
    uid: 2,
    matchId: '919268',
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
        contents: [
          {
            uid: 1,
          },
        ],
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

describe('getScheduleEvent action', () => {
  beforeEach(() => {
    fetchSportApi.mockClear();
  });

  afterAll(() => {
    fetchSportApi.mockReset();
  });

  it('should not set Widget ExtraData if not have right widget settings', (done) => {
    store.dispatch(setPageData(pageData));
    store.dispatch(getScheduleEvent({}, mockExtractor)).then(() => {
      const callArgs = fetchSportApi.mock.calls;

      expect(store.getState().page.data.widgets[0].extraData).toBeUndefined();
      expect(callArgs[0]).toBeUndefined();
      done();
    });
  });

  it('should set Widget ExtraData error if not have required parameters', (done) => {
    store.dispatch(setPageData(pageData));
    store.dispatch(getScheduleEvent({ settings: { uid: 2 } }, mockExtractor)).then(() => {
      const callArgs = fetchSportApi.mock.calls;
      const { extraData } = store.getState().page.data.widgets[0];

      expect(extraData).toHaveProperty('error', new Error('Missing required params'));
      expect(callArgs[0]).toBeUndefined();
      done();
    });
  });

  it('should set Widget ExtraData with the soccer event data', (done) => {
    const response = {
      'sports-content': { key: 1 },
    };

    fetchSportApi.mockReturnValueOnce(response);
    store.dispatch(setPageData(pageData));
    store.dispatch(getScheduleEvent(matchData, mockExtractor)).then(() => {
      const callArgs = fetchSportApi.mock.calls;
      const { extraData } = store.getState().page.data.widgets[0];

      expect(extraData).toBeDefined();
      expect(extraData).toEqual({ key: 1 });
      expect(callArgs[0][0].uri).toBe('/v1/schedule-results/soccer/919268');
      done();
    });
  });

  it('should set Widget ExtraData with the soccer event data inside content', (done) => {
    const response = {
      'sports-content': { key: 1 },
    };
    const options = {
      insertInContent: true, contentId: 1, widgetId: 2,
    };
    fetchSportApi.mockReturnValueOnce(response);
    store.dispatch(setPageData(pageData));
    store.dispatch(getScheduleEvent(matchData, mockExtractor, '919268', options)).then(() => {
      const callArgs = fetchSportApi.mock.calls;
      const { extraData } = store.getState().page.data.widgets[0].contents[0];

      expect(extraData).toBeDefined();
      expect(extraData).toEqual({ key: 1 });
      expect(callArgs[0][0].uri).toBe('/v1/schedule-results/soccer/919268');
      done();
    });
  });

  it('should not set Widget ExtraData with the soccer event data if contents do not exist', (done) => {
    const response = {
      'sports-content': { key: 1 },
    };
    const options = {
      insertInContent: true, contentId: 1, widgetId: 4,
    };
    fetchSportApi.mockReturnValueOnce(response);
    store.dispatch(setPageData(pageData));
    store.dispatch(getScheduleEvent(matchData, mockExtractor, '919268', options)).then(() => {
      const callArgs = fetchSportApi.mock.calls;
      const { settings } = store.getState().page.data.widgets[1];
      expect(settings).toEqual(expect.objectContaining({ contentId: 1 }));
      expect(callArgs[0][0].uri).toBe('/v1/schedule-results/soccer/919268');
      done();
    });
  });

  it('should set Widget ExtraData error with wrong respose from API', (done) => {
    store.dispatch(setPageData(pageData));
    fetchSportApi.mockReturnValueOnce({});
    store.dispatch(getScheduleEvent(matchData, mockExtractor)).then(() => {
      const { extraData } = store.getState().page.data.widgets[0];

      expect(extraData).toHaveProperty('error');
      done();
    });
  });

  it('should set Widget ExtraData error with empty respose from API', (done) => {
    store.dispatch(setPageData(pageData));
    fetchSportApi.mockReturnValueOnce(null);
    store.dispatch(getScheduleEvent(matchData, mockExtractor)).then(() => {
      const { extraData } = store.getState().page.data.widgets[0];

      expect(extraData).toHaveProperty('error', true);
      done();
    });
  });

  it('should set Widget ExtraData error response from API ', (done) => {
    const error = new Error('Not Found');
    store.dispatch(setPageData(pageData));
    fetchSportApi.mockReturnValueOnce(Promise.reject(error));
    store.dispatch(getScheduleEvent(matchData, mockExtractor)).then(() => {
      const { extraData } = store.getState().page.data.widgets[0];

      expect(extraData).toHaveProperty('error', error);
      done();
    });
  });

  it('should set Widget ExtraData error from client side fetch', (done) => {
    const error = { response: { status: 400 } };
    store.dispatch(setPageData(pageData));
    fetchSportApi.mockReturnValueOnce(Promise.reject(error));
    store.dispatch(getScheduleEvent(matchData, mockExtractor)).then(() => {
      const { extraData } = store.getState().page.data.widgets[0];

      expect(extraData).toHaveProperty('error', error);
      done();
    });
  });

  it('should set Widget ExtraData error if not have required parameters from bex', (done) => {
    store.dispatch(setPageData(pageData));
    store.dispatch(getScheduleEvent(
      { settings: { uid: 2 } },
      mockExtractor,
      null,
    )).then(() => {
      const callArgs = fetchSportApi.mock.calls;
      const { extraData } = store.getState().page.data.widgets[0];

      expect(extraData).toHaveProperty('error', new Error('Missing required params'));
      expect(callArgs[0]).toBeUndefined();
      done();
    });
  });

  it('should set Widget ExtraData from bex if no match id', (done) => {
    const soccerData = {
      data: {
        'sports-content': { key: 1 },
        soccerCompetitionSeason: {
          home: {
            name: 'test',
          },
        },
        widgets: [
          {
            settings:
              {
                uid: 2,
              },
            contents: [
              {
                uid: 1,
              },
            ],
          },
        ],
      },
    };
    store.dispatch(setPageData(soccerData));
    store.dispatch(getScheduleEvent(
      { settings: { uid: 2 } },
      mockExtractor,
      null,
    )).then(() => {
      const { extraData } = store.getState().page.data.widgets[0];

      expect(extraData).toBeDefined();
      expect(extraData).toEqual({ key: 1 });
      done();
    });
  });

  it('should set Widget ExtraData with broadcast event status if user location is mx', (done) => {
    const soccerDataMx = {
      data: {
        'sports-content': { key: 1 },
        soccerCompetitionSeason: {
          home: {
            name: 'test',
          },
        },
        widgets: [
          {
            settings:
              {
                uid: 2,
              },
            contents: [
              {
                uid: 1,
              },
            ],
          },
        ],
        uid: 'test',
        broadcastEvent: {
          playerState: 'ON',
        },
      },
      userLocation: 'MX'
    };

    const mockCheckMatchStatus = jest.fn((eventId, cb) => cb({ broadcastStatus: 'ON' }));
    jest.spyOn(VideoUtils, 'checkMatchStatus').mockImplementation(mockCheckMatchStatus);
    store.dispatch(setPageData(soccerDataMx));
    store.dispatch(getScheduleEvent(
      { settings: { uid: 2 } },
      mockExtractor,
      null,
    )).then(() => {
      const { extraData } = store.getState().page.data.widgets[0];

      expect(extraData).toBeDefined();
      expect(extraData).toEqual({ key: 1, status: 'live' });
      done();
    });
  });

  it('should set Widget ExtraData with post status when the broadcast event status is not defined', (done) => {
    const soccerDataMx = {
      data: {
        'sports-content': { key: 1 },
        soccerCompetitionSeason: {
          home: {
            name: 'test',
          },
        },
        widgets: [
          {
            settings:
              {
                uid: 2,
              },
            contents: [
              {
                uid: 1,
              },
            ],
          },
        ],
        uid: 'test',
        broadcastEvent: {
          playerState: 'ON',
        },
      },
      userLocation: 'MX'
    };

    const mockCheckMatchStatus = jest.fn((eventId, cb) => cb({ broadcastStatus: '' }));
    jest.spyOn(VideoUtils, 'checkMatchStatus').mockImplementation(mockCheckMatchStatus);

    store.dispatch(setPageData(soccerDataMx));
    store.dispatch(getScheduleEvent(
      { settings: { uid: 2 } },
      mockExtractor,
      null,
    )).then(() => {
      const { extraData } = store.getState().page.data.widgets[0];

      expect(extraData).toBeDefined();
      expect(extraData).toEqual({ key: 1, status: 'post' });
      done();
    });
  });
});
