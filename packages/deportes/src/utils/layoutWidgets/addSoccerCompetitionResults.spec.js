import addSoccerCompetitionResults from './addSoccerCompetitionResults';

/**
 * Mock data for api
 * @type {Object}
 */
const data = {
  widgets: ['a', 'b'],
  soccerCompetitionSeason: {
    soccerCompetition: {},
  },
};

describe('addSoccerCompetitionResults', () => {
  it('should return empty array if not rigth data', () => {
    expect(addSoccerCompetitionResults({}).length).toBe(0);
  });
  it('should return the right settings', () => {
    expect(addSoccerCompetitionResults(data)[0].type).toBe('DeportesGridSoccerMatchesResultsandCalendar');
  });
  it('should return the number of widgets', () => {
    expect(addSoccerCompetitionResults(data).length).toBe(3);
  });
  it('should return the right settings', () => {
    const otherData = { teamId: '123' };
    expect(addSoccerCompetitionResults(otherData)[0].settings.soccerTeamSeason).toBeDefined();
  });
  it('should return the right settings for soccer person', () => {
    const otherData = {
      teamSeason: {
        teamId: '123',
        soccerCompetitionSeason: {
          seasonId: '2020',
        },
      },
    };
    expect(addSoccerCompetitionResults(otherData)[0].settings.soccerTeamSeason).toBeDefined();
  });
  it('should return the right settings for soccer person with highlightedCompetitionSeason', () => {
    const otherData = {
      teamSeason: {
        teamId: '123',
        soccerCompetitionSeason: {
          seasonId: '2020',
        },
      },
      highlightedCompetitionSeason: [
        { seasonId: '2020' },
        { seasonId: '2020' },
      ],
    };
    expect(addSoccerCompetitionResults(otherData)[0]
      .settings.highlightedCompetitionSeasons).toBeDefined();
  });
});
