import addSoccerCompetitionTeams from './addSoccerCompetitionTeams';

/**
 * Mock data for api
 * @type {Object}
 */
const data = {
  widgets: ['a'],
  competitionId: '199'
};
const dataCompetition = {
  widgets: ['a'],
  soccerCompetitionSeason: {
    seasonId: '2017',
    soccerCompetition: {
      name: 'Liga MX (Clausura)',
      id: '385'
    }
  }
};

describe('addSoccerCompetitionTeams', () => {
  it('should return empty array if not rigth data', () => {
    expect(addSoccerCompetitionTeams({})).toHaveLength(0);
  });

  it('should return the right settings', () => {
    const { settings, type } = addSoccerCompetitionTeams(data)[0];

    expect(type).toBe('DeportesGridSoccerTeamsCrests');
    expect(settings).toHaveProperty('displayType');
    expect(settings).toHaveProperty('soccerCompetitionSeason.soccerCompetition.id');
  });

  it('should return the right settings with soccerCompetition object', () => {
    const { settings, type } = addSoccerCompetitionTeams(dataCompetition)[0];

    expect(type).toBe('DeportesGridSoccerTeamsCrests');
    expect(settings).toHaveProperty('displayType');
    expect(settings).toHaveProperty('soccerCompetitionSeason.soccerCompetition.id');
  });

  it('should return two widgets', () => {
    expect(addSoccerCompetitionTeams(data)).toHaveLength(2);
  });
});
