/* eslint-disable no-global-assign */
/**
 * @module PrendeTV Hamburger Menu Specs
 */
import React from 'react';
import { mount, shallow } from 'enzyme';

import HamburgerMenu from '.';

global.window ??= Object.create(window);

window = {
  document: {
    body: {
      style: {},
    },
  },
};

/**
 * @test {Header}
 */
describe('Prende TV Static Header test', () => {
  it('should render correctly', () => {
    const wrapper = shallow(
      <HamburgerMenu />
    );

    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('HamburgerMenu__Wrapper')).toHaveLength(1);
  });

  it('should render when open', () => {
    const wrapper = mount(<HamburgerMenu open />);
    expect(wrapper.find('HamburgerMenuBody__WrapperIcon')).toBeDefined();
    expect(wrapper.find('PresenceChild')).toBeDefined();
    expect(wrapper.find('AnimatedModalBackground__ModalBackground')).toBeDefined();
  });

  it('should not render when not open', () => {
    const wrapper = mount(<HamburgerMenu device="desktop" />);
    expect(wrapper.find('HamburgerMenuBody__WrapperIcon')).toBeDefined();
    expect(wrapper.find('PresenceChild').length).toBe(0);
    expect(wrapper.find('AnimatedModalBackground__ModalBackground')).toBeDefined();
  });

  it('should remove scroll event listener when unmounting', () => {
    const removeEvent = jest.spyOn(global.window, 'removeEventListener');
    const wrapper = mount(<HamburgerMenu open />);
    expect(wrapper.find('HamburgerMenuBody__WrapperIcon')).toBeDefined();
    expect(wrapper.find('PresenceChild')).toBeDefined();
    expect(wrapper.find('AnimatedModalBackground__ModalBackground')).toBeDefined();
    wrapper.unmount();
    expect(removeEvent).toHaveBeenCalled();
  });
});
