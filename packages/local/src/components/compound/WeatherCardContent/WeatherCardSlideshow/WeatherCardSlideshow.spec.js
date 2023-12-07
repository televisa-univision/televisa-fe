import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

import CardTracker from '@univision/fe-commons/dist/utils/tracking/tealium/card/CardTracker';
import configureStore from '@univision/fe-commons/dist/store/configureStore';

import props from './__mocks__/weatherCardSlideshow';
import WeatherCardSlideshow from '.';

const store = configureStore();

const widgetContext = {
  widgetType: 'Locales - Opening Widget',
  metaData: {
    cardName: 'LocalWeatherForecast - portrait XL',
    cardType: 'graficos',
  },
};

describe('WeatherCardSlideshow', () => {
  it('should render without crashing', () => {
    const wrapper = mount(
      <Provider store={store}>
        <WeatherCardSlideshow {...props} widgetContext={widgetContext} />
      </Provider>
    );

    expect(wrapper.find('WeatherCardSlideshow')).toHaveLength(1);
  });

  it('should track the content', () => {
    const trackerSpy = jest.spyOn(CardTracker, 'onClickHandler');
    const wrapper = mount(
      <Provider store={store}>
        <WeatherCardSlideshow {...props} widgetContext={widgetContext} />
      </Provider>
    );

    act(() => {
      wrapper.find('WeatherCardSlideshow__Cta').first().props().onClick();
    });

    expect(trackerSpy).toHaveBeenLastCalledWith({
      title: 'mapas y radar',
    }, widgetContext, 'content');
  });
});
