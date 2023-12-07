/**
 * @module PrendeTV Blog Item component specs
 */
import React from 'react';
import { mount } from 'enzyme';

import BlogItem from '.';
import props from '../promoCards/Blog/__mocks__/blog.json';

/**
 * @test {PrendeTV Blog Item test}
 */
describe('PrendeTV Blot Item Component test', () => {
  it('should render correctly', () => {
    const propsItem = props.contents[0];
    const wrapper = mount(<BlogItem {...propsItem} consecutive={0} />);

    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('BlogItem')).toHaveLength(1);
  });
});
