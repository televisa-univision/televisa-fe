import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import Loadable from 'react-loadable';

import Store from '@univision/fe-commons/dist/store/store';
import * as brandableTypes from '@univision/fe-commons/dist/utils/brandable/types';
import { PODCAST, RADIO, MUSIC } from '@univision/fe-commons/dist/constants/pageCategories';

import getComponentRight from './getComponentRight';

jest.mock('@univision/shared-components/dist/components/weather/MinMaxTemp', () => () => 'MinMaxTemp');
jest.mock('@univision/shared-components/dist/components/weather/WeatherDate', () => 'mock-widget');

describe('getComponentRight suite', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });
  it('should return null array by default', () => {
    const result = getComponentRight();
    expect(result).toBe(null);
  });
  it('should return the Weather Widget if `brandableType` is TV', async () => {
    const componentRight = getComponentRight(brandableTypes.tv);
    const wrapper = mount(
      <Provider store={Store}>
        {componentRight()}
      </Provider>
    );
    await Loadable.preloadAll();
    wrapper.update();

    expect(wrapper.find('WeatherConditionIcon')).toHaveLength(1);
  });
  it('should return the PodcastCTA if the pageCategory is equal to podcast', async () => {
    const componentRight = getComponentRight('foo', PODCAST);
    const wrapper = mount(
      <Provider store={Store}>
        {componentRight()}
      </Provider>
    );
    await Loadable.preloadAll();
    wrapper.update();

    expect(wrapper.find('PodcastCTA__Wrapper')).toHaveLength(1);
  });
  it('should return the PodcastCTA if the pageCategory is equal to radio', async () => {
    const componentRight = getComponentRight('foo', RADIO);
    const wrapper = mount(
      <Provider store={Store}>
        {componentRight()}
      </Provider>
    );
    await Loadable.preloadAll();
    wrapper.update();

    expect(wrapper.find('PodcastCTA__Wrapper')).toHaveLength(1);
  });
  it('should return the PodcastCTA if the pageCategory is equal to music', async () => {
    const componentRight = getComponentRight('foo', MUSIC);
    const wrapper = mount(
      <Provider store={Store}>
        {componentRight()}
      </Provider>
    );
    await Loadable.preloadAll();
    wrapper.update();

    expect(wrapper.find('PodcastCTA__Wrapper')).toHaveLength(1);
  });
});
