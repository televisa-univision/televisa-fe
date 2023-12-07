import React from 'react';
import { mount } from 'enzyme';

import contentTypes from '@univision/fe-commons/dist/constants/contentTypes.json';
import { WHITE } from '@univision/fe-utilities/styled/constants';

import IndexMeta from '.';

describe('IndexMeta', () => {
  it('should return an empty component by default', () => {
    const wrapper = mount(<IndexMeta />);
    expect(wrapper.find('div')).toHaveLength(0);
  });
  it('should return article read time', () => {
    const props = {
      type: contentTypes.ARTICLE,
      readTime: 2,
    };
    const wrapper = mount(<IndexMeta {...props} />);
    expect(wrapper.find('IndexMeta__Container')).toHaveLength(1);
  });
  it('should render dark mode', () => {
    const props = {
      type: contentTypes.ARTICLE,
      readTime: 2,
      isDark: true,
    };
    const wrapper = mount(<IndexMeta {...props} />);
    expect(wrapper.find('IndexMeta__Container')).toHaveLength(1);
    expect(wrapper.find('Icon').prop('fill')).toBe(WHITE);
    expect(wrapper.find('IndexMeta__Label').prop('isDark')).toBe(true);
  });
});
