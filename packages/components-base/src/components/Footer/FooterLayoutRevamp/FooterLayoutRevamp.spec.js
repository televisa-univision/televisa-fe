import React from 'react';
import { mount, shallow } from 'enzyme';

import NavigationTracker from '@univision/fe-commons/dist/utils/tracking/tealium/navigation/NavigationTracker';

import FooterLayoutRevamp from './FooterLayoutRevamp';
import Styles from './FooterLayoutRevamp.scss';
import footerData from '../footerData.json';
import footerDataMX from '../footerDataMX.json';

let props;
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

describe('FooterLayoutRevamp tests', () => {
  let trackNavigation;
  beforeEach(() => {
    props = {
      themeVariant: 'dark',
      userLocation: 'US',
      localLinks: {
        links: [
          { text: 'test', href: 'test.com' },
        ],
      },
      ...footerData,
    };

    propsMX = {
      themeVariant: 'dark',
      userLocation: 'MX',
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
    const wrapper = shallow(<FooterLayoutRevamp {...props} />);
    expect(wrapper.find('.topWrapper')).toHaveLength(1);
    expect(wrapper.find('.main')).toHaveLength(1);
  });

  it('shows other pages', () => {
    const wrapper = shallow(<FooterLayoutRevamp {...props} />);
    wrapper.instance().toggleShowOtherPages();
    expect(wrapper.state('showOtherPages')).toEqual(true);
  });

  it('should not render social networks', () => {
    const wrapper = shallow(<FooterLayoutRevamp {...props} />);
    expect(wrapper.find(`div.${Styles.networks} Link`)).toHaveLength(0);
  });
  it('renders social networks', () => {
    const newProps = {
      ...props,
      socialNetworks: socialNetworksMock,
    };
    const wrapper = shallow(<FooterLayoutRevamp {...newProps} />);
    expect(wrapper.find(`div.${Styles.networks} Link`)).toHaveLength(6);
  });
  it('renders social networks with white icon', () => {
    const newProps = {
      ...props,
      socialNetworks: socialNetworksMock,
      themeVariant: 'light',
    };
    const wrapper = shallow(<FooterLayoutRevamp {...newProps} />);
    expect(wrapper.find(`div.${Styles.networks} Icon`).at(0).prop('fill')).toEqual('#000');
  });
  it('does not render multi column section if there are no links', () => {
    const alteredProps = {
      ...props,
      noticias: {
        title: { text: 'noticias', href: 'https://univision.com/noticias' },
        links: null,
      },
    };
    const wrapper = shallow(<FooterLayoutRevamp {...alteredProps} themeVariant="light" />);

    expect(wrapper.instance().renderMultiColumnSection(alteredProps.noticias)).toBe(null);
  });

  it('does not render others section if there are no links', () => {
    const alteredProps = {
      ...props,
      other: {
        links: null,
      },
      otherChains: {
        links: null,
      },
    };
    const wrapper = shallow(<FooterLayoutRevamp {...alteredProps} themeVariant="light" />);

    expect(wrapper.instance().renderOthersSection()).toBe(null);
  });

  it('should render main section', () => {
    const alteredProps = {
      ...props,
      main: {
        title: { text: 'main', href: 'https://univision.com' },
        links: [
          { text: 'test', href: 'test.com' },
        ],
      },
    };
    const wrapper = shallow(<FooterLayoutRevamp {...alteredProps} themeVariant="light" />);

    expect(wrapper.instance().renderMainSection()).not.toBe(null);
  });

  it('does not render main section if there are no links', () => {
    const alteredProps = {
      ...props,
      main: {
        links: null,
      },
    };
    const wrapper = shallow(<FooterLayoutRevamp {...alteredProps} themeVariant="light" />);

    expect(wrapper.instance().renderMainSection()).toBe(null);
  });

  it('should not render newsletters if disableNewsLetters true', () => {
    const wrapper = shallow(
      <FooterLayoutRevamp
        {...props}
        disableNewsLetters
        disableOtherPagesButton
      />
    );
    expect(wrapper.instance().getNewsletters()).toBe(null);
  });

  it('should track click on logo', () => {
    const wrapper = mount(<FooterLayoutRevamp {...props} />);
    wrapper.instance().toggleShowOtherPages();
    expect(wrapper.state('showOtherPages')).toEqual(true);
    wrapper.find('Logo').simulate('click');
    expect(trackNavigation).toHaveBeenCalled();
  });

  it('should render page with user location MX', () => {
    const wrapper = shallow(<FooterLayoutRevamp {...propsMX} />);
    expect(wrapper.find('.topWrapper')).toHaveLength(1);
    expect(wrapper.find('.main')).toHaveLength(1);
  });
  it('dont show other pages for MX', () => {
    const wrapper = shallow(<FooterLayoutRevamp {...propsMX} />);
    expect(wrapper.find('.button')).toHaveLength(0);
  });
  it('show apps with a number different to two ', () => {
    propsMX.apps.links.push({
      text: 'Las Estrellas',
      href: 'https://www.lasestrellas.tv/',
      icon: 'lasEstrellasApp',
      target: '_blank',
    });
    const wrapper = shallow(<FooterLayoutRevamp {...propsMX} />);
    expect(wrapper.find(`div.${Styles.appsWrapper} Link`)).toHaveLength(0);
  });
  it('show apps with two apps', () => {
    const wrapper = shallow(<FooterLayoutRevamp {...propsMX} />);
    expect(wrapper.find(`div.${Styles.appsWrapper} Link`)).toHaveLength(0);
  });
});
