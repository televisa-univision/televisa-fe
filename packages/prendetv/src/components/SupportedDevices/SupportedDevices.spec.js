/**
 * @module PrendeTV Supported Devices Specs
 */
import React from 'react';
import { mount } from 'enzyme';

import SupportedDevices from '.';

/**
 * @test {Supported Devices}
 */
describe('Prende TV Supported Devices test', () => {
  it('should render correctly', () => {
    const wrapper = mount(<SupportedDevices />);

    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('SupportedDevices__Wrapper')).toHaveLength(1);
  });
});
