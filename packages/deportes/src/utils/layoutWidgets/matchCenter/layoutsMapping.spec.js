import * as categories from '@univision/fe-commons/dist/constants/pageCategories';
import * as widgetTypes from '@univision/fe-commons/dist/constants/widgetTypes';
import layoutsMapping from './layoutsMapping';

/**
 * Return a mock CMS status given a category for testing.
 * @param {category} category Soccer match category
 * @returns {string} CMS status
 */
function getCmsStatus(category) {
  switch (category.toString()) {
    case 'soccermatch-mid':
      return 'LIVE';
    case 'soccermatch-post':
      return 'FULL';
    default:
      return 'PRE';
  }
}

describe('layoutsMapping.get', () => {
  const data = {
    matchId: '23',
    soccerMatchStatus: 'FULL',
    soccerCompetitionSeason: {
      seasonId: '2017',
      soccerCompetition: {
        league: {
          coverage: 'Performance',
          includesVideo: true,
        },
      },
    },
    widgets: [
      {
        type: widgetTypes.CAROUSEL_WIDGET,
      },
      {
        type: widgetTypes.LIST_WIDGET,
      },
      {
        type: widgetTypes.ALL_VIDEO_PLAYLIST_VIDEO,
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
  const simpleData = Object.assign({}, data);
  delete simpleData.widgets;
  it('should return right amount of widgets with the default layout', () => {
    // Default BasicPreMatch
    const layoutFunction = layoutsMapping.get('test', 'test');
    expect(layoutFunction(data)).toHaveLength(6);
    expect(layoutFunction(simpleData)).toHaveLength(6);
    expect(layoutFunction(null)).toHaveLength(0);
  });

  describe('all layouts number of widgets', () => {
    // Mapping layout and number of widgets
    const mapping = [
      {
        category: [categories.SOCCER_MATCH_PRE],
        coverageMap: [
          {
            coverage: 'Core',
            widgets: 6,
          },
          {
            coverage: 'Classic',
            widgets: 7,
          },
          {
            coverage: 'Performance',
            widgets: 7,
          },
          {
            coverage: 'Special',
            widgets: 6,
          },
          {
            coverage: 'Basic',
            widgets: 6,
          },
        ],
      },
      {
        category: [categories.SOCCER_MATCH_MID],
        coverageMap: [
          {
            coverage: 'Core',
            widgets: 7,
          },
          {
            coverage: 'Classic',
            widgets: 9,
          },
          {
            coverage: 'Performance',
            widgets: 10,
          },
          {
            coverage: 'Special',
            widgets: 6,
          },
          {
            coverage: 'Basic',
            widgets: 5,
          },
        ],
      },
      {
        category: [categories.SOCCER_MATCH_POST],
        coverageMap: [
          {
            coverage: 'Core',
            widgets: 7,
          },
          {
            coverage: 'Classic',
            widgets: 9,
          },
          {
            coverage: 'Performance',
            widgets: 10,
          },
          {
            coverage: 'Special',
            widgets: 6,
          },
          {
            coverage: 'Basic',
            widgets: 5,
          },
        ],
      },
    ];

    mapping.forEach((map) => {
      map.coverageMap.forEach((covMap) => {
        const status = getCmsStatus(map.category);
        const dataStatus = Object.assign({}, data, { soccerMatchStatus: status });
        const layoutFunction = layoutsMapping.get(map.category, covMap.coverage);
        it(`should return the rigth amout of widgets for ${map.category} - ${covMap.coverage}`, () => {
          expect(layoutFunction(dataStatus).length).toBe(covMap.widgets);
        });
        it(`should return empty array if wrong data for ${map.category} - ${covMap.coverage}`, () => {
          expect(layoutFunction(null).length).toBe(0);
        });
      });
    });
  });
  describe('Performance widgets position', () => {
    it('should render video in second position if video available', () => {
      let layoutFunction = layoutsMapping.get(categories.SOCCER_MATCH_MID, 'Performance');
      expect(layoutFunction(data)[2].type).toBe('Advertisement');

      layoutFunction = layoutsMapping.get(categories.SOCCER_MATCH_POST, 'Performance');
      expect(layoutFunction(data)[2].type).toBe('Advertisement');
    });
  });
  describe('Special widgets position', () => {
    it('should render ad in second position by default', () => {
      const layoutFunction = layoutsMapping.get(categories.SOCCER_MATCH_MID, 'Special');
      const layout = layoutFunction({ ...data, liveStreamEnabled: true });
      expect(layout[1].type).toBe('DeportesMatchSummary');
      expect(layout[2].type).toBe('Advertisement');
    });
  });
  describe('Basic widgets position', () => {
    it('should render ad if livestream is enabled and null opta data', () => {
      const layoutFunction = layoutsMapping.get(categories.SOCCER_MATCH_MID, 'Basic');
      const layout = layoutFunction({
        ...data,
        liveStreamEnabled: true,
        matchId: null,
      });
      expect(layout[0].type).toBe('DeportesGridSoccerMatchCenterOpening');
      expect(layout[1].type).toBe('Advertisement');
    });
    it('should render ad if livestream is enabled and null opta data in pre match', () => {
      const layoutFunction = layoutsMapping.get(categories.SOCCER_MATCH_PRE, 'Basic');
      const layout = layoutFunction({
        ...data,
        liveStreamEnabled: true,
        matchId: null,
      });
      expect(layout[0].type).toBe('DeportesGridSoccerMatchCenterOpening');
      expect(layout[1].type).toBe('CarouselWidget');
    });
  });
});
