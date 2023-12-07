import React from 'react';
import { shallow } from 'enzyme';
import Styles from './StatWrapper.scss';

import StatWrapper from '.';

/** @test {StatWrapper} */
describe('StatWrapper ', () => {
  it('should render as expected', () => {
    const wrapper = shallow(<StatWrapper />);
    expect(wrapper.find(`div.${Styles.container}`).length).toBe(1);
  });
  it('should render the modifierClass prop', () => {
    const className = 'modifier-class';
    const wrapper = shallow(<StatWrapper className={className} />);
    expect(wrapper.find(`.${className}`)).toBeDefined();
  });
  it('should render children node', () => {
    const wrapper = shallow(<StatWrapper>Widget</StatWrapper>);
    expect(wrapper.text()).toBe('Widget');
  });
});
