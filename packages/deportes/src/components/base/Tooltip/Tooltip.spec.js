import React from 'react';
import { shallow } from 'enzyme';
import Styles from './Tooltip.scss';

import Tooltip from '.';

/** @test {Tooltip} */
describe('Tooltip ', () => {
  it('should render as expected', () => {
    const wrapper = shallow(<Tooltip label="label">Hola</Tooltip>);
    expect(wrapper.find(`div.${Styles.tooltip}`).length).toBe(1);
  });
  it('handles mouse enter/leave events accordingly', () => {
    const hover = jest.fn();
    const leave = jest.fn();
    const wrapper = shallow(<Tooltip label="label">Hola</Tooltip>);
    wrapper.instance().handleMouseEnter = hover;
    wrapper.instance().handleMouseLeave = leave;
    wrapper.find('.tooltip').simulate('mouseEnter');
    expect(hover).toHaveBeenCalled();
    wrapper.find('.tooltip').simulate('mouseLeave');
    expect(leave).toHaveBeenCalled();
  });
  it('changes is visible state on mouse enter/leave events', () => {
    const wrapper = shallow(<Tooltip label="label">Hola</Tooltip>);
    wrapper.instance().handleMouseEnter();
    expect(wrapper.state('isVisible')).toEqual(true);
    wrapper.instance().handleMouseLeave();
    expect(wrapper.state('isVisible')).toEqual(false);
  });
});
