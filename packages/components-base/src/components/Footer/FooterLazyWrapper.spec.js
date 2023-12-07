import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import Loadable from 'react-loadable';

import configureStore from '@univision/fe-commons/dist/store/configureStore';

import FooterWrapper from './FooterLazyWrapper';

const store = configureStore();

describe('Footer tests', () => {
  beforeAll(async () => {
    await Loadable.preloadAll();
  });

  beforeEach(() => {
    jest.useFakeTimers();
  });

  it('renders as expected', async () => {
    const wrapper = mount(
      <Provider store={store}>
        <FooterWrapper />
      </Provider>
    );
    expect(wrapper.find('Footer')).toHaveLength(1);
  });
});
