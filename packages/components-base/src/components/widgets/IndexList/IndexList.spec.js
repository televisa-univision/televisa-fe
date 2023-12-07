import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from '@univision/fe-commons/dist/store/configureStore';

import mockData from './__mocks__/indexList.json';
import IndexList from '.';

const Store = configureStore();

describe('IndexList', () => {
  it('should render without crashing', () => {
    const wrapper = mount(
      <Provider store={Store}>
        <IndexList {...mockData} />
      </Provider>
    );
    expect(wrapper.find('.uvs-container')).toHaveLength(1);
  });
  it('should render desktop version', () => {
    const wrapper = mount(
      <Provider store={Store}>
        <IndexList {...mockData} device="desktop" />
      </Provider>
    );
    expect(wrapper.find('.uvs-container')).toHaveLength(1);
    expect(wrapper.find('IndexListAside')).toHaveLength(1);
  });
});
