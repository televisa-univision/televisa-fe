import React from 'react';
import { shallow } from 'enzyme';
import * as helpers from '@univision/fe-commons/dist/utils/helpers';

import Link from '../../Link';

import FooterLink from './FooterLink';

helpers.setCookie = jest.fn();

describe('FooterLink tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders a list item', () => {
    const item = { text: 'name', href: 'thelink', target: '_self' };
    const wrapper = shallow(<FooterLink item={item} />);
    const link = wrapper.find(Link);
    expect(link.prop('children')).toEqual('name');
    expect(link.prop('href')).toEqual('thelink');
    expect(link.prop('target')).toEqual('_self');
  });
  it('should set cookie when is clicked', () => {
    const item = {
      text: 'name', href: 'thelink', target: '_blank', setCookie: 'DO_NOT_SELL',
    };
    const wrapper = shallow(<FooterLink item={item} />);
    const link = wrapper.find(Link);
    link.simulate('click');
    expect(link.prop('children')).toEqual('name');
    expect(helpers.setCookie).toHaveBeenCalledTimes(1);
  });
  it('should not set cookie when is clicked', () => {
    const item = { text: 'name', href: 'thelink', target: '_blank' };
    const wrapper = shallow(<FooterLink item={item} />);
    const link = wrapper.find(Link);
    link.simulate('click');
    expect(link.prop('children')).toEqual('name');
    expect(helpers.setCookie).not.toBeCalled();
  });
  it('should convert to absolute url when flag is enabled in an item', () => {
    const item = {
      text: 'test',
      href: '/test',
      target: '_self',
      convertToAbsolute: true,
    };
    const domain = 'https://test.com';
    const wrapper = shallow(<FooterLink item={item} domain={domain} />);

    expect(wrapper.find(Link).prop('href')).toEqual('https://test.com/test');
  });
  it('should no convert to absolute url when flag is enabled in an item but no domain defined', () => {
    const item = {
      text: 'test',
      href: '/test',
      target: '_self',
      convertToAbsolute: true,
    };
    const wrapper = shallow(<FooterLink item={item} />);

    expect(wrapper.find(Link).prop('href')).toEqual('/test');
  });
});
