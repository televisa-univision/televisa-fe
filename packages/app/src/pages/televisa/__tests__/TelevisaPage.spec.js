import React from 'react';
import { mount } from 'enzyme';
import preloadAll from 'jest-next-dynamic';

import fetch from '@univision/fe-commons/dist/utils/fetch';
import configureStore from '@univision/fe-commons/dist/store/configureStore';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';

import mockData from '../../../../__mocks__/televisaPageData.json';
import { TelevisaPage } from '../index.page';

const initialProps = {
  store: configureStore(),
  query: {},
};

// Mocks
jest.mock('@univision/fe-commons/dist/components/Authenticator', () => 'div');
jest.mock('@univision/fe-commons/dist/utils/tracking/perfume/perfumeTracker');
fetch.setResponse({ res: mockData });

/**
 * @test {TelevisaPage}
 */
describe('TelevisaPage test', () => {
  beforeAll(async () => {
    delete window.location;
    window.location = {
      href: 'https://televisa.com',
      assign: jest.fn(),
    };
    mockData.data.page.data.widgets = [];
    await preloadAll();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should render correctly', () => {
    initialProps.store.dispatch(setPageData({ data: { type: 'section' } }));
    const wrapper = mount(<TelevisaPage {...initialProps} />);
    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('ContentTypeWrapper')).toHaveLength(1);
  });

  it('should render error page when there is not pageData', () => {
    initialProps.store.dispatch(setPageData({ data: { type: '' } }));
    const wrapper = mount(<TelevisaPage store={initialProps.store} />);

    expect(wrapper.find('VixError404')).toBeDefined();
  });

  it('should set page data from getInitialProps', async () => {
    const props = await TelevisaPage.getInitialProps(initialProps);
    const wrapper = mount(<TelevisaPage store={initialProps.store} />);
    const vixLayout = wrapper.find('VixLayout');
    expect(vixLayout).toBeDefined();
    expect(wrapper).toHaveLength(1);
    expect(vixLayout).toBeDefined();
    expect(wrapper.find('Section')).toHaveLength(1);
    expect(props).toHaveProperty('page.data.title', 'Televisa Home Page');
    expect(props).toHaveProperty('page.appVersion', 2);
  });
});
