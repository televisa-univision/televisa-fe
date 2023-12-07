import configureStore from '../../configureStore';
import createGetSoccerLiveEventsAction from './soccerlive-actions';
import setPageData from '../page-actions';
import { fetchSportApi } from '../../../utils/api/fetchApi';
import MatchesSettings from '../../../config/data/tudn/soccerLiveSettings.json';

const store = configureStore();

/**
 * Mock for extractor
 * @param {Object} data - the response data
 * @returns {Array}
 */
const mockExtractor = data => ({
  events: data['sports-content'],
});

const settings = {
  uid: 2,
};

const pageData = {
  data: {
    widgets: [{ settings }],
  },
};

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

jest.mock('../../../utils/api/fetchApi', () => ({
  fetchSportApi: mockReturnValue({ 'sports-content': [{ id: 1 }] }),
}));

/**
 * Dispatches getSoccerLiveEventAction and run expect function
 * @param {runExpect} runExpect - function running the whole expects.
 * @param {extractor} extractor - Extractor function
 */
const dispatchGetSoccerLiveEventsAction = (runExpect, extractor = mockExtractor) => {
  const getSoccerLiveEventsAction = createGetSoccerLiveEventsAction({ settings }, extractor);
  store.dispatch(getSoccerLiveEventsAction).then(runExpect);
};

describe('envivo action', () => {
  beforeEach(() => {
    fetchSportApi.mockReset();
    store.dispatch(setPageData(pageData));
  });

  afterAll(() => {
    fetchSportApi.mockReset();
  });

  it('should create an async action dispatcher function', () => {
    const getSoccerLiveEventsAction = createGetSoccerLiveEventsAction({ settings }, mockExtractor);
    expect(getSoccerLiveEventsAction).toBeInstanceOf(Function);
  });

  it('should looks for events two days forward', (done) => {
    const getSoccerLiveEventsAction = createGetSoccerLiveEventsAction({ settings }, mockExtractor);

    fetchSportApi.mockReturnValue({ 'sports-content': [] });
    store.dispatch(getSoccerLiveEventsAction).then(() => {
      const startDate = new Date();
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + 1);
      startDate.setHours(5, 0, 0);
      endDate.setHours(4, 59, 59);
      expect(fetchSportApi).toBeCalledTimes(3);
      done();
    });
  });

  it('should looks for events with isWorldCupMVP', (done) => {
    const widgetContext = {
      isWorldCupMVP: true,
    };
    const getSoccerLiveEventsAction = createGetSoccerLiveEventsAction(
      { settings, widgetContext },
      mockExtractor
    );
    fetchSportApi.mockReturnValue({ 'sports-content': [] });
    store.dispatch(getSoccerLiveEventsAction).then(() => {
      const startDate = new Date();
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + 5);
      startDate.setHours(5, 0, 0);
      endDate.setHours(4, 59, 59);
      expect(fetchSportApi).toBeCalledTimes(3);
      done();
    });
  });

  it('should call the api once when is not client', (done) => {
    delete global.window;
    const getSoccerLiveEventsAction = createGetSoccerLiveEventsAction({ settings }, mockExtractor);

    fetchSportApi.mockReturnValue({ 'sports-content': [] });
    store.dispatch(getSoccerLiveEventsAction).then(() => {
      const startDate = new Date();
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + 1);
      startDate.setHours(5, 0, 0);
      endDate.setHours(4, 59, 59);
      expect(fetchSportApi).toBeCalledTimes(1);
      done();
    });
  });

  it('should resolve empty data when api call returns ', (done) => {
    const getSoccerLiveEventsAction = createGetSoccerLiveEventsAction({ settings }, mockExtractor);

    fetchSportApi.mockReturnValue({ });
    store.dispatch(getSoccerLiveEventsAction).then(() => {
      expect(store.getState().page.data.widgets[0].extraData).toHaveProperty('events', []);
      done();
    });
  });

  it('should resolve empty data when api call returns and is not client', (done) => {
    const getSoccerLiveEventsAction = createGetSoccerLiveEventsAction({ settings }, mockExtractor);
    fetchSportApi.mockReturnValue({});
    store.dispatch(getSoccerLiveEventsAction).then(() => {
      expect(store.getState().page.data.widgets[0].extraData).toHaveProperty('events', []);
      done();
    });
  });

  it('should mutate the state attaching data to the widget', (done) => {
    const data = {
      'sports-content': [
        {
          id: 1,
          featureEvent: true,
        },
      ],
    };

    fetchSportApi.mockReturnValueOnce(data);

    dispatchGetSoccerLiveEventsAction(() => {
      expect(store.getState().page.data.widgets[0].extraData).toHaveProperty('events');
      expect(store.getState().page.data.widgets[0].extraData.events.length).toBe(1);
      done();
    });
  });

  it('should mutate the state to set Widget ExtraData error response from API ', (done) => {
    const error = new Error('Not Found');

    fetchSportApi.mockReturnValueOnce(Promise.reject(error));

    dispatchGetSoccerLiveEventsAction(() => {
      expect(store.getState().page.data.widgets[0].extraData).toHaveProperty('error', error);
      done();
    });
  });

  it('should catch errors', (done) => {
    const error = new Error('Not Found');
    fetchSportApi.mockReturnValue(Promise.reject(error));
    dispatchGetSoccerLiveEventsAction(() => {
      expect(store.getState().page.data.widgets[0].extraData).toHaveProperty('error', error);
      done();
    });
  });

  it('should filter irrelevant error', (done) => {
    const getSoccerLiveEventsAction = createGetSoccerLiveEventsAction({ settings }, mockExtractor);

    const data = {
      'sports-content': [
        {
          id: 1,
          featureEvent: true,
        },
        {
          id: 1,
          featureEvent: false,
        },
      ],
    };

    fetchSportApi.mockReturnValue(data);
    store.dispatch(getSoccerLiveEventsAction).then(() => {
      expect(store.getState().page.data.widgets[0].extraData.events.length).toBe(1);
      done();
    });
  });
  it('should filter ievents with leagues', (done) => {
    settings.highlightedCompetitionSeasons = MatchesSettings.settings.highlightedCompetitionSeasons;
    const getSoccerLiveEventsAction = createGetSoccerLiveEventsAction({ settings }, mockExtractor);

    const data = {
      'sports-content': [
        {
          id: 1,
          featureEvent: true,
          leagueAbbreviation: 'UCL',
        },
        {
          id: 1,
          featureEvent: false,
        },
      ],
    };

    fetchSportApi.mockReturnValue(data);
    store.dispatch(getSoccerLiveEventsAction).then(() => {
      expect(store.getState().page.data.widgets[0].extraData.events.length).toBe(1);
      done();
    });
  });
});
