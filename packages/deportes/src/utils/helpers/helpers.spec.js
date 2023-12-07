import configureStore from '@univision/fe-commons/dist/store/configureStore';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import {
  hasCompetition,
  getLeagueName,
  getLeagueShortName,
  getLeagueAbbrName,
  getLeagueId,
  getSeasonId,
  getLeagueUri,
  getActiveLeagueUri,
  getLeagueCoverage,
  showVideoPlayer,
  getMatchCMSStatus,
  getMatchHeadLineFromOpening,
  getPrendeMatchHeadLine,
  extractEventStatus,
  getTudnUrl,
  // Deprecated
  isLive,
  getShowProgress,
  getShowUrl,
  renamePrendeChannelToVix,
  filterChannels,
} from '.';
import soccerHelper from './soccerHelper';

let league;
let leagueTeam;
let leagueNoComp;
let leagueWCompNoData;
const store = configureStore();

soccerHelper.getCoverage = jest.fn();

describe('deportes helpers test', () => {
  beforeEach(() => {
    leagueTeam = {
      teamId: '143',
      soccerCompetitionSeason: {
        seasonId: '2017',
        soccerCompetition: {
          league: {
            coverage: 'Performance',
            uri: 'http://sports.dev.y.univision.com/deportes/futbol/uefa-champions-league',
          },
        },
      },
    };
    leagueNoComp = {
      seasonId: '2017',
    };
    leagueWCompNoData = {
      seasonId: '2017',
      soccerCompetition: {
        code: 'ES_PL',
      },
    };
    league = {
      seasonId: '2017',
      seasonName: 'Season 2016/2017',
      soccerCompetition: {
        code: 'ES_PL',
        league: {
          abbreviation: 'UEFA',
          name: 'UEFA League',
          id: 'l.uefa.org.champions',
          coverage: 'Performance',
          uri: 'http://sports.dev.y.univision.com/deportes/futbol/uefa-champions-league',
          activeSoccerCompetitionURL: 'https://univision.com/deportes/futbol/uefa-champions-league-clausura/*',
        },
        name: 'UEFA Champions League',
        id: '5',
      },
    };
  });

  describe('hasCompetition', () => {
    it('should return false with empty league objects', () => {
      expect(hasCompetition({})).toBeFalsy();
    });

    it('should return false with missing league data', () => {
      expect(hasCompetition({
        soccerCompetition: {
          id: '23',
        },
      })).toBeFalsy();
      expect(hasCompetition({
        soccerCompetition: {
          name: '',
        },
      })).toBeFalsy();
      expect(hasCompetition({})).toBeFalsy();
    });

    it('should return true with correct league data', () => {
      expect(hasCompetition({
        soccerCompetition: {
          id: '23',
          name: 'Liga MX',
        },
      })).toBeTruthy();
    });
  });

  describe('getLeagueName', () => {
    it('should return empty string', () => {
      expect(getLeagueName()).toEqual('');
    });
    it('should return empty string if no Competition in league', () => {
      expect(getLeagueName(leagueNoComp)).toEqual('');
    });
    it('should return empty string if has Competition with no data', () => {
      expect(getLeagueName(leagueWCompNoData)).toEqual('');
    });
    it('should return league name of provided league', () => {
      expect(getLeagueName(league)).toEqual('UEFA Champions League');
    });
  });

  describe('getLeagueShortName', () => {
    it('should return empty string', () => {
      expect(getLeagueShortName()).toEqual('');
    });
    it('should return empty string if no Competition in league', () => {
      expect(getLeagueShortName(leagueNoComp)).toEqual('');
    });
    it('should return empty string if has Competition with no data', () => {
      expect(getLeagueShortName(leagueWCompNoData)).toEqual('');
    });
    it('should return league name of provided league', () => {
      expect(getLeagueShortName(league)).toEqual('UEFA League');
    });
  });

  describe('getLeagueAbbrName', () => {
    it('should return empty string', () => {
      expect(getLeagueAbbrName()).toEqual('');
    });
    it('should return empty string if no Competition in league', () => {
      expect(getLeagueAbbrName(leagueNoComp)).toEqual('');
    });
    it('should return empty string if has Competition with no data', () => {
      expect(getLeagueAbbrName(leagueWCompNoData)).toEqual('');
    });
    it('should return league name of provided league', () => {
      expect(getLeagueAbbrName(league)).toEqual('UEFA');
    });
  });

  describe('getLeagueId', () => {
    it('should return empty string', () => {
      expect(getLeagueId()).toEqual('');
    });
    it('should return empty string if no Competition in league', () => {
      expect(getLeagueId(leagueNoComp)).toEqual('');
    });
    it('should return empty string if has Competition with no data', () => {
      expect(getLeagueId(leagueWCompNoData)).toEqual('');
    });
    it('should return league name of provided league', () => {
      expect(getLeagueId(league)).toEqual('5');
    });
  });

  describe('getSeasonId', () => {
    it('should return empty string', () => {
      expect(getSeasonId()).toEqual('');
    });
    it('should return seasonId in competition with no data', () => {
      expect(getSeasonId(leagueWCompNoData)).toEqual('2017');
    });
    it('should return seasonId of provided competition', () => {
      expect(getSeasonId(league)).toEqual('2017');
    });
    it('should return seasonId of provided of team competition', () => {
      expect(getSeasonId(leagueTeam)).toEqual('2017');
    });
  });

  describe('getLeagueUri', () => {
    it('should return empty string', () => {
      expect(getLeagueUri()).toEqual('');
    });
    it('should return empty string if no Competition in league', () => {
      expect(getLeagueUri(leagueNoComp)).toEqual('');
    });
    it('should return empty string if has Competition with no data', () => {
      expect(getLeagueUri(leagueWCompNoData)).toEqual('');
    });
    it('should return league URI of provided league', () => {
      expect(getLeagueUri(league)).toEqual('/deportes/futbol/uefa-champions-league');
    });
    it('should return league URI of provided team league', () => {
      expect(getLeagueUri(leagueTeam)).toEqual('/deportes/futbol/uefa-champions-league');
    });
  });

  describe('getActiveLeagueUri', () => {
    it('should return empty string', () => {
      expect(getActiveLeagueUri()).toEqual('');
    });
    it('should return empty string if no Competition in league', () => {
      expect(getActiveLeagueUri(leagueNoComp)).toEqual('');
    });
    it('should return empty string if has Competition with no data', () => {
      expect(getActiveLeagueUri(leagueWCompNoData)).toEqual('');
    });
    it('should return league the activeSoccerCompetitionURL of provided league', () => {
      expect(getActiveLeagueUri(league)).toEqual('/deportes/futbol/uefa-champions-league-clausura');
    });
    it('should return league URI of if not have activeSoccerCompetitionURL', () => {
      expect(getActiveLeagueUri(leagueTeam)).toEqual('/deportes/futbol/uefa-champions-league');
    });
  });

  describe('getLeagueCoverage', () => {
    it('should return empty string', () => {
      expect(getLeagueCoverage()).toEqual('');
    });
    it('should return empty string if no Competition in league', () => {
      expect(getLeagueCoverage(leagueNoComp)).toEqual('');
    });
    it('should return empty string if has Competition with no data', () => {
      expect(getLeagueCoverage(leagueWCompNoData)).toEqual('');
    });
    it('should return league the activeSoccerCompetitionURL of provided league', () => {
      expect(getLeagueCoverage(league)).toEqual('Performance');
    });
    it('should return league URI of if not have activeSoccerCompetitionURL', () => {
      expect(getLeagueCoverage(leagueTeam)).toEqual('Performance');
    });
    it('should return appropriate coverage if right data provided', () => {
      const testCoverage = 'Performance';
      const competitionData = { associatedLeagueCoverage: testCoverage };
      expect(getLeagueCoverage(competitionData)).toBe(testCoverage);
    });
    it('should return appropriate coverage if right data provided for teams', () => {
      const testCoverage = 'Performance';
      const competitionData = { league: { coverage: testCoverage } };
      expect(getLeagueCoverage(competitionData)).toBe(testCoverage);
    });
  });

  describe('showVideoPlayer', () => {
    const specialdata = {
      liveStreamEnabled: true,
      soccerCompetitionSeason: {
        soccerCompetition: {
          league: {
            id: 'l.soccer.mexico.mexicocup',
            coverage: 'Special',
          },
        },
      },
      soccerMatchStatus: 'FULL',
    };
    it('should return false if special coverge and full match', () => {
      expect(showVideoPlayer(specialdata)).toBe(false);
    });

    it('should return false if performance coverge and full match', () => {
      specialdata.soccerCompetitionSeason = {
        soccerCompetition: {
          league: {
            id: 'l.soccer.uefa',
            coverage: 'Performance',
          },
        },
      };
      expect(showVideoPlayer(specialdata)).toBe(true);
    });
  });

  describe('getMatchCMSStatus', () => {
    it('should return right status', () => {
      expect(getMatchCMSStatus('')).toBe('PRE-MATCH');
      expect(getMatchCMSStatus('post-event')).toBe('FULL');
      expect(getMatchCMSStatus('halted')).toBe('FULL');
      expect(getMatchCMSStatus('mid-event')).toBe('LIVE');
      expect(getMatchCMSStatus('intermission')).toBe('LIVE');
      expect(getMatchCMSStatus('delayed')).toBe('LIVE');
    });
  });

  describe('getMatchHeadLineFromOpening', () => {
    const openingWidgetData = {
      extraData: {
        teams: {
          home: {
            fullName: 'Mexico',
          },
          away: {
            fullName: 'USA',
          },
        },
      },
    };
    it('should return null by default', () => {
      expect(getMatchHeadLineFromOpening()).toBeNull();
    });
    it('should return the right headline with default coverage', () => {
      expect(getMatchHeadLineFromOpening(openingWidgetData, { pageCategory: 'soccermatch-mid' }))
        .toBe('En juego Mexico vs USA: no te pierdas todas las acciones, estadísticas y el minuto a minuto');
      expect(getMatchHeadLineFromOpening(openingWidgetData, { pageCategory: 'soccermatch-post', withVideo: true }))
        .toBe('Todos los goles y jugadas que dejó el partido entre Mexico y USA');
    });
    it('should return the right headline with default match status', () => {
      expect(getMatchHeadLineFromOpening(openingWidgetData, { pageCategory: 'soccermatch' }))
        .toBe('Sigue la previa del encuentro Mexico vs USA, conoce las alineaciones y novedades');
    });
    it('should return the right headline for the right coverage', () => {
      const optionsData = {
        coverage: 'Performance',
        pageCategory: 'soccermatch-mid',
        withVideo: false,
      };
      expect(getMatchHeadLineFromOpening(openingWidgetData, optionsData))
        .toBe('En juego Mexico vs USA: no te pierdas el minuto a minuto y todas las estadísticas');
    });
  });

  describe('extractEventStatus', () => {
    const optaData = {
      'sports-content': {
        schedule: [{
          'sports-event': [{
            'event-metadata': {
              'event-status': 'post-event',
            },
            'sports-property': [{
              'formal-name': 'previous-four-games-for-team',
            }],
          }, {
            'event-metadata': {
              'event-status': 'mid-event',
            },
          }],
        }],
      },
    };
    const bexData = {
      matchTime: '2020-10-15T14:37:25-04:00',
    };

    it('should return event status from opta data', () => {
      const eventStatus = extractEventStatus(optaData, bexData);

      expect(eventStatus).toHaveProperty('optaStatus', 'mid-event');
      expect(eventStatus).toHaveProperty('cmsStatus', 'LIVE');
    });

    it('should return event status from bex data', () => {
      const eventStatus = extractEventStatus(null, bexData);

      expect(eventStatus).toHaveProperty('optaStatus', 'post-event');
      expect(eventStatus).toHaveProperty('cmsStatus', 'FULL');
    });
  });

  describe('isLive', () => {
    const constantDate = new Date('2018-01-29T21:10:00Z');
    const RealDate = Date;
    afterEach(() => {
      global.Date = RealDate;
    });
    it('should return false if current time is past duration ', () => {
      expect(isLive('2018-01-29T21:00:00Z', 30)).toBe(false);
    });
    it('should return false if wrong date is provided ', () => {
      expect(isLive('date', 30)).toBe(false);
    });
    it('should return true if current time is within duration ', () => {
      global.Date = jest.fn(
        (...props) => (props.length
          ? new RealDate(...props)
          : new RealDate(constantDate))
      );
      Object.assign(Date, RealDate);
      expect(isLive('2018-01-29T21:00:00Z', 30)).toBe(true);
    });
  });

  describe('getShowProgress', () => {
    const constantDate = new Date('2018-01-29T21:15:00Z');
    const RealDate = Date;
    afterEach(() => {
      global.Date = RealDate;
    });
    it('should return 0 if wrong date is provided ', () => {
      expect(getShowProgress('d', 30)).toBe(0);
    });
    it('should return value if current time is within duration ', () => {
      global.Date = jest.fn(
        (...props) => (props.length
          ? new RealDate(...props)
          : new RealDate(constantDate))
      );
      Object.assign(Date, RealDate);
      expect(getShowProgress(1517259600000, 30)).toBe(50);
    });
  });

  describe('getShowURL', () => {
    it('should return empty string if show not on json file', () => {
      expect(getShowUrl('Title')).toEqual('');
    });
    it('should return url string if show is available on json', () => {
      expect(getShowUrl('Locura Deportiva')).toEqual('https://www.univision.com/shows/locura-deportiva');
    });
  });

  describe('getTudnUrl', () => {
    it('should return same string if not have /deportes path and is multi-site', () => {
      store.dispatch(setPageData({
        config: {
          deploy: {
            multiSite: true,
          },
        },
        sites: { tudn: 'https://www.tudn.com' },
        domain: 'https://www.univision.com',
      }));
      expect(getTudnUrl('https://www.univision.com/shows/locura-deportiva')).toEqual('https://www.univision.com/shows/locura-deportiva');
    });
    it('should return url string with right domain if have /deportes path', () => {
      store.dispatch(setPageData({
        sites: { tudn: 'https://www.tudn.com' },
        domain: 'https://www.tudn.com',
      }));
      expect(getTudnUrl('https://www.univision.com/deportes/nfl')).toEqual('https://www.tudn.com/nfl');
    });
    it('should return same value if no valid url is provided', () => {
      store.dispatch(setPageData({
        sites: { tudn: 'https://www.tudn.com' },
        domain: 'https://www.tudn.com',
      }));
      expect(getTudnUrl(null)).toBeNull();
    });
    it('should return right domain if relative is provided with /deportes path', () => {
      store.dispatch(setPageData({
        sites: { tudn: 'https://www.tudn.com' },
        domain: 'https://www.tudn.com',
      }));
      expect(getTudnUrl('/deportes/futbol/necaxa')).toEqual('https://www.tudn.com/futbol/necaxa');
    });

    it('should return right domain if relative is provided without /deportes path', () => {
      store.dispatch(setPageData({
        sites: { tudn: 'https://www.tudn.com' },
        domain: 'https://www.univision.com',
      }));
      expect(getTudnUrl('/futbol/necaxa')).toEqual('https://www.tudn.com/futbol/necaxa');
    });

    it('should return the TUDN domain based on th site in the store', () => {
      store.dispatch(setPageData({
        sites: {
          tudn: 'https://performance.tudn.com',
        },
      }));
      const url = getTudnUrl('http://cdn.uat.x.univision.com/deportes/futbol/brasileno-serie-a/sao-paulo-vs-parana-brasileno-serie-a-2018-04-16');
      expect(url).toEqual('https://performance.tudn.com/futbol/brasileno-serie-a/sao-paulo-vs-parana-brasileno-serie-a-2018-04-16');
    });

    it('should return the default domain if the one in the store site is relative on SPA', () => {
      store.dispatch(setPageData({
        isSpa: true,
        sites: {
          tudn: '/deportes',
        },
        domain: 'https://uat2.x.univision.com',
      }));
      expect(getTudnUrl('/futbol/necaxa')).toEqual('https://uat2.x.univision.com/deportes/futbol/necaxa');
    });

    it('should return as relative if multi-site is disabled on MPA', () => {
      store.dispatch(setPageData({
        isSpa: false,
        config: {
          deploy: {
            multiSite: false,
          },
        },
        sites: {
          tudn: '/deportes',
        },
        domain: 'https://uat2.x.univision.com',
      }));
      expect(getTudnUrl('https://uat.tudn.com/futbol/necaxa')).toEqual('/deportes/futbol/necaxa');
    });
  });

  describe('getPrendeMatchHeadLine', () => {
    const openingWidgetData = {
      extraData: {
        teams: {
          home: {
            fullName: 'Mexico',
          },
          away: {
            fullName: 'USA',
          },
        },
      },
    };
    it('should return null by default', () => {
      expect(getPrendeMatchHeadLine()).toBeNull();
    });
    it('should return the right prende headlines', () => {
      expect(getPrendeMatchHeadLine(openingWidgetData))
        .toBe('Mexico vs USA');
    });
  });

  describe('renamePrendeChannelToVix', () => {
    it('should return an empty array by default', () => {
      expect(renamePrendeChannelToVix()).toEqual([]);
    });
    it('should return same array when flag is false', () => {
      const channels = ['test'];
      expect(renamePrendeChannelToVix(channels)).toEqual(channels);
    });
    it('should return renamed prende channel when flag is true', () => {
      const channels = ['prende', 'test'];
      expect(renamePrendeChannelToVix(channels, true)).toEqual(['vix', 'test']);
    });
  });

  describe('filterChannels', () => {
    const options = {
      channels: ['prende', 'vix', 'tudn'],
      isVixEnabled: true,
      userLocation: 'US',
      isWorldCupMVP: false,
    };

    it('should return an empty array by default', () => {
      expect(filterChannels({})).toEqual([]);
    });

    it('should return filtered channels', () => {
      expect(filterChannels(options)).toEqual(['vix', 'tudn']);
    });

    it('should return filtered channels when userLocation is US', () => {
      const modOptions = {
        ...options,
        isWorldCupMVP: true,
        userLocation: 'US',
      };

      expect(filterChannels(modOptions)).toEqual(['vix', 'tudn']);
    });

    it('should return vix channel only when userLocation is MX', () => {
      const modOptions = {
        ...options,
        isWorldCupMVP: true,
        userLocation: 'MX',
      };
      expect(filterChannels(modOptions)).toEqual(['vix']);
    });
  });
});
