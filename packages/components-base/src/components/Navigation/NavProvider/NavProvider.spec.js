import React from 'react';
import { shallow, mount } from 'enzyme';
import * as subNavTypes from '@univision/fe-commons/dist/constants/subNavTypes';
import * as storeHelpers from '@univision/fe-commons/dist/store/storeHelpers';
import features from '@univision/fe-commons/dist/config/features';
import * as helpers from '@univision/fe-commons/dist/utils/header/helpers';
import { Provider } from 'react-redux';
import configureStore from '@univision/fe-commons/dist/store/configureStore';
import BrandedNavProvider from './BrandedNavProvider';
import GlobalNavProvider from './GlobalNavProvider';
import SubNavProvider from './SubNavProvider';

import Styles from './NavProvider.styles';

import NavProvider from '.';

jest.mock('@univision/shared-components/dist/components/weather/MinMaxTemp', () => () => 'MinMaxTemp');
jest.mock('@univision/shared-components/dist/components/weather/WeatherDate', () => 'mock-widget');

const props = {
  subNavType: subNavTypes.SECTION_SUBNAV,
};

describe('NavProvider suite', () => {
  let store;

  beforeEach(() => {
    store = configureStore();
  });

  afterEach(() => {
    jest.clearAllMocks();
    features.content.hasTagPages = jest.fn(() => false);
    helpers.isTemasPage = jest.fn(() => false);
  });

  it('should render without crashing', () => {
    storeHelpers.isShowPage = jest.fn(() => true);
    const wrapper = shallow(<NavProvider {...props} />);
    expect(wrapper.find(BrandedNavProvider)).toHaveLength(1);
    expect(wrapper.find(GlobalNavProvider)).toHaveLength(1);
    expect(wrapper.find(SubNavProvider)).toHaveLength(1);
  });
  it('should render Log Out bar is in Tudn site and not on soccer match page', () => {
    storeHelpers.isSoccerMatchPage = jest.fn(() => false);
    const wrapper = shallow(<NavProvider {...props} isTudnSite />);
    expect(wrapper.find('NavProvider__LogOutBarStyled')).toHaveLength(1);
  });
  it('should not render SubNavProvider component', () => {
    features.content.hasTagPages.mockReturnValueOnce(true);
    helpers.isTemasPage.mockReturnValueOnce(true);
    const wrapper = shallow(<NavProvider {...props} pageCategory="temas" />);
    expect(wrapper.find(SubNavProvider)).toHaveLength(0);
  });
  it('should render the mvpd provider when logousSticky is true and in tudn', () => {
    const customProps = {
      ...props,
      logoutSticky: true,
      isTudnSite: true,
    };
    storeHelpers.isSoccerMatchPage = jest.fn(() => false);
    const wrapper = shallow(<NavProvider {...customProps} />);
    expect(wrapper.find('NavProvider__LogOutBarStyled')).toHaveLength(1);
  });
  it('should render BrandedNavProvider at top', () => {
    const wrapper = shallow(<NavProvider {...props} />);
    expect(wrapper.find('NavProvider__Wrapper').childAt(0).type()).toEqual(BrandedNavProvider);
  });

  it('should render SubNavProvider when qatar', () => {
    features.deportes.useLeagueTheme = jest.fn(() => true);
    storeHelpers.isShowPage = jest.fn(() => true);
    const customProps = {
      ...props,
      pageUri: 'https://tudn.com/futbol/mundial-qatar-2022/grupos',
      contentType: 'section',
    };
    const wrapper = shallow(<NavProvider {...customProps} />);
    expect(wrapper.find(SubNavProvider)).toHaveLength(1);
  });

  it('should render SubNavProvider if forceSectionNav true', () => {
    features.deportes.forceSectionNav = jest.fn(() => true);
    storeHelpers.isShowPage = jest.fn(() => true);
    const customProps = {
      ...props,
      pageUri: 'https://tudn.com/futbol/europa',
      contentType: 'section',
    };
    const wrapper = shallow(<NavProvider {...customProps} />);
    expect(wrapper.find(SubNavProvider)).toHaveLength(1);
  });

  it('should render GlobalNavProvider at top', () => {
    const wrapper = shallow(<NavProvider {...props} globalNavTop />);
    expect(wrapper.find('NavProvider__Wrapper').childAt(0).type()).toEqual(GlobalNavProvider);
  });
  it('should not render a sub nav when the subnav type is empty', () => {
    props.subNavType = subNavTypes.EMPTY_SUBNAV;
    const wrapper = shallow(<NavProvider {...props} />);
    expect(wrapper.find('SubNavProvider')).toHaveLength(0);
  });
  it('should render a expose nav when is a locales content', () => {
    const customProps = {
      ...props,
      subNavType: subNavTypes.SECTION_SUBNAV,
      contentType: 'article',
      type: 'article',
      isLocalMarket: true,
    };
    const wrapper = shallow(<NavProvider {...customProps} />);
    expect(wrapper.find(SubNavProvider)).toHaveLength(1);
  });
  it('should render the mvpd provider when the flag true', () => {
    const customProps = {
      ...props,
      shouldRenderMVPD: true,
    };
    const wrapper = shallow(<NavProvider {...customProps} />);
    expect(wrapper.find('LogOutBar')).toHaveLength(1);
  });
  it('should not render a header when the hide header flag is enabled', () => {
    const hideHeaderSpy = jest.spyOn(features.header, 'hideHeaderFooter').mockImplementation(() => true);
    const wrapper = shallow(<NavProvider {...props} />);

    expect(hideHeaderSpy).toHaveBeenCalled();
    expect(wrapper.find('BrandedNavProvider')).toHaveLength(0);
    expect(wrapper.find('GlobalNavProvider')).toHaveLength(0);
    expect(wrapper.find('SubNavProvider')).toHaveLength(0);
  });

  it('should not render navigation if isWorldCupMVP and is not homepage and is mobile', () => {
    features.deportes.isWorldCupMVP = jest.fn(() => true);
    const wrapper = shallow(
      <NavProvider
        {...props}
        contentType="section"
        sectionType="section"
        pageUri="https://tudn.com/futbol/mundial-qatar-2022/grupos"
        device="mobile"
        userLocation="US"
      />
    );
    expect(wrapper.find('NavProvider__NavWrapper')).toHaveLength(0);
  });

  it('should not render navigation if isWorldCupMVP is false', () => {
    features.deportes.isWorldCupMVP = jest.fn(() => false);
    const wrapper = shallow(
      <NavProvider {...props} pageUri="https://tudn.com/" device="mobile" />
    );
    expect(wrapper.find('NavProvider__NavWrapper')).toHaveLength(0);
  });

  it('should hide navButton when theme configuration are set', () => {
    features.header.hideHeaderFooter = jest.fn(() => false);
    const customProps = {
      ...props,
      globalNavTop: false,
      theme: {
        hideNavBottom: true,
      },
    };
    const wrapper = mount(
      <Provider store={store}>
        <NavProvider {...customProps} />
      </Provider>
    );
    expect(wrapper.find('GlobalNav__Wrapper')).toHaveLength(0);
  });

  it('should show navButton when theme configuration are set', () => {
    features.header.hideHeaderFooter = jest.fn(() => false);
    const customProps = {
      ...props,
      globalNavTop: false,
      theme: {
        hideNavBottom: false,
      },
    };
    const wrapper = mount(
      <Provider store={store}>
        <NavProvider {...customProps} />
      </Provider>
    );
    expect(wrapper.find('GlobalNav__Wrapper')).toHaveLength(1);
  });
});

describe('NavProvider styling', () => {
  it('should add correct styles when expanded menu is open', () => {
    expect(Styles.wrapper({
      hamburgerMenuOpen: true,
    })).toContain('121130');
  });

  it('should add correct styles when expanded menu is not open', () => {
    expect(Styles.wrapper({
      hamburgerMenuOpen: false,
    })).toContain('121100');
  });

  it('should add correct styles when isTelevisaSite is true', () => {
    const theme = {
      navProviderBackgroundColor: 'red',
    };
    expect(Styles.wrapper({
      isTelevisaSite: true,
      theme,
    })).toContain('red');
  });
});
