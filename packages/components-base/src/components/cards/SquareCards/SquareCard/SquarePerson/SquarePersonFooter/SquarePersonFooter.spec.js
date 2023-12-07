import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import {
  MEDIUM,
  LARGE, SMALL,
} from '@univision/fe-commons/dist/constants/cardSizes';

import SquarePersonFooter from '.';
import data from '../../__mocks__/squareCard';

describe('SquarePersonFooter', () => {
  it('should render without crashing', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const div = document.createElement('div');
    ReactDOM.render(
      <SquarePersonFooter />,
      div
    );
  });
  it('renders correctly with valid props for footer Large', () => {
    const wrapper = mount(
      <SquarePersonFooter
        options={{
          social: data[14].socialNetworks,
        }}
        size={LARGE}
      />
    );
    expect(wrapper.find('SquarePersonFooter')).toHaveLength(1);
    expect(wrapper.find('SquarePersonFooter__PersonCardSocial')).toHaveLength(1);
    expect(wrapper.find('SquarePersonFooter__PersonCardFollow')).toHaveLength(1);
    expect(wrapper.find('SquarePersonFooter__SocialWrapper')).toHaveLength(3);
    expect(wrapper.find('SquarePersonFooter__PersonCardSocialLink')).toHaveLength(3);
    expect(wrapper.find('SquarePersonFooter').prop('size')).toBe(LARGE);
  });
  it('renders correctly with valid props for footer medium', () => {
    const wrapper = mount(
      <SquarePersonFooter
        options={{
          social: data[14].socialNetworks,
        }}
        size={MEDIUM}
      />
    );
    expect(wrapper.find('SquarePersonFooter')).toHaveLength(1);
    expect(wrapper.find('SquarePersonFooter__PersonCardSocial')).toHaveLength(1);
    expect(wrapper.find('SquarePersonFooter__PersonCardFollow')).toHaveLength(1);
    expect(wrapper.find('SquarePersonFooter__SocialWrapper')).toHaveLength(3);
    expect(wrapper.find('SquarePersonFooter__PersonCardSocialLink')).toHaveLength(3);
    expect(wrapper.find('SquarePersonFooter').prop('size')).toBe(MEDIUM);
  });
  it('renders correctly with valid props for footer small with is dark', () => {
    const wrapper = mount(
      <SquarePersonFooter
        options={{
          social: data[14].socialNetworks,
          isDark: true,
        }}
        size={SMALL}
      />
    );
    expect(wrapper.find('SquarePersonFooter')).toHaveLength(1);
    expect(wrapper.find('SquarePersonFooter__PersonCardSocial')).toHaveLength(1);
    expect(wrapper.find('SquarePersonFooter__PersonCardFollow')).toHaveLength(1);
    expect(wrapper.find('SquarePersonFooter__SocialWrapper')).toHaveLength(3);
    expect(wrapper.find('SquarePersonFooter__PersonCardSocialLink')).toHaveLength(3);
    expect(wrapper.find('SquarePersonFooter').prop('size')).toBe(SMALL);
  });
});
