import React from 'react';
import { shallow } from 'enzyme';

import getFooterLayout from './getFooterLayout';

describe('getFooterLayout', () => {
  it('should return FooterLayout by default', () => {
    const Layout = getFooterLayout({});
    const wrapper = shallow(<Layout />);
    expect(wrapper.find('loading')).toHaveLength(1);
  });

  it('should return FooterLayoutRevamp in SSR mode', () => {
    const Layout = getFooterLayout({
      isWorldCupMVP: true,
      contentType: 'section',
    });
    const wrapper = shallow(<Layout />);
    expect(wrapper.find('loading')).toHaveLength(1);
  });

  it('should return FooterLayoutRevamp in CSR mode', () => {
    const Layout = getFooterLayout({
      isWorldCupMVP: true,
      contentType: 'article',
    });
    const wrapper = shallow(<Layout />);
    expect(wrapper.find('loading')).toHaveLength(1);
  });

  it('should return FooterLayoutTelevisaSSR when isTelevisaSite is true and contentType is SECTION', () => {
    const Layout = getFooterLayout({
      isTelevisaSite: true,
      contentType: 'section',
    });
    const wrapper = shallow(<Layout />);
    expect(wrapper.find('loading')).toHaveLength(1);
  });

  it('should return FooterLayoutTelevisa when isTelevisaSite is true and contentType is not SECTION', () => {
    const Layout = getFooterLayout({
      isTelevisaSite: true,
      contentType: 'article',
    });
    const wrapper = shallow(<Layout />);
    expect(wrapper.find('loading')).toHaveLength(1);
  });
});
