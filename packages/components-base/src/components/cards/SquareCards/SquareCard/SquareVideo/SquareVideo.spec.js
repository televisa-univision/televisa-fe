import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import {
  LARGE,
} from '@univision/fe-commons/dist/constants/cardSizes';
import {
  HORIZONTAL,
} from '@univision/fe-commons/dist/constants/layoutTypes';
import configureStore from '@univision/fe-commons/dist/store/configureStore';

import data from '../__mocks__/squareCard';
import SquareVideo from '.';

const store = configureStore();

describe('SquareVideo', () => {
  it('should render without crashing', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <SquareVideo />
      </Provider>,
      div
    );
  });
  it('renders correctly with valid props', () => {
    const wrapper = mount(
      <Provider store={store}>
        <SquareVideo
          {...data[5]}
          size={LARGE}
        />
      </Provider>
    );
    expect(wrapper.find('SquareVideo__Wrapper')).toHaveLength(1);
    expect(wrapper.find('VideoImage')).toHaveLength(1);
    expect(wrapper.find('Link')).toHaveLength(1);
    expect(wrapper.find('SquareVideo__Wrapper')).toHaveStyleRule('color', '#ffffff');
    expect(wrapper.find('SquareVideo__Wrapper')).toHaveStyleRule('border-radius', '4px');
    expect(wrapper.find('Link').prop('href')).toBe(
      'https://www.tudn.com/futbol/mls/alan-pulido-vuelve-a-provocar-con-su-cubrebocas-lv-video'
    );
  });
  it('renders correctly with valid props fo list card horizontal', () => {
    const wrapper = mount(
      <Provider store={store}>
        <SquareVideo
          {...data[5]}
          size={LARGE}
          isListCard
          layout={HORIZONTAL}
        />
      </Provider>
    );
    expect(wrapper.find('SquareVideo__Wrapper')).toHaveLength(1);
    expect(wrapper.find('VideoImage')).toHaveLength(1);
    expect(wrapper.find('Link')).toHaveLength(1);
    expect(wrapper.find('SquareVideo__Wrapper').prop('isListCard')).toBe(true);
    expect(wrapper.find('SquareVideo__Wrapper')).toHaveStyleRule('color', '#ffffff');
    expect(wrapper.find('SquareVideo__Wrapper')).toHaveStyleRule('border-radius', '4px 0 0 4px');
    expect(wrapper.find('Link').prop('href')).toBe(
      'https://www.tudn.com/futbol/mls/alan-pulido-vuelve-a-provocar-con-su-cubrebocas-lv-video'
    );
  });
  it('renders correctly with valid props and image as string', () => {
    const wrapper = mount(
      <Provider store={store}>
        <SquareVideo
          {...data[5]}
          size={LARGE}
          image="image.jpg"
          hideProgressBar
        />
      </Provider>
    );
    expect(wrapper.find('SquareVideo__Wrapper')).toHaveLength(1);
    expect(wrapper.find('VideoImage')).toHaveLength(1);
    expect(wrapper.find('Link')).toHaveLength(1);
    expect(wrapper.find('VideoImage').prop('pictureProps')).toEqual(expect.objectContaining({
      image: 'image.jpg',
    }));
  });
});
