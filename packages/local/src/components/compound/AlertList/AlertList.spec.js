import React from 'react';
import { mount } from 'enzyme';
import configureStore from '@univision/fe-commons/dist/store/configureStore';
import { Provider } from 'react-redux';
import AlertList, { Container } from './index';
import props from './AlertItem/__mocks__/data.json';

const store = configureStore();

describe('Alert List', () => {
  it('should render without crashing - Generic', () => {
    const wrapper = mount(
      <Provider store={store}>
        <AlertList alerts={[props, { ...props, areaId: 'EF434f' }]} county="Mineola" />
      </Provider>
    );
    expect(wrapper.find(Container)).toHaveLength(1);
  });

  it('should render children - Generic', () => {
    const wrapper = mount(
      <Provider store={store}>
        <AlertList alerts={[props, { ...props, areaId: 'EF434f' }]} county="Mineola" />
      </Provider>
    );
    expect(wrapper.find('AlertItem__Header')).toHaveLength(2);
    expect(wrapper.find('AlertItem__Title')).toHaveLength(2);
  });
});
