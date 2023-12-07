import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from '@univision/fe-commons/dist/store/configureStore';

import Header from '.';

const pageData = {
  site: 'mulher',
  domain: 'https://mulher.com.br',
};

const store = configureStore();

/**
 * @test {Header}
 */
describe('Header test', () => {
  it('should render correctly', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Header pageData={pageData} />
      </Provider>
    );

    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('Link')).toHaveLength(18);
  });
});
