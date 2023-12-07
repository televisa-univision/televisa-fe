import React from 'react';
import { shallow } from 'enzyme';

import univisionLogoColor from '@univision/fe-commons/dist/assets/images/logo-univision-color.svg';

import Logo from '../../Logo';
import MenuLink from '../MenuLink';
import SecondaryNav from '.';

jest.mock('../SectionLinks', () => jest.fn());
jest.mock('../MenuLink', () => jest.fn());
jest.mock('../../Logo', () => jest.fn());

let props;
beforeEach(() => {
  props = {
    links: {
      primary: [{ link: '#primary', name: 'primary' }],
      secondary: [{
        name: 'a category',
        link: '#',
        contents: [{ link: '#', name: 'a link!' }, { link: '#1', name: 'another link!' }]
      }]
    },
    mobileOpen: false,
    onClose: jest.fn(),
  };
});

describe('SecondaryNav', () => {
  it('renders as expected', () => {
    const wrapper = shallow(<SecondaryNav {...props} />);
    expect(wrapper.find('.secondaryOuterWrapper')).toHaveLength(1);
  });

  it('renders category and links', () => {
    const wrapper = shallow(<SecondaryNav {...props} />);
    expect(wrapper.find('.subNavList')).toHaveLength(1);
    expect(wrapper.find(MenuLink)).toHaveLength(3);
  });

  it('adds .open class to secondary menu', () => {
    const wrapper = shallow(<SecondaryNav {...props} open />);
    expect(wrapper.find('.isOpen')).toHaveLength(1);
  });

  it('adds .mobileOpen class to secondary menu', () => {
    props.mobileOpen = true;
    const wrapper = shallow(<SecondaryNav {...props} />);
    expect(wrapper.find('.mobileOpen')).toHaveLength(1);
  });

  it('renders different logo for light variant', () => {
    props.variant = 'light';
    const wrapper = shallow(<SecondaryNav {...props} />);
    expect(wrapper.find(Logo).prop('src')).toEqual(univisionLogoColor);
  });

  it('renders be open if not links primary provided', () => {
    props = {
      variant: 'dark',
      links: {
        secondary: [{
          name: 'a category',
          link: '#',
          contents: [{ link: '#', name: 'a link!' }, { link: '#1', name: 'another link!' }]
        }]
      },
    };
    const wrapper = shallow(<SecondaryNav {...props} />);
    expect(wrapper.find('Button').length).toBe(1);
  });
});
