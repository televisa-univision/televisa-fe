import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import Store from '@univision/fe-commons/dist/store/store';
import Tracker from '@univision/fe-commons/dist/utils/tracking/tealium/Tracker';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import * as helpers from '@univision/fe-commons/dist/utils/helpers';
import * as storeHelpers from '@univision/fe-commons/dist/store/storeHelpers';
import { SMARTBANNER_COOKIE, SMARTBANNER_COOKIE_TIME } from '@univision/fe-commons/dist/constants/personalization';

import { themes } from '@univision/fe-commons/dist/utils/themes/themes.json';

import SmartBanner from '.';

const defaultProps = {
  prefix: 'testapp',
  title: 'Univision Test',
  icon: 'https://cdn3.uvnimg.com/44/7d/b5d814554256be8dd7ce636bdfa2/unow-logo2x.png',
  ios: {
    id: '1049321283',
  },
  android: {
    id: 'com.univision.univisionnow',
    backgroundImage: 'https://cdn4.uvnimg.com/fb/e6/00596f6f496e8dda1d76975fe754/bg-unow2x.jpg',
  },
};

const mockEvent = {
  preventDefault: jest.fn(),
};

helpers.getCookie = jest.fn();
helpers.setCookie = jest.fn();

/**
 * Mock for chrome getInstalledRelatedApps method
 * @access private
 * @returns {Promise}
 */
const getInstalledRelatedApps = jest.fn(() => ((
  new Promise((resolve) => {
    resolve([{ id: 'com.univision.uforia' }]);
  })
)));

/**
 * Create a new SmartBanner Component
 * @param {Object} extraProps - additional props for creation
 * @param {function} createTypeFn - the creation type (mount/shallow)
 * @access private
 * @returns {JSX}
 */
const makeBanner = (extraProps = {}, createTypeFn = shallow) => {
  const element = (
    <SmartBanner
      {...{
        ...defaultProps,
        ...extraProps,
      }}
    />
  );
  const wrapper = createTypeFn(element);
  jest.runAllTimers();
  return wrapper;
};

/**
 * Get the component instance and calling the componentDidMount
 * lifecycle and waiting for it to resolve
 * @param {JSX} wrapper React component wrapper
 * @returns {Object}
 */
const getWrapperInstance = async (wrapper) => {
  const instance = wrapper.instance();
  await instance.componentDidMount();
  return instance;
};

jest.useFakeTimers();

/** @test {SmartBanner} */
describe('SmartBanner test', () => {
  beforeAll(() => {
    delete global.window.location;
    Store.dispatch(setPageData({
      userAgent: 'android',
    }));
  });

  beforeEach(() => {
    global.window.location = {
      href: 'https://www.univision.com',
    };
    jest.restoreAllMocks();
    jest.resetModules();
  });

  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SmartBanner {...defaultProps} />, div);
  });

  it('should be render correctly', async () => {
    const wrapper = makeBanner();
    const { appInfo } = await getWrapperInstance(wrapper);
    await SmartBanner.isInstalledApp();
    expect(wrapper.state('show')).toBeTruthy();
    expect(wrapper).toHaveLength(1);
    expect(appInfo.title).toBe('Univision Test');
    expect(wrapper.find('.smartbanner')).toHaveLength(1);
  });

  it('should clear timeout on unmount', async () => {
    const wrapper = makeBanner();
    await SmartBanner.isInstalledApp();
    wrapper.unmount();
    expect(clearTimeout).toHaveBeenCalled();
  });

  it('should be render empty if not is an allowed platform', async () => {
    Store.dispatch(setPageData({
      userAgent: 'Windows Phone',
    }));
    const wrapper = makeBanner();
    const { appInfo } = await getWrapperInstance(wrapper);
    await SmartBanner.isInstalledApp();

    expect(wrapper.children()).toHaveLength(0);
    expect(appInfo).toEqual({});
  });

  it('should be render the platform overwritted', async () => {
    const wrapper = makeBanner({
      overwritePlatform: 'android',
    });
    const { appInfo } = await getWrapperInstance(wrapper);
    await SmartBanner.isInstalledApp();

    expect(wrapper.find('.android')).toHaveLength(1);
    expect(appInfo.platform).toBe('android');
  });

  it('should not render in AMP pages', async () => {
    Store.dispatch(setPageData({
      isAmp: true,
    }));
    const wrapper = makeBanner();
    await SmartBanner.isInstalledApp();

    expect(wrapper.html()).toBeNull();
    Store.dispatch(setPageData({ isAmp: false }));
  });

  it('should be render the platform (ios) with correctly title', async () => {
    Store.dispatch(setPageData({
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239e Safari/602.1',
    }));
    const wrapper = makeBanner();
    const { appInfo } = await getWrapperInstance(wrapper);
    await SmartBanner.isInstalledApp();

    expect(appInfo.platform).toBe('ios');
    expect(wrapper.find('.ios')).toHaveLength(1);
  });

  it('should be render the platform (ios) with native smartbanner', async () => {
    storeHelpers.isSpa = jest.fn(() => false);
    Store.dispatch(setPageData({
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/603.1.23 (KHTML, like Gecko) Version/10.0 Mobile/14E5239e Safari/602.1',
    }));
    const wrapper = makeBanner();
    const { appInfo } = await getWrapperInstance(wrapper);
    await SmartBanner.isInstalledApp();

    expect(appInfo.platform).toBe('ios');
    expect(wrapper.find('SmartBannerMetadata')).toHaveLength(1);
    expect(wrapper.find('.smartbanner')).toHaveLength(0);
  });

  it('should be render the platform (android) with correctly title on SPA mode', async () => {
    storeHelpers.isSpa = jest.fn(() => true);
    Store.dispatch(setPageData({
      userAgent: 'Mozilla/5.0 (Android 4.4; Mobile; rv:41.0) Gecko/41.0 Firefox/41.0',
    }));
    const wrapper = makeBanner();
    const { appInfo } = await getWrapperInstance(wrapper);
    await SmartBanner.isInstalledApp();

    expect(appInfo.platform).toBe('android');
    expect(wrapper.find('.android')).toHaveLength(1);
  });

  it('should be render the backgroundColor from theme', async () => {
    const wrapper = makeBanner({
      android: {
        id: 'com.univiison',
        theme: themes.black,
      },
    });
    await SmartBanner.isInstalledApp();

    expect(wrapper.find('.smartbanner').props()).toHaveProperty('style.backgroundColor', themes.black.primary);
  });

  it('should use the global app data', async () => {
    const wrapper = makeBanner({
      title: 'Univision Deportes: Liga MX, MLS, Fútbol En Vivo',
      author: 'Global author',
      actionText: 'Global actiontext',
      storeText: 'Global storetext',
    });
    const { appInfo } = await getWrapperInstance(wrapper);
    expect(appInfo.title).toBe('Univision Deportes: Liga MX, MLS, Fútbol En Vivo');
    expect(appInfo.author).toBe('Global author');
    expect(appInfo.actionText).toBe('Global actiontext');
    expect(appInfo.storeText).toBe('Global storetext');
  });

  it('should use the data per platform', async () => {
    const wrapper = makeBanner({
      android: {
        id: 'com.univision',
        title: 'Android title',
        author: 'Android author',
        actionText: 'Android actiontext',
        storeText: 'Android storetext',
      },
    });
    const { appInfo } = await getWrapperInstance(wrapper);

    expect(appInfo.title).toBe('Android title');
    expect(appInfo.author).toBe('Android author');
    expect(appInfo.actionText).toBe('Android actiontext');
    expect(appInfo.storeText).toBe('Android storetext');
  });

  it('should hide the banner and set cookie after close', async () => {
    const wrapper = makeBanner({
      prefix: 'uvnsmartbanner',
    });
    const instance = await getWrapperInstance(wrapper);
    const hideSpy = jest.spyOn(instance, 'hide');
    const closeHandlerSpy = jest.spyOn(instance, 'closeHandler');
    await SmartBanner.isInstalledApp();

    instance.forceUpdate();
    expect(wrapper.children()).toHaveLength(1);
    wrapper.find('.close').simulate('click', mockEvent);
    expect(wrapper.children()).toHaveLength(0);

    expect(hideSpy).toHaveBeenCalled();
    expect(closeHandlerSpy).toHaveBeenCalled();
    expect(helpers.setCookie).toHaveBeenCalledWith(`${SMARTBANNER_COOKIE}_closed`, 'true', SMARTBANNER_COOKIE_TIME);
  });

  it('should hide the banner and set cookie after view/install', async () => {
    const wrapper = makeBanner({
      prefix: 'uvnsmartbanner',
    });
    const instance = await getWrapperInstance(wrapper);
    const hideSpy = jest.spyOn(instance, 'hide');
    const linkHandlerSpy = jest.spyOn(instance, 'linkHandler');
    await SmartBanner.isInstalledApp();

    instance.forceUpdate();
    expect(wrapper.children()).toHaveLength(1);
    wrapper.find('.button').simulate('click', mockEvent);

    expect(wrapper.children()).toHaveLength(0);
    expect(hideSpy).toHaveBeenCalled();
    expect(linkHandlerSpy).toHaveBeenCalled();
    expect(helpers.setCookie).toHaveBeenCalledWith(`${SMARTBANNER_COOKIE}_viewed`, 'true', SMARTBANNER_COOKIE_TIME);
  });

  it('should not render the banner if have closed/viewed cookie', async () => {
    const prefix = 'uvnsmartbanner';
    helpers.getCookie.mockReturnValueOnce('true');
    const wrapper = makeBanner({ prefix });
    await SmartBanner.isInstalledApp();

    expect(wrapper.children()).toHaveLength(0);
  });

  describe('SmartBanner get installed apps', () => {
    beforeAll(() => {
      global.window.navigator.getInstalledRelatedApps = getInstalledRelatedApps;
    });

    afterAll(() => {
      delete global.window.navigator.getInstalledRelatedApps;
    });

    it('should set installed if "getInstalledRelatedApps" exists', async (done) => {
      const data = {
        android: {
          id: 'com.univision.uforia',
        },
      };
      const wrapper = makeBanner(data);
      await getWrapperInstance(wrapper);

      jest.runAllTimers();
      process.nextTick(() => {
        expect(getInstalledRelatedApps).toHaveBeenCalled();
        expect(wrapper.state('installed')).toEqual(data.android);

        getInstalledRelatedApps.mockClear();
        done();
      });
    });

    it('should set installed as false from "getInstalledRelatedApps" if exists', async (done) => {
      global.window.navigator.getInstalledRelatedApps.mockRejectedValueOnce(new Error('internal error'));
      const wrapper = makeBanner();

      jest.runAllTimers();
      process.nextTick(() => {
        expect(getInstalledRelatedApps).toHaveBeenCalled();
        expect(wrapper.state('installed')).toBe(false);
        done();
      });
    });

    it('should set installed as false from "getInstalledRelatedApps" if exists', async (done) => {
      jest.spyOn(SmartBanner, 'isInstalledApp').mockRejectedValueOnce(new Error('internal error'));
      const wrapper = makeBanner();

      jest.runAllTimers();
      process.nextTick(() => {
        expect(wrapper.state('installed')).toBe(false);
        done();
      });
    });
  });

  describe('SmartBanner tracking', () => {
    beforeAll(() => {
      jest.useFakeTimers();
    });

    it('should send track on view handler if have analyticsId', async () => {
      const wrapper = makeBanner({
        analyticsId: 'smart_banner_UNow',
      });
      const trackerSpy = jest.spyOn(Tracker, 'fireEvent');
      const hideSpy = jest.spyOn(wrapper.instance(), 'hide');
      const redirectSpy = jest.spyOn(helpers, 'locationRedirect').mockImplementation(() => () => {});

      await SmartBanner.isInstalledApp();
      wrapper.find('.button').simulate('click', mockEvent);
      jest.runOnlyPendingTimers();

      expect(trackerSpy).toHaveBeenLastCalledWith(expect.objectContaining({
        event: 'engagement_click',
        event_action: 'smart_banner_UNow',
        event_label: 'https://www.univision.com',
      }));
      expect(redirectSpy).toHaveBeenCalledWith('https://play.google.com/store/apps/details?hl=en&id=com.univision.univisionnow');
      expect(hideSpy).toHaveBeenCalled();

      trackerSpy.mockRestore();
      redirectSpy.mockRestore();
    });
  });

  describe('SmartBanner with fallback "window" values', () => {
    it('should get language to the store link from fallback', async () => {
      delete global.window.navigator;
      global.window.navigator = {};
      const wrapper = makeBanner();
      const { appInfo } = await getWrapperInstance(wrapper);

      expect(appInfo.storeLink).toMatch(/hl=es/);
    });

    it('should render empty on SSR', async () => {
      delete global.window;
      const wrapper = makeBanner();

      expect(wrapper.children()).toHaveLength(0);
    });
  });
});
