import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import {
  LARGE,
  MEDIUM,
  SMALL,
} from '@univision/fe-commons/dist/constants/cardSizes';

import data from '../__mocks__/squareCard';
import SquareShow from '.';

describe('SquareShow', () => {
  it('should render without crashing', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const div = document.createElement('div');
    ReactDOM.render(
      <SquareShow />,
      div
    );
  });
  it('renders correctly with valid props for large', () => {
    const wrapper = mount(
      <SquareShow
        {...data[9]}
        size={LARGE}
      />
    );
    expect(wrapper.find('SquareShow')).toHaveLength(1);
    expect(wrapper.find('SquareShow__Background')).toHaveLength(1);
    expect(wrapper.find('SquareShow__LogoImage')).toHaveLength(1);
    expect(wrapper.find('SquareShow__AirTime')).toHaveLength(1);
    expect(wrapper.find('SquareShow__Description')).toHaveLength(1);
    expect(wrapper.find('SquareShow').prop('size')).toBe(LARGE);
    expect(wrapper.find('SquareShow__BackgroundOverlay')).toHaveStyleRule('height', '40px');
    expect(wrapper.find('SquareShow__Description Link').prop('href')).toBe('https://uat.x.univision.com/shows/republica-deportiva');
    expect(wrapper.find('SquareShow__AirTime').text()).toBe('Domingo 12P/2C');
  });
  it('renders correctly with valid props for medium', () => {
    const wrapper = mount(
      <SquareShow
        {...data[9]}
        size={MEDIUM}
      />
    );
    expect(wrapper.find('SquareShow')).toHaveLength(1);
    expect(wrapper.find('SquareShow__Background')).toHaveLength(1);
    expect(wrapper.find('SquareShow__LogoImage')).toHaveLength(1);
    expect(wrapper.find('SquareShow__AirTime')).toHaveLength(1);
    expect(wrapper.find('SquareShow__Description')).toHaveLength(1);
    expect(wrapper.find('SquareShow').prop('size')).toBe(MEDIUM);
    expect(wrapper.find('SquareShow__BackgroundOverlay')).toHaveStyleRule('height', '50px');
    expect(wrapper.find('SquareShow__Description Link').prop('href')).toBe('https://uat.x.univision.com/shows/republica-deportiva');
    expect(wrapper.find('SquareShow__AirTime').text()).toBe('Domingo 12P/2C');
  });
  it('renders correctly with valid props for small', () => {
    const wrapper = mount(
      <SquareShow
        {...data[9]}
        size={SMALL}
      />
    );
    expect(wrapper.find('SquareShow')).toHaveLength(1);
    expect(wrapper.find('SquareShow__Background')).toHaveLength(1);
    expect(wrapper.find('SquareShow__LogoImage')).toHaveLength(1);
    expect(wrapper.find('SquareShow__AirTime')).toHaveLength(1);
    expect(wrapper.find('SquareShow__Description')).toHaveLength(1);
    expect(wrapper.find('SquareShow').prop('size')).toBe(SMALL);
    expect(wrapper.find('SquareShow__BackgroundOverlay')).toHaveStyleRule('top', '0');
    expect(wrapper.find('SquareShow__Description Link').prop('href')).toBe('https://uat.x.univision.com/shows/republica-deportiva');
    expect(wrapper.find('SquareShow__AirTime').text()).toBe('Domingo 12P/2C');
  });
});
