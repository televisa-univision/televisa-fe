import React from 'react';
import { shallow } from 'enzyme';

import FullWidth from '.';

describe('FullWidth tests', () => {
  it('renders as expected', () => {
    const wrapper = shallow(<FullWidth breakpoints={['lg']}>hi</FullWidth>);
    expect(wrapper.find('.full-lg')).toHaveLength(1);
  });

  it('adds a custom className', () => {
    const wrapper = shallow(<FullWidth breakpoints={['lg']} className="test">hi</FullWidth>);
    expect(wrapper.find('.test')).toHaveLength(1);
  });
});
