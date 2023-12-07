import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';

import configureStore from '@univision/fe-commons/dist/store/configureStore';
import Store from '@univision/fe-commons/dist/store/store';
import * as storeHelpers from '@univision/fe-commons/dist/store/storeHelpers';
import Features from '@univision/fe-commons/dist/config/features';
import NavigationTracker from '@univision/fe-commons/dist/utils/tracking/tealium/navigation/NavigationTracker';
import * as pageSelectors from '@univision/fe-commons/dist/store/selectors/page-selectors';

import { VIX_BANNER_MENU_MOBILE } from '@univision/fe-commons/dist/constants/vixSitesData';
import MegaMenu, { renderLinks } from '.';

import * as helpers from './helpers';

const store = configureStore();
/**
 * WrapperComponent
 * @prop {children} component children
 * @returns {JSX}
 */
const WrapperComponent = ({ children }) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};

WrapperComponent.propTypes = {
  children: PropTypes.node,
};

describe('MegaMenu', () => {
  const socialNetworks = [
    {
      name: 'twitter',
    },
    {
      name: 'instagram',
    },
    {
      name: 'facebook',
    },
  ];
  let isDesktopSpy;
  let isMegaMenuEnabledSpy;
  let navigationTrackSpy;

  beforeEach(() => {
    isDesktopSpy = jest.spyOn(storeHelpers, 'isDesktop');
    isMegaMenuEnabledSpy = jest.spyOn(Features.header, 'isMegaMenuEnabled').mockReturnValue(true);
    navigationTrackSpy = jest.spyOn(NavigationTracker, 'track');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<WrapperComponent><MegaMenu /></WrapperComponent>, div);
  });

  it('should render mega menu when enabled', () => {
    isMegaMenuEnabledSpy.mockReturnValue(true);
    const wrapper = mount(
      <WrapperComponent>
        <MegaMenu open />
      </WrapperComponent>
    );
    expect(wrapper.find('MegaMenu__Wrapper').length).toBe(1);
  });

  it('should render tudn mega menu when userLocation is MX', () => {
    isMegaMenuEnabledSpy.mockReturnValue(true);
    const wrapper = mount(
      <WrapperComponent>
        <MegaMenu open isMxSite isTudnSite />
      </WrapperComponent>
    );
    expect(wrapper.find('MegaMenu__Wrapper').length).toBe(1);
  });

  it('should not render anything when mega menu is disabled', () => {
    isMegaMenuEnabledSpy.mockReturnValue(false);
    const wrapper = mount(
      <WrapperComponent>
        <MegaMenu />
      </WrapperComponent>
    );
    expect(wrapper.find('MegaMenu__Wrapper').length).toBe(0);
  });

  it('should render the desktop top section', () => {
    isDesktopSpy.mockReturnValue(true);
    const wrapper = mount(
      <WrapperComponent>
        <MegaMenu open />
      </WrapperComponent>
    );
    expect(wrapper.find('MegaMenu__DeskstopTopSectionContainer').length).toBe(1);
    expect(wrapper.find('MegaMenu__MainSectionContainer').length).toBe(1);
  });

  it('should render the mobile top section', () => {
    const spy = jest.spyOn(helpers, 'tracksVIXLink');
    jest.spyOn(pageSelectors, 'deviceSelector').mockReturnValue('mobile');
    isDesktopSpy.mockReturnValue(false);
    const wrapper = mount(
      <WrapperComponent>
        <MegaMenu open />
      </WrapperComponent>
    );

    wrapper.find('#vix-banner-megamenu-link').at(0).prop('onClick')();

    expect(spy).toHaveBeenCalled();
    expect(wrapper.find('img').prop('src')).toBe(VIX_BANNER_MENU_MOBILE);
    expect(wrapper.find('MarketSelector__Container').length).toBe(1);
  });

  it('should track a click on the search bar', () => {
    isDesktopSpy.mockReturnValue(false);
    const wrapper = mount(
      <WrapperComponent>
        <MegaMenu open />
      </WrapperComponent>
    );

    wrapper.find('MegaMenu__SearchContainer').simulate('click');

    expect(navigationTrackSpy).toHaveBeenCalledWith(NavigationTracker.events.click, {
      eventAction: 'hamburger-search icon',
    });
  });

  it('should track a click on each social network icon', () => {
    isDesktopSpy.mockReturnValue(true);
    const wrapper = mount(
      <Provider store={Store}><MegaMenu networks={socialNetworks} open /></Provider>,
    );

    wrapper.find('SocialNetworkLink').forEach(node => node.simulate('click'));
    expect(navigationTrackSpy).toHaveBeenCalledTimes(3);
    expect(navigationTrackSpy).toHaveBeenNthCalledWith(1, NavigationTracker.events.click, {
      eventAction: 'hamburger-brand social icons-twitter',
    });
    expect(navigationTrackSpy).toHaveBeenNthCalledWith(2, NavigationTracker.events.click, {
      eventAction: 'hamburger-brand social icons-instagram',
    });
    expect(navigationTrackSpy).toHaveBeenNthCalledWith(3, NavigationTracker.events.click, {
      eventAction: 'hamburger-brand social icons-facebook',
    });
  });

  it('should track a click on a menu link header', () => {
    isDesktopSpy.mockReturnValue(false);
    const wrapper = mount(
      <Provider store={Store}><MegaMenu networks={socialNetworks} open /></Provider>,
    );
    wrapper
      .find('MegaMenu__LinksHeader')
      .first()
      .props()
      .onClick();
    expect(navigationTrackSpy).toHaveBeenCalledWith(NavigationTracker.events.click, {
      eventAction: 'hamburger-Noticias',
    });
  });

  it('should track a click on each individual menu link', () => {
    isDesktopSpy.mockReturnValue(false);
    const wrapper = mount(
      <Provider store={Store}><MegaMenu networks={socialNetworks} open /></Provider>,
    );
    wrapper
      .find('MegaMenu__MenuLink')
      .first()
      .simulate('click');
    expect(navigationTrackSpy).toHaveBeenCalledWith(NavigationTracker.events.click, {
      eventAction: 'hamburger-Noticias-América Latina',
    });
  });

  it('should track click on image links', () => {
    isDesktopSpy.mockReturnValue(false);
    const wrapper = mount(
      <Provider store={Store}><MegaMenu networks={socialNetworks} open /></Provider>,
    );
    wrapper
      .find('ImageLinksWithHeader__ImageLinkWrapper')
      .find('Link')
      .first()
      .simulate('click');
    expect(navigationTrackSpy).toHaveBeenCalledWith(NavigationTracker.events.click, {
      eventAction: 'hamburger-TV Shows-despierta américa',
    });
  });

  it('should track click on tv shows header', () => {
    isDesktopSpy.mockReturnValue(false);
    const wrapper = mount(
      <Provider store={Store}><MegaMenu networks={socialNetworks} open /></Provider>,
    );
    wrapper
      .find('ImageLinksWithHeader__StyledTopicBar')
      .at(0)
      .find('Link')
      .first()
      .simulate('click');
    expect(navigationTrackSpy).toHaveBeenCalledWith(NavigationTracker.events.click, {
      eventAction: 'hamburger-tv shows',
    });
  });

  it('should track click on series header', () => {
    isDesktopSpy.mockReturnValue(false);
    const wrapper = mount(
      <Provider store={Store}><MegaMenu networks={socialNetworks} open /></Provider>,
    );
    wrapper
      .find('ImageLinksWithHeader__StyledTopicBar')
      .at(1)
      .find('Link')
      .first()
      .simulate('click');
    expect(navigationTrackSpy).toHaveBeenCalledWith(NavigationTracker.events.click, {
      eventAction: 'hamburger-series',
    });
  });

  it('should track click on novelas header', () => {
    isDesktopSpy.mockReturnValue(false);
    const wrapper = mount(
      <Provider store={Store}><MegaMenu networks={socialNetworks} open /></Provider>,
    );
    wrapper
      .find('ImageLinksWithHeader__StyledTopicBar')
      .at(2)
      .find('Link')
      .first()
      .simulate('click');
    expect(navigationTrackSpy).toHaveBeenCalledWith(NavigationTracker.events.click, {
      eventAction: 'hamburger-novelas',
    });
  });

  it('should track click on unimas link', () => {
    isDesktopSpy.mockReturnValue(false);
    const wrapper = mount(
      <Provider store={Store}><MegaMenu networks={socialNetworks} open /></Provider>,
    );
    wrapper
      .find('MegaMenu__OtherNetworksIconsContainer')
      .find('Link')
      .first()
      .simulate('click');
    expect(navigationTrackSpy).toHaveBeenCalledWith(NavigationTracker.events.click, {
      eventAction: 'hamburger-otras cadenas-unimas',
    });
  });

  it('should track click on galavision link', () => {
    isDesktopSpy.mockReturnValue(false);
    const wrapper = mount(
      <Provider store={Store}><MegaMenu networks={socialNetworks} open /></Provider>,
    );
    wrapper
      .find('MegaMenu__OtherNetworksIconsContainer')
      .find('Link')
      .at(1)
      .simulate('click');
    expect(navigationTrackSpy).toHaveBeenCalledWith(NavigationTracker.events.click, {
      eventAction: 'hamburger-otras cadenas-galavision',
    });
  });

  it('should track click on canal cinco link', () => {
    isDesktopSpy.mockReturnValue(false);
    const wrapper = mount(
      <Provider store={Store}><MegaMenu isMxSite networks={socialNetworks} open /></Provider>,
    );
    wrapper
      .find('MegaMenu__OtherNetworksIconsContainer')
      .find('Link')
      .first()
      .simulate('click');
    expect(navigationTrackSpy).toHaveBeenCalledWith(NavigationTracker.events.click, {
      eventAction: 'hamburger-otras cadenas-lasestrellas',
    });
  });

  it('should track click on las estrellas link', () => {
    isDesktopSpy.mockReturnValue(false);
    const wrapper = mount(
      <Provider store={Store}><MegaMenu isMxSite networks={socialNetworks} open /></Provider>,
    );
    wrapper
      .find('MegaMenu__OtherNetworksIconsContainer')
      .find('Link')
      .at(1)
      .simulate('click');
    expect(navigationTrackSpy).toHaveBeenCalledWith(NavigationTracker.events.click, {
      eventAction: 'hamburger-otras cadenas-canalcinco',
    });
  });

  it('should track click on tv guide link', () => {
    isDesktopSpy.mockReturnValue(false);
    const wrapper = mount(
      <Provider store={Store}><MegaMenu networks={socialNetworks} open /></Provider>,
    );
    wrapper.find('MegaMenu__TvGuideLink').simulate('click');
    expect(navigationTrackSpy).toHaveBeenCalledWith(NavigationTracker.events.click, {
      eventAction: 'hamburger-ver guia tv',
    });
  });

  it('should track click on conecta link', () => {
    isDesktopSpy.mockReturnValue(false);
    const wrapper = mount(
      <Provider store={Store}><MegaMenu networks={socialNetworks} open /></Provider>,
    );
    wrapper.find('MegaMenu__ConectaLink').simulate('click');
    expect(navigationTrackSpy).toHaveBeenCalledWith(NavigationTracker.events.click, {
      eventAction: 'hamburger-ver conecta',
    });
  });

  it('should not render any links if section data is null', () => {
    expect(renderLinks(null)).toBe(null);
  });

  it('should not render any links if section data is undefined', () => {
    expect(renderLinks(undefined)).toBe(null);
  });

  it('should render TUDN content/links', () => {
    isDesktopSpy.mockReturnValue(false);
    const wrapper = mount(
      <Provider store={Store}>
        <MegaMenu networks={socialNetworks} open isTudnSite />
      </Provider>,
    );
    const popularContent = wrapper.find('MegaMenu__PopularTopicsContainer');
    expect(popularContent.prop('links')).toHaveProperty('0.site', 'tudn');
    expect(wrapper.find('MegaMenu__StyledImageLinksWithHeader')).toHaveLength(0);
    expect(wrapper.find('MegaMenu__StyledImageLinksWithHeader')).toHaveLength(0);
  });
  it('should render hamburger menu container', () => {
    Features.deportes.isWorldCupMVP = jest.fn(() => true);

    isDesktopSpy.mockReturnValue(false);
    const wrapper = mount(
      <Provider store={Store}>
        <MegaMenu networks={socialNetworks} open isTudnSite />
      </Provider>,
    );

    expect(wrapper.find('MegaMenu__HamburgerMenuWrapper')).toHaveLength(1);
  });
  it('should render hamburger menu container on desktop', () => {
    Features.deportes.isWorldCupMVP = jest.fn(() => true);

    isDesktopSpy.mockReturnValue(true);
    const wrapper = mount(
      <Provider store={Store}>
        <MegaMenu networks={socialNetworks} open isTudnSite />
      </Provider>,
    );

    expect(wrapper.find('MegaMenu__HamburgerMenuWrapper')).toHaveLength(1);
  });
});
