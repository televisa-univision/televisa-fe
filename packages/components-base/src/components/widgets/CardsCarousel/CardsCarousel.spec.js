import React from 'react';
import ReactDOM from 'react-dom';
import Store from '@univision/fe-commons/dist/store/store';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';
import Loadable from 'react-loadable';
import { mount } from 'enzyme';

import CardTracker from '@univision/fe-commons/dist/utils/tracking/tealium/card/CardTracker';
import NavigationTracker from '@univision/fe-commons/dist/utils/tracking/tealium/navigation/NavigationTracker';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import * as PageSelectors from '@univision/fe-commons/dist/store/selectors/page-selectors';

import storyCardProps from '../../cards/__mocks__/storyCard';

import slideshowData from '../../cards/__mocks__/slideshowCard.json';
import videoPreviewData from '../../cards/__mocks__/videoPreviewCard.json';
import jobListingData from '../../cards/__mocks__/JobListingCard.json';
import getCardByContentType from '../../../utils/cardMapper';

import CardsCarousel from '.';

jest.mock('@univision/fe-commons/dist/utils/themes/cards', () => jest.fn());
jest.mock('@univision/shared-components/dist/components/weather/WeatherDate', () => 'mock-widget');
jest.mock('@univision/shared-components/dist/components/weather/MinMaxTemp', () => () => 'MinMaxTemp');
jest.mock('@univision/shared-components/dist/components/weather/WeatherDate', () => 'mock-widget');
jest.mock('@univision/shared-components/dist/components/weather/Temp', () => 'mock-temp');
jest.mock('@univision/shared-components/dist/components/weather/LocationDate', () => 'mock-location');
jest.mock('@univision/shared-components/dist/components/weather/ForecastRow', () => 'mock-forecastrow');
jest.mock('../../../utils/cardMapper', () => data => ['test', data]);
jest.useFakeTimers();

const articleMock = {
  type: 'article',
  label: null,
  ...storyCardProps,
};

const contents = [
  articleMock,
  slideshowData,
  articleMock,
  videoPreviewData,
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
const cardData = contents.map(content => getCardByContentType(content));
const JobListingCardData = jobContents.map(content => getCardByContentType(content));

describe('CardsCarousel', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    console.error = jest.fn(); // eslint-disable-line no-console
    const el = (<CardsCarousel store={Store} />);
    ReactDOM.render(el, div);
  });

  it('should render component', () => {
    const wrapper = mount(<CardsCarousel cardData={cardData} store={Store} {...props} />);

    expect(wrapper.find('CardsCarousel__TitleWrapper')).toHaveLength(1);
  });

  it('should render dark mode', () => {
    const wrapper = mount(<CardsCarousel
      cardData={cardData}
      store={Store}
      theme={{ isDark: true }}
      {...props}
    />);
    expect(wrapper.find('CardsCarousel__Title')).toHaveLength(1);
    expect(wrapper.find('CardsCarousel__Title')).toHaveStyleRule('color', '#ffffff');
  });

  it('should render component for local markets', () => {
    Store.dispatch(setPageData({
      pageCategory: 'local-tv',
    }));
    const wrapper = mount(
      <Provider store={Store}>
        <CardsCarousel cardData={cardData} {...props} localMarket="WXTV" />
      </Provider>
    );

    expect(wrapper.find('LocalBar')).toHaveLength(1);
  });

  it('should take the fallback value for cards', () => {
    const wrapper = mount(<CardsCarousel cardData={['foo', 'bar']} {...props} store={Store} />);

    expect(wrapper.find('CardsCarousel__TitleWrapper')).toHaveLength(0);
  });

  it('should not render if cards are not set correctly', () => {
    const wrapper = mount(
      <CardsCarousel cardData={[[() => <div />, undefined]]} {...props} store={Store} />
    );

    expect(wrapper.find('CardsCarousel__TitleWrapper')).toHaveLength(1);
  });

  it('should call the tracking event when an arrow is clicked', async () => {
    global.innerWidth = 800;
    Store.dispatch(setPageData({
      device: 'desktop',
    }));
    const trackerSpy = jest.spyOn(CardTracker, 'onClickHandler');
    const wrapper = mount(<CardsCarousel cardData={cardData} {...props} store={Store} />);
    jest.runAllTimers();
    await Loadable.preloadAll();
    wrapper.update();

    act(() => {
      wrapper.find('CardCarouselArrow__ArrowButton').last().simulate('click');
    });
    wrapper.update();
    expect(trackerSpy).toHaveBeenLastCalledWith({ title: '', uid: '' }, undefined, 'nav_arrow');
  });

  it('should render component', () => {
    const trackerSpy = jest.spyOn(CardTracker, 'onClickHandler');
    const wrapper = mount(<CardsCarousel cardData={cardData} {...props} store={Store} />);

    act(() => {
      wrapper.find('CardsCta').simulate('click');
    });
    wrapper.update();

    expect(trackerSpy).toHaveBeenLastCalledWith({ title: '', uid: '' }, undefined, 'ver_mas');
  });

  it('should call the tracking event when a market title dropdown is clicked', () => {
    const trackerSpy = jest.spyOn(CardTracker, 'onClickHandler');
    const wrapper = mount(
      <Provider store={Store}>
        <CardsCarousel cardData={cardData} {...props} localMarket="WXTV" />
      </Provider>
    );
    act(() => {
      wrapper.find('SelectMarket__TextWrapper').simulate('click');
    });
    expect(trackerSpy).toHaveBeenLastCalledWith({ title: '', uid: '' }, undefined, 'title_local_dropdown');
  });

  it('should call the tracking event when a market is selected on the dropdown is clicked', () => {
    const trackerSpy = jest.spyOn(CardTracker, 'onClickHandler');
    const wrapper = mount(
      <Provider store={Store}>
        <CardsCarousel cardData={cardData} {...props} localMarket="WXTV" />
      </Provider>
    );
    act(() => {
      wrapper.find('SelectMarket__Market').first().simulate('click');
    });
    expect(trackerSpy).toHaveBeenLastCalledWith({ title: '', uid: '' }, undefined, 'title_local_dropdown_select');
  });

  it('should call the tracking event when a Weather Icon is clicked', () => {
    spyOn(NavigationTracker, 'track');
    const wrapper = mount(
      <Provider store={Store}>
        <CardsCarousel cardData={cardData} {...props} localMarket="WXTV" />
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
      <Provider store={Store}>
        <CardsCarousel cardData={cardData} {...props} localMarket="WXTV" />
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
      <Provider store={Store}>
        <CardsCarousel cardData={cardData} theme={{ isDark: true }} {...props} />
      </Provider>
    );
    expect(wrapper.find('CardsCarousel__DarkContainer')).toHaveStyleRule('left', '50%');
  });

  it('should render "Ver más ofertas" text when it has Job Related Content', () => {
    const wrapper = mount(
      <CardsCarousel {...props} store={Store} cardData={JobListingCardData} />
    );
    const seeMoreBtnText = wrapper.find('CardsCta').text();

    expect(seeMoreBtnText).toBe('Ver más ofertas');
  });

  it('should track widget title click event when it has Job Related Content', () => {
    const trackerSpy = jest.spyOn(CardTracker, 'onClickHandler');
    const wrapper = mount(
      <CardsCarousel {...props} store={Store} cardData={JobListingCardData} />
    );
    const widgetTitle = wrapper.find('CardsCarousel__Title');
    act(() => {
      widgetTitle.simulate('click');
    });

    wrapper.update();
    expect(trackerSpy).toHaveBeenLastCalledWith({
      title: '',
      uid: '',
    }, undefined, 'title');
  });
});
