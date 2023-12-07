import React from 'react';
import { shallow } from 'enzyme';
import ActionLink from '.';

describe('ActionLink', () => {
  let props;
  beforeEach(() => {
    props = {
      theme: {
        primary: 'blue',
        secondary: 'red',
      },
      href: '/link',
      children: 'my link',
    };
  });
  it('renders with a theme', () => {
    const wrapper = shallow(<ActionLink {...props} />);
    expect(wrapper.prop('style').background).toBeDefined();
  });
  it('renders with a theme without direction', () => {
    const wrapper = shallow(<ActionLink {...props} />);
    expect(wrapper.prop('style').background).toBeDefined();
  });

  it('renders without a theme', () => {
    props.theme = undefined;
    const wrapper = shallow(<ActionLink {...props} />);
    expect(wrapper.prop('style').background).not.toBeDefined();
  });
});
