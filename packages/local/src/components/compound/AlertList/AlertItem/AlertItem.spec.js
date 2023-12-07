import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import TrackWeather from '@univision/fe-commons/dist/utils/tracking/tealium/weather/WeatherTracker';
import Collapsible from '@univision/fe-components-base/dist/components/Collapsible';

import configureStore from '@univision/fe-commons/dist/store/configureStore';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import fetchGraphQL from '@univision/fe-commons/dist/utils/api/graphql';
import clientLogging from '@univision/fe-commons/dist/utils/logging/clientLogging';
import { Provider } from 'react-redux';
import AlertItem from './index';

import props from './__mocks__/data.json';

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

const graphqlUrl = 'https://int-graphql.dev-univision.com';

describe('Item', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crashing - Low', async () => {
    store.dispatch(setPageData({
      config: { graphql: graphqlUrl },
    }));
    fetchGraphQL.mockImplementation(() => Promise.resolve({
      getSpanishTranslation: 'data',
    }));
    jest.spyOn(Promise, 'all').mockImplementation(() => ([
      { getSpanishTranslation: 'data' }]
    ));
    const wrapper = mount(
      <Provider store={store}>
        <AlertItem
          date={props.issueTimeLocal}
          description={props.texts[0].description}
          severity={props.severity}
          title={props.eventDescription}
          serverUri="serverUri"
          localMarketName="testLocalMarketName"
        />
      </Provider>
    );
    expect(wrapper.find('AlertItem__Header')).toHaveLength(1);
    expect(wrapper.find('AlertItem__Title')).toHaveLength(1);
    expect(wrapper.find('AlertItem__Dot')).toHaveLength(1);
    wrapper.find('AlertItem__Header').simulate('click');
    await actions(wrapper);
    expect(wrapper.find('AlertItem__Description')).toHaveLength(1);
    expect(wrapper.find('AlertItem__IssueTime')).toHaveLength(2);
    expect(wrapper.find('AlertItem__DottedLine')).toHaveLength(1);
  });
  it('should render without crashing - Extreme', () => {
    const wrapper = mount(
      <Provider store={store}>
        <AlertItem
          title={props.eventDescription}
          time="1:34 pm"
          description={props.texts[0].description}
          severity={'Extreme'}
        />
      </Provider>
    );
    expect(wrapper.find('AlertItem__Header')).toHaveLength(1);
    expect(wrapper.find('AlertItem__Title')).toHaveLength(1);
    expect(wrapper.find('AlertItem__Dot')).toHaveLength(1);
  });
  it('should render with bigger description', () => {
    const wrapper = mount(
      <Provider store={store}>
        <AlertItem
          title={props.eventDescription}
          time="1:34 pm"
          description={(props.texts[0].description).repeat(5)}
          severity={'Extreme'}
        />
      </Provider>
    );
    expect(wrapper.find('AlertItem__Header')).toHaveLength(1);
    expect(wrapper.find('AlertItem__Title')).toHaveLength(1);
    expect(wrapper.find('AlertItem__Dot')).toHaveLength(1);
  });
  it('should handle description without line breaks', async () => {
    store.dispatch(setPageData({
      config: { graphql: graphqlUrl },
    }));
    fetchGraphQL.mockImplementation(() => Promise.resolve({
      getSpanishTranslation: 'data',
    }));
    jest.spyOn(Promise, 'all').mockImplementation(() => ([
      { getSpanishTranslation: 'data' }]
    ));
    const wrapper = mount(
      <Provider store={store}>
        <AlertItem
          date={props.issueTimeLocal}
          severity={props.severity}
          title={props.eventDescription}
          description={'a'.repeat(6000)}
        />
      </Provider>
    );
    expect(wrapper.find('AlertItem__Header')).toHaveLength(1);
    expect(wrapper.find('AlertItem__Title')).toHaveLength(1);
    expect(wrapper.find('AlertItem__Dot')).toHaveLength(1);
    wrapper.find('AlertItem__Header').simulate('click');
    await actions(wrapper);
    expect(wrapper.find('AlertItem__Description')).toHaveLength(1);
    expect(wrapper.find('AlertItem__IssueTime')).toHaveLength(2);
    expect(wrapper.find('AlertItem__DottedLine')).toHaveLength(1);
    wrapper.find('AlertItem__Header').simulate('click');
    await actions(wrapper);
    expect(fetchGraphQL).toHaveBeenCalledTimes(1);
  });
  it('should not render Description', async () => {
    store.dispatch(setPageData({
      config: { graphql: graphqlUrl },
    }));
    fetchGraphQL.mockImplementation(() => Promise.resolve({
      getSpanishTranslation: 'data',
    }));
    const wrapper = mount(
      <Provider store={store}>
        <AlertItem
          date={props.issueTimeLocal}
          severity={props.severity}
          title={props.eventDescription}
        />
      </Provider>
    );
    expect(wrapper.find('AlertItem__Header')).toHaveLength(1);
    expect(wrapper.find('AlertItem__Title')).toHaveLength(1);
    expect(wrapper.find('AlertItem__Dot')).toHaveLength(1);
    wrapper.find('AlertItem__Header').simulate('click');
    await actions(wrapper);
    expect(wrapper.find('AlertItem__Description')).toHaveLength(0);
    expect(wrapper.find('AlertItem__IssueTime')).toHaveLength(0);
    expect(wrapper.find('AlertItem__DottedLine')).toHaveLength(0);
  });
  it('should not fetch translation a second time', async () => {
    store.dispatch(setPageData({
      config: { graphql: graphqlUrl },
    }));
    fetchGraphQL.mockImplementation(() => Promise.resolve({
      getSpanishTranslation: 'data',
    }));
    jest.spyOn(Promise, 'all').mockImplementation(() => ([
      { getSpanishTranslation: 'data' }]
    ));
    const wrapper = mount(
      <Provider store={store}>
        <AlertItem
          date={props.issueTimeLocal}
          severity={props.severity}
          title={props.eventDescription}
          description={props.texts[0].description}
        />
      </Provider>
    );
    expect(wrapper.find('AlertItem__Header')).toHaveLength(1);
    expect(wrapper.find('AlertItem__Title')).toHaveLength(1);
    expect(wrapper.find('AlertItem__Dot')).toHaveLength(1);
    wrapper.find('AlertItem__Header').simulate('click');
    await actions(wrapper);
    expect(wrapper.find('AlertItem__Description')).toHaveLength(1);
    expect(wrapper.find('AlertItem__IssueTime')).toHaveLength(2);
    expect(wrapper.find('AlertItem__DottedLine')).toHaveLength(1);
    wrapper.find('AlertItem__Header').simulate('click');
    await actions(wrapper);
    expect(fetchGraphQL).toHaveBeenCalledTimes(1);
  });
  it('should throw error and render no translation', async () => {
    fetchGraphQL.mockImplementation(() => Promise.resolve({ getSpanishTranslation: 'Translated text' }));
    jest.spyOn(Promise, 'all').mockResolvedValueOnce([{}]); // Resolve the promise with an empty array
    const wrapper = mount(
      <Provider store={store}>
        <AlertItem
          date={props.issueTimeLocal}
          description={props.texts[0].description}
          severity={props.severity}
          title={props.eventDescription}
        />
      </Provider>
    );

    expect(wrapper.find('AlertItem__Header')).toHaveLength(1);
    expect(wrapper.find('AlertItem__Title')).toHaveLength(1);
    expect(wrapper.find('AlertItem__Dot')).toHaveLength(1);
    wrapper.find('AlertItem__Header').simulate('click');
    expect(wrapper.find('AlertItem__Description')).toHaveLength(1);
  });
  it('should open the alert and fire the event', () => {
    TrackWeather.track = jest.fn();
    const wrapper = mount(
      <Provider store={store}>
        <AlertItem
          date={props.issueTimeLocal}
          description={props.texts[0].description}
          severity={props.severity}
          title={props.eventDescription}
          localMarketName="testLocalMarketName"
          county="testCounty"
        />
      </Provider>
    );
    act(() => {
      wrapper.find(Collapsible).first().props().onChange('show');
    });

    expect(TrackWeather.track).toHaveBeenCalledTimes(1);
  });
  it('should hide the alert and do not fire the event', () => {
    TrackWeather.track = jest.fn();
    store.dispatch(setPageData({
      config: { graphql: graphqlUrl },
    }));
    fetchGraphQL.mockImplementation(() => Promise.resolve({
      getSpanishTranslation: 'data',
    }));
    const wrapper = mount(
      <Provider store={store}>
        <AlertItem
          title={props.eventDescription}
          time="1:34 pm"
          description={props.texts[0].description}
          severity={props.severity}
        />
      </Provider>
    );
    act(() => {
      wrapper.find(Collapsible).first().props().onChange('hide');
    });

    expect(TrackWeather.track).toHaveBeenCalledTimes(0);
  });
  it('should hide the alert and do not fire the event', async () => {
    const error = new Error('Mock Error');

    jest.spyOn(Promise, 'all').mockImplementation(() => {
      throw error;
    });

    const wrapper = mount(
      <Provider store={store}>
        <AlertItem
          title={props.eventDescription}
          time="1:34 pm"
          description={props.texts[0].description}
          severity={props.severity}
        />
      </Provider>
    );

    await act(async () => {
      await wrapper.find(Collapsible).first().props().onChange('show');
    });

    expect(clientLogging).toHaveBeenCalledWith(error);
  });
});
