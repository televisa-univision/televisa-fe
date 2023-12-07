import React from 'react';
import { mount } from 'enzyme';

import WidgetLogo from '.';

describe('WidgetLogo', () => {
  it('should not render anything by default', () => {
    const wrapper = mount(<WidgetLogo />);
    expect(wrapper.find('div')).toHaveLength(0);
  });
  it('should render a logo with prop value', () => {
    const wrapper = mount(<WidgetLogo logo="logo.svg" />);
    expect(wrapper.find('img')).toHaveLength(1);
  });
  it('should set alt text', () => {
    const wrapper = mount(<WidgetLogo logo="logo.svg" alt="Logo" />);
    expect(wrapper.find('img').prop('alt')).toEqual('Logo');
  });
  it('should set alt text to default if not provided', () => {
    const wrapper = mount(<WidgetLogo logo="logo.svg" />);
    expect(wrapper.find('img').prop('alt')).toEqual('Widget Logo');
  });
  it('should set width', () => {
    const wrapper = mount(<WidgetLogo logo="logo.svg" width={100} />);
    expect(wrapper.find('img').prop('width')).toEqual(100);
  });
  it('should set height', () => {
    const wrapper = mount(<WidgetLogo logo="logo.svg" height={100} />);
    expect(wrapper.find('img').prop('height')).toEqual(100);
  });
});
