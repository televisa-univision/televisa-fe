import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';

import configureStore from '@univision/fe-commons/dist/store/configureStore';
import * as localActions from '@univision/fe-commons/dist/store/actions/local/local-actions';

import LocalBar from '.';

const store = configureStore();

jest.mock('@univision/shared-components/dist/components/weather/MinMaxTemp', () => () => 'MinMaxTemp');
jest.mock('@univision/shared-components/dist/components/weather/WeatherDate', () => 'mock-widget');

describe('LocalBar', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    console.error = jest.fn(); // eslint-disable-line no-console
    const el = (
      <Provider store={store}>
        <LocalBar />
      </Provider>
    );
    ReactDOM.render(el, div);
  });

  it('should render component', () => {
    const wrapper = mount(
      <Provider store={store}>
        <LocalBar localMarket="KAKW" />
      </Provider>
    );

    expect(wrapper.find('LocalBar__Wrapper')).toHaveLength(1);
  });

  it('should display the modal background', () => {
    const wrapper = mount(
      <Provider store={store}>
        <LocalBar localMarket="KAKW" />
      </Provider>
    );
    expect(wrapper.find('PresenceChild')).toHaveLength(0);

    act(() => {
      wrapper.find('SelectMarket__TextWrapper').first().props().onClick();
    });
    wrapper.update();
    expect(wrapper.find('PresenceChild')).toHaveLength(1);

    act(() => {
      wrapper.find('AnimatedModalBackground').first().props().onClick();
    });
    wrapper.update();

    expect(wrapper.find('AnimatedModalBackground').first().prop('isVisible')).toBeFalsy();
  });

  it('should dispatch market actions', () => {
    global.innerWidth = 320;
    const setCurrentMarketByLocationMock = jest.spyOn(localActions, 'setCurrentMarketByLocation');
    const fetchLocalMarketContentMock = jest.spyOn(localActions, 'fetchLocalMarketContent');

    const wrapper = mount(
      <Provider store={store}>
        <LocalBar localMarket="KAKW" />
      </Provider>
    );

    act(() => {
      wrapper.find('SelectMarket__TextWrapper').first().props().onClick();
    });
    wrapper.update();

    act(() => {
      wrapper.find('SelectMarket__Market').first().props().onClick();
    });
    wrapper.update();

    expect(setCurrentMarketByLocationMock).toHaveBeenCalled();
    expect(fetchLocalMarketContentMock).toHaveBeenCalled();
  });
});
