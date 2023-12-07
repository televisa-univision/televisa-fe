import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';

import configureStore from '@univision/fe-commons/dist/store/configureStore';

import mockData from './__mocks__/crossVerticalListMockData.json';
import CrossVerticalList from '.';

const store = configureStore();

describe('CrossVerticalList', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    const el = (<Provider store={store}><CrossVerticalList /></Provider>);
    ReactDOM.render(el, div);
  });

  it('should render the component correctly', () => {
    const wrapper = mount(<Provider store={store}><CrossVerticalList {...mockData} /></Provider>);
    expect(wrapper.find('CrossVerticalList__VerticalCardWrapper')).toHaveLength(4);
  });

  it('should render dark mode', () => {
    const wrapper = mount(
      <Provider store={store}>
        <CrossVerticalList {...mockData} theme={{ isDark: true }} />
      </Provider>
    );
    expect(wrapper.find('CrossVerticalList__Title')).toHaveStyleRule({ color: '#fff' });
  });
});
