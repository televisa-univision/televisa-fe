import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import {
  MEDIUM,
  LARGE, SMALL,
} from '@univision/fe-commons/dist/constants/cardSizes';

import data from '../__mocks__/squareCard';
import SquarePerson from '.';

describe('SquarePerson', () => {
  it('should render without crashing', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const div = document.createElement('div');
    ReactDOM.render(
      <SquarePerson />,
      div
    );
  });
  it('renders correctly with valid props for  Large', () => {
    const wrapper = mount(
      <SquarePerson
        size={LARGE}
        {...data[14]}
      />
    );
    expect(wrapper.find('SquarePerson__Wrapper')).toHaveLength(1);
    expect(wrapper.find('SquarePerson__PersonCardMedia')).toHaveLength(1);
    expect(wrapper.find('SquarePerson__PersonCardPicture')).toHaveLength(1);
    expect(wrapper.find('SquarePerson__PersonCardTitle')).toHaveLength(1);
    expect(wrapper.find('SquarePerson__Wrapper').prop('size')).toBe(LARGE);
    expect(wrapper.find('SquarePerson__PersonCardMedia Link').prop('href')).toBe('https://uat.x.univision.com/radio/san-francisco-kbrg-fm/temas/jorge-ramos');
    expect(wrapper.find('SquarePerson__PersonCardTitle Link').prop('href')).toBe('https://uat.x.univision.com/radio/san-francisco-kbrg-fm/temas/jorge-ramos');
    expect(wrapper.find('SquarePerson__PersonCardTitle').text()).toBe('Jorge Ramos');
    expect(wrapper.find('SquarePerson__PersonCardTitle')).toHaveStyleRule('color', '#181818');
  });
  it('renders correctly with valid props for medium', () => {
    const wrapper = mount(
      <SquarePerson
        size={MEDIUM}
        {...data[14]}
      />
    );
    expect(wrapper.find('SquarePerson__Wrapper')).toHaveLength(1);
    expect(wrapper.find('SquarePerson__PersonCardMedia')).toHaveLength(1);
    expect(wrapper.find('SquarePerson__PersonCardPicture')).toHaveLength(1);
    expect(wrapper.find('SquarePerson__PersonCardTitle')).toHaveLength(1);
    expect(wrapper.find('SquarePerson__Wrapper').prop('size')).toBe(MEDIUM);
  });
  it('renders correctly with valid props for small and is dark', () => {
    const wrapper = mount(
      <SquarePerson
        size={SMALL}
        isDark
        {...data[14]}
      />
    );
    expect(wrapper.find('SquarePerson__Wrapper')).toHaveLength(1);
    expect(wrapper.find('SquarePerson__PersonCardMedia')).toHaveLength(1);
    expect(wrapper.find('SquarePerson__PersonCardPicture')).toHaveLength(1);
    expect(wrapper.find('SquarePerson__PersonCardTitle')).toHaveLength(1);
    expect(wrapper.find('SquarePerson__Wrapper').prop('size')).toBe(SMALL);
    expect(wrapper.find('SquarePerson__PersonCardTitle').prop('isDark')).toBe(true);
    expect(wrapper.find('SquarePerson__PersonCardTitle').text()).toBe('Jorge Ramos');
    expect(wrapper.find('SquarePerson__PersonCardTitle')).toHaveStyleRule('color', '#ffffff');
  });
});
