import React from 'react';
import { shallow, mount } from 'enzyme';
import LazyLoad from 'react-lazyload';
import preloadAll from 'jest-next-dynamic';

import * as WidgetTypes from '@univision/fe-commons/dist/constants/widgetTypes';
import { CROSS_VERTICAL_LIST } from '@univision/fe-commons/dist/constants/widgetTypes';

import WidgetFactory from '.';
import mockData from '../../../../__mocks__/uvnPageData.json';

jest.mock('../../../components/base/LazyWidget');

describe('widgetFactory shouldLazyLoadWidget', () => {
  beforeAll(async () => {
    await preloadAll();
  });

  it('should return true or false depending on device and position', () => {
    const device = 'mobile';
    const SectionWidgetsFactory = new WidgetFactory({ device });
    const widget = {
      type: WidgetTypes.GRID_WIDGET,
    };
    SectionWidgetsFactory.serverRenderCount = 0;
    expect(SectionWidgetsFactory.shouldLazyLoadWidget(widget)).toBe(false);
    expect(SectionWidgetsFactory.shouldLazyLoadWidget({
      type: WidgetTypes.ALL_EXTERNAL_EMBED,
    })).toBe(true);
    SectionWidgetsFactory.serverRenderCount = 0;
    expect(SectionWidgetsFactory.shouldLazyLoadWidget({
      type: WidgetTypes.ALL_EXTERNAL_EMBED,
    })).toBe(false);
    SectionWidgetsFactory.device = 'desktop';
    SectionWidgetsFactory.serverRenderCount = 0;
    expect(SectionWidgetsFactory.shouldLazyLoadWidget(widget)).toBe(false);
    expect(SectionWidgetsFactory.shouldLazyLoadWidget(widget)).toBe(false);
    expect(SectionWidgetsFactory.shouldLazyLoadWidget(widget)).toBe(true);
  });
});

describe('widgetFactory getLazyLoadedWidgets', () => {
  it('should return the widgets to be lazyloaded only', () => {
    const contents = ['a', 'b', 'c'];
    const widgets = [
      {
        contents,
      },
      {
        contents,
      },
      {
        contents,
      },
      {
        settings: {
          lazyLoaded: true,
        },
      },
    ];
    const pageData = {
      data: {
        widgets,
      },
      device: 'mobile',
    };
    const SectionWidgetsFactory = new WidgetFactory(pageData);
    expect(SectionWidgetsFactory.getLazyLoadedWidgets()).toHaveLength(2);
    SectionWidgetsFactory.device = 'desktop';
    expect(SectionWidgetsFactory.getLazyLoadedWidgets()).toHaveLength(1);
  });
  it('should return empty array if not valid widgets list widgets', () => {
    const pageData = {
      data: {},
      device: 'mobile',
    };
    const SectionWidgetsFactory = new WidgetFactory(pageData);
    expect(SectionWidgetsFactory.getLazyLoadedWidgets()).toHaveLength(0);
  });
});

describe('widgetFactory getWidgetTheme', () => {
  it('should return appropriate theme', () => {
    const defaultTheme = {
      color: 'green',
    };
    const SectionWidgetsFactory = new WidgetFactory({ theme: defaultTheme });
    const props = {
      commonRootSection: {
        uri: 'https://tudn.com',
      },
    };
    expect(SectionWidgetsFactory.getWidgetTheme(props).color).toBe('green');
    expect(SectionWidgetsFactory.getWidgetTheme(props).globalNavBackgroundColor).toBe('#000000');
    expect(SectionWidgetsFactory.getWidgetTheme(props).primary).toBe('#007350');
  });
});

describe('widgetFactory enhanceWidgetProps', () => {
  it('should return appropriate theme', () => {
    const defaultTheme = {
      color: 'green',
    };
    const SectionWidgetsFactory = new WidgetFactory({ theme: defaultTheme });
    const props = {
      commonRootSection: {
        uri: 'https://tudn.com',
      },
    };
    expect(SectionWidgetsFactory.getWidgetTheme(props).color).toBe('green');
    expect(SectionWidgetsFactory.getWidgetTheme(props).globalNavBackgroundColor).toBe('#000000');
    expect(SectionWidgetsFactory.getWidgetTheme(props).primary).toBe('#007350');
  });
});

describe('widgetFactory getWidget', () => {
  it('should return appropriate widget', () => {
    const defaultTheme = {
      color: 'green',
    };
    const SectionWidgetsFactory = new WidgetFactory({ theme: defaultTheme });
    expect(SectionWidgetsFactory.getWidget({
      type: WidgetTypes.ADVERTISEMENT_MODULE,
    }, 0)).toBe(null);
    expect(SectionWidgetsFactory.getWidget({
      type: WidgetTypes.ALL_MOVING_BANNER,
    }, 0)).not.toBe(null);
    expect(SectionWidgetsFactory.getWidget({
      type: WidgetTypes.GENERIC_WIDGET_MODULE,
    }, 0)).not.toBe(null);
  });
});

describe('widgetFactory serverSideLazyLoad', () => {
  it('should return appropriate widget', () => {
    const SectionWidgetsFactory = new WidgetFactory(mockData.data.page);
    const wrapper = shallow(SectionWidgetsFactory.serverSideLazyLoad(
      mockData.data.page.data.widgets[0],
      0,
    ));

    expect(wrapper.find('.widget').props()['data-widget-type']).toBe('HeroWidget');
  });

  it('should set default offset for server side lazy widgets', () => {
    const { window: { innerHeight } } = global;
    delete global.window.innerHeight;
    const SectionWidgetsFactory = new WidgetFactory(mockData.data.page);

    expect(SectionWidgetsFactory.offset).toBe(500);

    global.window.innerHeight = innerHeight;
  });
});

describe('widgetFactory clientSideLazyLoad', () => {
  it('should return lazyload component', () => {
    const SectionWidgetsFactory = new WidgetFactory(mockData.data.page);
    const wrapper = mount(SectionWidgetsFactory.clientSideLazyLoad(
      mockData.data.page.data.widgets[0],
      0,
    ));
    expect(wrapper.find('.lazyload-placeholder')).toHaveLength(1);
  });

  it('should return Carousel placeholder component for carouselwidget', () => {
    const widget = {
      ...mockData.data.page.data.widgets[3],
    };
    const SectionWidgetsFactory = new WidgetFactory(mockData.data.page);
    const wrapper = mount(SectionWidgetsFactory.clientSideLazyLoad(
      widget,
      3,
      true,
    ));
    expect(wrapper.find('CardsCarousel')).toHaveLength(1);
  });

  it('should return Grid placeholder component regardless widget does not have content', () => {
    const widget = {
      ...mockData.data.page.data.widgets[1],
      contents: null,
    };
    const SectionWidgetsFactory = new WidgetFactory(mockData.data.page);
    const wrapper = mount(SectionWidgetsFactory.clientSideLazyLoad(
      widget,
      1,
      true,
    ));
    expect(wrapper.find('Grid')).toHaveLength(1);
  });
});

describe('widgetFactory parseWidgets', () => {
  const SectionWidgetsFactory = new WidgetFactory(mockData.data.page);
  it('should return 10 widgets', () => {
    const wrapper = shallow(<div>{SectionWidgetsFactory.parseWidgets()}</div>);
    expect(wrapper.find('.widget')).toHaveLength(10);
  });

  it('should return HeroWidget as first widgets', () => {
    const wrapper = shallow(<div>{SectionWidgetsFactory.parseWidgets()}</div>);
    expect(wrapper.find('.widget').first().props()['data-widget-type']).toBe('HeroWidget');
  });

  it('should return a lazyloaded widget at 3rd position for desktop', () => {
    SectionWidgetsFactory.serverRenderCount = 0;
    const wrapper = shallow(<div>{SectionWidgetsFactory.parseWidgets()}</div>);
    const fistLazyloadWidget = wrapper.find('LazyLoad').first().find('.widget');
    expect(fistLazyloadWidget.props()['data-widget-type']).toBe('AllBannerMovingBanner');
    expect(fistLazyloadWidget.props()['data-position']).toBe(3);
  });

  it('should return a lazyloaded widget at 2nd position for mobile', () => {
    SectionWidgetsFactory.device = 'mobile';
    SectionWidgetsFactory.serverRenderCount = 0;
    const wrapper = shallow(<div>{SectionWidgetsFactory.parseWidgets()}</div>);
    const fistLazyloadWidget = wrapper.find('LazyLoad').first().find('.widget');
    expect(fistLazyloadWidget.props()['data-widget-type']).toBe('GridWidget');
    expect(fistLazyloadWidget.props()['data-position']).toBe(2);
  });

  it('should return empry div if there is no widget data', () => {
    const SectionWidgetsFactory2 = new WidgetFactory(null);
    const wrapper = shallow(<div>{SectionWidgetsFactory2.parseWidgets()}</div>);
    expect(wrapper.find('.widget')).toHaveLength(0);
  });

  it('should return 10 widgets and all lazyloaded if flag passed', () => {
    const wrapper = shallow(<div>{SectionWidgetsFactory.parseWidgets(true)}</div>);
    expect(wrapper.find(LazyLoad)).toHaveLength(10);
  });

  it('should return non lazyloaded widget at 2nd position if disable client lazy loading', () => {
    mockData.data.page.data.widgets[1].settings.lazyLoadClient = false;
    const SectionWidgetsFactoryMock = new WidgetFactory(mockData.data.page);
    SectionWidgetsFactoryMock.device = 'mobile';
    SectionWidgetsFactoryMock.serverRenderCount = 0;
    const wrapper = shallow(<div>{SectionWidgetsFactoryMock.parseWidgets()}</div>);
    const fistLazyloadWidget = wrapper.find('LazyLoad').first().find('.widget');
    const secondWidget = wrapper.find('[data-position=2]');
    expect(secondWidget.props()['data-widget-type']).toBe(mockData.data.page.data.widgets[1].type);
    expect(fistLazyloadWidget.props()['data-widget-type']).toBe('AllBannerMovingBanner');
    expect(fistLazyloadWidget.props()['data-position']).toBe(3);
  });
});

describe('getWidgetComponent', () => {
  it('should return cross vertical list widget', () => {
    const widgetFactory = new WidgetFactory(mockData.data.page);
    const wrapper = shallow(
      <div>
        {widgetFactory.getWidgetComponent(CROSS_VERTICAL_LIST)}
      </div>,
    );
    expect(wrapper.find('.widget').props()['data-widget-type']).toBe(CROSS_VERTICAL_LIST);
  });

  it('should not render anything when widget type is not found', () => {
    const mockWidgets = mockData.data.page.data.widgets;
    const mockWidgetsWithoutCross = mockWidgets.slice(0, mockWidgets.length - 1);
    const widgetFactory = new WidgetFactory({
      ...mockData.data.page,
      data: {
        ...mockData.data.page.data,
        widgets: mockWidgetsWithoutCross,
      },
    });
    const wrapper = shallow(
      <div>
        {widgetFactory.getWidgetComponent(CROSS_VERTICAL_LIST)}
      </div>,
    );

    expect(wrapper.find('.widget')).toHaveLength(0);
  });
  it('should return null if widgets list is not valid', () => {
    const widgetFactory = new WidgetFactory({ data: {} });
    expect(widgetFactory.getWidgetComponent(CROSS_VERTICAL_LIST)).toBe(null);
  });
});

describe('widgetFactory enhanceWidgetProps', () => {
  it('should return appropriate widget props', () => {
    const SectionWidgetsFactory = new WidgetFactory(mockData.data.page);
    expect(SectionWidgetsFactory.enhanceWidgetProps(
      {
        type: WidgetTypes.RADIO_GRID_STATIONS_BY_GENRE_FILTER,
        settings: {},
      },
      { prop1: 'test' },
    ).allowedGenresForFiltering).toBeDefined();
    expect(SectionWidgetsFactory.enhanceWidgetProps(
      {
        type: WidgetTypes.RADIO_SHOW_CARD_WIDGET,
        settings: {},
      },
      { prop1: 'test' },
    ).title).toBeDefined();
    expect(SectionWidgetsFactory.enhanceWidgetProps(
      {
        type: WidgetTypes.RADIO_STATION_SCHEDULE_WIDGET,
        settings: {
          radioSchedule: {},
        },
      },
      { prop1: 'test' },
    ).schedule).toBeDefined();
    expect(SectionWidgetsFactory.enhanceWidgetProps(
      {
        type: WidgetTypes.SINGLE_WIDGET,
        settings: {},
      },
    ).theme).toBeDefined();
    expect(SectionWidgetsFactory.enhanceWidgetProps(
      {
        type: WidgetTypes.LIST_WIDGET,
        settings: {},
      },
    ).theme).toBeDefined();
  });
});
