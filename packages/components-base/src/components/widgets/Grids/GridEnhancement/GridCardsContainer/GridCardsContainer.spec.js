import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from '@univision/fe-commons/dist/store/configureStore';

import mockData from '../__mocks__/gridMockData.json';
import GridCardsContainer, { areEqualProps } from '.';

const store = configureStore();

/** @test {GridCardsContaine} */
describe('GridCardsContainer test', () => {
  it('should render the cards with more news for listGrid', () => {
    const wrapper = mount(
      <Provider store={store}>
        <GridCardsContainer
          {...mockData[0]}
          devie="mobile"
          listGrid
        />
      </Provider>
    );
    expect(wrapper.find('GridCard__Card')).toHaveLength(7);
    expect(wrapper.find('SquareCard')).toHaveLength(3);
    expect(wrapper.find('ListCard')).toHaveLength(4);
    expect(wrapper.find('WidgetTitle')).toHaveLength(1);
    expect(wrapper.find('WidgetTitle').text()).toBe('Más noticias');
  });

  it('should render the cards on desktop with no more news', () => {
    const wrapper = mount(
      <Provider store={store}>
        <GridCardsContainer
          {...mockData[1]}
          device="desktop"
        />
      </Provider>
    );
    expect(wrapper.find('GridCard__Card')).toHaveLength(5);
    expect(wrapper.find('SquareCard')).toHaveLength(5);
    expect(wrapper.find('GridTitle')).toHaveLength(0);
  });

  it('should not re-render if not change content size', () => {
    expect(areEqualProps(mockData[0], { ...mockData[0], device: 'desktop' })).toBe(true);
    expect(areEqualProps(mockData[0], mockData[1])).toBe(false);
  });
});
