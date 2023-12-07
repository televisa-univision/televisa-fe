import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import props from './__mocks__/props.json';
import Follow from '.';

/** @test {Follow} */
describe('Follow', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Follow {...props} />, div);
  });
  it('should render related tags as Links', () => {
    const wrapper = mount(<Follow {...props} />);
    expect(wrapper.find('SocialLink').length).toBe(3);
  });
  it('should return no SocialLink if social has no elements', () => {
    const wrapper = mount(<Follow />);
    expect(wrapper.find('SocialLink').length).toBe(0);
  });
});
