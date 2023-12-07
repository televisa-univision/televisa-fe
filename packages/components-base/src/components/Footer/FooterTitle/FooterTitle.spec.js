import React from 'react';
import { shallow } from 'enzyme';

import FooterTitle from './FooterTitle';

/** @test {FooterTitle} */
describe('FooterTitle ', () => {
  it('should render the component with its children', () => {
    const wrapper = shallow(<FooterTitle>hello</FooterTitle>);
    expect(wrapper.text()).toBe('hello');
  });
  it('should render the component with a custom class', () => {
    const wrapper = shallow(<FooterTitle className="foo">hello</FooterTitle>);
    expect(wrapper.find('.foo')).toHaveLength(1);
  });
});
