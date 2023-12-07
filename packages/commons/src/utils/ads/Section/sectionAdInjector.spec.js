import * as widgetTypes from '../../../constants/widgetTypes';
import * as pageCategory from '../../../constants/pageCategories';
import SectionAdInjector from './sectionAdInjector';

const pageData = {
  data: {
    widgets: [
      {
        type: widgetTypes.DEPORTES_SCORE_CELLS,
      },
      {
        type: widgetTypes.GRID_WIDGET,
        contents: ['a', 'b', 'c'],
      },
      {
        type: widgetTypes.CAROUSEL_WIDGET,
        contents: ['a', 'b', 'c'],
      },
      {
        type: widgetTypes.GRID_WIDGET,
        contents: ['a', 'b', 'c'],
      },
      {
        type: widgetTypes.CAROUSEL_WIDGET,
        contents: ['a', 'b', 'c'],
      },
      {
        type: widgetTypes.GRID_WIDGET,
        contents: ['a', 'b', 'c'],
      },
    ],
  },
  device: 'mobile',
};

describe('SectionAdInjector.insertTopAd', () => {
  it('should add ad after the first content widget if not grid', () => {
    const injector = new SectionAdInjector({ ...pageData, device: 'desktop' });
    const ads = injector.insertTopAd(pageData.data.widgets);
    expect(ads.initialWidgetsWithAd).toHaveLength(3);
    expect(ads.initialWidgetsWithAd[2].type).toBe('Advertisement');
    expect(ads.restWithoutAds).toHaveLength(4);
  });

  it('should not add ad after the first content widget if is grid and mobile', () => {
    const injector = new SectionAdInjector({ ...pageData, device: 'mobile' });
    const ads = injector.insertTopAd(pageData.data.widgets);
    expect(ads.initialWidgetsWithAd).toHaveLength(0);
    expect(ads.restWithoutAds).toHaveLength(6);
  });
});

describe('SectionAdInjector.insertIntervalAds', () => {
  const injector = new SectionAdInjector(pageData);
  it('should inject ads in right possition', () => {
    const widgetsWithAds = injector.insertIntervalAds([...new Array(15)].fill(1));
    expect(widgetsWithAds.filter(w => w.type === 'Advertisement')).toHaveLength(4);
    expect(widgetsWithAds.filter(w => w.type === 'Advertisement')).toHaveLength(4);
    expect(widgetsWithAds[5]).toBe(1);
    // Validate last item is not and ad
    expect(widgetsWithAds[widgetsWithAds.length - 1]).toBe(1);
  });

  it('should inject ads in right possition when desktop device', () => {
    const newinjector = new SectionAdInjector({ ...pageData, device: 'desktop' });
    const widgetsWithAds = newinjector.insertIntervalAds([...new Array(15)].fill(1));
    expect(widgetsWithAds.filter(w => w.type === 'Advertisement')).toHaveLength(5);
    expect(widgetsWithAds.filter(w => w.type === 'Advertisement')).toHaveLength(5);
    expect(widgetsWithAds[5]).toBe(1);
    // Validate last item is not and ad
    expect(widgetsWithAds[widgetsWithAds.length - 1]).toBe(1);
  });

  it('should return empry array not valid argument', () => {
    const widgetsWithAds = injector.insertIntervalAds([]);
    expect(widgetsWithAds).toHaveLength(0);
  });
});

describe('SectionAdInjector.wigetWidgetsWithAds()', () => {
  it('should return empty array if page data is not valid', () => {
    const injector = new SectionAdInjector({});
    expect(injector.getWidgetsWithAds()).toHaveLength(0);
  });
  it('should add appropriated number of ads', () => {
    const injector = new SectionAdInjector(pageData);
    const ads = injector.getWidgetsWithAds();
    expect(ads).toHaveLength(7);
  });
});

describe('SectionAdInjector.shouldInjectTopAd()', () => {
  it('should not inject section top ad if there is a grid widget at top', () => {
    const injector = new SectionAdInjector(pageData);
    expect(injector.shouldInjectTopAd(pageData.data.widgets)).toBe(false);
  });
  it('should inject section top ad if there not a grid widget at top', () => {
    const injector = new SectionAdInjector(pageData);
    expect(injector.shouldInjectTopAd([])).toBe(true);
  });
});

describe('SectionAdInjector.getCustomRules()', () => {
  it('should return customs ads positions', () => {
    const customData = {
      ...pageData,
      pageCategory: pageCategory.UFORIA_HANGOUT,
    };
    const injector = new SectionAdInjector(customData);
    expect(injector.getWidgetsWithAds()).toHaveLength(8);
  });
  it('should return customs ads without outbounds', () => {
    const customData = {
      ...pageData,
      pageCategory: pageCategory.UFORIA_HANGOUT,
      data: {
        ...pageData.data,
        widgets: [pageData.data.widgets[0]],
      },
    };
    const injector = new SectionAdInjector(customData);
    expect(injector.getWidgetsWithAds()).toHaveLength(2);
  });
  it('should exit early if ad is not a valid object', () => {
    const customData = {
      ...pageData,
      pageCategory: pageCategory.UFORIA_HANGOUT,
    };
    const adOverrides = jest.requireActual('./adOverrides').default;
    adOverrides[pageCategory.UFORIA_HANGOUT] = ['foo'];
    const injector = new SectionAdInjector(customData);
    expect(injector.getWidgetsWithAds()).toHaveLength(6);
  });
});
