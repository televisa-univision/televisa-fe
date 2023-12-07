import React from 'react';
import { shallow } from 'enzyme';
import LiveBlog from './LiveBlog';

describe('LiveBlog', () => {
  it('should render an Header + Opening + Body + Footer', () => {
    const wrapper = shallow(<LiveBlog page={{}} />);
    expect(wrapper.find('Header')).toHaveLength(1);
    expect(wrapper.find('ThemeStyle').childAt(0).key()).toBe('Opening');
    expect(wrapper.find('LiveBlogBody')).toHaveLength(1);
    expect(wrapper.find('FooterWrapper')).toHaveLength(1);
  });

  it('should return null for invalid data', () => {
    const wrapper = shallow(<LiveBlog page={null} />);
    expect(wrapper.type()).toBe(null);
  });
});
