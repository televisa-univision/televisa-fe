/**
 * @module PrendeTV Header Specs
 */
import React from 'react';
import { mount, shallow } from 'enzyme';

import Header from '.';

/**
 * @test {Header}
 */
describe('Prende TV Static Header test', () => {
  it('should render correctly', () => {
    const wrapper = shallow(
      <Header />
    );

    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('Header__Wrapper')).toHaveLength(1);
  });

  it('should open the menu when clicked', () => {
    const wrapper = mount(<Header />);
    wrapper.find('Header__WrapperIcon').simulate('click');
    expect(wrapper.find('PresenceChild')).toBeDefined();
  });
});
