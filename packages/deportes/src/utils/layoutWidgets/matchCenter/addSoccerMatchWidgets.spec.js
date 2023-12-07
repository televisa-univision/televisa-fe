import * as categories from '@univision/fe-commons/dist/constants/pageCategories';
import * as widgetTypes from '@univision/fe-commons/dist/constants/widgetTypes';
import addSoccerMatchWidgets from './addSoccerMatchWidgets';

const testCoverage = 'Performance';

jest.mock('../../helpers/soccerHelper', () => ({
  getCoverage: jest.fn(() => 'Performance'),
}));
jest.mock('./PerformanceMidMatch', () => null);

const data = {
  matchId: '23',
  soccerMatchStatus: 'FULL',
  soccerCompetitionSeason: {
    seasonId: '2017',
    soccerCompetition: {
      league: {
        coverage: testCoverage,
        includesVideo: true,
      },
    },
  },
  widgets: [
    {
      type: widgetTypes.ALL_CAROUSEL_FOUR_ITEMS,
    },
    {
      type: widgetTypes.ALL_LIST_HEADLINE_AND_IMAGE,
    },
  ],
  tracking: {
    tealium: {
      data: {
        title: 'title',
      },
    },
  },
};

describe('addSoccerMatchWidgets', () => {
  it(`should return the right amount of widgets for ${categories.SOCCER_MATCH_POST} - ${testCoverage}`, () => {
    expect(addSoccerMatchWidgets(data, categories.SOCCER_MATCH_POST)).toHaveLength(10);
  });
  it('should return empty array if wrong data', () => {
    expect(addSoccerMatchWidgets({}, categories.SOCCER_MATCH_POST)).toHaveLength(0);
  });
  it('should return empty array if wrong data', () => {
    const simpleData = Object.assign({}, data);
    delete simpleData.soccerMatchStatus;
    expect(addSoccerMatchWidgets(simpleData, categories.SOCCER_MATCH_POST)).toHaveLength(0);
  });
  it('should return empty array if wrong function return from mapping', () => {
    expect(addSoccerMatchWidgets(data, categories.SOCCER_MATCH_MID)).toHaveLength(0);
  });
});
