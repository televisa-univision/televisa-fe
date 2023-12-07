import addSoccerCompetitionTeamStats from './addSoccerCompetitionTeamStats';

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

const data2 = {
  widgets: ['a', 'b'],
  soccerCompetitionSeason: {
    seasonId: 2007,
    soccerCompetition: {
      id: 123,
      league: {
        coverage: 'Performance'
      }
    },
  },
  teamId: 12
};

describe('addSoccerScriptWidget', () => {
  it('should return empty array if not right data', () => {
    expect(addSoccerCompetitionTeamStats({}).length).toBe(0);
  });
  it('should return the right settings', () => {
    expect(addSoccerCompetitionTeamStats(data)[0].type).toBe('DeportesGridExternalScript');
  });
  it('should return the right type if coverage is performance', () => {
    expect(addSoccerCompetitionTeamStats(data2)[0].settings.type).toBe('stats');
    expect(addSoccerCompetitionTeamStats(data2)[2].settings.type).toBe('player');
  });
  it('should return only DeportesGridExternalScript widgets if no widgets available', () => {
    const newData = Object.assign({}, data);
    delete newData.widgets;
    expect(addSoccerCompetitionTeamStats(data2)[0].type).toBe('DeportesGridExternalScript');
    expect(addSoccerCompetitionTeamStats(data2)[1].type).toBe('DeportesGridExternalScript');
  });
  it('should not add widget if not right team data', () => {
    const newData = Object.assign({}, data);
    delete newData.teamId;
    expect(addSoccerCompetitionTeamStats(newData)[0].settings).not.toBeDefined();
  });
});
