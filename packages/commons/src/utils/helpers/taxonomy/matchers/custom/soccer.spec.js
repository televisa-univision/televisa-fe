import {
  getMatchPageCategory,
  matchSoccerType,
  matchRoot,
  matchStatus,
  matchPath,
  // Non-taxonomy related
  getNetworkChannels,
  getMatchData,
  getGameState,
  getMCPStatus,
} from './soccer';
import features from '../../../../../config/features';

describe('getMatchPageCategory', () => {
  it('should return appropriate status if the right data passed', () => {
    expect(getMatchPageCategory('FULL')).toBe('soccermatch-post');
    expect(getMatchPageCategory('LIVE')).toBe('soccermatch-mid');
    expect(getMatchPageCategory('TEST')).toBe('soccermatch-pre');
  });
  it('should return pre by default', () => {
    expect(getMatchPageCategory(null)).toBe('soccermatch-pre');
  });
});

describe('matchSoccerType', () => {
  it('should return true if right type and path', () => {
    const key = 'soccercompetition-resultados';
    const data = {
      type: 'soccercompetition',
      uri: 'http://localhost/deportes/futbol/liga-mx-clausura/resultados',
    };
    expect(matchSoccerType('soccercompetition').match({
      data,
      key,
      path: '/deportes/futbol/liga-mx-clausura/resultados',
    })).toBe(true);
  });
  it('should return true if league section', () => {
    const key = 'soccercompetition-resultados';
    expect(matchSoccerType('soccercompetition').match({
      key,
      data: {},
      path: '/deportes/futbol/liga-mx-clausura/resultados',
    })).toBe(false);
  });
  it('should return false if not right data', () => {
    const key = 'soccerleague';
    const data = {
      type: 'section',
      competitionId: '123',
    };
    expect(matchSoccerType('soccercompetition').match({
      key,
      data,
      path: '/deportes/futbol/liga-mx',
    })).toBe(true);
  });
  it('should return false if not right data in bex for leagues', () => {
    const key = 'soccerleague';
    const data = {
      type: 'section',
      competitionId: '123',
      sectionType: 'league',
    };
    expect(matchSoccerType('soccercompetition').match({
      key,
      data,
      path: '/deportes/futbol/liga-mx',
    })).toBe(false);
  });
  it('should return false in bex for leagues', () => {
    const key = 'soccerleague';
    const data = {
      uri: '/deportes/futbol/mls',
      type: 'section',
      competitionId: '123',
      tagHierarchy: [{ uri: '/deportes/futbol/mls' }],
      sectionType: 'league',
    };
    expect(matchSoccerType('soccercompetition').match({
      key,
      data,
      path: '/deportes/futbol/mls/equipos',
    })).toBe(false);
  });
  it('should return true in bex for leagues', () => {
    const key = 'soccerleague';
    const data = {
      uri: '/deportes/futbol/mls',
      type: 'section',
      competitionId: '123',
      tagHierarchy: [{ uri: '/deportes/futbol/mls' }],
      sectionType: 'league',
    };
    expect(matchSoccerType('soccercompetition').match({
      key,
      data,
      path: '/deportes/futbol/mls',
    })).toBe(true);
  });
});

describe('matchPath', () => {
  it('should return false if path is null', () => {
    expect(matchPath(null, null, null)).toBe(false);
  });
});

describe('matchRoot', () => {
  it('should return true if right type and path', () => {
    const key = 'soccercompetition';
    const data = {
      type: 'soccercompetition',
      uri: 'http://localhost/deportes/futbol/liga-mx-clausura/',
    };
    expect(matchRoot('soccercompetition').match({
      data,
      key,
      path: '/deportes/futbol/liga-mx-clausura/',
    })).toBe(true);
  });
});

describe('matchStatus', () => {
  it('should return true if right type and key', () => {
    expect(matchStatus('soccermatch').match({
      data: {
        type: 'soccermatch',
        soccerMatchStatus: '**',
      },
      key: 'soccermatch-pre',
    })).toBe(true);
    expect(matchStatus('soccermatch').match({
      data: {
        type: 'soccermatch',
        soccerMatchStatus: 'LIVE',
      },
      key: 'soccermatch-mid',
    })).toBe(true);
    expect(matchStatus('soccermatch').match({
      data: {
        type: 'soccermatch',
        soccerMatchStatus: 'FULL',
      },
      key: 'soccermatch-post',
    })).toBe(true);
  });
});

// ----------------------
// Non-taxonomy related
// ----------------------
//
describe('getMatchData', () => {
  it('should return appropriate status', () => {
    const response = {
      'sports-content': {
        schedule: [{
          'sports-event': [{
            'event-metadata': {
              'sports-property': [{
                'formal-name': 'neulion-gs',
                value: '-1',
              },
              {
                'formal-name': 'television-coverage',
                value: 'udn',
              }],
            },
          }],
        }],
      },
    };
    expect(getMatchData(response).eventStatus).toBe('pre-event');
    expect(getMatchData(response).channels).toEqual(['udn']);
    response['sports-content'].schedule[0]['sports-event'][0]['event-metadata']['sports-property'][0].value = '0';
    expect(getMatchData(response, true).eventStatus).toBe('pre-event');

    response['sports-content'].schedule[0]['sports-event'][0]['event-metadata']['sports-property'][0].value = '1';
    expect(getMatchData(response).eventStatus).toBe('live');

    response['sports-content'].schedule[0]['sports-event'][0]['event-metadata']['sports-property'][0].value = '2';
    expect(getMatchData(response).eventStatus).toBe('live');

    response['sports-content'].schedule[0]['sports-event'][0]['event-metadata']['sports-property'][0].value = '3';
    expect(getMatchData(response).eventStatus).toBe('post-event');
  });

  it('should return pre if no sports-property', () => {
    const response = {
      'sports-content': {
        schedule: [{
          'sports-event': [{
            'event-metadata': {},
          }],
        }],
      },
    };
    expect(getMatchData(response).eventStatus).toBe('pre-event');
  });

  it('should return pre by default', () => {
    expect(getMatchData({}).eventStatus).toBe('pre-event');
  });

  it('should return appropriate status', () => {
    const response = {
      'sports-content': {
        schedule: [{
          'sports-event': [{
            'event-metadata': {
              'sports-property': [{
                'formal-name': 'neulion-gs',
                value: '-1',
              },
              {
                'formal-name': 'television-coverage',
                value: 'udn',
              }],
            },
          }],
        }],
      },
    };
    features.video.isDAI = jest.fn(() => true);
    expect(getMatchData(response).eventStatus).toBe('pre-event');
  });
});

describe('getChannelNetworks', () => {
  it('should return appropriate channel', () => {
    const response = [{
      'formal-name': 'neulion-gs',
      value: '-1',
    },
    {
      'formal-name': 'television-coverage',
      value: 'udn',
    }];
    const response2 = {
      televisionCoverage: 'udn',
    };
    expect(getNetworkChannels(response)).toEqual(['udn']);
    response[1].value = 'udn, univision';
    expect(getNetworkChannels(response)).toEqual(['udn', 'univision']);
    response[1].value = null;
    expect(getNetworkChannels(response)).toEqual([]);
    expect(getNetworkChannels(response2)).toEqual(['udn']);
    expect(getNetworkChannels({})).toEqual([]);
  });
});

describe('getGameState', () => {
  it('should return appropriate game state', () => {
    expect(getGameState({ 'event-status': 'post-event' })).toBe('post-game');
    expect(getGameState({ 'event-status': 'pre-event' })).toBe('pre-game');
    expect(getGameState({
      'event-status': 'mid-event',
      'event-status-note': 'First half',
    })).toBe('live 1st half');
    expect(getGameState({
      'event-status': 'intermission',
      'event-status-note': 'Half-time',
    })).toBe('live halftime');
    expect(getGameState({
      'event-status': 'mid-event',
      'event-status-note': 'Second half',
    })).toBe('live 2nd half');
  });
});

describe('getMCPStatus', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('should return correct pre-event status', () => {
    const currentDate = new Date('2020-02-10T16:28:00-06:00');
    const startDate = new Date('2020-02-10T17:30:00-05:00');
    const endDate = new Date('2020-02-10T19:30:00-05:00');

    jest.spyOn(global, 'Date')
      .mockImplementationOnce(() => currentDate)
      .mockImplementationOnce(() => startDate)
      .mockImplementationOnce(() => endDate);

    expect(getMCPStatus([])).toEqual('pre-event');
  });

  it('should return correct live status', () => {
    const currentDate = new Date('2020-02-10T16:31:00-06:00');
    const startDate = new Date('2020-02-10T17:30:00-05:00');
    const endDate = new Date('2020-02-10T19:30:00-05:00');

    jest.spyOn(global, 'Date')
      .mockImplementationOnce(() => currentDate)
      .mockImplementationOnce(() => startDate)
      .mockImplementationOnce(() => endDate);

    expect(getMCPStatus([])).toEqual('live');
  });

  it('should return correct post-event status', () => {
    const currentDate = new Date('2020-02-10T20:30:00-06:00');
    const startDate = new Date('2020-02-10T17:30:00-05:00');
    const endDate = new Date('2020-02-10T19:30:00-05:00');

    const response = [{
      'formal-name': 'mcp-stream-start-time',
      value: '2020-02-10T17:30:00-05:00',
    },
    {
      'formal-name': 'mcp-stream-end-time',
      value: '2020-02-10T19:30:00-05:00',
    }];

    jest.spyOn(global, 'Date')
      .mockImplementationOnce(() => currentDate)
      .mockImplementationOnce(() => startDate)
      .mockImplementationOnce(() => endDate);

    expect(getMCPStatus(response)).toEqual('post-event');
  });
});
