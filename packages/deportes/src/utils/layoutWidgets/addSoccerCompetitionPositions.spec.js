import addSoccerCompetitionPositions from './addSoccerCompetitionPositions';

/**
 * Mock data for api
 * @type {Object}
 */
const data = {
  widgets: ['a'],
  soccerCompetitionSeason: {
    soccerCompetition: {}
  }
};

describe('addSoccerCompetitionPositions', () => {
  it('should return empty array if not rigth data', () => {
    expect(addSoccerCompetitionPositions({}).length).toBe(0);
  });
  it('should return the right settings', () => {
    expect(addSoccerCompetitionPositions(data)[0].settings.displayType).toBeDefined();
  });
  it('should return two widgets', () => {
    expect(addSoccerCompetitionPositions(data).length).toBe(2);
  });
});
