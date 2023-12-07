import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import Loadable from 'react-loadable';

import * as pageSelectors from '@univision/fe-commons/dist/store/selectors/page-selectors';
import Store from '@univision/fe-commons/dist/store/store';
import Features from '@univision/fe-commons/dist/config/features';

import BrandedNavProvider from '.';

describe('BrandedNavProvider suite', () => {
  let isMegaMenuEnabledSpy;
  jest.mock('react-loadable');
  beforeEach(() => {
    isMegaMenuEnabledSpy = jest.spyOn(Features.header, 'isMegaMenuEnabled');
    Features.registration.enableRegistration = jest.fn(() => true);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render without crashing', () => {
    const wrapper = mount(
      <Provider store={Store}>
        <ThemeProvider theme={{}}>
          <BrandedNavProvider />
        </ThemeProvider>
      </Provider>
    );
    expect(wrapper.find('BrandedHeader')).toHaveLength(1);
  });

  it('should render the hamburger mega menu if mega menu is enabled', () => {
    isMegaMenuEnabledSpy.mockReturnValue(true);
    const wrapper = mount(
      <Provider store={Store}>
        <ThemeProvider theme={{}}>
          <BrandedNavProvider />
        </ThemeProvider>
      </Provider>
    );
    expect(wrapper.find('HamburgerMegaMenu').length).toBe(1);
    expect(wrapper.find('HamburgerMenu').length).toBe(0);
  });

  it('should render the legacy hamburger menu if mega menu is disabled', () => {
    isMegaMenuEnabledSpy.mockReturnValue(false);
    const wrapper = mount(
      <Provider store={Store}>
        <ThemeProvider theme={{}}>
          <BrandedNavProvider />
        </ThemeProvider>
      </Provider>
    );
    expect(wrapper.find('HamburgerMegaMenu').length).toBe(0);
    expect(wrapper.find('HamburgerMenu').length).toBe(1);
  });

  it('should render registration component', async () => {
    const wrapper = mount(
      <Provider store={Store}>
        <ThemeProvider theme={{}}>
          <BrandedNavProvider isRegistrationOpen />
        </ThemeProvider>
      </Provider>
    );

    act(() => {
      Loadable.preloadAll();
      wrapper.update();
    });
    expect(wrapper.find('Registration')).toBeDefined();
  });

  it('should render the hamburger mega menu if mega menu is enabled', () => {
    Features.deportes.isWorldCupMVP = jest.fn(() => true);
    jest.spyOn(pageSelectors, 'userLocationSelector').mockReturnValue('MX');

    const wrapper = mount(
      <Provider store={Store}>
        <ThemeProvider theme={{}}>
          <BrandedNavProvider device="desktop" sectionType="section" />
        </ThemeProvider>
      </Provider>
    );
    expect(wrapper.find('BrandedHeader').props().componentCenter()).toBeDefined();
  });

  const mockMxLinks = [
    { name: 'Link A', url: '/link-a' },
    // ... add more mock links as needed
  ];

  const mockLinks = [
    { name: 'Link B', url: '/link-b' },
    // ... add more mock links as needed
  ];

  it('should pass mxLinks to Navigation when isTelevisaSite is true and isMxSite is true', () => {
    jest.spyOn(pageSelectors, 'userLocationSelector').mockReturnValue('MX');

    const wrapper = mount(
      <Provider store={Store}>
        <ThemeProvider theme={{}}>
          <BrandedNavProvider isTelevisaSite mxLinks={mockMxLinks} links={mockLinks} />
        </ThemeProvider>
      </Provider>
    );

    const navigationComponent = wrapper.find('Navigation');
    expect(navigationComponent.prop('links')).toEqual(mockMxLinks);
  });

  it('should pass links to Navigation when isTelevisaSite is true and isMxSite is false', () => {
    jest.spyOn(pageSelectors, 'userLocationSelector').mockReturnValue('US'); // Not MX

    const wrapper = mount(
      <Provider store={Store}>
        <ThemeProvider theme={{}}>
          <BrandedNavProvider isTelevisaSite mxLinks={mockMxLinks} links={mockLinks} />
        </ThemeProvider>
      </Provider>
    );

    const navigationComponent = wrapper.find('Navigation');
    expect(navigationComponent.prop('links')).toEqual(mockLinks);
  });
});
