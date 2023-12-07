import Store from '../../store';
import getMatches from './matches-actions';
import * as pageActions from '../page-actions';
import { cloneDeep } from '../../../utils/helpers';
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
const mockExtractor = data => ({
  events: data['sports-content'],
});

// Mock data
const teamData = {
  settings: {
    uid: 2,
    soccerTeamSeason: {
      teamId: '25',
      soccerCompetitionSeason: {
        seasonId: '2017',
      },
    },
  },
};
const competitionData = {
  settings: {
    uid: 2,
    highlightedCompetitionSeasons: [
      {
        seasonId: '2017',
        soccerCompetition: {
          id: '199',
        },
      },
    ],
  },
};
const pageData = {
  data: {
    widgets: [
      {
        settings: {
          uid: 2,
        },
      },
      {
        settings: {
          uid: 4,
        },
      },
    ],
  },
};

jest.mock('../../../utils/api/fetchApi', () => ({
  fetchSportApi: mockReturnValue({ 'sports-content': [{ id: 1 }] }),
}));

describe('getMatches action', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    fetchSportApi.mockClear();
    Store.dispatch(pageActions.default(pageData));
  });

  afterAll(() => {
    fetchSportApi.mockReset();
    jest.restoreAllMocks();
  });

  it('should not set Widget ExtraData if not have right data from API', (done) => {
    fetchSportApi.mockReturnValueOnce({});
    Store.dispatch(getMatches({}, mockExtractor)).then(() => {
      expect(Store.getState().page.data.widgets[0].extraData).not.toBeDefined();
      expect(fetchSportApi).toHaveBeenLastCalledWith(expect.objectContaining({
        uri: '/v1/schedule-results/soccer',
        params: expect.objectContaining({
          sort: expect.any(String),
        }),
      }));
      done();
    });
  });

  it('should not set Widget ExtraData if not have right extractor', (done) => {
    Store.dispatch(getMatches(teamData, () => {})).then(() => {
      expect(Store.getState().page.data.widgets[0].extraData).toBeDefined();
      expect(fetchSportApi).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('should set Widget ExtraData error with wrong respose from API', (done) => {
    fetchSportApi.mockReturnValueOnce({});
    Store.dispatch(getMatches(teamData, mockExtractor)).then(() => {
      expect(Store.getState().page.data.widgets[0].extraData).toHaveProperty('error');
      done();
    });
  });

  it('should set Widget ExtraData error with empty respose from API', (done) => {
    fetchSportApi.mockReturnValueOnce(null);
    Store.dispatch(getMatches(teamData, mockExtractor)).then(() => {
      expect(Store.getState().page.data.widgets[0].extraData).toHaveProperty('error', true);
      done();
    });
  });

  it('should set Widget ExtraData error response from API ', (done) => {
    const error = new Error('Not Found');

    fetchSportApi.mockReturnValueOnce(Promise.reject(error));
    Store.dispatch(getMatches(teamData, mockExtractor)).then(() => {
      expect(Store.getState().page.data.widgets[0].extraData).toHaveProperty('error', error);
      done();
    });
  });

  it('should set Widget ExtraData error from client side fetch', (done) => {
    const error = { response: { status: 400 } };

    fetchSportApi.mockReturnValueOnce(Promise.reject(error));
    Store.dispatch(getMatches(teamData, mockExtractor)).then(() => {
      expect(Store.getState().page.data.widgets[0].extraData).toHaveProperty('error', error);
      done();
    });
  });

  it('should set Widget ExtraData in state to team', (done) => {
    Store.dispatch(getMatches(teamData, mockExtractor)).then(() => {
      expect(Store.getState().page.data.widgets[0].extraData).toBeDefined();
      expect(fetchSportApi).toHaveBeenLastCalledWith(expect.objectContaining({
        params: expect.objectContaining({
          teamKey: '25',
        }),
      }));
      done();
    });
  });

  it('should set Widget ExtraData in state to competition', (done) => {
    Store.dispatch(getMatches(competitionData, mockExtractor)).then(() => {
      expect(Store.getState().page.data.widgets[0].extraData).toBeDefined();
      expect(fetchSportApi).toHaveBeenLastCalledWith(expect.objectContaining({
        params: expect.objectContaining({
          competitionKey: '199',
        }),
      }));
      done();
    });
  });

  it('should set Widget ExtraData in state with custom query data', (done) => {
    Store.dispatch(getMatches(competitionData, mockExtractor, { teamKey: '3' })).then(() => {
      expect(Store.getState().page.data.widgets[0].extraData).toBeDefined();
      expect(fetchSportApi).toHaveBeenLastCalledWith(expect.objectContaining({
        params: expect.objectContaining({
          teamKey: '3',
        }),
      }));
      done();
    });
  });

  it('should set Widget ExtraData in state with default query sorted ASC', (done) => {
    const today = new Date();

    Store.dispatch(getMatches(competitionData, mockExtractor, { competitionKey: '120' })).then(() => {
      today.setHours(0, 0, 0, 0);

      expect(Store.getState().page.data.widgets[0].extraData).toBeDefined();
      expect(fetchSportApi).toHaveBeenLastCalledWith(expect.objectContaining({
        uri: '/v1/schedule-results/soccer',
        params: {
          competitionKey: '120',
          limit: 6,
          sort: 'start-date-time-asc',
          startDate: today.toISOString(),
        },
      }));
      done();
    });
  });

  it('should set Widget ExtraData in state with default query sorted DESC', (done) => {
    const today = new Date();
    const competitionDesc = cloneDeep(competitionData);
    const matches = {
      events: [
        { id: 1, date: new Date() },
        { id: 2, date: new Date() }],
      direction: 'next',
    };
    competitionDesc.settings.sort = 'date-desc';
    Store.dispatch(getMatches(competitionDesc, mockExtractor, { competitionKey: '120' }, matches)).then(() => {
      today.setHours(0, 0, 0, 0);

      expect(Store.getState().page.data.widgets[0].extraData).toBeDefined();
      expect(fetchSportApi).toHaveBeenLastCalledWith(expect.objectContaining({
        uri: '/v1/schedule-results/soccer',
        params: {
          competitionKey: '120',
          limit: 6,
          sort: 'start-date-time-desc',
          endDate: today.toISOString(),
        },
      }));
      done();
    });
  });

  it('should set Widget ExtraData in state with extra query data to displayType Full', (done) => {
    const competitionSection = cloneDeep(competitionData);
    const today = new Date();

    competitionSection.settings.displayType = {
      value: 'Full',
    };
    Store.dispatch(getMatches(competitionSection, mockExtractor, { teamKey: '3', date: today })).then(() => {
      today.setDate(today.getDate() - 1);
      today.setHours(0, 0, 0, 0);

      expect(Store.getState().page.data.widgets[0].extraData).toBeDefined();
      expect(fetchSportApi).toHaveBeenLastCalledWith(expect.objectContaining({
        params: {
          limit: 50,
          sort: 'start-date-time-asc',
          startDate: today.toISOString(),
          teamKey: '3',
        },
      }));
      done();
    });
  });

  it('should set Widget ExtraData with "prev" paging data', (done) => {
    const matches = {
      events: [
        { id: 1, date: new Date() },
        { id: 2, date: new Date() }],
      direction: 'prev',
    };
    const response = {
      'sports-content': [{ id: 1 }],
    };
    fetchSportApi.mockReturnValueOnce(response);
    Store.dispatch(getMatches(competitionData, mockExtractor, { teamKey: '3' }, matches)).then(() => {
      const { extraData } = Store.getState().page.data.widgets[0];

      expect(extraData).toBeDefined();
      expect(extraData.events).toHaveLength(2);
      done();
    });
  });

  it('should set Widget ExtraData with "next" paging data', (done) => {
    const matches = {
      events: [
        { id: 1, date: new Date() },
        { id: 2, date: new Date() }],
      direction: 'next',
    };
    Store.dispatch(getMatches(competitionData, mockExtractor, { teamKey: '3' }, matches)).then(() => {
      const { extraData } = Store.getState().page.data.widgets[0];

      expect(extraData).toBeDefined();
      expect(extraData.events).toHaveLength(2);
      done();
    });
  });

  it(
    'should set Widget ExtraData as last page when is status is not found and have "next" and have prevData',
    (done) => {
      const matches = {
        events: [
          { id: 1, date: new Date() },
          { id: 2, date: new Date() }],
        direction: 'next',
      };
      fetchSportApi.mockReturnValueOnce(Promise.resolve({ statusText: messages.NOT_FOUND }));
      Store.dispatch(getMatches(competitionData, mockExtractor, { teamKey: '3' }, matches)).then(() => {
        const { extraData } = Store.getState().page.data.widgets[0];
        expect(extraData).toBeDefined();
        expect(extraData.events).toHaveLength(2);
        expect(extraData.paging).toEqual({ next: { last: true } });
        done();
      });
    }
  );

  it('should set Widget ExtraData as last page when is 404 and have "next" and have prevData', (done) => {
    const error = { response: { status: 404 } };
    const matches = {
      events: [
        { id: 1, date: new Date() },
        { id: 2, date: new Date() }],
      direction: 'next',
    };
    fetchSportApi.mockReturnValueOnce(Promise.reject(error));
    Store.dispatch(getMatches(competitionData, mockExtractor, { teamKey: '3' }, matches)).then(() => {
      const { extraData } = Store.getState().page.data.widgets[0];
      expect(extraData).toBeDefined();
      expect(extraData.events).toHaveLength(2);
      expect(extraData.paging).toEqual({ next: { last: true } });
      done();
    });
  });

  it('should set Widget ExtraData as last page when is 404 and have "prev" and have prevData', (done) => {
    const error = { response: { status: 404 } };
    const matches = {
      events: [
        { id: 1, date: new Date() },
        { id: 2, date: new Date() }],
      direction: 'prev',
    };
    fetchSportApi.mockReturnValueOnce(Promise.reject(error));
    Store.dispatch(getMatches(competitionData, mockExtractor, { teamKey: '3' }, matches)).then(() => {
      const { extraData } = Store.getState().page.data.widgets[0];

      expect(extraData).toBeDefined();
      expect(extraData.events).toHaveLength(2);
      expect(extraData.paging).toEqual({ prev: { last: true } });
      done();
    });
  });

  it('should set Widget ExtraData as last page when is 404', (done) => {
    const error = { response: { status: 404 } };
    fetchSportApi.mockReturnValueOnce(Promise.reject(error));
    Store.dispatch(getMatches(competitionData, mockExtractor)).then(() => {
      const { extraData } = Store.getState().page.data.widgets[0];

      expect(extraData).toBeDefined();
      expect(extraData.events).toHaveLength(0);
      expect(extraData.paging).toEqual({ next: { last: true } });
      done();
    });
  });

  it('should make second call if "fallbackPrev" is true and the response is "NOT_FOUND"', (done) => {
    const data = { statusText: messages.NOT_FOUND };
    const setWidgetExtraDataSpy = jest.spyOn(pageActions, 'setWidgetExtraData');
    fetchSportApi.mockReturnValueOnce(Promise.resolve(data));
    Store.dispatch(getMatches(competitionData, mockExtractor, null, {
      fallbackPrev: true,
    })).then(() => {
      const { extraData } = Store.getState().page.data.widgets[0];
      expect(extraData).toBeDefined();
      expect(extraData.events).toHaveLength(1);
      expect(extraData.showLast).toBe(true);
      expect(setWidgetExtraDataSpy).toHaveBeenLastCalledWith(2, expect.any(Object));
      done();
    });
  });

  it('should set Widget ExtraData in state witn default query to displayType Full in SSR', (done) => {
    delete global.window;
    const competitionSection = cloneDeep(competitionData);

    competitionSection.settings.displayType = {
      value: 'Full',
    };
    Store.dispatch(getMatches(competitionSection, mockExtractor)).then(() => {
      expect(Store.getState().page.data.widgets[0].extraData).toBeDefined();
      expect(fetchSportApi).toHaveBeenLastCalledWith(expect.objectContaining({
        params: {
          competitionKey: '199',
          seasonKey: '2017',
          limit: 10,
          sort: 'start-date-time-asc',
          startDate: expect.any(String),
        },
      }));
      done();
    });
  });

  it('should set Widget ExtraData with MX', (done) => {
    delete global.window;
    const competitionSection = {
      ...cloneDeep(competitionData),
      widgetContext: {
        isWorldCupMVP: true,
      },
    };

    const mockData = {
      ...pageData,
      userLocation: 'MX',
    };

    competitionSection.settings.displayType = {
      value: 'Full',
    };

    Store.dispatch(pageActions.default(mockData));
    Store.dispatch(getMatches(competitionSection, mockExtractor)).then(() => {
      expect(Store.getState().page.data.widgets[0].extraData).toBeDefined();
      expect(fetchSportApi).toHaveBeenLastCalledWith(expect.objectContaining({
        params: {
          competitionKey: '199',
          seasonKey: '2017',
          limit: 10,
          sort: 'start-date-time-asc',
          startDate: expect.any(String),
        },
      }));
      done();
    });
  });

  it('should change the limit for world cup', (done) => {
    delete global.window;
    const worldCupCompetition = cloneDeep(competitionData);
    worldCupCompetition.settings.highlightedCompetitionSeasons[0].soccerCompetition.id = '4';
    const competitionSection = {
      ...worldCupCompetition,
      widgetContext: {
        isWorldCupMVP: true,
      },
    };

    competitionSection.settings.displayType = {
      name: 'COLLAPSED',
    };

    Store.dispatch(getMatches(competitionSection, mockExtractor)).then(() => {
      expect(Store.getState().page.data.widgets[0].extraData).toBeDefined();
      expect(fetchSportApi).toHaveBeenLastCalledWith(expect.objectContaining({
        params: {
          competitionKey: '4',
          seasonKey: '2017',
          limit: 200,
          sort: 'start-date-time-asc',
          startDate: expect.any(String),
        },
      }));
      done();
    });
  });
});
