/**
 * @module PrendeTV Social Network Specs
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import SocialNetwork from './index';

/**
 * @test {SocialNetwork}
 */
describe('SocialNetwork component', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SocialNetwork />, div);
  });
  it('should render correctly with isHeader option', () => {
    const wrapper = mount(<SocialNetwork isHeader />);
    expect(wrapper.find('Icon').first().prop('name')).toEqual('facebook');
  });
});
