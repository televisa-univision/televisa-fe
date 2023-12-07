import soccerHelper from './soccerHelper';

describe('getCoverage', () => {
  it('should return appropriate coverage if right data provided', () => {
    const testCoverage = 'performance';
    const competitionData = { matchId: 1, associatedLeagueCoverage: testCoverage };
    expect(soccerHelper.getCoverage(competitionData)).toBe(testCoverage);
  });
  it('should return appropriate coverage if right data provided for teams', () => {
    const testCoverage = 'performance';
    const competitionData = { matchId: 1, league: { coverage: testCoverage } };
    expect(soccerHelper.getCoverage(competitionData)).toBe(testCoverage);
  });
  it('should return appropriate coverage if Copa MX league', () => {
    const testCoverage = 'Special';
    const competitionData = { matchId: 1, soccerCompetitionSeason: { soccerCompetition: { league: { id: 'l.soccer.mexico.mexicocup' } } } };
    expect(soccerHelper.getCoverage(competitionData)).toBe(testCoverage);
  });
  it('should return appropriate coverage other league', () => {
    const testCoverage = 'Core';
    const competitionData = { matchId: 1, soccerCompetitionSeason: { soccerCompetition: { league: { id: 'l.uefa', coverage: 'Core' } } } };
    expect(soccerHelper.getCoverage(competitionData)).toBe(testCoverage);
  });
  it('should return appropriate coverage for basic league/match', () => {
    const testCoverage = 'Basic';
    const competitionData = { soccerCompetitionSeason: { soccerCompetition: { league: { id: 'l.soccer.mexico.mexicocup' } } } };
    expect(soccerHelper.getCoverage(competitionData)).toBe(testCoverage);
  });
  it('should return null if wrong data provided', () => {
    const competitionData = { matchId: 1 };
    expect(soccerHelper.getCoverage(competitionData)).toBe(null);
  });
});

describe('showVideoPlayer', () => {
  const specialdata = {
    matchId: 1,
    liveStreamEnabled: true,
    soccerCompetitionSeason: {
      soccerCompetition: {
        league: { id: 'l.soccer.mexico.mexicocup' },
      },
    },
    soccerMatchStatus: 'FULL',
  };
  it('should return false if special coverage and full match', () => {
    expect(soccerHelper.showVideoPlayer(specialdata)).toBe(false);
  });
});
