import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';

// eslint-disable-next-line no-restricted-imports
import configureStore from '@univision/fe-commons/dist/store/configureStore';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import preloadAll from 'jest-next-dynamic';

import mockData from '../../../../__mocks__/tudnPageData.json';
import mulherMockData from '../../../../__mocks__/mulherPageData.json';
import ContentTypeWrapper, { areStatePropsEqual } from '.';

const store = configureStore();

// Mocks
jest.mock('@univision/fe-commons/dist/components/Authenticator', () => 'div');
jest.mock('@univision/fe-commons/dist/utils/tracking/perfume/perfumeTracker');

/**
 * @test {ContentTypeWrapper}
 */
describe('ContentTypeWrapper test', () => {
  beforeAll(async () => {
    delete window.location;
    window.location = {};
    mockData.data.page.data.widgets = [{
      type: 'test',
      id: '0001',
    }];
    await preloadAll();
  });

  it('should render correctly 404', () => {
    const wrapper = mount(
      <Provider store={store}>
        <ContentTypeWrapper site="tudn" />
      </Provider>,
    );
    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('Error404')).toHaveLength(1);
  });

  it('should render correctly 404 for VIX', async () => {
    store.dispatch(setPageData({ data: { ...mulherMockData.data.page.data, type: null } }));
    const wrapper = mount(
      <Provider store={store}>
        <ContentTypeWrapper site="mulher" />
      </Provider>,
    );
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('VixError404')).toHaveLength(1);
  });

  it('should render correctly a section component', () => {
    store.dispatch(setPageData({ data: mockData.data.page.data }));
    const wrapper = mount(
      <Provider store={store}>
        <ContentTypeWrapper site="tudn" />
      </Provider>,
    );
    expect(wrapper.find('Section')).toHaveLength(1);
  });

  it('should render loading component if data is being fetched', () => {
    store.dispatch(setPageData({ data: mockData.data.page.data, loading: true }));
    const wrapper = mount(
      <Provider store={store}>
        <ContentTypeWrapper site="tudn" />
      </Provider>,
    );

    expect(wrapper.find('PagePlaceholder')).toHaveLength(1);
  });

  it('should call scrollTo if loading is false and back button is historyAction=[POP]', async () => {
    window.scrollTo = jest.fn();
    store.dispatch(setPageData({ data: mockData.data.page.data, loading: false, historyAction: 'POP' }));

    const wrapper = mount(
      <Provider store={store}>
        <ContentTypeWrapper site="tudn" />
      </Provider>,
    );

    wrapper.unmount();

    expect(window.scrollTo).toHaveBeenCalled();
    expect(wrapper.find('PagePlaceholder')).toHaveLength(0);
  });
});

describe('areStatePropsEqual', () => {
  it('should return the right value', () => {
    const pageData = {
      originalUrl: 'test',
      loading: true,
      pageCategory: 'abc',
    };
    expect(areStatePropsEqual({ pageData }, { pageData })).toBeTruthy();
    expect(areStatePropsEqual({ pageData: { originalUrl: 'test2' } }, { pageData })).toBeFalsy();
    expect(areStatePropsEqual({ pageData }, { pageData: { pageCategory: 'cde' } })).toBeFalsy();
    expect(areStatePropsEqual({ pageData }, { pageData: { loading: false } })).toBeFalsy();
  });
});
