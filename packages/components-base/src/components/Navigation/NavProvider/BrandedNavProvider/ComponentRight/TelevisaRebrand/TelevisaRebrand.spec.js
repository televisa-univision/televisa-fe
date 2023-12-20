import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, shallow } from 'react-redux';
import { mount } from 'enzyme';
import * as hooks from 'react-redux';
import { ThemeProvider } from 'styled-components';

import configureStore from '@univision/fe-commons/dist/store/configureStore';
import Tracker from '@univision/fe-commons/dist/utils/tracking/tealium/Tracker';
import * as pageSelectors from '@univision/fe-commons/dist/store/selectors/page-selectors';
import Styles from './TelevisaRebrand.styles';

import TelevisaRebrand from '.';

const store = configureStore();

/**
 * Create a new makeTelevisaRebrand
 * @param {Object} props - props
 * @param {function} createType - the creation type (mount/shallow)
 * @returns {JSX}
 */
const makeTelevisaRebrand = (props = {}, createType = shallow) => {
  const element = (
    <Provider store={store}>
      <TelevisaRebrand {...props} />
    </Provider>
  );
  return createType(element);
};

describe('UniNow test', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render without crashing', () => {
    const div = document.createElement('div');
    const element = (
      <Provider store={store}>
        <TelevisaRebrand />
      </Provider>
    );
    ReactDOM.render(element, div);
  });

  it('should track click on search link', () => {
    const trackSpy = jest.spyOn(Tracker, 'fireEvent');
    const wrapper = makeTelevisaRebrand({}, mount);
    const vixLink = wrapper.find('Link').at(0);
    vixLink.simulate('click');
    expect(trackSpy).toHaveBeenLastCalledWith(expect.objectContaining({
      destination_url: '/search',
      event: 'topnav-vix-search-header',
    }));
  });

  it('should track click on partidos for mx', () => {
    jest.spyOn(pageSelectors, 'userLocationSelector').mockReturnValue('MX');
    const trackSpy = jest.spyOn(Tracker, 'fireEvent');
    const wrapper = makeTelevisaRebrand({}, mount);
    const vixLink = wrapper.find('Link').at(0);
    vixLink.simulate('click');
    expect(trackSpy).toHaveBeenLastCalledWith(expect.objectContaining({
      destination_url: '/search',
      event: 'topnav-vix-search-header',
    }));
  });
  it('should render without crashing with theme', () => {
    const mockUseSelector = jest.spyOn(hooks, 'useSelector');
    mockUseSelector.mockImplementation(callback => callback({
      subNavBackgroundColor: 'red',
      globalNavBackgroundColor: 'red',
      globalNavBorderTop: '1px solid red',
      colorTextGlobalNav: '#FFFFF',
      showVixLogo: false,
    }));
    const div = document.createElement('div');
    const element = (
      <Provider store={store}>
        <TelevisaRebrand />
      </Provider>
    );
    ReactDOM.render(element, div);
  });
  it('should render without crashing with logo vix', () => {
    const darkTheme = { showVixLogo: true };
    jest.spyOn(pageSelectors, 'themeSelector').mockReturnValue(darkTheme);
    const div = document.createElement('div');
    const element = (
      <Provider store={store}>
        <ThemeProvider theme={darkTheme}>
          <TelevisaRebrand />
        </ThemeProvider>
      </Provider>
    );
    ReactDOM.render(element, div);
  });
});

describe('TelevisaRebrand test', () => {
  let originalEnvironment;

  beforeEach(() => {
    // Mock window.open
    global.open = jest.fn();
    // Save the original process.env.ENVIRONMENT
    originalEnvironment = process.env.ENVIRONMENT;
  });

  afterEach(() => {
    // Restore the original process.env.ENVIRONMENT
    process.env.ENVIRONMENT = originalEnvironment;
    jest.restoreAllMocks();
  });

  it('should open /search when ENVIRONMENT is defined', () => {
    process.env.ENVIRONMENT = 'test';
    const wrapper = makeTelevisaRebrand({}, mount);
    const link = wrapper.find('Link').at(0);
    link.simulate('click');
    expect(global.open).toHaveBeenCalledWith('/search', '_self');
  });

  it('should open current location + /search when ENVIRONMENT is undefined', () => {
    delete process.env.ENVIRONMENT;
    const wrapper = makeTelevisaRebrand({}, mount);
    const link = wrapper.find('Link').at(0);
    link.simulate('click');
    expect(global.open).toHaveBeenCalledWith(`${window.location.href}/search`, '_self');
  });

  it('should coun two links when showVixLogo are set to true', () => {
    const darkTheme = { showVixLogo: true };
    process.env.VIX_BANNER_DOMAIN = 'https://vix.com/';
    process.env.VIX_BANNER_PATH = '/test';
    jest.spyOn(pageSelectors, 'themeSelector').mockReturnValue(darkTheme);
    const wrapper = makeTelevisaRebrand({}, mount);
    const links = wrapper.find('Link');
    expect(links).toHaveLength(2);
    links.at(1).simulate('click');
    expect(global.open).toHaveBeenCalledWith('https://vix.smart.link/46zl6ztg7?&site_id=univision&creative_id=evergreen&lpurl=https://vix.com/canales&cp_1=internal_referral&cp_2=0&cp_3=hamburger&cp_4=0&deeplink=vixapp://canales', '_self');
  });
});

describe('TelevisaRebrand styles', () => {
  it('should set the vix logo wrapper border left color', () => {
    const theme = {
      colorVixLogoDivider: '254,254,254',
    };
    const result = Styles.vixLogoWrapper({ theme });
    expect(result).toContain('1px solid rgba(254,254,254, .2)');
  });
});
