import React from 'react';
import { mount, shallow } from 'enzyme';
import Loadable from 'react-loadable';

import {
  VIX_BANNER_DOMAIN,
  VIX_BANNER_FOOTER_PATH,
  VIX_BANNER_FOOTER_DESKTOP,
} from '@univision/fe-commons/dist/constants/vixSitesData';
import { DESKTOP } from '@univision/fe-commons/dist/constants/devices';
import * as pageSelectors from '@univision/fe-commons/dist/store/selectors/page-selectors';
import NavigationTracker from '@univision/fe-commons/dist/utils/tracking/tealium/navigation/NavigationTracker';
import * as helpers from '../../Navigation/MegaMenu/helpers';

import FooterLayout from './FooterLayout';
import Styles from './FooterLayout.scss';
import footerData from '../footerData.json';

let props;

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

describe('FooterLayout tests', () => {
  let trackNavigation;

  beforeAll(async () => {
    await Loadable.preloadAll();
  });

  beforeEach(() => {
    props = {
      themeVariant: 'dark',
      localLinks: {
        title: 'test',
        links: [
          { text: 'test', href: 'test.com' },
        ],
      },
      ...footerData,
      footerLogo: 'test',
    };

    trackNavigation = jest.spyOn(NavigationTracker, 'track');

    jest.useFakeTimers();
  });

  it('renders as expected', async () => {
    const wrapper = shallow(<FooterLayout {...props} />);

    expect(wrapper.find('.topWrapper')).toHaveLength(1);
    expect(wrapper.find('.main')).toHaveLength(1);
  });

  it('shows other pages', async () => {
    const wrapper = shallow(<FooterLayout {...props} />);

    wrapper.instance().toggleShowOtherPages();
    expect(wrapper.state('showOtherPages')).toEqual(true);
  });

  it('renders social networks', async () => {
    const newProps = {
      ...props,
      socialNetworks: socialNetworksMock,
    };
    const wrapper = shallow(<FooterLayout {...newProps} />);

    expect(wrapper.find(`div.${Styles.networks} Link`)).toHaveLength(6);
  });

  it('should not render social networks', async () => {
    const wrapper = shallow(<FooterLayout {...props} />);

    expect(wrapper.find(`div.${Styles.networks} Link`)).toHaveLength(0);
  });

  it('renders social networks with white icon', async () => {
    const newProps = {
      ...props,
      socialNetworks: socialNetworksMock,
      themeVariant: 'light',
    };
    const wrapper = shallow(<FooterLayout {...newProps} />);

    expect(wrapper.find(`div.${Styles.networks} Icon`).at(0).prop('fill')).toEqual('#000');
  });

  it('does not render multi column section if there are no links', async () => {
    const alteredProps = {
      ...props,
      noticias: {
        title: { text: 'noticias', href: 'https://univision.com/noticias' },
        links: null,
      },
    };
    const wrapper = shallow(<FooterLayout {...alteredProps} themeVariant="light" />);

    expect(wrapper.instance().renderMultiColumnSection(alteredProps.noticias)).toBe(null);
  });

  it('does not render others section if there are no links', async () => {
    const alteredProps = {
      ...props,
      other: {
        links: null,
      },
      otherChains: {
        links: null,
      },
    };
    const wrapper = shallow(<FooterLayout {...alteredProps} themeVariant="light" />);

    expect(wrapper.instance().renderOthersSection()).toBe(null);
  });

  it('should render main section', async () => {
    const alteredProps = {
      ...props,
      main: {
        title: { text: 'main', href: 'https://univision.com' },
        links: [
          { text: 'test', href: 'test.com' },
        ],
      },
    };
    const wrapper = shallow(<FooterLayout {...alteredProps} themeVariant="light" />);

    expect(wrapper.instance().renderMainSection()).not.toBe(null);
  });

  it('does not render main section if there are no links', async () => {
    const alteredProps = {
      ...props,
      main: {
        links: null,
      },
    };
    const wrapper = shallow(<FooterLayout {...alteredProps} themeVariant="light" />);

    expect(wrapper.instance().renderMainSection()).toBe(null);
  });

  it('should not render newsletters if disableNewsLetters true', async () => {
    const wrapper = shallow(
      <FooterLayout
        {...props}
        disableNewsLetters
        disableOtherPagesButton
      />
    );

    expect(wrapper.instance().getNewsletters()).toBe(null);
  });

  it('should track click on logo', async () => {
    const wrapper = mount(<FooterLayout {...props} />);

    wrapper.instance().toggleShowOtherPages();

    expect(wrapper.state('showOtherPages')).toEqual(true);
    wrapper.find('Logo').simulate('click');
    expect(trackNavigation).toHaveBeenCalled();
  });

  it('should render vix banner on univision', async () => {
    const rest = { ...props, site: 'univision' };
    const wrapper = mount(<FooterLayout {...rest} />);

    expect(wrapper.find('Link').first().props().href).toBe(`${VIX_BANNER_DOMAIN}${VIX_BANNER_FOOTER_PATH}`);
  });

  it('should render vix banner on univision desktop image', async () => {
    jest.spyOn(pageSelectors, 'deviceSelector').mockReturnValue(DESKTOP);
    const rest = { ...props, site: 'univision' };
    const wrapper = mount(<FooterLayout {...rest} />);

    expect(wrapper.find('Image').first().props().src).toBe(VIX_BANNER_FOOTER_DESKTOP);
  });

  it('should call tracksVIXLink on click', async () => {
    const spy = jest.spyOn(helpers, 'tracksVIXLink');
    const rest = { ...props, site: 'univision' };
    const wrapper = mount(<FooterLayout {...rest} />);

    wrapper.find('Link').first().simulate('click');
    expect(spy).toHaveBeenCalledWith(true, false);
  });
});
