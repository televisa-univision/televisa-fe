import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';

import * as isClientSide from '@univision/fe-utilities/helpers/common/isClientSide';
import Tracker from '@univision/fe-commons/dist/utils/tracking/tealium/Tracker';
import configureStore from '@univision/fe-commons/dist/store/configureStore';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import * as userSelectors from '@univision/fe-commons/dist/store/selectors/user-selectors';
import * as userAsyncActions from '@univision/fe-commons/dist/store/slices/user/user-asyncActions';
import features from '@univision/fe-commons/dist/config/features';
import { themes } from '@univision/fe-commons/dist/utils/themes/themes.json';
import { TUDN_SITE } from '@univision/fe-commons/dist/constants/sites';
import * as setCookie from '@univision/fe-utilities/helpers/content/setCookie';
import { SEX_ASSAULT_URL } from '@univision/fe-commons/dist/config/features/widgets';

import StickyCTA from '.';

const store = configureStore();
const theme = {
  primary: '#2358bf',
  secondary: '#23a2ee',
};
const stickyCtaData = [{
  active: page => page?.site === TUDN_SITE,
  onClick: jest.fn(),
  priority: 1,
  allowClose: true,
  countryCodes: ['MX'],
  cta: 'IR A TUDN.MX',
  text: '<b>Algunos contenidos no están disponibles en tu área. Visita TUDN.MX para una mejor experiencia.<b>',
},
{
  active: () => page => page?.uri.includes(SEX_ASSAULT_URL),
  cta: 'EXIT',
  text: '<b>Click ESC to exit<b>',
  onClick: null,
  priority: 2,
  allowClose: true,
  listener: {
    type: 'keyup',
    callBack: () => {},
  },
  color: '#FFFFF',
  cookieName: 'uvs-cta-test-banner-20200224',
}];

/**
 * Create test component with Provider because
 * useSelector force us to use it
 * @param {Object} props - additional component react props
 * @returns {JSX}
 */
function makeStickyCTA(props) {
  return mount(
    <Provider store={store}>
      <StickyCTA theme={theme} {...props} />
    </Provider>
  );
}

// Mocks
const locationMock = { CountryData: { country_code: 'MX' } };
const mockEvent = {
  preventDefault: jest.fn(),
};

/** @test {StickyCTA} */
describe('StickyCTA ', () => {
  beforeAll(() => {
    userAsyncActions.getUserLocation = jest.fn(() => Promise.resolve(locationMock));
  });

  beforeEach(() => {
    store.dispatch(setPageData({ site: TUDN_SITE, requestParams: null }));
    features.widgets.stickyCTA = [...stickyCtaData];
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><StickyCTA theme={null} /></Provider>, div);
  });

  it('should render by default from props properties and with default theme', () => {
    const props = {
      text: 'props test',
      cta: 'CTA here',
      active: true,
      theme: undefined,
    };
    const wrapper = makeStickyCTA(props);

    expect(wrapper.find('StickyCTA__FullWidthStyled')).toHaveLength(1);
    expect(wrapper.find('StickyCTA__FullWidthStyled')).toHaveStyleRule('background-color', '#2358bf');
    expect(wrapper.find('StickyCTA__TextStyled').html()).toMatch('props test');
    expect(wrapper.find('StickyCTA__CtaClickableStyled').prop('label')).toBe('CTA here');
    expect(wrapper.find('StickyCTA__CtaClickableStyled').prop('theme')).toEqual(themes.blue);
  });

  it('should render if feature `active` is true', () => {
    const wrapper = makeStickyCTA();

    expect(wrapper.find('StickyCTA__FullWidthStyled')).toHaveLength(1);
    expect(wrapper.find('StickyCTA__TextStyled').html()).toMatch(stickyCtaData[1].text);
    expect(wrapper.find('StickyCTA__CtaClickableStyled').prop('label')).toBe(stickyCtaData[1].cta);
  });

  it('should render second banner if feature `active` is true', () => {
    store.dispatch(setPageData({ site: SEX_ASSAULT_URL, requestParams: null }));
    const wrapper = makeStickyCTA();

    expect(wrapper.find('StickyCTA__FullWidthStyled')).toHaveLength(1);
    expect(wrapper.find('StickyCTA__TextStyled').html()).toMatch(stickyCtaData[1].text);
    expect(wrapper.find('StickyCTA__CtaClickableStyled').prop('label')).toBe(stickyCtaData[1].cta);
  });

  it('should render from feature by `countryCode` allowed from request param', () => {
    store.dispatch(setPageData({
      config: { deploy: { env: 'test' } },
      requestParams: { countryCode: 'MX' },
      site: 'tudn',
    }));
    const wrapper = makeStickyCTA();

    expect(wrapper.find('StickyCTA__FullWidthStyled')).toHaveLength(1);
    expect(wrapper.find('StickyCTA__TextStyled').html()).toMatch(stickyCtaData[0].text);
    expect(wrapper.find('StickyCTA__CtaClickableStyled').prop('label')).toBe(stickyCtaData[0].cta);
  });

  it('should render from feature by `countryCode` allowed from getUserLocation action', () => {
    store.dispatch(setPageData({
      site: 'tudn',
    }));
    const userLocationSelectorSpy = jest.spyOn(userSelectors, 'userLocationSelector').mockImplementation(() => locationMock);
    const wrapper = makeStickyCTA();

    expect(wrapper.find('StickyCTA__FullWidthStyled')).toHaveLength(1);
    expect(wrapper.find('StickyCTA__TextStyled').html()).toMatch(stickyCtaData[0].text);
    expect(wrapper.find('StickyCTA__CtaClickableStyled').prop('label')).toBe(stickyCtaData[0].cta);
    expect(userLocationSelectorSpy).toHaveBeenCalled();
    expect(userAsyncActions.getUserLocation).not.toHaveBeenCalled();

    userLocationSelectorSpy.mockRestore();
  });

  it('should render next cta banner if location is empty', () => {
    store.dispatch(setPageData({
      site: 'tudn',
    }));
    const wrapper = makeStickyCTA();

    expect(wrapper.find('StickyCTA__FullWidthStyled')).toHaveLength(1);
    expect(wrapper.find('StickyCTA__TextStyled').html()).toMatch(stickyCtaData[1].text);
    expect(wrapper.find('StickyCTA__CtaClickableStyled').prop('label')).toBe(stickyCtaData[1].cta);
    expect(userAsyncActions.getUserLocation).toHaveBeenCalled();
  });

  it('should render close button and show next on close', () => {
    const userLocationSelectorSpy = jest.spyOn(userSelectors, 'userLocationSelector').mockImplementation(() => locationMock);
    store.dispatch(setPageData({
      site: 'tudn',
    }));
    const wrapper = makeStickyCTA();
    const closeButton = wrapper.find('StickyCTA__CloseButtonStyled');

    expect(closeButton).toHaveLength(1);
    expect(wrapper.find('StickyCTA__TextStyled').html()).toMatch(stickyCtaData[0].text);

    closeButton.simulate('click', mockEvent);
    wrapper.update();
    expect(wrapper.find('StickyCTA__TextStyled').html()).toMatch(stickyCtaData[1].text);
    userLocationSelectorSpy.mockRestore();
  });

  it('should set cookie on click CTA button if have if `cookieName`', () => {
    store.dispatch(setPageData({
      site: null,
      uri: SEX_ASSAULT_URL,
    }));
    const setCookieSpy = jest.spyOn(setCookie, 'default');
    const wrapper = makeStickyCTA();
    const ctaButton = wrapper.find('StickyCTA__CtaClickableStyled');
    ctaButton.simulate('click', mockEvent);

    expect(setCookieSpy).toHaveBeenCalledWith('uvs-cta-test-banner-20200224', true, 356);
  });

  it('should not set cookie on click CTA button if not have `cookieName`', () => {
    store.dispatch(setPageData({
      config: { deploy: { env: 'test' } },
      requestParams: { countryCode: 'MX' },
      site: 'tudn',
    }));
    const setCookieSpy = jest.spyOn(setCookie, 'default');
    const wrapper = makeStickyCTA();
    const ctaButton = wrapper.find('StickyCTA__CtaClickableStyled');
    ctaButton.simulate('click', mockEvent);

    expect(setCookieSpy).not.toHaveBeenCalled();
    expect(stickyCtaData[0].onClick).toHaveBeenCalled();
  });

  it('should send track on close if trackingId is defined', () => {
    features.widgets.stickyCTA = [{
      ...stickyCtaData[0],
      active: () => true,
      countryCodes: null,
      trackingId: 'track_test',
    }];
    const trackerSpy = jest.spyOn(Tracker, 'fireEvent');
    const wrapper = makeStickyCTA();
    const closeButton = wrapper.find('StickyCTA__CloseButtonStyled');
    closeButton.simulate('click', mockEvent);

    expect(closeButton).toHaveLength(1);
    expect(trackerSpy).toHaveBeenLastCalledWith(expect.objectContaining({
      event_action: 'track_test_close',
    }));

    trackerSpy.mockRestore();
  });

  it('should send track on click CTA if trackingId is defined', () => {
    features.widgets.stickyCTA = [{
      ...stickyCtaData[0],
      active: () => true,
      countryCodes: null,
      trackingId: 'track_test',
    }];
    const trackerSpy = jest.spyOn(Tracker, 'fireEvent');
    const wrapper = makeStickyCTA();
    const ctaButton = wrapper.find('StickyCTA__CtaClickableStyled');
    ctaButton.simulate('click', mockEvent);

    expect(ctaButton).toHaveLength(1);
    expect(trackerSpy).toHaveBeenLastCalledWith(expect.objectContaining({
      event_action: 'track_test_click',
    }));

    trackerSpy.mockRestore();
  });

  it('should not render if feature `active` is false', () => {
    features.widgets.stickyCTA[1].active = () => false;
    const wrapper = makeStickyCTA();

    expect(wrapper.find('StickyCTA__FullWidthStyled')).toHaveLength(0);
  });

  it('should not render if `text` is empty', () => {
    features.widgets.stickyCTA[1].text = '';
    const wrapper = makeStickyCTA();

    expect(wrapper.find('StickyCTA__FullWidthStyled')).toHaveLength(0);
  });

  it('should not render if `cta` is empty', () => {
    features.widgets.stickyCTA[1].cta = '';
    const wrapper = makeStickyCTA();

    expect(wrapper.find('StickyCTA__FullWidthStyled')).toHaveLength(0);
  });

  it('should not render if stickyCTA data from features is undefined', () => {
    features.widgets.stickyCTA = undefined;
    const wrapper = makeStickyCTA();

    expect(wrapper.find('StickyCTA__FullWidthStyled')).toHaveLength(0);
  });

  it('should render emoty on SSR', () => {
    const isClientSideSpy = jest.spyOn(isClientSide, 'default').mockImplementation(() => false);
    const wrapper = makeStickyCTA();

    expect(isClientSideSpy).toHaveBeenCalled();
    expect(wrapper.find('StickyCTA__FullWidthStyled')).toHaveLength(0);
    expect(wrapper.html()).toBe('');
  });

  it('should test remove event listener', () => {
    features.widgets.stickyCTA[1].active = () => false;
    features.widgets.stickyCTA[1].active = () => true;
    spyOn(window, 'removeEventListener');
    const wrapper = makeStickyCTA();
    wrapper.unmount();
    expect(window.removeEventListener).toHaveBeenCalled();
  });
});
