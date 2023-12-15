import React from 'react';
import { mount, shallow } from 'enzyme';
import preloadAll from 'jest-next-dynamic';
import { act } from 'react-dom/test-utils';

import fetch from '@univision/fe-commons/dist/utils/fetch';
// eslint-disable-next-line no-restricted-imports
import configureStore from '@univision/fe-commons/dist/store/configureStore';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';

import mockData from '../../../../__mocks__/lasEstrellasPageData.json';
import { TelehitPage } from '../index.page';

const initialProps = {
  store: configureStore(),
  query: {},
};

// Mocks
jest.mock('@univision/fe-commons/dist/components/Authenticator', () => 'div');
jest.mock('@univision/fe-commons/dist/utils/tracking/perfume/perfumeTracker');
fetch.setResponse({ res: mockData });

Object.defineProperty(window, 'location', {
  value: {
    href: 'https://lasestrellas.com',
    assign: jest.fn(),
  },
  writable: true,
});

/**
 * @test {Canal5Page}
 */
describe('Canal5Page test', () => {
  beforeAll(async () => {
    mockData.data.page.data.widgets = [];
    await preloadAll();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should render correctly', () => {
    const wrapper = shallow(<TelehitPage {...initialProps} />);
    expect(wrapper).toHaveLength(1);
  });

  it('should set page data from getInitialProps', async () => {
    const props = await TelehitPage.getInitialProps(initialProps);
    let wrapper;

    await act(async () => {
      wrapper = mount(<TelehitPage store={initialProps.store} />);
    });

    const LasEstrellasLayout = wrapper.find('LasEstrellasLayout');
    expect(LasEstrellasLayout.exists()).toBe(false);
    expect(wrapper.exists()).toBe(true);
    expect(props).toHaveProperty('page.data.title', 'Las Estrellas Home Page');
    expect(props).toHaveProperty('page.appVersion', 2);
  });

  it('should render error page when there is not pageData', async () => {
    initialProps.store.dispatch(setPageData({ data: null }));
    const wrapper = mount(<TelehitPage store={initialProps.store} />);
    expect(wrapper.find('TelevisaErrorLayout')).toHaveLength(1);
  });
});
