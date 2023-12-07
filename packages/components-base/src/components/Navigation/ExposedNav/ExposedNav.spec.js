import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';

import * as Selector from '@univision/fe-commons/dist/store/selectors/page-selectors';
import Store from '@univision/fe-commons/dist/store/store';
import NavigationTracker from '@univision/fe-commons/dist/utils/tracking/tealium/navigation/NavigationTracker';
import { WHITE } from '@univision/fe-commons/dist/utils/styled/constants';

import ExposedNav from '.';
import mockData from './__mocks__/exposedNav';
import themes from './__mocks__/exposedNavThemes';

const mockEvent = {
  target: {
    getAttribute: jest.fn(() => 'name'),
  },
};

describe('ExposedNav suite', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render((
      <Provider store={Store}>
        <ExposedNav {...mockData.inmigracion} />
      </Provider>), div);
  });

  it('should render without links', () => {
    const wrapper = mount(
      <Provider store={Store}>
        <ExposedNav />
      </Provider>
    );
    expect(wrapper.find('ExposedNav__NavItem')).toHaveLength(0);
  });

  it('should render without a logo', () => {
    const wrapper = mount(
      <Provider store={Store}>
        <ExposedNav title="title" />
      </Provider>
    );
    expect(wrapper.find('ExposedNav__LogoText')).toHaveLength(1);
    expect(wrapper.find('ExposedNav__LogoItem')).toHaveLength(0);
  });

  it('should render without a title', () => {
    const wrapper = mount(
      <Provider store={Store}>
        <ExposedNav logo="logo.jpg" />
      </Provider>
    );
    expect(wrapper.find('ExposedNav__LogoItem')).toHaveLength(1);
    expect(wrapper.find('ExposedNav__LogoText')).toHaveLength(0);
  });

  it('should render the logo / title wrapper', () => {
    const wrapper = mount(
      <Provider store={Store}>
        <ExposedNav title="title" logo="logo.jpg" />
      </Provider>
    );
    expect(wrapper.find('ExposedNav__LogoItem')).toHaveLength(1);
    expect(wrapper.find('ExposedNav__LogoText')).toHaveLength(1);
    expect(wrapper.find('ExposedNav__LogoText')).toHaveStyleRule('border-left', `1px solid ${WHITE}`);
  });

  it('should render without a title and without logo', () => {
    const wrapper = mount(
      <Provider store={Store}>
        <ExposedNav />
      </Provider>
    );
    expect(wrapper.find('ExposedNav__LogoArea')).toHaveLength(0);
  });

  it('should apply a theme', () => {
    const wrapper = mount(
      <Provider store={Store}>
        <ThemeProvider theme={themes.horoscopos}>
          <ExposedNav {...mockData.horoscopos} />
        </ThemeProvider>
      </Provider>
    );
    expect(wrapper.find('ExposedNav__Wrapper')).toHaveLength(1);
  });

  it('should render properly when a right column widget is sent', () => {
    const exposedNavParams = {
      componentRight: () => <div id="componentRight" />,
    };
    const wrapper = mount(
      <Provider store={Store}>
        <ExposedNav {...exposedNavParams} />
      </Provider>
    );

    expect(wrapper.find('div#componentRight')).toHaveLength(1);
  });

  it('should call the tracker event when a link is clicked', () => {
    const trackerSpy = jest.spyOn(NavigationTracker, 'track');
    const wrapper = mount(
      <Provider store={Store}>
        <ExposedNav {...mockData.horoscopos} />
      </Provider>
    );
    wrapper.find('LinksList__NavLink').first().simulate('click', mockEvent);
    expect(trackerSpy).toHaveBeenCalled();
  });

  it('should track click on content logo', () => {
    const trackerSpy = jest.spyOn(NavigationTracker, 'track');
    const wrapper = mount(
      <Provider store={Store}>
        <ExposedNav {...mockData.horoscopos} title="mock" />
      </Provider>
    );
    wrapper
      .find('ExposedNav__HomeLink')
      .props()
      .onClick();
    expect(trackerSpy).toHaveBeenCalledWith(
      NavigationTracker.events.click,
      expect.objectContaining({
        eventAction: 'subnav-logo-mock',
      })
    );
  });

  it('should track click on content logo with page category as fallback', () => {
    const trackerSpy = jest.spyOn(NavigationTracker, 'track');
    const wrapper = mount(
      <Provider store={Store}>
        <ExposedNav
          {...mockData.horoscopos}
          title={undefined}
          logo={'https://udn.com/logo.svg'}
          pageCategory="mock2"
        />
      </Provider>
    );
    wrapper
      .find('ExposedNav__HomeLink')
      .props()
      .onClick();
    expect(trackerSpy).toHaveBeenCalledWith(
      NavigationTracker.events.click,
      expect.objectContaining({
        eventAction: 'subnav-logo-mock2',
      })
    );
  });

  it('should render link with custom icon', () => {
    const wrapper = mount(
      <Provider store={Store}>
        <ExposedNav {...mockData.withIcon} activeLink="/" />
      </Provider>
    );
    expect(wrapper.find('LiveIcon')).toHaveLength(1);
    expect(wrapper.find('Icon')).toHaveLength(2);
  });

  it('should render link with selector market', () => {
    const wrapper = mount(
      <Provider store={Store}>
        <ExposedNav {...mockData.withSelectorMarket} activeLink="/" />
      </Provider>
    );
    expect(wrapper.find('SelectMarket')).toHaveLength(1);
  });

  it('should highlight the first item when the activeLink and hasActiveLink props are being passed', () => {
    const wrapper = mount(
      <Provider store={Store}>
        <ExposedNav {...mockData.horoscopos} activeLink="/horoscopos" />
      </Provider>
    );
    expect(wrapper.find('LinksList__NavLink').first().prop('underline')).toBe(true);
  });

  it('should highlight the first item when the when the page category match', () => {
    const wrapper = mount(
      <Provider store={Store}>
        <ExposedNav {...mockData.leagues} activeLink="/futbol" pageCategory="futbol" />
      </Provider>
    );
    expect(wrapper.find('LinksList__NavLink').first().prop('underline')).toBe(true);
  });

  it('should render a local market logo and set the custom class for the logo container.', () => {
    const wrapper = mount(
      <Provider store={Store}>
        <ExposedNav {...mockData.withLocalMarketIcon} pageCategory="local-tv" />
      </Provider>
    );
    expect(wrapper.find('ExposedNav__LinkLocalMarket')).toHaveLength(1);
    expect(wrapper.find('ExposedNav__HomeLink').first().prop('hasLogoMarket')).toBeTruthy();
  });

  it('should render a local market with ad skin', () => {
    jest.spyOn(Selector, 'hasAdSkinSelector').mockReturnValue(true);

    const wrapper = mount(
      <Provider store={Store}>
        <ExposedNav {...mockData.withLocalMarketIcon} pageCategory="local-tv" />
      </Provider>
    );

    expect(wrapper.find('ExposedNav__Container').first().prop('localAdSkinStyle')).toBeTruthy();
  });

  it('should render link with drop down options', () => {
    const wrapper = mount(
      <Provider store={Store}>
        <ExposedNav {...mockData.withDropDownOptions} componentRight={() => {}} isLocalesCustom />
      </Provider>
    );
    expect(wrapper.find('LocalDropDown')).toHaveLength(1);
  });
  it('should render with job options title', () => {
    const wrapper = mount(
      <Provider store={Store}>
        <ExposedNav
          {...mockData.withDropDownOptions}
          isLocalesCustom
          logo={null}
        />
      </Provider>
    );

    expect(wrapper.find('ExposedNav__LogoText').first().prop('isLocalesCustom')).toBeTruthy();
  });
  it('should render with subtitle', () => {
    const wrapper = mount(
      <Provider store={Store}>
        <ExposedNav
          {...mockData.withDropDownOptions}
          subtitle="Subtitle"
          logo={null}
        />
      </Provider>
    );
    expect(wrapper.find('ExposedNav__Subtitle').first().text()).toEqual('Subtitle');
  });
  it('should render fo custom branding', () => {
    const wrapper = mount(
      <Provider store={Store}>
        <ExposedNav title="title" logo="logo.jpg" useCustomBranding />
      </Provider>
    );
    expect(wrapper.find('ExposedNav__LogoItem')).toHaveLength(1);
    expect(wrapper.find('ExposedNav__LogoText')).toHaveLength(1);
    expect(wrapper.find('ExposedNav__LogoText')).toHaveStyleRule('border-left', '0');
    expect(wrapper.find('ExposedNav__LogoText')).toHaveStyleRule('font-weight', 'normal');
  });

  it('should not render if no title, no logo and no navigation', () => {
    const wrapper = mount(
      <Provider store={Store}>
        <ExposedNav hideNavigation />
      </Provider>
    );
    expect(wrapper.find('ExposedNav__LogoText')).toHaveLength(0);
    expect(wrapper.find('ExposedNav__LogoItem')).toHaveLength(0);
  });
});
