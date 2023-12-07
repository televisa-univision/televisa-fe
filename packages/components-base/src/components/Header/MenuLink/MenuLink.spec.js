import React from 'react';
import { shallow } from 'enzyme';

import Link from '../../Link';
import MenuLink from '.';

describe('MenuLink tests', () => {
  it('renders a list item', () => {
    const item = { name: 'name', link: 'thelink' };
    const wrapper = shallow(<MenuLink item={item} />);
    const link = wrapper.find(Link);
    expect(wrapper.find('li')).toHaveLength(1);
    expect(link.prop('children')).toEqual('name');
    expect(link.prop('href')).toEqual('thelink');
  });
});
