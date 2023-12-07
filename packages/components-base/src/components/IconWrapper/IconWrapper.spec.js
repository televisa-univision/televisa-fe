import React from 'react';
import { mount } from 'enzyme';
import IconWrapper from '.';

describe('IconWrapper component', () => {
  it('render Icon with wrapper', () => {
    const wrapper = mount(<IconWrapper iconName="key" />);
    expect(wrapper.find('Icon')).toHaveLength(1);
  });
  it('render Icon with wrapper and variant light', () => {
    const wrapper = mount(<IconWrapper iconName="key" variant="light" />);
    expect(wrapper.find('Icon').prop('variant')).toBe('dark');
  });
  it('render Icon with wrapper and content', () => {
    const wrapper = mount(<IconWrapper iconName="key" content="23" />);
    expect(wrapper.find('span').text()).toBe('23');
  });
});
