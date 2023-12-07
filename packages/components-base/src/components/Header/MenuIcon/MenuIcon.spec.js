import React from 'react';
import { shallow } from 'enzyme';

import MenuIcon from '.';

describe('MenuIcon tests', () => {
  it('renders as expected', () => {
    const wrapper = shallow(<MenuIcon />);
    expect(wrapper.find('.icon').length).toEqual(1);
    expect(wrapper.find('.open').length).toEqual(0);
  });

  it('adds open class if open', () => {
    const wrapper = shallow(<MenuIcon open />);
    expect(wrapper.find('.open').length).toEqual(1);
  });
});
