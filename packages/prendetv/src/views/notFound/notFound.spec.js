/**
 * @module PrendeTV 404 Page not Found Specs
 */
import React from 'react';
import { mount } from 'enzyme';

import PrendeTVContext from '../../context';

import NotFound from '.';

const contextData = {
  lang: 'en',
  path: 'no-found-page',
  device: 'mobile',
  page: {
    data: {},
    error: {
      code: 404,
    },
  },
};

/**
 * @test {NotFound page}
 */
describe('NotFound page test', () => {
  it('should render correctly', () => {
    const { Provider } = PrendeTVContext;
    const wrapper = mount(
      <Provider value={contextData}>
        <NotFound />
      </Provider>
    );

    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('notFound__Wrapper')).toHaveLength(1);
  });

  it('should render correctly', () => {
    const { Provider } = PrendeTVContext;
    const wrapper = mount(
      <Provider value={{ ...contextData, device: 'desktop' }}>
        <NotFound />
      </Provider>
    );

    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('notFound__Wrapper')).toHaveLength(1);
  });
});
