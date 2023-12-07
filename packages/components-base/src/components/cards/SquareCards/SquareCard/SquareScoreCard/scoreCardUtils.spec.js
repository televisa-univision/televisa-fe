import { cloneDeep } from '@univision/fe-commons/dist/utils/helpers';
import * as getDurationStatus from '@univision/fe-utilities/helpers/date/getDurationStatus';
import { RED, GOSSAMER } from '@univision/fe-utilities/styled/constants';

import {
  getMatchTeamCards,
  getMatchData,
  getScoreData,
  getScoreCardLabelProps,
  getFetchedMatch,
  getLeagueLinkData,
  getCardLabelProps,
} from './scoreCardUtils';
import matchCardData from './__mocks__/squareMatchCard';

const propsData = {
  competition: matchCardData.default.soccerCompetitionSeason,
  homeTeam: matchCardData.default.homeTeamSeason,
  awayTeam: matchCardData.default.awayTeamSeason,
};

describe('test match card helper', () => {
  describe('getMatchTeamCards', () => {
    it('should return empty object', () => {
      expect(getMatchTeamCards()).toEqual({});
    });
    it('should correct team cards', () => {
      expect(getMatchTeamCards(matchCardData.default)).toEqual(matchCardData.formatted);
    });
  });
  describe('getMatchData', () => {
    it('should return empty object', () => {
      expect(getMatchData()).toEqual({});
    });
    it('should return empty object if no extraData', () => {
      const data = {
        extraData: null,
      };
      expect(getMatchData(data)).toEqual({});
    });
    it('should return empty object if no matches array in extraData', () => {
      const data = {
        extraData: [],
      };
      expect(getMatchData(data)).toEqual({});
    });
    it('should return correct object if match array in extraData is equal to matchId', () => {
      const data = {
        extraData: [
          {
            key: '1',
          },
        ],
      };
      expect(getMatchData(data, 1)).toEqual({ key: '1' });
    });
    it('should return empty object if match array in extraData not equal to matchId', () => {
      const data = {
        extraData: [
          {
            key: '1',
          },
        ],
      };
      expect(getMatchData(data, 2)).toEqual({});
    });
  });
  describe('getScoreData', () => {
    it('should return formatted empty object', () => {
      expect(getScoreData()).toEqual({
        away: {
          abbreviatedName: undefined,
          fullName: undefined,
          imageURI: undefined,
          scoreValue: { firstLeg: undefined, penalty: undefined, score: undefined },
        },
        home: {
          abbreviatedName: undefined,
          fullName: undefined,
          imageURI: undefined,
          scoreValue: { firstLeg: undefined, penalty: undefined, score: undefined },
        },
        league: { abbreviation: '', logo: {} },
        leagueName: '',
        date: '',
        coverage: '',
      });
    });
    it('should return matchData if no live stream, match or fetched match exists', () => {
      expect(getScoreData(
        {},
        propsData.competition,
        propsData.homeTeam,
        propsData.awayTeam,
        {},
        {}
      )).toEqual({
        ...matchCardData.formatted,
        leagueName: matchCardData.formatted.league.abbreviation,
        date: '',
      });
    });
    it('should return matchData with live stream data', () => {
      const liveStreamFormatted = cloneDeep(matchCardData.formatted);
      liveStreamFormatted.league.abbreviation = '';
      expect(getScoreData(
        {},
        {},
        propsData.homeTeam,
        propsData.awayTeam,
        matchCardData.livestream,
        {}
      )).toEqual({
        ...liveStreamFormatted,
        leagueName: '',
        date: '',
        coverage: '',
      });
    });
    it('should return score cell match data if present', () => {
      expect(getScoreData(
        matchCardData.cell,
        propsData.competition,
        propsData.homeTeam,
        propsData.awayTeam,
        {},
        {}
      )).toEqual({ ...matchCardData.cell, league: matchCardData.formatted.league });
    });
    it('should return fetched match data if present', () => {
      const fetched = cloneDeep(matchCardData.cell);
      fetched.teams = { home: fetched.home, away: fetched.away };
      expect(getScoreData(
        {},
        propsData.competition,
        propsData.homeTeam,
        propsData.awayTeam,
        {},
        fetched,
      )).toEqual(expect.objectContaining({
        home: matchCardData.cell.home,
        away: matchCardData.cell.away,
        league: matchCardData.formatted.league,
      }));
    });
  });
  describe('getScoreCardLabelProps', () => {
    it('should return default props with valid match id', () => {
      expect(getScoreCardLabelProps({ matchId: 1 })).toEqual({
        text: '',
        type: 'default',
        href: '',
      });
    });
    it('should return default props with no valid match id', () => {
      jest.spyOn(getDurationStatus, 'default').mockImplementation(() => 'pre');
      expect(getScoreCardLabelProps({})).toEqual({
        text: 'PREVIA',
        type: 'default',
        href: '',
      });
    });
    it('should return default props with no valid match id and live game', () => {
      jest.spyOn(getDurationStatus, 'default').mockImplementation(() => 'active');
      expect(getScoreCardLabelProps({})).toEqual({
        text: 'EN VIVO',
        type: 'livestream',
        href: '',
        defaultColor: RED,
      });
    });
    it('should return default props with no valid match id and card label live', () => {
      expect(getScoreCardLabelProps({ uri: 'url', cardLabel: 'EN VIVO' })).toEqual({
        text: 'EN VIVO',
        type: 'livestream',
        href: 'url',
        defaultColor: RED,
      });
    });
    it('should return default props with no valid match id and card label other', () => {
      expect(getScoreCardLabelProps({
        uri: 'url', cardLabel: 'PREVIA',
      })).toEqual({
        text: 'PREVIA',
        type: 'default',
        href: 'url',
      });
    });
    it('should return props with cell data with no livestream', () => {
      const cellData = cloneDeep(matchCardData.cell);
      cellData.hasLiveStream = false;
      cellData.status = 'live';
      expect(getScoreCardLabelProps({
        matchId: 1, scoreData: cellData, uri: 'url',
      })).toEqual({
        text: 'EN JUEGO',
        type: 'liveContent',
        href: 'url',
        defaultColor: RED,
      });
    });
    it('should return props with cell data with live stream', () => {
      const cellData = cloneDeep(matchCardData.cell);
      cellData.hasLiveStream = true;
      cellData.status = 'live';
      expect(getScoreCardLabelProps({
        matchId: 1, scoreData: cellData, uri: 'url',
      })).toEqual({
        text: 'EN VIVO',
        type: 'livestream',
        href: 'url',
        defaultColor: RED,
      });
    });
    it('should return props with live stream data with status not live', () => {
      const streamData = cloneDeep(matchCardData.livestream);
      streamData.status = 'post';
      expect(getScoreCardLabelProps({
        matchId: 1, liveStream: streamData, uri: 'url', theme: { secondary: GOSSAMER },
      })).toEqual({
        text: 'EN VIVO',
        type: 'liveContent',
        href: 'url',
        defaultColor: GOSSAMER,
      });
    });
    it('should return props with live stream data with live status', () => {
      const streamData = cloneDeep(matchCardData.livestream);
      streamData.status = 'LIVE';
      expect(getScoreCardLabelProps({
        matchId: 1, liveStream: streamData, uri: 'url',
      })).toEqual({
        type: 'livestream',
        text: 'EN VIVO',
        href: 'url',
        defaultColor: RED,
      });
    });
    it('should return props with default and league link from hierarchy', () => {
      const streamData = cloneDeep(matchCardData.livestream);
      streamData.status = 'LIVE';
      expect(getScoreCardLabelProps({
        matchId: 1,
        matchHierarchy:
        matchCardData.default.soccerCompetitionSeason.soccerCompetition.league.hierarchy,
        uri: 'url',
      })).toEqual({
        type: 'default',
        text: 'brasileno serie a',
        href: 'https://performance.tudn.com/futbol/brasileno-serie-a',
      });
    });
    it('should return props with fetched data with no livestream but live game', () => {
      const fetchedData = cloneDeep(matchCardData.cell);
      fetchedData.hasLiveStream = false;
      fetchedData.status = 'live';
      expect(getScoreCardLabelProps({
        matchId: 1, scoreData: fetchedData, uri: 'url',
      })).toEqual({
        text: 'EN JUEGO',
        type: 'liveContent',
        href: 'url',
        defaultColor: RED,
      });
    });
    it('should return props with fetched data with livestream and live game', () => {
      const fetchedData = cloneDeep(matchCardData.cell);
      fetchedData.hasLiveStream = true;
      fetchedData.status = 'live';
      expect(getScoreCardLabelProps({
        matchId: 1, scoreData: fetchedData, uri: 'url',
      })).toEqual({
        text: 'EN VIVO',
        type: 'livestream',
        href: 'url',
        defaultColor: RED,
      });
    });
    it('should return props with fetched data in post status', () => {
      const fetchedData = cloneDeep(matchCardData.cell);
      fetchedData.hasLiveStream = false;
      fetchedData.status = 'post';
      expect(getScoreCardLabelProps({
        matchId: 1, scoreData: fetchedData, uri: 'url',
      })).toEqual({
        text: 'RESUMEN',
        type: 'default',
        href: 'url',
      });
    });
    it('should return props with fetched data in pre status', () => {
      const fetchedData = cloneDeep(matchCardData.cell);
      fetchedData.hasLiveStream = false;
      fetchedData.status = 'pre';
      expect(getScoreCardLabelProps({
        matchId: 1, scoreData: fetchedData, uri: 'url', theme: { secondary: GOSSAMER },
      })).toEqual({
        text: 'PREVIA',
        type: 'default',
        href: 'url',
        defaultColor: GOSSAMER,
      });
    });
    it('should return props with data EN JUEGO and not valid matchId', () => {
      expect(getScoreCardLabelProps({
        cardLabel: 'EN JUEGO', uri: 'url', theme: { secondary: GOSSAMER },
      })).toEqual({
        defaultColor: RED,
        text: 'EN JUEGO',
        type: 'liveContent',
        href: 'url',
      });
    });
  });
  describe('getFetchedMatch', () => {
    it('should return empty object', () => {
      expect(getFetchedMatch()).toEqual({});
    });
    it('should return right object', () => {
      expect(getFetchedMatch([
        {
          uid: 1,
          extraData: {
            title: 'test',
          },
        },
        {
          uid: 2,
        },
      ], 1)).toEqual({ title: 'test' });
    });
    it('should return empty object if no extraData presentt', () => {
      expect(getFetchedMatch([{ uid: 1 }], 1)).toEqual({});
    });
  });
  describe('getLeagueLinkData', () => {
    it('should return empty object', () => {
      expect(getLeagueLinkData({})).toEqual({});
    });
    it('should return right link data object', () => {
      expect(getLeagueLinkData({
        soccerCompetition: {
          league: {
            uri: 'www.test.com',
          },
        },
      })).toEqual({ href: 'www.test.com', target: '_blank' });
    });
  });
  describe('getCardLabelProps', () => {
    it('should return default props with valid match id', () => {
      expect(getCardLabelProps({ matchId: 1 })).toEqual({
        text: '',
        type: 'default',
        href: '',
      });
    });
    it('should return default props with no valid match id', () => {
      jest.spyOn(getDurationStatus, 'default').mockImplementation(() => 'pre');
      expect(getCardLabelProps({})).toEqual({
        text: 'PREVIA',
        type: 'default',
        href: '',
      });
    });
    it('should return default props with no valid match id and live game', () => {
      jest.spyOn(getDurationStatus, 'default').mockImplementation(() => 'active');
      expect(getCardLabelProps({})).toEqual({
        text: 'EN VIVO',
        type: 'livestream',
        href: '',
        defaultColor: RED,
      });
    });
    it('should return default props with no valid match id and card label live', () => {
      expect(getCardLabelProps({ uri: 'url', cardLabel: 'EN VIVO' })).toEqual({
        text: 'EN VIVO',
        type: 'livestream',
        href: 'url',
        defaultColor: RED,
      });
    });
    it('should return default props with no valid match id and card label other', () => {
      expect(getCardLabelProps({
        uri: 'url', cardLabel: 'PREVIA',
      })).toEqual({
        text: 'PREVIA',
        type: 'default',
        href: 'url',
      });
    });
    it('should return default props with no valid match id and card label other', () => {
      expect(getCardLabelProps({
        uri: 'url', cardLabel: 'EN JUEGO',
      })).toEqual({
        defaultColor: RED,
        text: 'EN JUEGO',
        type: 'liveContent',
        href: 'url',
      });
    });
    it('should return default props with no valid match id and card label other ans userlocation', () => {
      const data = {
        status: 'live',
        hasBroadcastEvent: true,
        hasMcpLiveStreamId: true,
        hasLiveStream: true,
      };
      expect(getCardLabelProps({
        matchId: 1, scoreData: data, uri: 'url', userLocation: 'MX',
      })).toEqual({
        defaultColor: RED,
        text: 'EN VIVO',
        type: 'livestream',
        href: 'url',
      });
    });
    it('should return default props with no valid match id and card label with haslivestream false and mcp id in true', () => {
      const data = {
        status: 'live',
        hasBroadcastEvent: false,
        hasMcpLiveStreamId: true,
        hasLiveStream: false,
      };
      expect(getCardLabelProps({
        matchId: 1, scoreData: data, uri: 'url', userLocation: 'MX',
      })).toEqual({
        defaultColor: RED,
        text: 'EN JUEGO',
        type: 'liveContent',
        href: 'url',
      });
    });
    it('should return default props with no valid match id and card label with haslivestream false and mcp id in true', () => {
      const data = {
        status: 'live',
        hasBroadcastEvent: false,
        hasMcpLiveStreamId: true,
        hasLiveStream: true,
      };
      expect(getCardLabelProps({
        matchId: 1, scoreData: data, uri: 'url', userLocation: 'US',
      })).toEqual({
        defaultColor: RED,
        text: 'EN VIVO',
        type: 'livestream',
        href: 'url',
      });
    });
    it('should return default props with no valid match id and card label with haslivestream false and mcp id in true userlocation US', () => {
      const data = {
        status: 'live',
        hasBroadcastEvent: false,
        hasMcpLiveStreamId: true,
        hasLiveStream: false,
      };
      expect(getCardLabelProps({
        matchId: 1, scoreData: data, uri: 'url', userLocation: 'US',
      })).toEqual({
        defaultColor: RED,
        text: 'EN VIVO',
        type: 'livestream',
        href: 'url',
      });
    });
    it('should return default props with no valid match id and card label other ans userlocation MX', () => {
      const data = {
        status: 'live',
        hasBroadcastEvent: true,
        hasMcpLiveStreamId: true,
        hasLiveStream: false,
      };
      expect(getCardLabelProps({
        matchId: 1, scoreData: data, uri: 'url', cardLabel: 'EN VIVO', userLocation: 'MX',
      })).toEqual({
        defaultColor: RED,
        text: 'EN VIVO',
        type: 'livestream',
        href: 'url',
      });
    });
    it('should return default props with no valid match id and card label other ans userlocation US', () => {
      const data = {
        status: 'live',
        hasBroadcastEvent: true,
        hasMcpLiveStreamId: false,
        hasLiveStream: false,
      };
      expect(getCardLabelProps({
        matchId: 1, scoreData: data, uri: 'url', cardLabel: 'EN VIVO', userLocation: 'US',
      })).toEqual({
        defaultColor: RED,
        text: 'EN JUEGO',
        type: 'liveContent',
        href: 'url',
      });
    });
    it('should return default props with no valid match id and card label other ans userlocation live', () => {
      expect(getCardLabelProps({
        uri: 'url', cardLabel: 'EN JUEGO', userLocation: 'US',
      })).toEqual({
        defaultColor: RED,
        text: 'EN JUEGO',
        type: 'liveContent',
        href: 'url',
      });
    });
    it('should return props with cell data with no livestream', () => {
      const cellData = cloneDeep(matchCardData.cell);
      cellData.hasLiveStream = false;
      cellData.status = 'live';
      expect(getCardLabelProps({
        matchId: 1, scoreData: cellData, uri: 'url',
      })).toEqual({
        text: 'EN JUEGO',
        type: 'liveContent',
        href: 'url',
        defaultColor: RED,
      });
    });
    it('should return props with default and league link from hierarchy', () => {
      const streamData = cloneDeep(matchCardData.livestream);
      streamData.status = 'live';
      expect(getCardLabelProps({
        matchId: 1,
        matchHierarchy:
        matchCardData.default.soccerCompetitionSeason.soccerCompetition.league.hierarchy,
        uri: 'url',
      })).toEqual({
        type: 'default',
        text: 'brasileno serie a',
        href: 'https://performance.tudn.com/futbol/brasileno-serie-a',
      });
    });
    it('should return props with fetched data with no livestream but live game', () => {
      const fetchedData = cloneDeep(matchCardData.cell);
      fetchedData.hasLiveStream = false;
      fetchedData.status = 'live';
      expect(getCardLabelProps({
        matchId: 1, scoreData: fetchedData, uri: 'url',
      })).toEqual({
        text: 'EN JUEGO',
        type: 'liveContent',
        href: 'url',
        defaultColor: RED,
      });
    });
    it('should return props with fetched data in post status', () => {
      const fetchedData = cloneDeep(matchCardData.cell);
      fetchedData.hasLiveStream = false;
      fetchedData.status = 'post';
      expect(getCardLabelProps({
        matchId: 1, scoreData: fetchedData, uri: 'url',
      })).toEqual({
        text: 'RESUMEN',
        type: 'default',
        href: 'url',
      });
    });
  });
});
