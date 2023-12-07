import React from 'react';
import { shallow } from 'enzyme';

import SocialLink from '.';

jest.mock('@univision/fe-icons/dist/components/Icon', () => jest.fn());

let props;
beforeEach(() => {
  props = {
    link: {
      url: 'http://test.com',
    },
    type: 'facebook',
  };
});

describe('SocialLink tests', () => {
  it('renders as expected', () => {
    const wrapper = shallow(<SocialLink {...props} />);
    expect(wrapper.find('SocialLink__SocialLinkWrapper')).toHaveLength(1);
  });
  it('renders as expected with facebook', () => {
    props.type = 'facebook';
    const wrapper = shallow(<SocialLink {...props} />);
    expect(wrapper.find('SocialLink__SocialLinkWrapper')).toHaveStyleRule('background-color', '#486BB4');
  });
});
