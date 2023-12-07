import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import gtmManager from '../../utils/tracking/googleTagManager/gtmManager';
import tealiumManager from '../../utils/tracking/tealium/tealiumManager';
import * as TrackingHelpers from '../../utils/tracking/trackingHelpers';
import * as storeHelpers from '../../store/storeHelpers';
import thirdPartiesFeature from '../../config/features/thirdParties';
import spaTracker from '../../utils/tracking/tealium/spa/SpaTracker';
import features from '../../config/features';

import MainTracking from './MainTracking';

jest.useFakeTimers();

/** @test {MainTracking} */
describe('MainTracking', () => {
  const initialPage = {
    data: {
      title: 'Original title',
      articleType: 'article',
      analyticsData: {
        web: {
          common: {
            title: 'original title',
          },
        },
      },
    },
  };
  const newPage = {
    data: {
      title: 'New title',
      articleType: 'list',
      analyticsData: {
        web: {
          common: {
            title: 'new title',
          },
        },
      },
    },
  };

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllTimers();
  });

  it('should render without crashing', () => {
    const div = document.createElement('div');
    const Tl = (
      <MainTracking />
    );
    ReactDOM.render(Tl, div);
    jest.runAllTimers();
  });

  it('should render GTMIframe', () => {
    const wrapper = shallow(
      <MainTracking
        page={initialPage}
      />
    );
    jest.runAllTimers();
    expect(wrapper.find('GTMIframe').length).toBe(1);
  });

  it('should not render GTMIframe if feature is disabled', () => {
    features.tracking.gtm = false;
    const wrapper = shallow(
      <MainTracking
        page={initialPage}
      />
    );
    jest.runAllTimers();
    expect(wrapper.find('GTMIframe').length).toBe(0);
  });

  it('should not load GTM if disabled', () => {
    features.tracking.gtm = false;
    spyOn(gtmManager, 'load');
    shallow(
      <MainTracking
        page={initialPage}
      />
    );
    jest.runAllTimers();
    expect(gtmManager.load).not.toBeCalled();
  });

  it('should not load Tealium if gtm is enabled', () => {
    features.tracking.gtm = true;
    spyOn(tealiumManager, 'load');
    shallow(
      <MainTracking
        page={initialPage}
      />
    );
    jest.runAllTimers();
    expect(tealiumManager.load).not.toBeCalled();
  });

  it('should load GTM if enabled', () => {
    features.tracking.gtm = true;
    spyOn(gtmManager, 'load');
    shallow(
      <MainTracking
        page={initialPage}
      />
    );
    jest.runAllTimers();
    expect(gtmManager.load).toBeCalled();
  });

  it('should not load any tracking if flag is disable', () => {
    features.tracking.gtm = true;
    jest.spyOn(thirdPartiesFeature, 'isGTMDisabled').mockReturnValue(true);
    jest.spyOn(thirdPartiesFeature, 'isNielsenDisabled').mockReturnValue(true);
    jest.spyOn(thirdPartiesFeature, 'isComscoreDisabled').mockReturnValue(true);
    jest.spyOn(gtmManager, 'load');
    shallow(
      <MainTracking
        page={initialPage}
      />
    );
    jest.runAllTimers();
    expect(gtmManager.load).toBeCalledTimes(0);
  });

  it('should load Tealium if gtm is disabled', () => {
    features.tracking.gtm = false;
    spyOn(tealiumManager, 'load');
    shallow(
      <MainTracking
        page={initialPage}
      />
    );
    jest.runAllTimers();
    expect(tealiumManager.load).toBeCalled();
  });

  it('should update window utag data if page tracking info changes', () => {
    features.tracking.gtm = true;
    process.env.APP_VERSION = '2';
    const wrapper = shallow(
      <MainTracking
        page={initialPage}
      />
    );
    jest.runAllTimers();
    const getUtagDataSpy = jest.spyOn(TrackingHelpers, 'getUtagData')
      .mockReturnValue('getUtagDataResult');
    const spaTrackerSpy = jest.spyOn(spaTracker, 'track');

    wrapper.setProps({ page: newPage });
    jest.runAllTimers();
    expect(getUtagDataSpy).toHaveBeenCalledWith({ title: 'new title' });
    expect(spaTrackerSpy).toHaveBeenCalled();
    expect(window.utag_data).toBe('getUtagDataResult');

    wrapper.setProps({ page: { ...newPage, data: { analyticsData: 'test' } } });
    jest.runAllTimers();
  });

  it('should update window utag data if page tracking info changes whit article type list', () => {
    features.tracking.gtm = true;
    process.env.APP_VERSION = '2';
    const wrapper = shallow(
      <MainTracking
        page={newPage}
      />
    );
    jest.runAllTimers();
    const getUtagDataSpy = jest.spyOn(TrackingHelpers, 'getUtagData')
      .mockReturnValue('getUtagDataResult');
    const spaTrackerSpy = jest.spyOn(spaTracker, 'track');

    wrapper.setProps({ page: initialPage });
    jest.runAllTimers();
    expect(getUtagDataSpy).toHaveBeenCalledWith({ title: 'original title' });
    expect(spaTrackerSpy).toHaveBeenCalled();
    expect(window.utag_data).toBe('getUtagDataResult');

    wrapper.setProps({ page: { ...initialPage, data: { analyticsData: 'test' } } });
    jest.runAllTimers();
  });

  it('should clear the data layer if available when page tracking info changes', () => {
    const wrapper = shallow(
      <MainTracking
        page={initialPage}
      />
    );
    jest.runAllTimers();
    const instance = wrapper.instance();
    instance.trackingManager = {
      clearDataLayer: jest.fn(),
      triggerEvent: jest.fn(),
      load: jest.fn(),
    };

    wrapper.setProps({ page: newPage });

    expect(instance.trackingManager.clearDataLayer).toHaveBeenCalledTimes(1);
    expect(instance.trackingManager.triggerEvent).toHaveBeenCalledWith({
      event: 'gtm.js',
    });

    instance.trackingManager.clearDataLayer = null;
    wrapper.setProps({ page: { ...newPage, data: { analyticsData: null } } });
    expect(instance.trackingManager.triggerEvent).toHaveBeenCalledTimes(1);
  });

  it('should not update window utag data if page tracking info has not changed', () => {
    const wrapper = shallow(
      <MainTracking
        page={initialPage}
      />
    );
    jest.runAllTimers();
    const getUtagDataSpy = jest.spyOn(TrackingHelpers, 'getUtagData')
      .mockReturnValue('getUtagDataResult');

    wrapper.setProps({ page: initialPage });

    expect(getUtagDataSpy).not.toHaveBeenCalled();
  });

  it('should clear timeout on unmount', () => {
    spyOn(global, 'clearTimeout');
    const wrapper = shallow(
      <MainTracking
        page={initialPage}
      />
    );
    wrapper.unmount();
    expect(global.clearTimeout);
  });

  it('should get tracking data for production', () => {
    spyOn(storeHelpers, 'getDevice').and.returnValue('desktop');
    const page = {
      data: {
        analyticsData: {
          web: {
            common: {
              uid: 1,
            },
            contentSpecific: {
              word_count: 15,
            },
          },
        },
      },
    };
    expect(MainTracking.getTrackingConfig(page)).toMatchObject({
      uid: 1,
      word_count: 15,
    });
  });

  it('should update the dataLayer', () => {
    window.dataLayer = [{}];
    MainTracking.updateTracking({
      data: {
        analyticsData: {
          web: {
            common: {
              uid: 1,
            },
            contentSpecific: {
              word_count: 15,
            },
          },
        },
      },
    });
    expect(window.dataLayer[0].uid).toBe(1);
  });
});
