import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import {
  LARGE,
  MEDIUM,
  SMALL,
} from '@univision/fe-commons/dist/constants/cardSizes';
import {
  SQUARE,
} from '@univision/fe-commons/dist/constants/cardTypes';

import data from '../__mocks__/squareCard';
import SquareSlideshowGrid from '.';

describe('SquareSlideshowGrid', () => {
  it('should render without crashing', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const div = document.createElement('div');
    ReactDOM.render(
      <SquareSlideshowGrid />,
      div
    );
  });
  it('renders correctly with valid props for large', () => {
    const wrapper = mount(
      <SquareSlideshowGrid
        {...data[4]}
        size={LARGE}
        type={SQUARE}
      />
    );
    expect(wrapper.find('SquareSlideshowGrid')).toHaveLength(1);
    expect(wrapper.find('SquareSlideshowGrid__CardContainerLink')).toHaveLength(1);
    expect(wrapper.find('SquareSlideshowGrid__ImageGridContainer')).toHaveLength(1);
    expect(wrapper.find('SquareSlideshowGrid__ImageGrid')).toHaveLength(1);
    expect(wrapper.find('SquareSlideshowGrid__ImageGridImage')).toHaveLength(3);
    expect(wrapper.find('SquareSlideshowGrid__ImageGridOverlay')).toHaveLength(1);
    expect(wrapper.find('SquareSlideshowGrid').prop('size')).toBe(LARGE);
    expect(wrapper.find('SquareSlideshowGrid__ImageGrid')).toHaveStyleRule('grid-template', '1fr 1fr / 1fr 1fr');
    expect(wrapper.find('SquareSlideshowGrid__CardContainerLink').prop('href')).toBe(
      'https://www.tudn.com/futbol/la-liga/con-la-mira-puesta-en-el-regreso-clubes-espanoles-se-preparan-fotos'
    );
  });
  it('renders correctly with valid props for medium', () => {
    const wrapper = mount(
      <SquareSlideshowGrid
        {...data[4]}
        size={MEDIUM}
        type={SQUARE}
      />
    );
    expect(wrapper.find('SquareSlideshowGrid')).toHaveLength(1);
    expect(wrapper.find('SquareSlideshowGrid__CardContainerLink')).toHaveLength(1);
    expect(wrapper.find('SquareSlideshowGrid__ImageGridContainer')).toHaveLength(1);
    expect(wrapper.find('SquareSlideshowGrid__ImageGrid')).toHaveLength(1);
    expect(wrapper.find('SquareSlideshowGrid__ImageGridImage')).toHaveLength(3);
    expect(wrapper.find('SquareSlideshowGrid__ImageGridOverlay')).toHaveLength(1);
    expect(wrapper.find('SquareSlideshowGrid').prop('size')).toBe(MEDIUM);
    expect(wrapper.find('SquareSlideshowGrid__ImageGrid')).toHaveStyleRule('grid-template', '1fr 1fr / 1fr 1fr');
    expect(wrapper.find('SquareSlideshowGrid__ImageGridImage').first()).toHaveStyleRule('grid-area', '1 / 1 / 3 / 2');
    expect(wrapper.find('SquareSlideshowGrid__CardContainerLink').prop('href')).toBe(
      'https://www.tudn.com/futbol/la-liga/con-la-mira-puesta-en-el-regreso-clubes-espanoles-se-preparan-fotos'
    );
  });
  it('renders correctly with valid props for small', () => {
    const wrapper = mount(
      <SquareSlideshowGrid
        {...data[4]}
        size={SMALL}
        type={SQUARE}
      />
    );
    expect(wrapper.find('SquareSlideshowGrid')).toHaveLength(1);
    expect(wrapper.find('SquareSlideshowGrid__CardContainerLink')).toHaveLength(1);
    expect(wrapper.find('SquareSlideshowGrid__ImageGridContainer')).toHaveLength(1);
    expect(wrapper.find('SquareSlideshowGrid__ImageGrid')).toHaveLength(1);
    expect(wrapper.find('SquareSlideshowGrid__ImageGridImage')).toHaveLength(3);
    expect(wrapper.find('SquareSlideshowGrid__ImageGridOverlay')).toHaveLength(1);
    expect(wrapper.find('SquareSlideshowGrid').prop('size')).toBe(SMALL);
    expect(wrapper.find('SquareSlideshowGrid__ImageGrid')).toHaveStyleRule('grid-template', '1fr 1fr / 1fr 1fr');
    expect(wrapper.find('SquareSlideshowGrid__ImageGridImage').last()).toHaveStyleRule('grid-area', '2 / 2 / 3 / 3');
    expect(wrapper.find('SquareSlideshowGrid__CardContainerLink').prop('href')).toBe(
      'https://www.tudn.com/futbol/la-liga/con-la-mira-puesta-en-el-regreso-clubes-espanoles-se-preparan-fotos'
    );
  });
});
