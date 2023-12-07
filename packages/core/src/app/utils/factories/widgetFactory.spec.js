import React from 'react';
import { shallow, mount } from 'enzyme';
import Loadable from 'react-loadable';
import LazyLoad from 'react-lazyload';
import { Provider } from 'react-redux';

import Store from '@univision/fe-commons/dist/store/store';
import ServerSideLazyLoad from '@univision/fe-commons/dist/components/LazyLoad';
import * as storeHelpers from '@univision/fe-commons/dist/store/storeHelpers';
import * as WidgetTypes from '@univision/fe-commons/dist/constants/widgetTypes';

import PageApi from 'server/proxy/api/page/__mocks__/PageApi';
import {
  getGenericWidget,
  getWidget,
  parseWidgets,
  shouldLazyLoadWidget,
  parseWidgetsWithAds,
  renderWidget,
  serverSideLazyLoad,
  clientSideLazyLoad,
} from './widgetFactory';
import mockData from './data/mockData.json';
import appConfig from '../../config';

jest.mock('@univision/fe-components-base/dist/components/NotificationBanner', () => ({
  __esModule: true,
  default: 'NotificationBanner',
}));

jest.mock('@univision/fe-commons/dist/utils/api/content/fetch', () => jest.fn());

describe('widgetFactory Spec', () => {
  let mockApiData = {};

  beforeAll(async (done) => {
    mockApiData = await PageApi.getPage('test');
    done();
  });

  beforeEach(() => {
    jest.spyOn(storeHelpers, 'getDevice').mockReturnValue('mobile');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render the widget with name = "AltoImpacto"', async () => {
    const widgetData = mockApiData.data.widgets[30];
    widgetData.type = 'AltoImpacto';
    const widget = shallow(<div>{getWidget(widgetData, 1, {})}</div>);
    await Loadable.preloadAll();
    expect(widget.children().dive().find(widgetData.type).length).toBe(1);
  });

  it('should render the widget with name = "ImageItems"', async () => {
    const widgetData = mockApiData.data.widgets[1];
    const widget = shallow(<div>{getWidget(widgetData, 1, {})}</div>);
    await Loadable.preloadAll();
    expect(widget.children().dive().find(widgetData.type).length).toBe(1);
  });

  it('should render the widget with name = "FourVideoCarousel"', async () => {
    const widgetData = mockApiData.data.widgets[0];
    widgetData.type = 'FourVideoCarousel';
    const widget = shallow(<div>{getWidget(widgetData, 1, {})}</div>);
    await Loadable.preloadAll();
    expect(widget.children().dive().find('ContentCarousel').length).toBe(1);
  });

  it('should render the widget with name = "StationByGenreList"', async () => {
    const widgetData = mockApiData.data.widgets[26];
    const widget = shallow(<div>{getWidget(widgetData, 1, {})}</div>);
    await Loadable.preloadAll();
    expect(widget.children().dive().find('StationByGenreList').length).toBe(1);
  });

  it('should render the widget with the name = "VideoWithPlaylist"', async () => {
    const widgetData = mockApiData.data.widgets[29];
    widgetData.settings.genericWidget.type = 'VideoWithPlaylist';
    const widget = shallow(<div>{getGenericWidget(widgetData, 1, {})}</div>);
    await Loadable.preloadAll();
    expect(widget.children().dive().find('Connect(VideoWithPlaylistComponent)').length).toBe(1);
  });

  it('should render the widget with name = "NationalRadioShowModule"', async () => {
    const widgetData = mockApiData.data.widgets[33];
    const widget = shallow(<div>{getWidget(widgetData, 1, {})}</div>);
    await Loadable.preloadAll();
    expect(widget.children().dive().find('RadioShow').length).toBe(1);
  });

  it('should render the widget with name = "SixItems"', async () => {
    const widgetData = mockApiData.data.widgets[34];
    const widget = mount(<Provider store={Store}>{getWidget(widgetData, 1, {})}</Provider>);
    await Loadable.preloadAll();
    widget.update();
    expect(widget.find('SixItems').length).toBe(1);
  });

  it('should render the widget with name = "FourItems"', async () => {
    const widgetData = mockApiData.data.widgets[35];
    const widget = mount(<div>{getWidget(widgetData, 1, {})}</div>);
    await Loadable.preloadAll();
    widget.update();
    expect(widget.find('FourItems').length).toBe(1);
  });

  it('should render the widget with name = "PromoCardWidget"', async () => {
    const widgetData = mockApiData.data.widgets[31];
    widgetData.type = 'PromoCardWidget';
    const widget = shallow(<div>{getWidget(widgetData, 1, {})}</div>);
    await Loadable.preloadAll();
    expect(widget.children().dive().find('PromoCard').length).toBe(1);
  });

  it('should render the widget with name = "CountdownTimer"', async () => {
    const widgetData = mockApiData.data.widgets[37];
    widgetData.type = 'CountdownTimer';
    const widget = shallow(<div>{getWidget(widgetData, 1, {})}</div>);
    await Loadable.preloadAll();
    expect(widget.children().dive().find('Countdown').length).toBe(1);
  });

  it('should render the widget with name = "RadioShowCardWidget"', async () => {
    const widgetData = mockApiData.data.widgets[38];
    widgetData.type = 'RadioShowCardWidget';
    const widget = shallow(<div>{getWidget(widgetData, 1, {})}</div>);
    await Loadable.preloadAll();
    expect(widget.children().dive().find('RadioShowCard').length).toBe(1);
  });

  it('should render the widget with name = "FeaturedRadioStations"', async () => {
    const widgetData = mockApiData.data.widgets[27];
    const widget = shallow(<div>{getGenericWidget(widgetData, 1, {})}</div>);
    await Loadable.preloadAll();
    expect(widget.children().dive().find('FeaturedStations').length).toBe(1);
  });

  it('should not render the widget with name = "MovingBanner"', () => {
    const widgetData = mockApiData.data.widgets[0];
    widgetData.type = 'MovingBanner';
    expect(getWidget(widgetData, 1, {})).toBe(null);
  });

  it('should render the default widget when the widget type is unknown', async () => {
    const widgetData = mockApiData.data.widgets[0];
    widgetData.type = 'unknownWidgetType';
    const widget = shallow(<div>{getWidget(widgetData, 1, {})}</div>);
    await Loadable.preloadAll();
    expect(widget.children().dive().find('ContentCarousel').length).toBe(1);
  });

  it('should render the widget with name = "RadioStationScheduleWidget"', async () => {
    const widgetData = {
      type: 'RadioStationScheduleWidget',
      settings: {
        radioSchedule: [],
      },
    };
    const widget = shallow(<div>{getWidget(widgetData, 1, {})}</div>);
    await Loadable.preloadAll();
    expect(widget.children().dive().find('AbacastSchedule').length).toBe(1);
  });

  it('should render the widget with name = "RadioBannerStationSchedule"', async () => {
    const widgetData = {
      type: 'RadioBannerStationSchedule',
      settings: {
        radioSchedule: [],
      },
    };
    const widget = shallow(<div>{getWidget(widgetData, 1, {})}</div>);
    await Loadable.preloadAll();
    expect(widget.children().dive().find('AbacastSchedule').length).toBe(1);
  });

  it('should render the widget with name = "NotificationBanner"', async () => {
    const widgetData = mockApiData.data.widgets[38];
    widgetData.type = 'NotificationBanner';
    const widget = shallow(<div>{getWidget(widgetData, 1, {})}</div>);
    await Loadable.preloadAll();
    expect(widget.children().dive().find(widgetData.type).length).toBe(1);
  });

  it('should render the widget with name = "FeaturedItemCarousel"', async () => {
    const widgetData = { type: 'FeaturedItemCarousel' };
    const widget = shallow(<div>{getWidget(widgetData, 1, {})}</div>);
    await Loadable.preloadAll();
    expect(widget.children().dive().find('FeaturedCardCarousel').length).toBe(1);
  });

  it('should render the widget with name = "HoroscoposInteractiveChineseHoroscopes"', async () => {
    const widgetData = { type: 'HoroscoposInteractiveChineseHoroscopes' };
    const widget = shallow(<div>{getWidget(widgetData, 1, {})}</div>);
    await Loadable.preloadAll();
    expect(widget.children().dive().find('Horoscope').length).toBe(1);
  });

  it('should render the widget with name = "HoroscoposInteractiveLoveCalculator"', async () => {
    const widgetData = { type: 'HoroscoposInteractiveLoveCalculator' };
    const widget = shallow(<div>{getWidget(widgetData, 1, {})}</div>);
    await Loadable.preloadAll();
    expect(widget.children().dive().find('LoveCalculator').length).toBe(1);
  });

  it('should render the widget with name = "NoticiasCardLottery"', async () => {
    const widgetData = { type: 'NoticiasCardLottery' };
    const widget = shallow(<div>{getWidget(widgetData, 1, {})}</div>);
    await Loadable.preloadAll();
    expect(widget.children().dive().find('Lottery').length).toBe(1);
  });

  it('should render the widget with name = "NoticiasCardWeatherMaps"', async () => {
    const widgetData = { type: 'NoticiasCardWeatherMaps' };
    const widget = shallow(<div>{getWidget(widgetData, 1, {})}</div>);
    await Loadable.preloadAll();
    expect(widget.children().dive().find('WeatherMaps').length).toBe(1);
  });

  it('should render the widget with name = "NoticiasCardWeatherGraphics"', async () => {
    const widgetData = { type: 'NoticiasCardWeatherGraphics' };
    const widget = shallow(<div>{getWidget(widgetData, 1, {})}</div>);
    await Loadable.preloadAll();
    expect(widget.children().dive().find('WeatherGraphics').length).toBe(1);
  });

  it('should render the widget with name = "NoticiasCardWeatherConditions"', async () => {
    const widgetData = { type: 'NoticiasCardWeatherConditions' };
    const widget = shallow(<div>{getWidget(widgetData, 1, {})}</div>);
    await Loadable.preloadAll();
    expect(widget.children().dive().find('WeatherConditions').length).toBe(1);
  });

  it('should render the widget with name = "NoticiasCardTropicalWeatherConditions"', async () => {
    const widgetData = { type: 'NoticiasCardTropicalWeatherConditions' };
    const widget = shallow(<div>{getWidget(widgetData, 1, {})}</div>);
    await Loadable.preloadAll();
    expect(widget.children().dive().find('WeatherTropicalConditions').length).toBe(1);
  });

  it('should render the widget with name = "StationByGenreList"', async () => {
    const widgetData = { type: 'RadioGridStationsbyGenreFilter', settings: { tags: null } };
    const widget = shallow(<div>{getWidget(widgetData, 1, {})}</div>);
    await Loadable.preloadAll();
    expect(widget.children().dive().find('StationByGenreList').length).toBe(1);
  });

  it('should render the widget with name = "CarouselWidget"', async () => {
    const widgetData = {
      type: WidgetTypes.CAROUSEL_WIDGET,
      contents: [{
        type: 'article',
      }],
    };
    const widget = shallow(<div>{getWidget(widgetData, 1, {})}</div>);
    await Loadable.preloadAll();
    expect(
      widget
        .children()
        .dive()
        .find('Connect(CardsCarousel)').length
    ).toBe(1);
  });

  it('should not crash when rendering "CarouselWidget" with no content', async () => {
    const widgetData = {
      type: WidgetTypes.CAROUSEL_WIDGET,
      contents: null,
    };
    const widget = shallow(<div>{getWidget(widgetData, 1, {})}</div>);
    await Loadable.preloadAll();
    expect(
      widget
        .children()
        .dive()
        .find('Connect(CardsCarousel)').length
    ).toBe(1);
  });

  it('should render the widget with name = "AllLocalNewsCarousel"', async () => {
    const widgetData = {
      type: WidgetTypes.ALL_LOCAL_NEWS_CAROUSEL,
      contents: [{
        type: 'article',
      }],
    };
    const widget = shallow(<div>{getWidget(widgetData, 1, {})}</div>);
    await Loadable.preloadAll();

    expect(
      widget
        .children()
        .dive()
        .find('Connect(LocalNewsCarousel)').length
    ).toBe(1);
  });

  it('should not crash when rendering "AllLocalNewsCarousel" with no content', async () => {
    const widgetData = {
      type: WidgetTypes.ALL_LOCAL_NEWS_CAROUSEL,
      contents: null,
    };
    const widget = shallow(<div>{getWidget(widgetData, 1, {})}</div>);
    await Loadable.preloadAll();
    expect(
      widget
        .children()
        .dive()
        .find('Connect(LocalNewsCarousel)').length
    ).toBe(1);
  });

  it('Should not crash when rendering "LocalOpening"', async () => {
    const widgetData = {
      type: WidgetTypes.LOCAL_OPENING,
      contents: [{
        type: 'article',
      }],
    };
    const widget = shallow(<div>{getWidget(widgetData, 1, {})}</div>);
    await Loadable.preloadAll();
    expect(
      widget
        .children()
        .dive()
        .find('Memo(WithNativeMarker)')
        .dive()
        .find(WidgetTypes.LOCAL_OPENING).length
    ).toBe(1);
  });

  it('should render default generic widget', async () => {
    const widget = shallow(<div>{getGenericWidget({}, 1)}</div>);
    await Loadable.preloadAll();
    expect(widget.children().dive().find('ContentCarousel').length).toBe(1);
  });

  describe('parseWidgets Spec', () => {
    it('should return empty div when not widgets in data', () => {
      const nonDefinedWidgets = Object.assign({}, mockApiData.data);
      delete nonDefinedWidgets.widgets;
      const widgetsArray = parseWidgets(nonDefinedWidgets);
      const widget = shallow(widgetsArray[0]);
      expect(widget.contains(<div />)).toBe(true);
    });

    it('should return empty div when widgets equal null', () => {
      const nonArrayWidgets = Object.assign({}, mockApiData.data, { widgets: {} });
      const widgetsArray = parseWidgets(nonArrayWidgets);
      const widget = shallow(widgetsArray[0]);
      expect(widget.contains(<div />)).toBe(true);
    });

    it('should return array when widgets provided on data', () => {
      const widgetsArray = parseWidgets(mockApiData.data);
      expect(widgetsArray.length).toBeGreaterThan(1);
    });

    it('should use the server-side lazyload', () => {
      mockApiData.data.widgets[1].settings.lazyLoaded = true;
      const widgetsArray = parseWidgets(mockApiData.data);
      const wrapper = shallow(widgetsArray[1]);
      expect(wrapper.type()).toBe(ServerSideLazyLoad);
    });

    it('should render placeholder for widgets encompassing first 25 content items', () => {
      let contentCounter = 0;
      const widgetsArray = parseWidgets(mockApiData.data);
      const wrapper = mount(<div>{widgetsArray}</div>);
      const lazyLoadedWidgets = wrapper.find('LazyLoad');

      lazyLoadedWidgets.forEach((lazyLoadedWidget) => {
        if (!lazyLoadedWidget.contents) return;

        if (contentCounter < appConfig.features.section.seoContentItemsCount) {
          // Placeholders are just react function components
          expect(
            lazyLoadedWidget
              .props().placeholder.type.name === 'WidgetPlaceholder'
          );
          contentCounter += 1;
        } else {
          expect(lazyLoadedWidget.props().placeholder === null);
        }
      });
    });
  });

  describe('shouldLazyLoadWidget', () => {
    it('should return false for Advertisement', () => {
      const widget = {
        settings: {
          genericWidget: { type: 'Advertisement' },
        },
      };
      expect(shouldLazyLoadWidget({ widget })).toBe(false);
    });

    it('should return false for Section Ad', () => {
      const widget = {
        settings: {
          genericWidget: { type: 'SectionAd' },
        },
      };
      expect(shouldLazyLoadWidget({ widget })).toBe(false);
    });

    it('should return false for first widget on mobile', () => {
      const widget = {
        type: 'RadioShowCardWidget',
      };
      expect(shouldLazyLoadWidget({ widget, widgetPosition: 0 })).toBe(false);
    });

    it('should return false for second widget on mobile', () => {
      const widget = {
        type: 'RadioShowCardWidget',
      };
      expect(shouldLazyLoadWidget({ widget, widgetPosition: 1 })).toBe(false);
    });

    it('should return true for all widgets after the second one on mobile', () => {
      const widget = {
        type: 'RadioShowCardWidget',
      };
      expect(shouldLazyLoadWidget({ widget, widgetPosition: 2 })).toBe(true);
    });

    it('should return false for first widget on desktop', () => {
      jest.spyOn(storeHelpers, 'isDesktop').mockReturnValue(true);
      const widget = {
        type: 'RadioShowCardWidget',
      };
      expect(shouldLazyLoadWidget({ widget, widgetPosition: 0 })).toBe(false);
    });

    it('should return false for second widget on desktop', () => {
      jest.spyOn(storeHelpers, 'isDesktop').mockReturnValue(true);
      const widget = {
        type: 'RadioShowCardWidget',
      };
      expect(shouldLazyLoadWidget({ widget, widgetPosition: 1 })).toBe(false);
    });

    it('should return false for third widget on desktop', () => {
      jest.spyOn(storeHelpers, 'isDesktop').mockReturnValue(true);
      const widget = {
        type: 'RadioShowCardWidget',
      };
      expect(shouldLazyLoadWidget({ widget, widgetPosition: 2 })).toBe(false);
    });

    it('should return true for all widgets after the third one on desktop', () => {
      jest.spyOn(storeHelpers, 'isDesktop').mockReturnValue(true);
      const widget = {
        type: 'RadioShowCardWidget',
      };
      expect(shouldLazyLoadWidget({ widget, widgetPosition: 3 })).toBe(true);
    });
  });

  describe('SectionWithAds spec', () => {
    let isTopAdInsertedSpy;
    let getPageCategorySpy;

    beforeEach(() => {
      isTopAdInsertedSpy = jest.spyOn(storeHelpers, 'isTopAdInserted');
      getPageCategorySpy = jest.spyOn(storeHelpers, 'getPageCategory');
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should parse widgets without crashing', () => {
      const { data } = mockData;
      const section = parseWidgetsWithAds(data);
      expect(section).toHaveLength(4);
    });
    it('should dispatch an action when a widget above has a top ad', () => {
      getPageCategorySpy.mockImplementation(() => 'autos');
      isTopAdInsertedSpy.mockImplementation(() => true);
      const data = {
        ...mockData.data,
        widgets: [
          { type: 'Type-2' },
          { type: 'Type-3' },
          { type: 'Type-4' },
        ],
        uri: '/noticias/autos',
      };
      spyOn(Store, 'dispatch');
      parseWidgetsWithAds(data);
      expect(Store.dispatch).toHaveBeenCalled();
    });
  });

  describe('renderWidget', () => {
    it('should render the widget', () => {
      const wrapper = shallow(renderWidget({}, {}, 1));
      expect(wrapper.find('.widget')).toHaveLength(1);
    });
  });

  describe('serverSideLazyLoad', () => {
    it('should render the server-side lazy loaded widget', async () => {
      const widget = serverSideLazyLoad({}, {}, 1);
      const wrapper = shallow(serverSideLazyLoad({}, {}, 1));
      expect(widget.type).toBe(ServerSideLazyLoad);
      expect(wrapper.find('VisibilitySensor')).toHaveLength(1);
      wrapper.instance().onVisible(true);
      await wrapper.instance().load();
      wrapper.update();
    });
  });

  describe('clientSideLazyLoad', () => {
    it('should render the client-side lazy loaded widget', () => {
      expect(clientSideLazyLoad({}, {}, 1, false).type).toBe(LazyLoad);
    });
  });
});
