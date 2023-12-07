import addSoccerCompetitionRelegation from './addSoccerCompetitionRelegation';

/**
 * Mock data for api
 * @type {Object}
 */
const data = {
  widgets: ['a'],
  soccerCompetitionSeason: {
    soccerCompetition: {},
  },
};

describe('addSoccerCompetitionRelegation', () => {
  it('should return empty array if not rigth data', () => {
    expect(addSoccerCompetitionRelegation({}).length).toBe(0);
  });
  it('should return the right settings', () => {
    expect(addSoccerCompetitionRelegation(data)[0].settings.displayType).toBeDefined();
  });
  it('should return two widgets', () => {
    expect(addSoccerCompetitionRelegation(data).length).toBe(2);
  });
});
