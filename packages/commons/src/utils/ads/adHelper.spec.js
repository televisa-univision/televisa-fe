import React from 'react';
import { shallow, mount } from 'enzyme';
import LazyLoad from 'react-lazyload';

import adHelper from './adHelper';
import AdSettings from './adSettings.json';
import * as AdTypes from './ad-types';
import { pageData } from '../../config/storyMocks';
import configUrls from './data/configUrls.json';
import { getKey } from '../helpers';
import * as widgetTypes from '../../constants/widgetTypes';

describe('adHelper getSettings', () => {
  const settings = {
    desktopSettings: {
      sizes: [
        {
          width: 728,
          height: 90,
        },
      ],
      disableRefresh: true,
      position: 'MID',
    },
    tabletSettings: null,
    mobileSettings: {
      sizes: [
        {
          width: 300,
          height: 250,
        },
        {
          width: 320,
          height: 50,
        },
      ],
      position: 'MID',
    },
  };

  it('should return a valid object with right settings', () => {
    expect(Object.keys(adHelper.getSettings(settings)).length).toBeGreaterThan(0);
    const desktopSettings = {
      isSpecialAd: true,
    };
    expect(adHelper.getSettings(desktopSettings).isSpecialAd).toBeTruthy();
  });
  it('should return null if null settings', () => {
    expect(adHelper.getSettings(null)).toEqual({});
  });
  it('should not have position if wrong setting', () => {
    const wrongSetting = {
      desktopSettings: {
        sizes: [
          {
            width: 728,
            height: 90,
          },
        ],
      },
    };
    const output = adHelper.getSettings(wrongSetting);
    expect(output.position).not.toBeDefined();
  });
});

describe('adHelper getVideoSettings', () => {
  const mockData = ['w=300', 'h=250', 'tpcl=DISPLAY', 'ptgt=s', 'cd=300,250'];

  it('should create fw adsettings string', () => {
    expect(adHelper.getVideoSettings(mockData)).toBe('w=300&h=250&tpcl=DISPLAY&ptgt=s&cd=300,250');
  });
  it('should return empty string if null passed', () => {
    expect(adHelper.getVideoSettings(null)).toBe('');
  });
  it('should render FWAd', () => {
    const wrapper = shallow(adHelper.getVideoComp(AdTypes.VIDEO_COMP_AD));
    expect(wrapper.find('#videocompanion').length).toBe(1);
  });
});

describe('adHelper getSledAd', () => {
  it('should return null if not mobile', () => {
    const desktopPageData = Object.assign({}, pageData, { device: 'desktop' });
    expect(adHelper.getSledAd(desktopPageData)).toBe(null);
  });
  it('should return FWAdStandAlone if mobile', () => {
    expect(adHelper.getSledAd(pageData)).not.toBe(null);
  });
});

describe('adHelper getAd', () => {
  it('should return the right ad lazyloaded', () => {
    const wrapper = mount(adHelper.getAd(AdTypes.TOP_AD));
    expect(wrapper.find(LazyLoad).length).toBe(1);
  });
  it('should return the right ad not lazyloaded', () => {
    const wrapper = shallow(adHelper.getAd(AdTypes.TOP_AD, { isLazyLoaded: false }));
    expect(wrapper.find('AdWrapper').length).toBe(1);
  });
  it('should return null if not right ad type provided', () => {
    AdTypes.TEST = 'test';
    AdSettings.test = '';
    expect(adHelper.getAd('TEST')).toBe(null);
  });
});

describe('adHelper inject full width ads', () => {
  it('should return DFPAd component every 4 widgets', () => {
    const widgets = [
      <div key="a">test</div>,
      <div key="b">test</div>,
      <div key="c">test</div>,
      <div key="d">test</div>,
      <div key="e">test</div>,
    ];
    const wrapper = mount(
      <div>{adHelper.injectFullWidthAds({ widgets, type: AdTypes.SLIDESHOW_RIGHT_AD })}</div>
    );
    expect(wrapper.find('DPFAd')).toBeDefined();
  });
  it('should return the same argument if is not array', () => {
    expect(adHelper.injectFullWidthAds('a')).toEqual([]);
  });
  it('should not have more than one full width ad when 8 widgets are available', () => {
    const widgets = [
      <div key="a">test</div>,
      <div key="b">test</div>,
      <div key="c">test</div>,
      <div key="d">test</div>,
      <div key="e">test</div>,
      <div key="f">test</div>,
      <div key="g">test</div>,
      <div key="h">test</div>,
    ];
    const wrapper = mount(
      <div>{adHelper.injectFullWidthAds({ widgets, type: AdTypes.IN_BODY_AD })}</div>
    );
    expect(wrapper.find('.uvs-ad-full-width')).toHaveLength(1);
  });
  it('should render sequenceable ads', () => {
    const widgets = [
      <div key="a">test</div>,
      <div key="b">test</div>,
      <div key="c">test</div>,
      <div key="d">test</div>,
      <div key="e">test</div>,
    ];
    const wrapper = mount(
      <div>{adHelper.injectFullWidthAds({ widgets, type: AdTypes.INTERSTITIAL_AD })}</div>
    );
    expect(wrapper.find('DPFAd')).toBeDefined();
  });
});

describe('adHelper get first ad position', () => {
  it('should return skipList with an empty array by default', () => {
    expect(Array.isArray(adHelper.getSkipTopAdWidgetList())).toBe(true);
    expect(adHelper.getSkipTopAdWidgetList().length).toBe(0);
  });
  it('should set and return null skipList by default', () => {
    adHelper.setSkipTopAdWidgetList();
    expect(adHelper.getSkipTopAdWidgetList()).toHaveLength(0);
  });
  it('should return an empty array if skipList is not set with an array', () => {
    adHelper.setSkipTopAdWidgetList('test');
    expect(Array.isArray(adHelper.getSkipTopAdWidgetList())).toBe(true);
    expect(adHelper.getSkipTopAdWidgetList()).toHaveLength(0);

    adHelper.setSkipTopAdWidgetList(1);
    expect(Array.isArray(adHelper.getSkipTopAdWidgetList())).toBe(true);
    expect(adHelper.getSkipTopAdWidgetList()).toHaveLength(0);

    adHelper.setSkipTopAdWidgetList(true);
    expect(Array.isArray(adHelper.getSkipTopAdWidgetList())).toBe(true);
    expect(adHelper.getSkipTopAdWidgetList()).toHaveLength(0);
  });
  it('should return one item when setting skipList with one item', () => {
    adHelper.setSkipTopAdWidgetList(['Type']);
    expect(adHelper.getSkipTopAdWidgetList()).toHaveLength(1);
  });
  it('should return true by default', () => {
    adHelper.setSkipTopAdWidgetList();
    expect(adHelper.isWidgetWithoutTopAd()).toBe(true);
  });
  it('should return false when a widget is in the types of skipList', () => {
    adHelper.setSkipTopAdWidgetList(['Type']);
    const widget = {
      type: 'Type',
    };
    expect(adHelper.isWidgetWithoutTopAd(widget)).toBe(false);
  });
  it('should return false when a widget has a nextAd setting with "false" value', () => {
    const widget = {
      settings: {
        nextAd: 'false',
      },
    };
    expect(adHelper.isWidgetWithoutTopAd(widget)).toBe(false);
  });
  it('should return true when a widget is not part of the skipList', () => {
    adHelper.setSkipTopAdWidgetList(['Type-2']);
    const widget = {
      type: 'Type-1',
    };
    expect(adHelper.isWidgetWithoutTopAd(widget)).toBe(true);
  });
  it('should return true when a widget has a nextAd setting with other value than "false"', () => {
    const widget = {
      settings: {
        nextAd: 'true',
      },
    };
    expect(adHelper.isWidgetWithoutTopAd(widget)).toBe(true);
  });
  it('should return true when the skip list is null and the widget type is not available', () => {
    adHelper.setSkipTopAdWidgetList(null);
    const widget = {
      a: 'b',
    };
    expect(adHelper.isWidgetWithoutTopAd(widget)).toBe(true);
  });
  it('should return position 1 by default', () => {
    expect(adHelper.getFirstSectionAdPosition()).toBe(1);
  });
  it('should return position 1 with null values', () => {
    expect(adHelper.getFirstSectionAdPosition(null, null)).toBe(1);
  });
  it('should return position 1 with one widget not in the skipList', () => {
    const skipList = ['Type-2'];
    const widgets = [{ type: 'Type-1' }];
    expect(adHelper.getFirstSectionAdPosition(widgets, skipList)).toBe(1);
  });
  it('should return position 2 with first widget in the skipList', () => {
    const skipList = ['Type-2'];
    const widgets = [{ type: 'Type-2' }, { type: 'Type-1' }, { type: 'Type-3' }];
    expect(adHelper.getFirstSectionAdPosition(widgets, skipList)).toBe(2);
  });
  it('should return position 2 with first widget setting nextAd to "false"', () => {
    const skipList = ['Type-2'];
    const widgets = [
      {
        type: 'Type-1',
        settings: {
          nextAd: 'false',
        },
      },
      { type: 'Type-1' },
      { type: 'Type-1' },
    ];
    expect(adHelper.getFirstSectionAdPosition(widgets, skipList)).toBe(2);
  });
  it('should return position 3 with first widget setting nextAd to "false" and second type on skipList', () => {
    const skipList = ['Type-2'];
    const widgets = [
      {
        type: 'Type-1',
        settings: {
          nextAd: 'false',
        },
      },
      { type: 'Type-2' },
      { type: 'Type-1' },
    ];
    expect(adHelper.getFirstSectionAdPosition(widgets, skipList)).toBe(3);
  });
});

describe('adHelper get widgets with top ad', () => {
  it('should return an empty array by default', () => {
    const widgetTypesWithTopAd = adHelper.getWidgetTypesWithTopAd();
    expect(Array.isArray(widgetTypesWithTopAd)).toBe(true);
    expect(widgetTypesWithTopAd).toHaveLength(0);
  });

  it('should return an array after being set', () => {
    const wTypes = ['type-1'];
    adHelper.setWidgetTypesWithTopAd(wTypes);
    const widgetTypesWithTopAd = adHelper.getWidgetTypesWithTopAd();
    expect(Array.isArray(widgetTypesWithTopAd)).toBe(true);
    expect(widgetTypesWithTopAd).toHaveLength(1);
  });

  it('should return an empty array if anything other than an array is set', () => {
    const wTypes = 'type-1';
    adHelper.setWidgetTypesWithTopAd(wTypes);
    const widgetTypesWithTopAd = adHelper.getWidgetTypesWithTopAd();
    expect(Array.isArray(widgetTypesWithTopAd)).toBe(true);
    expect(widgetTypesWithTopAd).toHaveLength(0);
  });
});

describe('adHelper is widget type with top ad', () => {
  it('should return false when no list is set', () => {
    adHelper.setWidgetTypesWithTopAd(null);
    const widget = { type: 'type-1' };
    expect(adHelper.isWidgetTypeWithTopAd(widget)).toBe(false);
  });

  it('should return true when the widget matches the list', () => {
    adHelper.setWidgetTypesWithTopAd(['type-1']);
    const widget = { type: 'type-1' };
    expect(adHelper.isWidgetTypeWithTopAd(widget)).toBe(true);
  });

  it("should return false when the widget doesn't match the list", () => {
    adHelper.setWidgetTypesWithTopAd(['type-1']);
    const widget = { type: 'type-2' };
    expect(adHelper.isWidgetTypeWithTopAd(widget)).toBe(false);
  });

  it("should return false when the widget doesn't have a type", () => {
    adHelper.setWidgetTypesWithTopAd(['type-1']);
    const widget = { a: 'b' };
    expect(adHelper.isWidgetTypeWithTopAd(widget)).toBe(false);
  });
});

describe('adHelper get first ad configuration', () => {
  it('should return TOP ad with lazyload false by default', () => {
    const configuration = adHelper.getFirstAdConfiguration();
    expect(configuration.type).toBe(AdTypes.TOP_AD);
    expect(configuration.lazyload).toBe(false);
  });
  it('should return MID ad with lazyload true when a TOP ad comes from the widget', () => {
    const widgetTypesWithTopAd = ['Type-1'];
    const widgets = [{ type: 'Type-1' }];
    const configuration = adHelper.getFirstAdConfiguration(widgets, widgetTypesWithTopAd);
    expect(configuration.type).toBe(AdTypes.MID_AD);
    expect(configuration.lazyload).toBe(true);
  });
  it('should return MID ad with lazyload true when a TOP ad comes from the widget', () => {
    const widgetTypesWithTopAd = ['Type-1'];
    const widgets = [{ type: 'Type-2' }, { type: 'Type-1' }];
    const configuration = adHelper.getFirstAdConfiguration(widgets, widgetTypesWithTopAd);
    expect(configuration.type).toBe(AdTypes.MID_AD);
    expect(configuration.lazyload).toBe(true);
  });
  it('should return TOP ad with lazyload false if there is a widget on the 3rd position with TOP ad', () => {
    const widgetTypesWithTopAd = ['Type-1'];
    const widgets = [{ type: 'Type-2' }, { type: 'Type-2' }, { type: 'Type-1' }];
    const configuration = adHelper.getFirstAdConfiguration(widgets, widgetTypesWithTopAd);
    expect(configuration.type).toBe(AdTypes.TOP_AD);
    expect(configuration.lazyload).toBe(false);
  });
  it('should return TOP ad with lazy load false when there is no widget with TOP ad', () => {
    const widgetTypesWithTopAd = ['Type-1'];
    const widgets = [
      {
        type: 'Type-2',
      },
    ];
    const configuration = adHelper.getFirstAdConfiguration(widgets, widgetTypesWithTopAd);
    expect(configuration.type).toBe(AdTypes.TOP_AD);
    expect(configuration.lazyload).toBe(false);
  });
});

describe('adHelper getAdTypeByDisplayRule', () => {
  it('should return input ad type when a display rule is not met', () => {
    const config = {
      index: null,
      type: 'TEST',
      displayRules: null,
    };
    const adType = adHelper.getAdTypeByDisplayRule(config);
    expect(adType).toBe(config.type);
  });

  it("should return input ad type when index does not match a display rule's index", () => {
    const config = {
      index: 0,
      type: 'TEST',
      displayRules: {
        type: 'Ad at specified index',
        index: 1,
      },
    };
    const adType = adHelper.getAdTypeByDisplayRule(config);
    // since index does not match the display rule, it should return the normal ad type
    expect(adType).toBe(config.type);
  });

  it('should return the display rule ad type at the specified index', () => {
    const config = {
      index: 1,
      type: 'TEST',
      displayRules: {
        type: 'Ad at specified index',
        index: 1,
      },
    };
    const adType = adHelper.getAdTypeByDisplayRule(config);
    expect(adType).toBe(config.displayRules.type);
  });

  it("should return input ad type when index is not mod of the display rule's every property", () => {
    const config = {
      index: 1,
      type: 'TEST',
      displayRules: {
        type: 'I am % 3 ad',
        every: 3,
      },
    };
    const adType = adHelper.getAdTypeByDisplayRule(config);
    expect(adType).toBe(config.type);
  });

  it("should return the display rule ad type when the index is mod of the display rule's every property", () => {
    const config = {
      index: 2, // zero-based index
      type: 'TEST',
      displayRules: {
        type: 'I am % 3 ad',
        every: 3,
      },
    };
    const adType = adHelper.getAdTypeByDisplayRule(config);
    expect(adType).toBe(config.displayRules.type);
  });
});

describe('adHelper ad interval from url', () => {
  it('should return the default set in config', () => {
    const interval = adHelper.getAdIntervalFromUrl();
    expect(interval).toBe(3);
  });
  it('should return 3 with entretenimiento section', () => {
    const url = 'entretenimiento';
    const interval = adHelper.getAdIntervalFromUrl(url);
    expect(interval).toBe(3);
  });
  it('should return 3 with entretenimiento section', () => {
    const url = '/entretenimiento/horoscopos/content-title';
    const interval = adHelper.getAdIntervalFromUrl(url);
    expect(interval).toBe(3);
  });
  it('should return default interval when URL is not in the config file', () => {
    const url = '/noticias/';
    const interval = adHelper.getAdIntervalFromUrl(url);
    expect(interval).toBe(3);
  });
  // Change this test result in case a portal specific configuration is added
  it('should return portal interval when the URL is /', () => {
    const url = '/';
    const interval = adHelper.getAdIntervalFromUrl(url);
    expect(interval).toBe(3);
  });
});

describe('adHelper get widget data with ads', () => {
  const adHelperMock = adHelper;

  let shouldInjectWidgetsSpy;

  beforeEach(() => {
    shouldInjectWidgetsSpy = jest
      .spyOn(adHelperMock, 'shouldInjectWidgets')
      .mockImplementation(jest.fn());
    adHelperMock.shouldInjectWidgets.mockReturnValue(false);
  });

  afterEach(() => {
    shouldInjectWidgetsSpy.mockRestore();
  });

  it('should return an empty array by default', () => {
    const data = adHelperMock.getWidgetDataWithAds();
    expect(data).toHaveLength(0);
  });
  it('should return an array with ads inserted', () => {
    adHelperMock.shouldInjectWidgets.mockReturnValue(true);
    const data = {
      widgets: Array(6).fill({
        contents: [1],
      }),
      url: 'deportes/futbol',
    };
    const result = adHelperMock.getWidgetDataWithAds(data);
    expect(result).toHaveLength(8);
  });
  it('should return an ad on the 4th position', () => {
    adHelperMock.shouldInjectWidgets.mockReturnValue(true);
    const data = {
      widgets: Array(6).fill({
        contents: [1],
      }),
      typesWithTopAd: ['Type-1'],
      skipList: ['Type-1'],
      url: 'deportes/futbol',
    };
    data.widgets.fill({ type: 'Type-1', contents: [1] }, 0, 1);
    const result = adHelper.getWidgetDataWithAds(data);
    expect(result).toHaveLength(7);
    expect(result[3].type).toBe('SectionAd');
  });
  it('should return an ad on the 3rd position', () => {
    const data = {
      widgets: Array(6).fill({
        contents: [1],
      }),
      typesWithTopAd: ['Type-1'],
      skipList: ['Type-1', 'Banner'],
      url: 'deportes/futbol',
    };
    data.widgets.fill({ type: 'Banner', contents: [1] }, 0, 1);
    data.widgets.fill({ type: 'Banner', contents: [1] }, 0, 1);
    const result = adHelper.getWidgetDataWithAds(data);
    expect(result[2].type).toBe('SectionAd');
  });
  it('should return 2 ads when widgets with no content are present', () => {
    adHelperMock.shouldInjectWidgets.mockReturnValue(true);
    const data = {
      widgets: Array(6).fill({
        contents: [1],
      }),
      intervalOverride: 3,
      url: 'deportes/futbol',
    };
    data.widgets.fill({ contents: [] }, 0, 1);
    const result = adHelperMock.getWidgetDataWithAds(data);
    expect(result).toHaveLength(8);
    expect(result[2].type).toBe('SectionAd');
  });
  it('should return the original array with no ads', () => {
    adHelperMock.shouldInjectWidgets.mockReturnValue(true);
    const data = {
      widgets: Array(6).fill({ contents: [] }),
      url: 'deportes/futbol',
    };
    const result = adHelperMock.getWidgetDataWithAds(data);
    expect(result).toHaveLength(6);
  });
  it('should insert an ad after the third widget', () => {
    const data = {
      widgets: Array(6).fill({
        contents: [1],
      }),
      intervalOverride: 3,
      topAdInserted: true,
    };
    const result = adHelperMock.getWidgetDataWithAds(data);
    expect(result).toHaveLength(7);
    expect(result[3].type).toBe('SectionAd');
  });
  it('should return ads with display rules for desktop', () => {
    adHelperMock.shouldInjectWidgets.mockReturnValue(true);
    const data = {
      widgets: Array(6).fill({
        contents: [1],
      }),
      device: 'desktop',
    };
    const result = adHelperMock.getWidgetDataWithAds(data);
    const sectionAd = result.find(x => x.type === 'SectionAd');
    expect(sectionAd).not.toBeUndefined();
    expect(getKey(sectionAd, 'settings.displayRules', null)).not.toBeNull();
  });
});

describe('adHelper inject ad', () => {
  it('should return an empty array by default', () => {
    const data = adHelper.injectAdsToData();
    expect(data).toHaveLength(0);
  });
  it('should add 2 units', () => {
    const widgets = Array(5).fill({ contents: [1] });
    const data = adHelper.injectAdsToData({ widgets });
    expect(data).toHaveLength(7);
  });
  it('should add 1 unit', () => {
    const widgets = Array(5).fill({ contents: [] });
    widgets.fill({ contents: [1] }, 0, 1);
    const data = adHelper.injectAdsToData({ widgets });
    expect(data).toHaveLength(6);
  });
  it('should add no units', () => {
    const widgets = Array(5).fill({ contents: [] });
    const data = adHelper.injectAdsToData({ widgets, insertFirstPosition: false });
    expect(data).toHaveLength(5);
  });
  it('should take the custom interval', () => {
    const widgets = Array(6).fill({ contents: [1] });
    const data = adHelper.injectAdsToData({ widgets, adInterval: 2 });
    expect(data).toHaveLength(9);
  });
});

describe('adHelper widget has content', () => {
  it('should return false by default', () => {
    const hasContent = adHelper.widgetHasContent();
    expect(hasContent).toBe(false);
  });
  it('should return true when the widget has contents', () => {
    const hasContent = adHelper.widgetHasContent({ contents: [1] });
    expect(hasContent).toBe(true);
  });
  it('should return true when type is DeportesCardSoccerMatchScorecells', () => {
    const hasContent = adHelper.widgetHasContent({ type: 'DeportesCardSoccerMatchScorecells' });
    expect(hasContent).toBe(true);
  });
  it('should return true when type is DeportesGridSoccerStandings', () => {
    const hasContent = adHelper.widgetHasContent({ type: 'DeportesGridSoccerStandings' });
    expect(hasContent).toBe(true);
  });
  it('should return true when type is AllCountdownTimer', () => {
    const hasContent = adHelper.widgetHasContent({ type: 'AllCountdownTimer' });
    expect(hasContent).toBe(true);
  });
  it('should return true when type is AllExternalEmbed and has an url set', () => {
    const widget = {
      type: 'AllExternalEmbed',
      settings: {
        url: 'http://test.com',
      },
    };
    const hasContent = adHelper.widgetHasContent(widget);
    expect(hasContent).toBe(true);
  });
  it('should return false when type is AllExternalEmbed and has no url set', () => {
    const widget = {
      type: 'AllExternalEmbed',
    };
    const hasContent = adHelper.widgetHasContent(widget);
    expect(hasContent).toBe(false);
  });
  it('should return true for lazy loaded widgets', () => {
    const widget = {
      type: 'Test',
      settings: {
        lazyLoaded: true,
      },
    };
    const hasContent = adHelper.widgetHasContent(widget);
    expect(hasContent).toBe(true);
  });
  it('should return always true when type is DeportesSoccerLive', () => {
    const widget = {
      type: 'DeportesSoccerLive',
    };
    const hasContent = adHelper.widgetHasContent(widget);
    expect(hasContent).toBe(true);
  });
});

describe('adHelper widgetsWithTopAds', () => {
  it('should return true for some stat widgets', () => {
    const widget = {
      type: widgetTypes.DEPORTES_SOCCER_TEAM_SQUAD,
    };
    expect(adHelper.widgetsWithTopAds(widget)).toBeTruthy();
  });
  it('should return true for some deportes brackets', () => {
    const widget = {
      type: widgetTypes.DEPORTES_SOCCER_BRACKETS,
    };
    expect(adHelper.widgetsWithTopAds(widget)).toBeTruthy();
  });
  it('should return true if widget has cms content', () => {
    const widget = {
      type: 'test',
      contents: ['a', 'b', 'c'],
    };
    expect(adHelper.widgetsWithTopAds(widget)).toBeTruthy();
  });
  it('should return false if widget has cms content but its small', () => {
    const widget = {
      type: widgetTypes.TOP_QUICK_LINKS,
      contents: ['a', 'b', 'c'],
    };
    expect(adHelper.widgetsWithTopAds(widget)).toBeFalsy();
  });
});

describe('adHelper get key data url', () => {
  it('should return the default configuration', () => {
    const { interval, injectWidgets } = configUrls.default;
    const conf = adHelper.getKeyDataUrl();
    expect(conf.interval).toBe(interval);
    expect(conf.injectWidgets).toBe(injectWidgets);
  });
  it('should return the entretenimiento configuration', () => {
    const { interval, injectWidgets } = configUrls['entretenimiento/*'];
    const conf = adHelper.getKeyDataUrl('entretenimiento/test-article');
    expect(conf.interval).toBe(interval);
    expect(conf.injectWidgets).toBe(injectWidgets);
  });
  it('should return the portal configuration', () => {
    const { interval, injectWidgets } = configUrls.portal;
    const conf = adHelper.getKeyDataUrl('/');
    expect(conf.interval).toBe(interval);
    expect(conf.injectWidgets).toBe(injectWidgets);
  });
});

describe('adHelper should inject widgets', () => {
  it('should return false by default', () => {
    const { injectWidgets } = configUrls.default;
    const conf = adHelper.shouldInjectWidgets();
    expect(conf).toBe(injectWidgets);
  });
  it('should return the entretenimiento configuration', () => {
    const { injectWidgets } = configUrls['entretenimiento/*'];
    const conf = adHelper.shouldInjectWidgets('entretenimiento/test');
    expect(conf).toBe(injectWidgets);
  });
});

describe('adHelper getAdDefinition', () => {
  it('should the right ad definition', () => {
    const definition = {
      type: widgetTypes.ADVERTISEMENT,
      settings: {
        type: 'test',
        isLazyLoaded: true,
        hasBg: true,
        trackingValue: 'top',
      },
    };
    const def = adHelper.getAdDefinition('test', 'top');
    expect(def).toEqual(definition);
  });
});
