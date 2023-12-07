import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from '@univision/fe-commons/dist/store/configureStore';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import { setCurrentMarketByLocation } from '@univision/fe-commons/dist/store/actions/local/local-actions';
import fetchGraphQL from '@univision/fe-commons/dist/utils/api/graphql';
import clientLogging from '@univision/fe-commons/dist/utils/logging/clientLogging';
import { act } from 'react-dom/test-utils';
import WeatherAlertsList, { StickyAdWrapper, WeatherAlertsWrapper } from '.';
import NoAlerts from './NoAlerts';
import AlertList from '../../../../compound/AlertList';
import data from './__mocks__/graphqlResponse.json';

jest.mock('@univision/fe-commons/dist/utils/api/graphql', () => jest.fn());
jest.mock('@univision/fe-commons/dist/utils/logging/clientLogging', () => jest.fn());
const store = configureStore();

/**
 * Wait for async behaviours to finish
 * @param {Object} wrapper component
 * @param {function} _actions any actions to be triggered
 * @returns {Promise<void>}
 */
const actions = async (wrapper, _actions) => {
  await act(async () => {
    await (new Promise(resolve => setTimeout(resolve, 0)));
    if (_actions) _actions();
    wrapper.update();
  });
};

describe('Weather Alerts List tests', () => {
  const graphqlUrl = 'https://int-graphql.dev-univision.com';
  store.dispatch(setPageData({
    data: { tvStation: { call: 'KDTV' } },
    config: { graphql: graphqlUrl },
  }));
  store.dispatch(setCurrentMarketByLocation('KDTV'));
  it('should render with data', async () => {
    fetchGraphQL.mockImplementation(() => Promise.resolve({
      getWeatherAlertsWithDescription: data,
    }));
    const wrapper = mount(
      <Provider store={store}>
        <WeatherAlertsList />
      </Provider>
    );
    await actions(wrapper);
    expect(fetchGraphQL).toHaveBeenCalled();
    expect(wrapper.find(AlertList)).toHaveLength(5);
    expect(wrapper.find(NoAlerts)).toHaveLength(0);
    expect(wrapper.find(StickyAdWrapper)).toHaveLength(1);
    expect(wrapper.find(WeatherAlertsWrapper)).toHaveLength(1);
  });

  it('should render No Alerts', async () => {
    fetchGraphQL.mockImplementation(() => Promise.resolve({
      getWeatherAlertsWithDescription: { alerts: [] },
    }));
    const wrapper = mount(
      <Provider store={store}>
        <WeatherAlertsList />
      </Provider>
    );
    await actions(wrapper);
    expect(fetchGraphQL).toHaveBeenCalled();
    expect(wrapper.find(AlertList)).toHaveLength(0);
    expect(wrapper.find(NoAlerts)).toHaveLength(1);
    expect(wrapper.find(StickyAdWrapper)).toHaveLength(1);
    expect(wrapper.find(WeatherAlertsWrapper)).toHaveLength(1);
  });

  it('should render No Alerts passing no data', async () => {
    fetchGraphQL.mockImplementation(() => Promise.resolve({}));
    const wrapper = mount(
      <Provider store={store}>
        <WeatherAlertsList />
      </Provider>
    );
    await actions(wrapper);
    expect(wrapper.find(AlertList)).toHaveLength(0);
    expect(wrapper.find(NoAlerts)).toHaveLength(1);
    expect(wrapper.find(StickyAdWrapper)).toHaveLength(1);
    expect(wrapper.find(WeatherAlertsWrapper)).toHaveLength(1);
  });

  it('should throw error and render no components', async () => {
    fetchGraphQL.mockImplementation(() => Promise.resolve({
      getWeatherAlertsWithDescription: {
        alerts: [],
      },
    }));
    const wrapper = mount(
      <Provider store={store}>
        <WeatherAlertsList />
      </Provider>
    );
    expect(wrapper.find(AlertList)).toHaveLength(0);
    expect(wrapper.find(NoAlerts)).toHaveLength(0);
    expect(wrapper.find(StickyAdWrapper)).toHaveLength(0);
    expect(wrapper.find(WeatherAlertsWrapper)).toHaveLength(0);
  });

  it('should thrown error', async () => {
    const error = new Error('Error');

    fetchGraphQL.mockImplementation(() => Promise.reject(error));

    const wrapper = mount(
      <Provider store={store}>
        <WeatherAlertsList />
      </Provider>
    );

    await actions(wrapper);

    expect(clientLogging).toHaveBeenCalledWith(error);
  });
});
