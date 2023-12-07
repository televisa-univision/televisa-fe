import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';

import configureStore from '@univision/fe-commons/dist/store/configureStore';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import fetchGraphQL from '@univision/fe-commons/dist/utils/api/graphql';

import PersonJobs from './index';
import mock from '../JobSearch/mock.json';

jest.mock('@univision/fe-commons/dist/utils/api/graphql', () => jest.fn());

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

describe('Team Jobs Component', () => {
  beforeEach(() => {
    store.dispatch(setPageData({
      data: { tvStation: { call: 'WGBO' } },
      config: { graphql: '' },
      theme: {},
    }));
    fetchGraphQL.mockImplementation(() => Promise.resolve({
      getApploiJobs: mock.jobs,
    }));
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render component', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <PersonJobs />
      </Provider>, div
    );
  });

  it('should render results', async () => {
    fetchGraphQL.mockImplementation(() => Promise.resolve({
      getApploiJobs: mock.jobs,
    }));
    const wrapper = mount(
      <Provider store={store}>
        <PersonJobs />
      </Provider>
    );

    await actions(wrapper);

    expect(wrapper.find('JobsWidget')).toHaveLength(1);
    expect(wrapper.find('JobsWidget__ButtonWrapper')).toHaveLength(1);
    expect(wrapper.find('JobsWidget__NoResults')).toHaveLength(0);
    expect(wrapper.find('Memo(ResultItem)').length).toBeGreaterThan(1);
    expect(fetchGraphQL).toHaveBeenCalled();
  });

  it('should render no results', async () => {
    fetchGraphQL.mockImplementation(() => Promise.resolve({
      getApploiJobs: [],
    }));
    const wrapper = mount(
      <Provider store={store}>
        <PersonJobs />
      </Provider>
    );

    await actions(wrapper);

    expect(wrapper.find('JobsWidget')).toHaveLength(1);
    expect(wrapper.find('JobsWidget__ButtonWrapper')).toHaveLength(1);
    expect(wrapper.find('JobsWidget__NoResults')).toHaveLength(1);
    expect(fetchGraphQL).toHaveBeenCalled();
  });

  it('should throw error and render no results', async () => {
    fetchGraphQL.mockImplementation(() => Promise.reject(new Error('No data')));
    const wrapper = mount(
      <Provider store={store}>
        <PersonJobs />
      </Provider>
    );

    await actions(wrapper);
    expect(wrapper.find('ResultItem')).toHaveLength(0);
    expect(wrapper.find('JobsWidget__NoResults')).toHaveLength(1);
  });

  it('should test cargar más button', async () => {
    const wrapper = mount(
      <Provider store={store}>
        <PersonJobs />
      </Provider>
    );

    await actions(wrapper);

    wrapper.find('ListButton__StyledButton').simulate('click');

    await actions(wrapper);

    expect(fetchGraphQL).toBeCalledTimes(2);
  });
});
