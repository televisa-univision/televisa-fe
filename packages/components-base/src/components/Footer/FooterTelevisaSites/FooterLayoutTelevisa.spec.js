/* eslint-disable indent */

import React from 'react';
import { mount, shallow } from 'enzyme';

import { LIGHT_VARIANT, DARK_VARIANT } from '@univision/fe-commons/dist/utils/styled/constants';
import NavigationTracker from '@univision/fe-commons/dist/utils/tracking/tealium/navigation/NavigationTracker';

import * as pageSelector from '@univision/fe-commons/dist/store/selectors/page-selectors';
import { DESKTOP } from '@univision/fe-commons/dist/constants/devices';

import {
  VIX_BANNER_FOOTER_MOBILE,
  VIX_BANNER_FOOTER_DESKTOP,
} from '@univision/fe-commons/dist/constants/televisaSitesData';

import FooterLayoutTelevisa from './FooterLayoutTelevisa';
import Styles from './FooterLayoutTelevisa.scss';
import footerDataMX from '../footerDataTelevisa.json';
import * as helpers from '../../Navigation/MegaMenu/helpers';

let propsMX;

const socialNetworksMock = [
  {
    text: 'Univision Twitter',
    name: 'Twitter',
    url: 'https://twitter.com',
  },
  {
    text: 'Univision Instagram',
    name: 'Instagram',
    url: 'https://instragram.com',
  },
  {
    text: 'Univision Facebook',
    name: 'Facebook',
    url: 'https://facebook.com',
  },
];

describe('FooterLayoutTelevisa tests', () => {
  let trackNavigation;
  beforeEach(() => {
    propsMX = {
      themeVariant: 'light',
      localLinks: {
        links: [
          { text: 'test', href: 'test.com' },
        ],
      },
      ...footerDataMX,
    };

    trackNavigation = jest.spyOn(NavigationTracker, 'track');
  });
  it('renders as expected', () => {
    const wrapper = shallow(<FooterLayoutTelevisa {...propsMX} />);
    expect(wrapper.find('.topWrapper')).toHaveLength(1);
    expect(wrapper.find('.main')).toHaveLength(1);
  });

  it('should not render social networks', () => {
    const wrapper = shallow(<FooterLayoutTelevisa {...propsMX} />);
    expect(wrapper.find(`div.${Styles.networks} Link`)).toHaveLength(0);
  });
  it('renders social networks', () => {
    const newProps = {
      ...propsMX,
      socialNetworks: socialNetworksMock,
    };
    const wrapper = shallow(<FooterLayoutTelevisa {...newProps} />);
    expect(wrapper.find(`div.${Styles.networks} Link`)).toHaveLength(6);
  });
  it('renders social networks with white icon', () => {
    const newProps = {
      ...propsMX,
      socialNetworks: socialNetworksMock,
      themeVariant: 'light',
    };
    const wrapper = shallow(<FooterLayoutTelevisa {...newProps} />);
    expect(wrapper.find(`div.${Styles.networks}`).at(0).find('Icon').at(0)
.prop('size')).toEqual('small');
  });

  it('should track click on logo', () => {
    const wrapper = mount(<FooterLayoutTelevisa {...propsMX} />);
    wrapper.find('Logo').simulate('click');
    expect(trackNavigation).toHaveBeenCalled();
  });

  it('should render page with user location MX', () => {
    const wrapper = shallow(<FooterLayoutTelevisa {...propsMX} />);
    expect(wrapper.find('.topWrapper')).toHaveLength(1);
    expect(wrapper.find('.main')).toHaveLength(1);
  });
  it('dont show other pages for MX', () => {
    const wrapper = shallow(<FooterLayoutTelevisa {...propsMX} />);
    expect(wrapper.find('.button')).toHaveLength(0);
  });
  it('show apps with a number different to two ', () => {
    propsMX.apps.links.push({
      text: 'Las Estrellas',
      href: 'https://www.lasestrellas.tv/',
      icon: 'lasEstrellasApp',
      target: '_blank',
    });
    const wrapper = shallow(<FooterLayoutTelevisa {...propsMX} />);
    expect(wrapper.find(`div.${Styles.appsWrapper} Link`)).toHaveLength(0);
  });
  it('show apps with two apps', () => {
    const wrapper = shallow(<FooterLayoutTelevisa {...propsMX} />);
    expect(wrapper.find(`div.${Styles.appsWrapper} Link`)).toHaveLength(0);
  });
  // New tests
  it('should render a footer title with a link when the title contains href', () => {
    const section = {
        title: {
            text: 'Test Title',
            href: '/test-url',
        },
    };
    const wrapper = shallow(<FooterLayoutTelevisa {...propsMX} />);
    const title = wrapper.instance().renderFooterTitle(section, { isInternal: false });
    expect(title.props.children.type.name).toBe('FooterLink');
  });

  it('should render a footer title without a link when the title does not contain href', () => {
    const section = {
        title: {
            text: 'Test Title',
        },
    };
    const wrapper = shallow(<FooterLayoutTelevisa {...propsMX} />);
    const title = wrapper.instance().renderFooterTitle(section, { isInternal: false });
    expect(title.props.children).toBe(section.title.text);
  });

  it('should render a footer link', () => {
    const link = {
        text: 'Test Link',
        href: '/test-link-url',
    };
    const wrapper = shallow(<FooterLayoutTelevisa {...propsMX} />);
    const renderedLink = wrapper.instance().renderLink(link);
    expect(renderedLink.props.item).toBe(link);
  });

  it('should render the LogoWrapper inside renderTopPart', () => {
    const wrapper = shallow(<FooterLayoutTelevisa {...propsMX} />);
    const topPart = wrapper.instance().renderTopPart();
    const logoWrapper = shallow(topPart).find('FooterLayoutTelevisa__LogoWrapper');
    expect(logoWrapper.exists()).toBe(true);
  });

  it('should track click on VIX banner link', () => {
    const mockTracksVIXLink = jest.spyOn(helpers, 'tracksVIXLink');
    const wrapper = mount(<FooterLayoutTelevisa {...propsMX} />);
    const link = wrapper.find('Link[href="https://vix.smart.link/46zl6ztg7?&site_id=univision&creative_id=evergreen&lpurl=https://vix.com/canales&cp_1=internal_referral&cp_2=0&cp_3=footer&cp_4=0&deeplink=vixapp://canales"]');
    link.simulate('click');
    expect(mockTracksVIXLink).toHaveBeenCalledWith(true, false);
    mockTracksVIXLink.mockRestore();
  });

  it('size of social icons', () => {
    const newProps = {
      ...propsMX,
      socialNetworks: socialNetworksMock,
      themeVariant: LIGHT_VARIANT,
    };
    const wrapper = mount(<FooterLayoutTelevisa {...newProps} />);
    expect(wrapper.find('Icon[name="xColor"]').at(1).prop('size')).toEqual('small');
  });

  it('should render the social network icons with a white fill when theme is dark', () => {
    const newProps = {
      ...propsMX,
      socialNetworks: socialNetworksMock,
      themeVariant: DARK_VARIANT,
    };
    const wrapper = mount(<FooterLayoutTelevisa {...newProps} />);
    expect(wrapper.find('Icon[name="xColor"]').at(1).prop('size')).toEqual('small');
  });
  it('should render the desktop VIX banner when the device is desktop', () => {
    jest.spyOn(pageSelector, 'deviceSelector').mockReturnValue(DESKTOP);
    const wrapper = mount(<FooterLayoutTelevisa {...propsMX} />);
    expect(wrapper.find('Image[alt="VIX Banner"]').prop('src')).toEqual(VIX_BANNER_FOOTER_DESKTOP);
  });

  it('should render the mobile VIX banner when the device is not desktop', () => {
    jest.spyOn(pageSelector, 'deviceSelector').mockReturnValue('MOBILE');
    const wrapper = mount(<FooterLayoutTelevisa {...propsMX} />);
    expect(wrapper.find('Image[alt="VIX Banner"]').prop('src')).toEqual(VIX_BANNER_FOOTER_MOBILE);
  });
});
