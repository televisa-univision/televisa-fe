import addSoccerCompetitionBrackets from './addSoccerCompetitionBrackets';

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
    expect(addSoccerCompetitionBrackets({})).toHaveLength(0);
  });
  it('should return the right settings', () => {
    expect(addSoccerCompetitionBrackets(data)[0].settings.displayType).toBeDefined();
  });
  it('should return two widgets', () => {
    expect(addSoccerCompetitionBrackets(data)).toHaveLength(2);
  });
});
