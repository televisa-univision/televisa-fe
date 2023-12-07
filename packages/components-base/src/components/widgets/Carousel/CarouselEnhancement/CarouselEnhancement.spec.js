import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from '@univision/fe-commons/dist/store/configureStore';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';
import Loadable from 'react-loadable';
import { mount } from 'enzyme';
import CardTracker from '@univision/fe-commons/dist/utils/tracking/tealium/card/CardTracker';
import NavigationTracker from '@univision/fe-commons/dist/utils/tracking/tealium/navigation/NavigationTracker';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import * as PageSelectors from '@univision/fe-commons/dist/store/selectors/page-selectors';
import {
  BLACK,
  DEEP_SEA,
} from '@univision/fe-utilities/styled/constants';
import features from '@univision/fe-commons/dist/config/features';

import cardProps from '../../../cards/SquareCards/SquareCard/__mocks__/squareCard.json';
import jobListingData from '../../../cards/__mocks__/JobListingCard.json';

import Carousel from './index';

jest.mock('@univision/fe-commons/dist/utils/themes/cards', () => jest.fn());
jest.mock('@univision/shared-components/dist/components/weather/WeatherDate', () => 'mock-widget');
jest.mock('@univision/shared-components/dist/components/weather/MinMaxTemp', () => () => 'MinMaxTemp');
jest.mock('@univision/shared-components/dist/components/weather/WeatherDate', () => 'mock-widget');
jest.mock('@univision/shared-components/dist/components/weather/Temp', () => 'mock-temp');
jest.mock('@univision/shared-components/dist/components/weather/LocationDate', () => 'mock-location');
jest.mock('@univision/shared-components/dist/components/weather/ForecastRow', () => 'mock-forecastrow');
jest.useFakeTimers();

const store = configureStore();

const contents = [
  cardProps[0],
  cardProps[1],
  cardProps[3],
  cardProps[5],
  cardProps[4],
  { type: 'invalid card type' },
];
const props = {
  settings: {
    title: 'Nueva York',
    seeMoreLink: {
      href: 'https://www.univision.com',
      target: '_self',
    },
  },
  device: 'desktop',
};
const jobContents = [
  {
    type: 'article',
    ...jobListingData,
  },
];
/** @test {CarouselEnhancement} */
describe('CarouselEnhancement tests', () => {
  beforeAll(() => {
    delete window.location;
    window.location = {};
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    const div = document.createElement('div');
    console.error = jest.fn(); // eslint-disable-line no-console
    const el = (
      <Provider store={store}>
        <Carousel />
      </Provider>
    );
    ReactDOM.render(el, div);
  });

  it('should render component', () => {
    store.dispatch(setPageData({ breakpoint: { size: 'xs' } }));
    const wrapper = mount(
      <Provider store={store}>
        <Carousel content={contents} {...props} />
      </Provider>
    );
    expect(wrapper.find('CarouselEnhancement__TitleWrapper')).toHaveLength(1);
  });

  it('should render dark mode', () => {
    store.dispatch(setPageData({ breakpoint: { size: 'xxs' } }));
    const wrapper = mount(
      <Provider store={store}>
        <Carousel
          content={contents}
          theme={{ isDark: true }}
          {...props}
        />
      </Provider>
    );
    expect(wrapper.find('WidgetTitle')).toHaveLength(1);
    expect(wrapper.find('WidgetTitle')).toHaveStyleRule('color', '#ffffff');
  });

  it('should render selected title color', () => {
    store.dispatch(setPageData({ breakpoint: { size: 'xxs' } }));
    const wrapper = mount(
      <Provider store={store}>
        <Carousel
          content={contents}
          theme={{ widgetTitleColor: '#000000' }}
          {...props}
        />
      </Provider>
    );
    expect(wrapper.find('WidgetTitle')).toHaveLength(1);
    expect(wrapper.find('WidgetTitle')).toHaveStyleRule('color', '#000000');
  });

  it('should render component for local markets', () => {
    store.dispatch(setPageData({
      pageCategory: 'local-tv',
      breakpoint: { size: 'md' },
    }));
    const wrapper = mount(
      <Provider store={store}>
        <Carousel content={contents} {...props} localMarket="WXTV" />
      </Provider>
    );

    expect(wrapper.find('LocalBar')).toHaveLength(1);
  });

  it('should call the tracking event when an arrow is clicked', async () => {
    global.innerWidth = 1024;
    store.dispatch(setPageData({
      device: 'desktop',
    }));
    const trackerSpy = jest.spyOn(CardTracker, 'onClickHandler');
    const wrapper = mount(
      <Provider store={store}>
        <Carousel content={contents} {...props} theme={{}} />
      </Provider>
    );
    jest.runAllTimers();
    await Loadable.preloadAll();
    wrapper.update();

    act(() => {
      wrapper.find('CardCarouselArrow__ArrowButton').first().simulate('click');
    });
    expect(trackerSpy).toHaveBeenCalledWith(
      { title: '', uid: '' },
      { name: 'undefined2' },
      'nav_arrow'
    );
    trackerSpy.mockRestore();
  });

  it('should render button component', () => {
    global.innerWidth = 320;
    const trackerSpy = jest.spyOn(CardTracker, 'onClickHandler');
    const wrapper = mount(
      <Provider store={store}>
        <Carousel content={contents} {...props} device="mobile" />
      </Provider>
    );

    act(() => {
      wrapper.find('button').simulate('click');
    });
    wrapper.update();

    expect(trackerSpy).toHaveBeenCalledWith(
      { title: '', uid: '' },
      { name: 'undefined2' },
      'ver_mas'
    );
  });

  it('should call the tracking event when a market title dropdown is clicked', () => {
    const trackerSpy = jest.spyOn(CardTracker, 'onClickHandler');
    const wrapper = mount(
      <Provider store={store}>
        <Carousel content={contents} {...props} localMarket="WXTV" />
      </Provider>
    );
    act(() => {
      wrapper.find('SelectMarket__TextWrapper').simulate('click');
    });
    expect(trackerSpy).toHaveBeenLastCalledWith(
      { title: '', uid: '' },
      { name: 'undefined2' },
      'title_local_dropdown'
    );
  });

  it('should call the tracking event when a market is selected on the dropdown is clicked', () => {
    const trackerSpy = jest.spyOn(CardTracker, 'onClickHandler');
    const wrapper = mount(
      <Provider store={store}>
        <Carousel content={contents} {...props} localMarket="WXTV" />
      </Provider>
    );
    act(() => {
      wrapper.find('SelectMarket__Market').first().simulate('click');
    });
    expect(trackerSpy).toHaveBeenLastCalledWith(
      { title: '', uid: '' },
      { name: 'undefined2' },
      'title_local_dropdown_select'
    );
  });

  it('should call the tracking event when a Weather Icon is clicked', () => {
    spyOn(NavigationTracker, 'track');
    const wrapper = mount(
      <Provider store={store}>
        <Carousel content={contents} {...props} localMarket="WXTV" />
      </Provider>
    );
    act(() => {
      wrapper.find('Connect(WeatherConditionIcon)').props().trackLocalWeatherWidget('localwidget-weather-modal');
    });
    expect(NavigationTracker.track).toHaveBeenLastCalledWith(NavigationTracker.events.click, {
      eventAction: 'localwidget-weather-modal',
    });
    expect(NavigationTracker.track).toHaveBeenCalledTimes(1);
  });

  it('should call the tracking event when a Weather complete forecast button is clicked', () => {
    spyOn(NavigationTracker, 'track');
    const wrapper = mount(
      <Provider store={store}>
        <Carousel content={contents} {...props} localMarket="WXTV" />
      </Provider>
    );
    act(() => {
      wrapper.find('Connect(WeatherConditionIcon)').props().trackLocalWeatherWidget('localwidget-weather-pronostico completo');
    });
    expect(NavigationTracker.track).toHaveBeenLastCalledWith(NavigationTracker.events.click, {
      eventAction: 'localwidget-weather-pronostico completo',
    });
    expect(NavigationTracker.track).toHaveBeenCalledTimes(1);
  });

  it('should apply the appropiate style when adSkin and dark mode are enabled', () => {
    jest.spyOn(PageSelectors, 'hasAdSkinSelector').mockReturnValue(true);
    const wrapper = mount(
      <Provider store={store}>
        <Carousel content={contents} theme={{ isDark: true }} {...props} />
      </Provider>
    );
    expect(wrapper.find('CarouselEnhancement__DarkContainer')).toHaveStyleRule('left', '50%');
  });

  it('should render "Ver más ofertas" text when it has Job Related Content', () => {
    global.innerWidth = 728;
    const wrapper = mount(
      <Provider store={store}>
        <Carousel {...props} content={jobContents} />
      </Provider>
    );
    const seeMoreBtnText = wrapper.find('button').text();

    expect(seeMoreBtnText).toBe('VER MÁS OFERTAS');
  });

  it('should track widget title click event when it has Job Related Content', () => {
    const trackerSpy = jest.spyOn(CardTracker, 'onClickHandler');
    const settings = {
      ...props.settings,
      titleLink: { href: 'www.tudn.com/futbol/liga-mx' },
    };
    const wrapper = mount(
      <Provider store={store}>
        <Carousel {...props} settings={settings} content={jobContents} />
      </Provider>
    );
    const widgetTitle = wrapper.find('WidgetTitle Link');
    act(() => {
      widgetTitle.simulate('click');
    });

    wrapper.update();

    expect(trackerSpy).toHaveBeenLastCalledWith(
      { title: '', uid: '' },
      {
        name: 'undefined2',
      },
      'title'
    );
  });

  it('should have prop isWorldCupMvp', () => {
    store.dispatch(setPageData({ breakpoint: { size: 'xxs' } }));
    features.deportes.isWorldCupMVP = jest.fn(() => true);
    const wrapper = mount(
      <Provider store={store}>
        <Carousel
          {...props}
          content={contents}
          widgetContext={{ isWorldCupMVP: true }}
        />
      </Provider>
    );

    expect(wrapper.find('CarouselEnhancement__ButtonWrapperStyled').prop('isWorldCupMvp')).toBe(true);
  });

  it('should have the correct font if isWorldCupMvp is true', () => {
    features.deportes.isWorldCupMVP = jest.fn(() => true);
    const wrapper = mount(
      <Provider store={store}>
        <Carousel
          {...props}
          content={contents}
        />
      </Provider>
    );
    const buttonStyle = wrapper.find('TextUVN__TextStyled').last().children().getDOMNode();
    expect(getComputedStyle(buttonStyle).getPropertyValue('font-family')).toBe("'Roboto Flex',Helvetica,Arial,sans-serif");
  });

  it('should have the component Title__TitleStyled with StyleRule text-transform capitalize uppercase', () => {
    store.dispatch(setPageData({ breakpoint: { size: 'xxs' } }));
    features.deportes.isWorldCupMVP = jest.fn(() => false);
    const wrapper = mount(
      <Provider store={store}>
        <Carousel
          {...props}
          content={contents}
        />
      </Provider>
    );
    expect(wrapper.find('Title__TitleStyled').first()).toHaveStyleRule('text-transform', 'uppercase');
  });

  it('should have the component Title__TitleStyled with StyleRule text-transform capitalize', () => {
    store.dispatch(setPageData({ breakpoint: { size: 'xxs' } }));
    features.deportes.isWorldCupMVP = jest.fn(() => true);
    const wrapper = mount(
      <Provider store={store}>
        <Carousel
          {...props}
          content={contents}
        />
      </Provider>
    );
    expect(wrapper.find('Title__TitleStyled').first()).toHaveStyleRule('text-transform', 'capitalize');
  });

  it('it should show the WidgetTitle with color rebrand MVP', () => {
    store.dispatch(setPageData({ breakpoint: { size: 'xxs' } }));
    features.deportes.isWorldCupMVP = jest.fn(() => true);
    const wrapper = mount(
      <Provider store={store}>
        <Carousel
          content={contents}
          theme={{ isDark: false, primary: BLACK, widgetTitleColor: DEEP_SEA }}
          {...props}
        />
      </Provider>
    );
    expect(wrapper.find('WidgetTitle')).toHaveLength(1);
    expect(wrapper.find('WidgetTitle')).toHaveStyleRule('color', DEEP_SEA);
  });
});
