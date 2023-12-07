import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from '@univision/fe-commons/dist/store/configureStore';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import fetchGraphQL from '@univision/fe-commons/dist/utils/api/graphql';
import {
  jobSearchCitiesQuery,
  jobSearchJobsQuery,
  jobSearchIndustriesQuery,
} from '@univision/fe-graphql-services/dist/requests/queries/jobSearch';
import * as clientLogging from '@univision/fe-commons/dist/utils/logging/clientLogging';
import { FETCH_JOBS_FULFILLED } from '@univision/fe-commons/dist/store/actions/local/local-action-types';

import JobSearch from './index';
import mock from './mock.json';

jest.mock('@univision/fe-commons/dist/utils/api/graphql', () => jest.fn());

const store = configureStore({
  local: {
    jobs: mock.jobs,
  },
});
let loggerSpy;

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

describe('Job Search Component', () => {
  beforeEach(() => {
    store.dispatch(setPageData({
      data: { tvStation: { call: 'WGBO' } },
      config: { graphql: '' },
      theme: {},
    }));
    fetchGraphQL.mockImplementation(() => Promise.resolve({
      getApploiJobs: mock.jobs,
      getApploiIndustries: mock.industries,
      getApploiCities: mock.cities,
    }));
    loggerSpy = jest.spyOn(clientLogging, 'default').mockImplementation(() => jest.fn());
  });

  it('should render basic components without marketLocation', async () => {
    store.dispatch(setPageData({
      data: {},
      config: { graphql: '' },
      theme: {},
    }));

    const wrapper = mount(
      <Provider store={store}>
        <JobSearch />
      </Provider>
    );

    await actions(wrapper);

    expect(wrapper.find('JobSearch__Wrapper')).toHaveLength(1);
    expect(wrapper.find('JobsWidget')).toHaveLength(1);
    expect(wrapper.find('JobSearch__Form')).toHaveLength(1);
    expect(wrapper.find('JobsWidget__ButtonWrapper')).toHaveLength(1);
    expect(wrapper.find('JobsWidget__NoResults')).toHaveLength(1);
    expect(fetchGraphQL).toHaveBeenCalled();
  });

  it('should render basic components', async () => {
    const wrapper = mount(
      <Provider store={store}>
        <JobSearch />
      </Provider>
    );

    await actions(wrapper);

    expect(wrapper.find('JobSearch__Wrapper')).toHaveLength(1);
    expect(wrapper.find('JobsWidget')).toHaveLength(1);
    expect(wrapper.find('JobSearch__Form')).toHaveLength(1);
    expect(wrapper.find('JobsWidget__ButtonWrapper')).toHaveLength(1);
    expect(wrapper.find('Memo(ResultItem)').length).toBeGreaterThan(1);
    expect(wrapper.find('JobsWidget__NoResults')).toHaveLength(0);
    expect(fetchGraphQL).toHaveBeenCalled();
  });

  it('should test click on toggle language', async () => {
    const wrapper = mount(
      <Provider store={store}>
        <JobSearch />
      </Provider>
    );

    await actions(wrapper);
    expect(wrapper.find('ResultItem__Title').at(0).text()).toEqual(mock.jobs[0].name.es);
    wrapper.find('Badge__BadgeWrapper').at(1).simulate('click');
    expect(wrapper.find('ResultItem__Title').at(0).text()).toEqual(mock.jobs[0].name.en);
  });

  it('should render no industries', async () => {
    fetchGraphQL.mockImplementation(() => Promise.resolve({
      getApploiJobs: mock.jobs,
      getApploiIndustries: [],
      getApploiCities: mock.cities,
    }));
    const wrapper = mount(
      <Provider store={store}>
        <JobSearch />
      </Provider>
    );

    await actions(wrapper);

    expect(wrapper.find('JobSearch__Wrapper')).toHaveLength(1);
    expect(wrapper.find('JobsWidget')).toHaveLength(1);
    expect(wrapper.find('JobSearch__Form')).toHaveLength(1);
    expect(wrapper.find('JobsWidget__ButtonWrapper')).toHaveLength(1);
    expect(wrapper.find('Memo(ResultItem)').length).toBeGreaterThan(1);
    expect(wrapper.find('JobsWidget__NoResults')).toHaveLength(0);
    expect(wrapper.find('select[name="select-industry"] option').length).toEqual(1);
    expect(fetchGraphQL).toHaveBeenCalled();
  });

  it('should render no cities', async () => {
    fetchGraphQL.mockImplementation(() => Promise.resolve({
      getApploiJobs: mock.jobs,
      getApploiIndustries: mock.industries,
      getApploiCities: [],
    }));
    const wrapper = mount(
      <Provider store={store}>
        <JobSearch />
      </Provider>
    );

    await actions(wrapper);

    expect(wrapper.find('JobSearch__Wrapper')).toHaveLength(1);
    expect(wrapper.find('JobsWidget')).toHaveLength(1);
    expect(wrapper.find('JobSearch__Form')).toHaveLength(1);
    expect(wrapper.find('JobsWidget__ButtonWrapper')).toHaveLength(1);
    expect(wrapper.find('Memo(ResultItem)').length).toBeGreaterThan(1);
    expect(wrapper.find('JobsWidget__NoResults')).toHaveLength(0);
    expect(wrapper.find('select[name="select-city"] option').length).toEqual(1);
    expect(fetchGraphQL).toHaveBeenCalled();
  });

  it('should render no results', async () => {
    store.dispatch({ type: FETCH_JOBS_FULFILLED, jobs: [] });
    fetchGraphQL.mockImplementation(() => Promise.resolve({
      getApploiIndustries: mock.industries,
      getApploiCities: mock.cities,
    }));
    const wrapper = mount(
      <Provider store={store}>
        <JobSearch />
      </Provider>
    );

    await actions(wrapper);

    expect(wrapper.find('JobSearch__Wrapper')).toHaveLength(1);
    expect(wrapper.find('JobsWidget')).toHaveLength(1);
    expect(wrapper.find('JobSearch__Form')).toHaveLength(1);
    expect(wrapper.find('JobsWidget__ButtonWrapper')).toHaveLength(1);
    expect(wrapper.find('JobsWidget__NoResults')).toHaveLength(1);
    expect(fetchGraphQL).toHaveBeenCalled();
  });

  it('should throw error only on job search query', async () => {
    store.dispatch({ type: FETCH_JOBS_FULFILLED, jobs: [] });
    fetchGraphQL.mockImplementation(({ query }) => {
      if (query === jobSearchJobsQuery) {
        return Promise.reject(new Error('No data'));
      }

      return Promise.resolve({
        getApploiJobs: mock.jobs,
        getApploiIndustries: mock.industries,
        getApploiCities: mock.cities,
      });
    });

    const wrapper = mount(
      <Provider store={store}>
        <JobSearch />
      </Provider>
    );

    await actions(wrapper);

    expect(wrapper.find('Memo(ResultItem)')).toHaveLength(0);
    expect(wrapper.find('JobsWidget__NoResults')).toHaveLength(1);
  });

  it('should throw error only on cities search query', async () => {
    fetchGraphQL.mockImplementation(({ query }) => {
      if (query === jobSearchCitiesQuery) {
        return Promise.reject(new Error('No data'));
      }

      return Promise.resolve({
        getApploiJobs: mock.jobs,
        getApploiIndustries: mock.industries,
        getApploiCities: mock.cities,
      });
    });

    const wrapper = mount(
      <Provider store={store}>
        <JobSearch />
      </Provider>
    );

    await actions(wrapper);

    expect(loggerSpy).toHaveBeenCalled();
  });

  it('should throw error only on industries search query', async () => {
    fetchGraphQL.mockImplementation(({ query }) => {
      if (query === jobSearchIndustriesQuery) {
        return Promise.reject(new Error('No data'));
      }

      return Promise.resolve({
        getApploiJobs: mock.jobs,
        getApploiIndustries: mock.industries,
        getApploiCities: mock.cities,
      });
    });

    const wrapper = mount(
      <Provider store={store}>
        <JobSearch />
      </Provider>
    );

    await actions(wrapper);

    expect(loggerSpy).toHaveBeenCalled();
  });

  it('should return invalid jobs response', async () => {
    store.dispatch({ type: FETCH_JOBS_FULFILLED, jobs: [] });
    fetchGraphQL.mockImplementation(() => {
      return Promise.resolve({
        getApploiJobs: {},
        getApploiIndustries: mock.industries,
        getApploiCities: mock.cities,
      });
    });

    const wrapper = mount(
      <Provider store={store}>
        <JobSearch />
      </Provider>
    );

    await actions(wrapper);

    expect(wrapper.find('Memo(ResultItem)')).toHaveLength(0);
    expect(wrapper.find('JobsWidget__NoResults')).toHaveLength(1);
  });

  it('should test click on search icon and submit', () => {
    const wrapper = mount(
      <Provider store={store}>
        <JobSearch />
      </Provider>
    );
    wrapper.find('JobSearch__Form').simulate('submit');
    wrapper.find('InputField__IconWrapper').simulate('click');
  });

  it('should test cargar más button', async () => {
    const wrapper = mount(
      <Provider store={store}>
        <JobSearch />
      </Provider>
    );

    await actions(wrapper);

    wrapper.find('ListButton__StyledButton').simulate('click');
  });

  it('should test city dropdowns', async () => {
    const wrapper = mount(
      <Provider store={store}>
        <JobSearch />
      </Provider>
    );

    await actions(wrapper, () => {
      wrapper.find('select[name="select-city"]').simulate('change', { target: { name: 'Chicago - IL', value: 'Chicago.Illinois' }, preventDefault: () => {} });
    });

    wrapper.update();

    expect(wrapper.find('Memo(ResultItem)').length).toBeGreaterThan(1);
    expect(wrapper.find('JobsWidget__NoResults')).toHaveLength(0);
    expect(fetchGraphQL).toHaveBeenCalled();

    await actions(wrapper, () => {
      wrapper.find('select[name="select-city"]').simulate('change', { target: { name: 'nothing', value: 'nothing' }, preventDefault: () => {} });
    });

    wrapper.update();

    expect(wrapper.find('Memo(ResultItem)').length).toBeGreaterThan(1);
    expect(wrapper.find('JobsWidget__NoResults')).toHaveLength(0);
    expect(fetchGraphQL).toHaveBeenCalled();
  });

  it('should test industry dropdown', async () => {
    const wrapper = mount(
      <Provider store={store}>
        <JobSearch />
      </Provider>
    );

    await actions(wrapper, () => {
      wrapper.find('select[name="select-industry"]').simulate('change', { target: { name: 'Chicago - IL', value: 'Chicago.Illinois' }, preventDefault: () => {} });
    });

    wrapper.update();

    expect(wrapper.find('Memo(ResultItem)').length).toBeGreaterThan(1);
    expect(wrapper.find('JobsWidget__NoResults')).toHaveLength(0);
    expect(fetchGraphQL).toHaveBeenCalled();

    await actions(wrapper, () => {
      wrapper.find('select[name="select-industry"]').simulate('change', { target: { name: 'Chicago - IL', value: '' }, preventDefault: () => {} });
    });

    wrapper.update();
  });

  it('should test markets dropdown', async () => {
    const wrapper = mount(
      <Provider store={store}>
        <JobSearch />
      </Provider>
    );

    await actions(wrapper, () => {
      wrapper.find('select[name="select-market"]').simulate('change', { target: { name: 'Chicago', value: '0000014c-90bc-d076-a16c-b5bd851f0000' }, preventDefault: () => {} });
    });

    wrapper.update();

    expect(fetchGraphQL).toHaveBeenCalled();
  });

  it('should test cities filter for Arizona and Orlando', async () => {
    const wrapper = mount(
      <Provider store={store}>
        <JobSearch />
      </Provider>
    );

    await actions(wrapper, () => {
      wrapper.find('select[name="select-market"]').simulate('change', { target: { name: 'Orlando', value: 'Orlando' }, preventDefault: () => {} });
    });

    wrapper.update();

    expect(fetchGraphQL).toHaveBeenCalled();
  });
});
