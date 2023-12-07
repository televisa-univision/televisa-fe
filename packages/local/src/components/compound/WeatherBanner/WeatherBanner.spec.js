import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

import {
  BANNER_FLAVOR_LANDING_PAGE,
  BANNER_FLAVOR_MODAL,
  BANNER_FLAVOR_OPENING_CARD,
} from '@univision/fe-commons/dist/constants/weather';
import TrackWeather from '@univision/fe-commons/dist/utils/tracking/tealium/weather/WeatherTracker';

import WeatherBanner from '.';
import props from './__mocks__/weatherBanner';

const extremeAlert = {
  areaName: 'Staten Island, NY',
  eventDescription: 'Huracán Dorian - Categoría 4',
};

describe('WeatherBanner', () => {
  it('should not render when there is not alerts ', () => {
    const wrapper = mount(<WeatherBanner totalCount={0} />);

    expect(wrapper.find('WeatherBanner')).toHaveLength(1);
    expect(wrapper.find('Wrapper')).toHaveLength(0);
  });

  it('should render without crashing - Low risk', () => {
    const wrapper = mount(<WeatherBanner {...props.landingPage} />);

    expect(wrapper.find('WeatherBanner')).toHaveLength(1);
  });

  it('should render without crashing - High risk', () => {
    const wrapper = mount(
      <WeatherBanner
        {...props.openingCard}
        extremeAlert={extremeAlert}
      />,
    );

    expect(wrapper.find('WeatherBanner')).toHaveLength(1);
  });

  it('should render without crashing - Landing page, High risk', () => {
    const wrapper = mount(
      <WeatherBanner
        {...props.openingCard}
        flavor={BANNER_FLAVOR_LANDING_PAGE}
        extremeAlert={extremeAlert}
      />,
    );

    expect(wrapper.find('WeatherBanner')).toHaveLength(1);
  });

  it('should render without crashing - Landing page, Low risk', () => {
    const wrapper = mount(
      <WeatherBanner
        {...props.openingCard}
        flavor={BANNER_FLAVOR_LANDING_PAGE}
      />,
    );

    expect(wrapper.find('WeatherBanner')).toHaveLength(1);
  });

  it('should render without crashing - Opening widget, High risk', () => {
    const wrapper = mount(
      <WeatherBanner
        {...props.openingCard}
        flavor={BANNER_FLAVOR_OPENING_CARD}
      />,
    );

    expect(wrapper.find('WeatherBanner')).toHaveLength(1);
  });

  it('should render without crashing - Opening widget, Low risk', () => {
    const wrapper = mount(
      <WeatherBanner
        {...props.openingCard}
        flavor={BANNER_FLAVOR_OPENING_CARD}
      />,
    );

    expect(wrapper.find('WeatherBanner')).toHaveLength(1);
  });

  it('should render without crashing - Modal, High risk', () => {
    const wrapper = mount(
      <WeatherBanner
        {...props.openingCard}
        flavor={BANNER_FLAVOR_MODAL}
      />,
    );

    expect(wrapper.find('WeatherBanner')).toHaveLength(1);
  });

  it('should render without crashing - Modal, Low risk', () => {
    const wrapper = mount(
      <WeatherBanner
        {...props.openingCard}
        flavor={BANNER_FLAVOR_MODAL}
      />,
    );

    expect(wrapper.find('WeatherBanner')).toHaveLength(1);
  });

  it('should render without crashing - Only 1 alert', () => {
    const wrapper = mount(
      <WeatherBanner {...props.openingCard} totalCount={1} />,
    );

    expect(wrapper.find('WeatherBanner')).toHaveLength(1);
  });

  it('should fire the track event', () => {
    TrackWeather.track = jest.fn();
    const trackingData = {
      cardType: 'alertas cta with badge',
      cardId: '...',
      cardTitle: 'alertas del tiempo',
      widgetPos: 0,
      widgetTitle: 'topnav-weather modal',
      widgetType: 'topnav-weather modal',
    };
    const wrapper = mount(
      <WeatherBanner
        {...props.openingCard}
        flavor={BANNER_FLAVOR_MODAL}
        trackingData={trackingData}
      />,
    );

    act(() => {
      wrapper.find('WeatherBanner__Wrapper').first().props().onClick();
    });

    expect(TrackWeather.track).toHaveBeenCalledTimes(1);
  });
});
