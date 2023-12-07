import React from 'react';
import { shallow } from 'enzyme';
import Styles from './CardWrapper.scss';

import CardWrapper from '.';

/** @test {CardWrapper} */
describe('StatWrapper ', () => {
  it('should render as expected', () => {
    const wrapper = shallow(<CardWrapper />);
    expect(wrapper.find(`div.${Styles.container}`).length).toBe(1);
  });
  it('should render the modifierClass prop', () => {
    const className = 'modifier-class';
    const wrapper = shallow(<CardWrapper className={className} />);
    expect(wrapper.find(`.${className}`)).toBeDefined();
  });
  it('should render children node', () => {
    const wrapper = shallow(<CardWrapper>Widget</CardWrapper>);
    expect(wrapper.text()).toBe('<DateTime />Widget');
  });
  it('should render DteTime', () => {
    const wrapper = shallow(<CardWrapper date="2018-01-29T21:00:00Z" />);
    expect(wrapper.find('DateTime').length).toBe(1);
  });
  it('should render no Icons', () => {
    const wrapper = shallow(<CardWrapper>Widget</CardWrapper>);
    expect(wrapper.find('Icon').length).toBe(0);
  });
  it('should render tv Icon', () => {
    const wrapper = shallow(<CardWrapper onTV>Widget</CardWrapper>);
    expect(wrapper.find('Icon').length).toBe(1);
  });
  it('should render digital Icon', () => {
    const wrapper = shallow(<CardWrapper onDigital>Widget</CardWrapper>);
    expect(wrapper.find('Icon').length).toBe(1);
  });
  it('should render progress wrapper if live', () => {
    const wrapper = shallow(<CardWrapper onDigital isLive>Widget</CardWrapper>);
    expect(wrapper.find('.progressWrapper').length).toBe(1);
  });
});
