/**
 * @module PrendeTV Copyright Specs
 */
import React from 'react';
import { shallow } from 'enzyme';

import Copyright from '.';

window.dataLayer = {
  push: jest.fn(),
};

/**
 * @test {Copyright}
 */
describe('Prende TV Static Header test', () => {
  it('should render correctly', () => {
    const wrapper = shallow(
      <Copyright />
    );

    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('Copyright')).toHaveLength(1);
  });
  it('should render correctly when is for the footer', () => {
    const wrapper = shallow(
      <Copyright isFooter />
    );

    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('Copyright')).toHaveLength(1);
  });
});
