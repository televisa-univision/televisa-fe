import * as categories from '@univision/fe-commons/dist/constants/pageCategories';
import addSoccerScriptWidget from './addSoccerScriptWidget';

/**
 * Mock data for api
 * @type {Object}
 */
const data = {
  widgets: ['a', 'b'],
  soccerCompetitionSeason: {
    seasonId: 2007,
    soccerCompetition: {
      id: 123
    },
  },
  teamId: 12
};

describe('addSoccerScriptWidget', () => {
  it('should return empty array if not rigth data', () => {
    expect(addSoccerScriptWidget({}).length).toBe(0);
  });
  it('should return the right settings', () => {
    expect(addSoccerScriptWidget(data, categories.SOCCER_TEAM_PLANTEL)[0].type).toBe('DeportesGridExternalScript');
  });
  it('should return the right type', () => {
    expect(addSoccerScriptWidget(data, categories.SOCCER_COMPETITION_STATS)[0].settings.type).toBe('ranking');
  });
  it('should not add widget if not right team data', () => {
    const newData = Object.assign({}, data);
    delete newData.teamId;
    const pageCat = categories.SOCCER_TEAM_STATS;
    expect(addSoccerScriptWidget(newData, pageCat)[0].settings).not.toBeDefined();
  });
  it('should not add widget if wrong page category', () => {
    expect(addSoccerScriptWidget(data, 'test')[0].settings).not.toBeDefined();
  });
  it('should return the right type for olympics match center', () => {
    expect(addSoccerScriptWidget(data, categories.OLYMPICS_MATCHCENTER)[0].settings.type).toBe('olympics');
  });
});
