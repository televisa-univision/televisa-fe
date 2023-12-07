import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import * as redux from 'react-redux';
import Loadable from 'react-loadable';

import Features from '@univision/fe-commons/dist/config/features';
import * as pageSelectors from '@univision/fe-commons/dist/store/selectors/page-selectors';
import * as useBrandable from '@univision/fe-commons/dist/hooks/useBrandable';

import Footer from '.';
import FooterLayout from './FooterLayout/FooterLayout';
import * as getFooterLayout from './getFooterLayout';

Features.header.hideHeaderFooter = jest.fn();

/** @test {Footer} */
describe('Footer suite', () => {
  const useSelectorSpy = jest.spyOn(redux, 'useSelector');
  const themeSelectorSpy = jest.spyOn(pageSelectors, 'themeSelector');
  const sitesSelectorSpy = jest.spyOn(pageSelectors, 'sitesSelector');
  const siteSelectorSpy = jest.spyOn(pageSelectors, 'siteSelector');
  const domainSelectorSpy = jest.spyOn(pageSelectors, 'domainSelector');
  const socialNetworksSelectorSpy = jest.spyOn(pageSelectors, 'socialNetworksSelector');
  const useBrandableSpy = jest.spyOn(useBrandable, 'default');
  const userLocationSpy = jest.spyOn(pageSelectors, 'userLocationSelector');
  const getFooterLayoutSpy = jest.spyOn(getFooterLayout, 'default');

  beforeAll(async () => {
    await Loadable.preloadAll();
  });

  beforeEach(async () => {
    useSelectorSpy.mockImplementation(fn => fn());
    useBrandableSpy.mockReturnValue({});
    themeSelectorSpy.mockReturnValue({ isDark: true });
    sitesSelectorSpy.mockReturnValue({});
    siteSelectorSpy.mockReturnValue('univision');
    socialNetworksSelectorSpy.mockReturnValue([]);
    domainSelectorSpy.mockReturnValue('https://www.univision.com');
    getFooterLayoutSpy.mockReturnValue(FooterLayout);
    userLocationSpy.mockReturnValue('US');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Footer />, div);
  });

  it('should render social networks from store', async () => {
    const socialNetworks = [0, 1, 2];
    socialNetworksSelectorSpy.mockReturnValue(socialNetworks);
    const wrapper = shallow(<Footer />);
    expect(wrapper.find(FooterLayout).prop('socialNetworks'))
      .toEqual(socialNetworks);
  });

  it('should not render apps if disableApps true', async () => {
    const wrapper = shallow(<Footer disableApps footerLinks={{ links: [] }} />);
    const apps = wrapper.find(FooterLayout).prop('apps');
    expect(apps.links).toBeUndefined();
  });

  it('should render light theme variant', async () => {
    themeSelectorSpy.mockReturnValue({});
    const wrapper = shallow(<Footer />);
    expect(wrapper.find(FooterLayout).prop('themeVariant')).toBe('light');
  });

  it('should render dark theme variant when isFooterDark is enabled', async () => {
    themeSelectorSpy.mockReturnValue({
      isDark: false,
      isFooterDark: true,
    });
    const wrapper = shallow(<Footer />);
    expect(wrapper.find(FooterLayout).prop('themeVariant')).toBe('dark');
  });

  it('should render local market footer links', async () => {
    const localMarketFooter = {
      title: 'test',
      links: [0, 1, 2],
    };
    useBrandableSpy.mockReturnValue({ localMarketFooter });
    const wrapper = shallow(<Footer />);
    expect(wrapper.find(FooterLayout).prop('localLinks'))
      .toEqual(localMarketFooter);
  });
  it('should render apps with local values', async () => {
    useBrandableSpy.mockReturnValue({
      uri: '/local/miami-wltv',
    });
    const wrapper = shallow(<Footer />);
    const apps = wrapper.find(FooterLayout).prop('apps');
    expect(apps.links[0].text).toBe('Univision 23');
  });

  it('should not render apps with local values when market doesn\'t exist', async () => {
    useBrandableSpy.mockReturnValue({
      uri: '/local/invalid-market',
    });
    const wrapper = shallow(<Footer />);
    const apps = wrapper.find(FooterLayout).prop('apps');
    expect(apps.links[0].text).not.toBe('Univision 23');
  });

  it('should not render the footer when the hide flag is enabled', async () => {
    Features.header.hideHeaderFooter.mockReturnValue(true);
    const wrapper = shallow(<Footer />);
    expect(wrapper.find(FooterLayout)).toHaveLength(0);
  });

  it('should render with MX market links when feature flag is on', async () => {
    jest.spyOn(Features.deportes, 'isWorldCupMVP').mockReturnValue(true);
    userLocationSpy.mockReturnValue('MX');
    siteSelectorSpy.mockReturnValue('tudn');
    const wrapper = shallow(<Footer />);
    expect(wrapper.find(FooterLayout)).toHaveLength(1);
  });

  it('should render with US market links when feature flag is on', async () => {
    jest.spyOn(Features.deportes, 'isWorldCupMVP').mockReturnValue(true);
    siteSelectorSpy.mockReturnValue('tudn');
    const wrapper = shallow(<Footer />);
    expect(wrapper.find(FooterLayout)).toHaveLength(1);
  });

  it('renders the Televisa site Footer when isTelevisaSite is true', () => {
    jest.spyOn(pageSelectors, 'isTelevisaSiteSelector').mockReturnValue(true);
    const props = {
      disableApps: false,
      footerLinks: null,
      disableNewsLetters: false,
      disableOtherPagesButton: false,
    };
    const wrapper = shallow(<Footer {...props} />);
    expect(wrapper).toMatchInlineSnapshot('ShallowWrapper {}');
  });
});
