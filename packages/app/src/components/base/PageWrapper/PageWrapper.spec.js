import React from 'react';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';

import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import MainTracking from '@univision/fe-commons/dist/components/tracking/MainTracking';
import configureStore from '@univision/fe-commons/dist/store/configureStore';
import features from '@univision/fe-commons/dist/config/features';

import mockData from './__mocks__/mockData.json';
import PageHead from '../PageHead';
import PageMicrodata from '../PageMicrodata';
import PageWrapper from '.';

localization.setLanguage = jest.fn();
features.optimize.antiFlicker = jest.fn();
features.header.hideHeaderFooter = jest.fn();
features.smartBanner.smartBannerEnabled = jest.fn(() => true);

const originalWindow = { ...global.window };
const windowSpy = jest.spyOn(global, 'window', 'get');

windowSpy.mockImplementation(() => ({
  ...originalWindow,
  location: {
    ...originalWindow.location,
    href: '',
  },
}));

afterEach(() => {
  windowSpy.mockRestore();
});

const store = configureStore();
let props;

jest.mock('@univision/fe-commons/dist/components/Authenticator', () => 'div');
jest.mock('@univision/fe-commons/dist/utils/tracking/perfume/perfumeTracker');

/**
 * @test {PageWrapper}
 */
describe('PageWrapper test', () => {
  beforeEach(() => {
    localization.setLanguage.mockReset();
    props = {
      pageData: {
        env: 'test',
        language: 'en',
        data: {
          ...mockData.data,
        },
        requestParams: null,
      },
    };
  });

  it('should provide default language if none provided', () => {
    props.pageData.language = undefined;
    shallow(<PageWrapper {...props} />);
    expect(localization.setLanguage).toBeCalledWith('es');
  });

  it('should have fallback contenty type as null', () => {
    const componentProps = { ...props, pageData: { data: {} } };
    const wrapper = shallow(<PageWrapper {...componentProps} />);
    expect(wrapper.childAt(5).prop('contentType')).toBeNull();
  });

  it('should render ad only if loading is false', () => {
    const pageData = {
      data: { type: 'section' },
      loading: false,
    };
    const componentProps = { ...props, pageData };
    const wrapper = shallow(<PageWrapper {...componentProps} />);
    expect(wrapper.find('PageWrapper__SpecialAd')).toBeDefined();
  });

  it('should render AntiFlicker if feature is enable', () => {
    features.optimize.antiFlicker.mockReturnValue(true);
    const wrapper = shallow(<PageWrapper {...props} />);
    expect(wrapper.find('AntiFlicker')).toBeDefined();
    features.optimize.antiFlicker.mockReturnValue(false);
  });

  it('should included Antiflicker and BKPIndicator', () => {
    props.pageData.isSpa = true;
    const wrapper = shallow(<PageWrapper {...props} />);
    expect(wrapper.find('AntiFlicker')).toBeDefined();
    expect(wrapper.find('BKPIndicator')).toBeDefined();
  });

  it('should not connect MainTracking to page by default', () => {
    const wrapper = mount(
      <Provider store={store}>
        <PageWrapper {...props} />
      </Provider>,
    );

    expect(wrapper.find(MainTracking)).toHaveLength(1);
  });

  it('should include theme in wrapper from theme provider', () => {
    const theme = { isDark: true };
    // eslint-disable-next-line no-var
    var wrapper2 = mount(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <PageWrapper {...props} />
        </ThemeProvider>
      </Provider>,
    );
    expect(wrapper2.find('PageWrapper__Wrapper').prop('theme')).toBe(props.theme);
  });

  it('should include page head and microdata', () => {
    const wrapper = mount(
      <Provider store={store}>
        <PageWrapper {...props} />
      </Provider>,
    );
    const isPageHead = wrapper.find(PageHead).first().exists();
    const isPageMicrodata = wrapper.find(PageMicrodata).first().exists();

    expect(isPageHead).toBe(true);
    expect(isPageMicrodata).toBe(true);
  });
});
