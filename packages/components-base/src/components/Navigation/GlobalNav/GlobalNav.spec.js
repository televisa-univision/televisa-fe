import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';

import NavigationTracker from '@univision/fe-commons/dist/utils/tracking/tealium/navigation/NavigationTracker';
import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import configureStore from '@univision/fe-commons/dist/store/configureStore';
import * as pageSelectors from '@univision/fe-commons/dist/store/selectors/page-selectors';
import { header } from '@univision/fe-commons/dist/config/features';

import GlobalNav from '.';
import mockData from './data/links';

const store = configureStore();

jest.mock('@univision/fe-commons/dist/config/features', () => ({
  tracking: {
    gtm: true,
  },
  header: {
    hideLink: jest.fn(),
  },
  deportes: {
    isWorldCupMVP: jest.fn(),
  },
}));

const mockEvent = {
  preventDefault: jest.fn(),
};

describe('GlobalNav suite', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    const wrapper = mount(<Provider store={store}><GlobalNav /></Provider>);
    expect(wrapper.find('GlobalNav__Wrapper')).toHaveLength(1);
    expect(wrapper.find('GlobalNav__List')).toHaveLength(1);
  });
  it('should render links', () => {
    const wrapper = mount(<Provider store={store}><GlobalNav /></Provider>);
    expect(wrapper.find('GlobalNav__ItemList')).toHaveLength(mockData.length - 1);
  });
  it('should render links for TUDN site', () => {
    const wrapper = mount(<Provider store={store}><GlobalNav isTudnSite /></Provider>);
    // should not render tuciudad in tudn
    expect(wrapper.find('GlobalNav__ItemList')).toHaveLength(mockData.length);
  });
  it('should apply active true to first link', () => {
    const wrapper = mount(
      <Provider store={store}>
        <GlobalNav activePath={'/shows'} />
      </Provider>
    );
    expect(wrapper.find('GlobalNav__GlobalNavLink').first().find('a').hasClass('active')).toBe(true);
  });
  it('should apply the theme from ThemeProvider', () => {
    const wrapper = mount(
      <Provider store={store}>
        <ThemeProvider theme={{ subNavBackgroundColor: 'red', globalNavBackgroundColor: 'red', globalNavBorderTop: '1px solid red' }}>
          <GlobalNav />
        </ThemeProvider>
      </Provider>
    );
    expect(wrapper.find('GlobalNav__Wrapper')).toHaveLength(1);
  });
  it('should not fire the tracking event when have wrong link data', () => {
    const trackerSpy = jest.spyOn(NavigationTracker, 'track');
    const wrapper = mount(<Provider store={store}><GlobalNav /></Provider>);
    const event = { target: {} };
    wrapper.find('GlobalNav__GlobalNavLink').first().simulate('click', event);
    expect(trackerSpy).not.toHaveBeenCalled();
  });
  it('should fire the tracking event when a link is clicked', () => {
    const trackerSpy = jest.spyOn(NavigationTracker, 'track');
    const wrapper = mount(<Provider store={store}><GlobalNav /></Provider>);
    const link = wrapper.find('GlobalNav__GlobalNavLink').last();
    link.simulate('click', {
      ...mockEvent,
      target: {
        getAttribute: () => link.prop('data-name'),
      },
    });
    expect(trackerSpy).toHaveBeenCalled();
  });
  it('should render links without hideLink (proxy)', () => {
    const pageData = {
      props: {
        hideLink: 'shows',
      },
    };
    Store.dispatch(setPageData(pageData));
    const wrapper = mount(<Provider store={store}><GlobalNav /></Provider>);
    expect(wrapper.find('GlobalNav__ItemList')).toHaveLength(mockData.length - 1);
  });
  it('should render links with the proper domain', () => {
    const pageData = {
      sites: {
        univision: 'https://test-domain.com',
      },
    };
    Store.dispatch(setPageData(pageData));
    const wrapper = mount(<Provider store={store}><GlobalNav /></Provider>);
    expect(wrapper.find('[href="https://test-domain.com/radio"]')).toHaveLength(1);
  });
  it('should render with hideLink (proxy)', () => {
    header.hideLink.mockImplementation(() => true);
    const wrapper = mount(<Provider store={store}><GlobalNav /></Provider>);
    expect(wrapper.find('GlobalNav__ItemList')).toHaveLength(0);
  });
  it('should fire the tracking event when a market modal link is clicked', () => {
    const trackerSpy = jest.spyOn(NavigationTracker, 'track');
    jest.spyOn(pageSelectors, 'deviceSelector').mockReturnValue('mobile');

    const wrapper = mount(<Provider store={store}><GlobalNav isTudnSite /></Provider>);
    const link = wrapper.find('TuCiudad__TuCiudadLink').first();
    link.simulate('click', {
      ...mockEvent,
      target: {
        getAttribute: () => link.prop('data-name'),
      },
    });
    expect(trackerSpy).toHaveBeenCalled();
  });

  it('should not have tu ciudad link', () => {
    jest.spyOn(pageSelectors, 'userLocationSelector').mockReturnValue('MX');
    const wrapper = mount(<Provider store={store}><GlobalNav isTudnSite /></Provider>);
    expect(wrapper.find('TuCiudad__TuCiudadLink')).toHaveLength(0);
  });

  it('should render links for MX', () => {
    header.hideLink.mockImplementation(() => false);
    jest.spyOn(pageSelectors, 'userLocationSelector').mockReturnValue('MX');
    const wrapper = mount(<Provider store={store}><GlobalNav isTudnSite /></Provider>);
    expect(wrapper.find('GlobalNav__ItemList')).toHaveLength(7);
  });
});

describe('GlobalNav component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders TelevisaLink when isTelevisaSite is true and user location is US', () => {
    jest.spyOn(pageSelectors, 'userLocationSelector').mockReturnValue('US');
    const wrapper = mount(
      <Provider store={store}>
        <GlobalNav isTelevisaSite />
      </Provider>
    );
    expect(wrapper.find('TelevisaLink')).toHaveLength(1);
  });

  it('should apply the theme from ThemeProvider with colorNav with televisa', () => {
    const wrapper = mount(
      <Provider store={store}>
        <ThemeProvider theme={{
          subNavBackgroundColor: 'red',
          globalNavBackgroundColor: 'red',
          globalNavBorderTop: '1px solid red',
          colorTextGlobalNav: '#FFFFF',
        }}
        >
          <GlobalNav isTelevisaSite />
        </ThemeProvider>
      </Provider>
    );
    expect(wrapper.find('GlobalNav__Wrapper')).toHaveLength(1);
  });
});
