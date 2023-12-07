import * as categories from '@univision/fe-commons/dist/constants/pageCategories';
import addSoccerCompetitionTeamSquad from './addSoccerCompetitionTeamSquad';

/**
 * Mock data for api
 * @type {Object}
 */
const data = {
  widgets: ['a', 'b'],
  soccerCompetitionSeason: {
    seasonId: 2007,
    soccerCompetition: {
      id: 22,
    },
  },
  teamId: 156,
};

describe('addSoccerScriptWidget', () => {
  it('should return empty array if not rigth data', () => {
    expect(addSoccerCompetitionTeamSquad({}).length).toBe(0);
  });
  it('should return the right settings', () => {
    expect(addSoccerCompetitionTeamSquad(data, categories.SOCCER_TEAM_PLANTEL)[0].type).toBe('DeportesSoccerTeamSquad');
  });
  it('should return the right type', () => {
    expect(addSoccerCompetitionTeamSquad(data, categories.SOCCER_TEAM_PLANTEL)[0].settings.type).toBe('squad');
  });
  it('should not add widget if not right team data', () => {
    const newData = Object.assign({}, data);
    delete newData.teamId;
    const pageCat = categories.SOCCER_TEAM_STATS;
    expect(addSoccerCompetitionTeamSquad(newData, pageCat)[0].settings).not.toBeDefined();
  });
  it('should not add widget if wrong page category', () => {
    expect(addSoccerCompetitionTeamSquad(data, 'test')[0].settings).not.toBeDefined();
  });
});
