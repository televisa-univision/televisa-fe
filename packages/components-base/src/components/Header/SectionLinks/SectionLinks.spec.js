import React from 'react';
import { shallow } from 'enzyme';

import MenuLink from '../MenuLink';
import SectionLinks from '.';

jest.mock('../MenuLink', () => jest.fn());

let props;
beforeEach(() => {
  props = {
    links: [
      { link: '#', name: 'a link!' },
      { link: '#1', name: 'another link!' },
    ],
  };
});

describe('SectionLinks', () => {
  it('renders as expected', () => {
    const wrapper = shallow(<SectionLinks {...props} />);
    expect(wrapper.find('.sections')).toHaveLength(1);
    expect(wrapper.find(MenuLink)).toHaveLength(2);
  });

  it('does not fail if links is not defined', () => {
    props.links = undefined;
    const wrapper = shallow(<SectionLinks {...props} />);
    expect(wrapper.find(MenuLink)).toHaveLength(0);
  });
});
