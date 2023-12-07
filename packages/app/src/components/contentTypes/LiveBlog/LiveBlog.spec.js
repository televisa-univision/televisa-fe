import React from 'react';
import { shallow } from 'enzyme';
import LiveBlog from '.';

describe('LiveBlog', () => {
  it('should render an Opening + Body', () => {
    const wrapper = shallow(<LiveBlog pageData={{ data: {} }} />);
    expect(wrapper.find('ThemeStyle').childAt(0).key()).toBe('Opening');
    expect(wrapper.find('Connect(LiveBlogBody)')).toHaveLength(1);
  });

  it('should return null for invalid data', () => {
    const wrapper = shallow(<LiveBlog page={null} />);
    expect(wrapper.type()).toBe(null);
  });
});
