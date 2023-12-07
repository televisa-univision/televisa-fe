import React from 'react';
import { shallow } from 'enzyme';

import GroupPhaseArrow from '.';

describe('GroupPhaseArrow tests', () => {
  it('should render without issues', () => {
    const wrapper = shallow(<GroupPhaseArrow />);
    expect(wrapper.getElement()).toBeDefined();
  });
  it('should render the right arrow', () => {
    const wrapper = shallow(<GroupPhaseArrow isRight />);
    expect(wrapper.find('.arrow')).toHaveLength(1);
  });
  it('should render nav arrow', () => {
    const wrapper = shallow(<GroupPhaseArrow type="nav" />);
    expect(wrapper.find('Icon')).toHaveLength(1);
  });
  it('should render nav right arrow', () => {
    const wrapper = shallow(<GroupPhaseArrow type="nav" isRight />);
    expect(wrapper.find('Icon').props().name).toBe('arrowRight');
  });
  it('should render nav right arrow with istudn', () => {
    const wrapper = shallow(<GroupPhaseArrow type="nav" isRight isTudn />);
    expect(wrapper.find('Icon').props().fill).toBe('#007350');
  });
});
