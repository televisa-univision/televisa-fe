import React from 'react';
import { mount } from 'enzyme';

import Toggle from '.';

const toggleOptions = [
  { value: 1, name: 'one' },
  { value: 2, name: 'two' },
];

/** @test {Toggle} */
describe('Toggle ', () => {
  it('should render the component as expected', () => {
    const wrapper = mount(<Toggle options={toggleOptions} />);
    expect(wrapper.find('Toggle__Label')).toHaveLength(1);
    expect(wrapper.find('Badge__BadgeWrapper')).toHaveLength(toggleOptions.length);
  });

  it('calls onSelect prop', () => {
    const onSelect = jest.fn();
    const wrapper = mount(<Toggle options={toggleOptions} onSelect={onSelect} />);
    wrapper.find('Badge__BadgeWrapper').at(1).simulate('click');
    expect(onSelect).toBeCalled();
  });

  it('should select element which was clicked', () => {
    const onSelect = jest.fn();
    const wrapper = mount(<Toggle options={toggleOptions} onSelect={onSelect} />);
    expect(wrapper.find('Badge__BadgeWrapper')).toHaveLength(toggleOptions.length);
    wrapper.find('Badge__BadgeWrapper').at(1).simulate('click');
    expect(wrapper.find('Badge__BadgeWrapper').at(1).hasClass('Toggle__unselect'));
  });
});
