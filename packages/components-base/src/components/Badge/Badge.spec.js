import React from 'react';
import { mount } from 'enzyme';

import Badge from '.';

/** @test {Badge} */
describe('Toggle ', () => {
  it('should render the component as expected', () => {
    const wrapper = mount(<Badge label="test" />);
    expect(wrapper.find('Badge__BadgeWrapper')).toHaveLength(1);
    expect(wrapper.find('Badge__Label')).toHaveLength(1);
  });

  it('should not render when no label is passed', () => {
    const wrapper = mount(<Badge />);
    expect(wrapper.find('Badge__BadgeWrapper')).toHaveLength(0);
    expect(wrapper.find('Badge__Label')).toHaveLength(0);
  });

  it('calls onClick prop', () => {
    const onClick = jest.fn();
    const wrapper = mount(<Badge label="test" onClick={onClick} />);
    wrapper.find('Badge__BadgeWrapper').simulate('click');
    expect(onClick).toBeCalled();
  });
});
