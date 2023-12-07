import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from '@univision/fe-commons/dist/store/configureStore';
import features from '@univision/fe-commons/dist/config/features';
import Carousel from '.';
import cardProps from '../../cards/SquareCards/SquareCard/__mocks__/squareCard.json';

const props = {
  settings: {
    title: 'Nueva York',
    seeMoreLink: {
      href: 'https://www.univision.com',
      target: '_self',
    },
  },
  content: [
    cardProps[0],
    cardProps[1],
    cardProps[3],
    cardProps[5],
    cardProps[4],
  ],
  device: 'desktop',
};

const store = configureStore();

/** @test {Carousel Widegt} */
describe('Carousel widget ', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    const el = (
      <Provider store={store}>
        <Carousel store={store} />
      </Provider>
    );
    ReactDOM.render(el, div);
  });
  it('should render CardsCarousel', () => {
    jest.spyOn(features.content, 'hasEnhancement').mockImplementation(() => false);
    const wrapper = mount(
      <Provider store={store}>
        <Carousel {...props} />
      </Provider>
    );
    expect(wrapper.find('CardsCarousel')).toHaveLength(1);
  });
  it('should render CarouselEnhancement', () => {
    jest.spyOn(features.content, 'hasEnhancement').mockImplementation(() => true);
    const wrapper = mount(
      <Provider store={store}>
        <Carousel {...props} />
      </Provider>
    );
    expect(wrapper.find('CarouselEnhancement')).toHaveLength(1);
  });
});
