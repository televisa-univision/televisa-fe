import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from '@univision/fe-commons/dist/store/configureStore';

import mockData from '../__mocks__/listContent.json';
import ListCards from '.';

const store = configureStore();
const props = {
  cardElements: [mockData.content[0]],
  device: 'desktop',
};

/** @test {ListCards} */
describe('List cards test', () => {
  it('should render correctly', () => {
    const wrapper = mount(
      <Provider store={store}>
        <ListCards
          {...props}
        />
      </Provider>
    );
    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('ListCard')).toHaveLength(1);
  });

  it('should render ListCard with theme from uri', () => {
    const listCards = [{
      ...mockData.content[0],
      uri: 'https://www.tudn.com',
      hierarchy: [],
    }];
    const wrapper = mount(
      <Provider store={store}>
        <ListCards
          cardElements={listCards}
          device="desktop"
        />
      </Provider>
    );
    expect(wrapper.find('ListCards')).toHaveLength(1);
    expect(wrapper.find('ListCard').prop('theme')).toEqual(expect.objectContaining({
      primary: '#007350',
      secondary: '#079F70',
    }));
  });

  it('should fallback to widget theme when vertical theme is not found', () => {
    const theme = {
      primary: '#000',
      secondary: '#000',
    };
    const listCards = [{
      ...mockData.content[0],
      uri: '/test',
      hierarchy: [],
    }];
    const wrapper = mount(
      <Provider store={store}>
        <ListCards
          cardElements={listCards}
          device="desktop"
          theme={theme}
        />
      </Provider>
    );
    expect(wrapper.find('ListCards')).toHaveLength(1);
    expect(wrapper.find('ListCard').prop('theme')).toEqual(theme);
  });

  it('should render ListCard with widget theme when a flavor is present', () => {
    const theme = {
      primary: '#000',
      secondary: '#000',
    };
    const listCards = [{
      ...mockData.content[0],
    }];
    const wrapper = mount(
      <Provider store={store}>
        <ListCards
          cardElements={listCards}
          device="desktop"
          theme={theme}
          flavor="test"
        />
      </Provider>
    );
    expect(wrapper.find('ListCards')).toHaveLength(1);
    expect(wrapper.find('ListCard').prop('theme')).toEqual(theme);
  });
});
