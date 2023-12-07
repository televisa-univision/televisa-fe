import React from 'react';
import { shallow, mount } from 'enzyme';

import * as popUpActions from '@univision/fe-commons/dist/store/actions/popups-actions';
import { TUDN_MVPD_POPUP, TUDN_MVPD_POPUP_FORM } from '@univision/fe-deportes/dist/constants';
import * as videoUtils from '@univision/fe-commons/dist/utils/video';
import * as pageSelectors from '@univision/fe-commons/dist/store/selectors/page-selectors';
import features from '@univision/fe-commons/dist/config/features';

import Video from '../../Video';
import * as SdkHelpers from './SdkHelpers';
import SoccerPlaylist from '.';
import mockData from './mockData.json';

let props;
const Store = {
  getState: () => ({
    nodeId: 123,
  }),
  subscribe: jest.fn(),
  dispatch: jest.fn(),
};
const FMG = {
  callFn: jest.fn(),
  init: jest.fn(),
  soccerPlaylist: jest.fn(),
  trigger: jest.fn(),
  on: jest.fn((type, cb) => cb(false)),
  preloadLibraries: jest.fn(),
  removeInstance: jest.fn(),
  getInstance: jest.fn(() => ({})),
};

const cueModule = {
  setExtraTime: jest.fn(),
  addCuepoints: jest.fn(),
};

jest.mock('@univision/fe-commons/dist/utils/timer', () => jest.fn((time, cb) => {
  cb();

  return {
    cancel: jest.fn(() => { }),
  };
}));

const userLocationSpy = jest.spyOn(pageSelectors, 'userLocationSelector');

describe('SoccerPlaylist tests', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    global.window.FMG = FMG;
    props = {
      pageData: {},
      settings: {
        soccerMatch: mockData.soccerMatch.original,
      },
      updatePlaylist: jest.fn(),
      shouldShowPlaylist: jest.fn(),
    };
    videoUtils.checkMatchStatus = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should not render video if match status not ready', () => {
    const wrapper = mount(<SoccerPlaylist {...props} store={Store} />);
    expect(wrapper.find('Video')).toHaveLength(0);
  });

  it('should render video', () => {
    const wrapper = mount(<SoccerPlaylist {...props} store={Store} />);
    wrapper.setState({ matchStatusReady: true });
    expect(wrapper.find(Video)).toHaveLength(1);
  });

  it('should render video with correct fmgCall', () => {
    const wrapper = shallow(<SoccerPlaylist {...props} />);
    wrapper.setState({ matchStatusReady: true });
    expect(wrapper.find(Video).props().fmgCall.name).toBe('soccerPlaylist');
  });

  it('getSoccerData get proper soccer data', async () => {
    const wrapper = shallow(<SoccerPlaylist {...props} />);
    const data = wrapper.instance().getSoccerData();
    expect(data).toEqual(mockData.soccerMatch.parsed);
  });

  it('getSoccerData get proper soccer data when no image available', async () => {
    delete mockData.soccerMatch.mainImage;
    delete props.settings.soccerMatch.mainImage;

    const wrapper = shallow(<SoccerPlaylist {...props} />);
    const data = wrapper.instance().getSoccerData();
    expect(data.image).toEqual('image.jpg');
  });

  it('should call FMG soccerPlaylist with eventStatus as post-event', () => {
    const wrapper = shallow(<SoccerPlaylist {...props} />);
    wrapper.setState({ matchStatusReady: true });
    const instance = wrapper.instance();
    instance.eventStatus = 'post-event';
    videoUtils.checkMatchStatus = jest.fn((optaId, cb) => cb({ optaId, eventStatus: 'post-event' }));

    instance.fmgCustom({});

    expect(global.window.FMG.soccerPlaylist).toBeCalledWith(
      expect.objectContaining({
        eventStatus: 'post-event',
      })
    );
  });

  it('should call FMG soccerPlaylist with eventStatus as pre-event', () => {
    const wrapper = shallow(<SoccerPlaylist {...props} />);
    wrapper.setState({ matchStatusReady: true });
    const instance = wrapper.instance();
    instance.eventStatus = 'pre-event';
    videoUtils.checkMatchStatus = jest.fn((optaId, cb) => cb({ optaId, eventStatus: 'pre-event' }));

    instance.fmgCustom({});

    expect(global.window.FMG.soccerPlaylist).toBeCalledWith(
      expect.objectContaining({
        eventStatus: 'pre-event',
      })
    );
  });

  it('should call FMG.trigger matchEnd if matchOver is true', () => {
    const wrapper = shallow(<SoccerPlaylist {...props} />);
    wrapper.setState({ matchStatusReady: true });
    const instance = wrapper.instance();
    videoUtils.checkMatchStatus = jest.fn((optaId, cb) => cb({ optaId, eventStatus: 'post-event' }));

    instance.fmgCustom({});
    expect(global.window.FMG.trigger).toBeCalled();
  });

  it('should reload page and set gamePlaying to true when game is live', () => {
    const wrapper = shallow(<SoccerPlaylist {...props} />);
    const instance = wrapper.instance();
    wrapper.setState({ matchStatusReady: true });
    videoUtils.checkMatchStatus = jest.fn((optaId, cb) => cb({ optaId, eventStatus: 'live' }));
    global.window.FMG.on = jest.fn((type, cb) => cb({ isAllowed: true }));
    instance.fmgCustom({});
    expect(instance.gamePlaying).toBeTruthy();
  });

  it('should reload video and set send event status as live if matchStatus live', () => {
    const wrapper = shallow(<SoccerPlaylist {...props} />);
    const instance = wrapper.instance();
    instance.eventStatus = 'pre-game';
    videoUtils.checkMatchStatus = jest.fn((optaId, cb) => cb({ optaId, eventStatus: 'live' }));
    instance.fmgCustom({});
    expect(global.window.FMG.soccerPlaylist).toBeCalledWith(
      expect.objectContaining({
        eventStatus: 'live',
      })
    );
  });

  it('should cancel timer on componentWillUnmount', () => {
    const wrapper = mount(<SoccerPlaylist {...props} store={Store} />);
    const instance = wrapper.instance();

    instance.fmgCustom();
    wrapper.unmount();
    expect(instance.interval.cancel).toBeCalled();
  });

  it('should not cancel timer on componentWillUnmount if not exists', () => {
    const wrapper = shallow(<SoccerPlaylist {...props} />);
    const instance = wrapper.instance();

    wrapper.unmount();
    expect(instance.interval).toBeNull();
  });

  it('should dispatch the default TDUN popup', () => {
    const dispatchSpy = jest.spyOn(popUpActions, 'showPopup');
    const wrapper = shallow(<SoccerPlaylist {...props} />);
    const instance = wrapper.instance();
    videoUtils.checkMatchStatus = jest.fn((optaId, cb) => cb({ optaId, eventStatus: 'live' }));
    global.window.FMG.on = jest.fn((type, cb) => cb({ isAllowed: false, packageAllowed: true }));
    instance.fmgCustom({});
    wrapper.instance().setListeners();
    expect(dispatchSpy).toHaveBeenCalledWith(TUDN_MVPD_POPUP);
    dispatchSpy.mockRestore();
  });

  it('should dispatch the form TDUN popup', () => {
    const dispatchSpy = jest.spyOn(popUpActions, 'showPopup');
    const wrapper = shallow(<SoccerPlaylist {...props} />);
    const instance = wrapper.instance();
    videoUtils.checkMatchStatus = jest.fn((optaId, cb) => cb({ optaId, eventStatus: 'live' }));
    global.window.FMG.on = jest.fn((type, cb) => cb({ isAllowed: false, packageAllowed: false, userChannels: ['channel'] }));
    instance.fmgCustom({});
    wrapper.instance().setListeners();
    expect(dispatchSpy).toHaveBeenCalledWith(TUDN_MVPD_POPUP_FORM);
    dispatchSpy.mockRestore();
  });

  it('should not dispatch any popup if packageAllowed is true', () => {
    const dispatchSpy = jest.spyOn(popUpActions, 'showPopup');
    const dispatchFormSpy = jest.spyOn(popUpActions, 'showPopup');
    const wrapper = shallow(<SoccerPlaylist {...props} />);
    const instance = wrapper.instance();
    videoUtils.checkMatchStatus = jest.fn((optaId, cb) => cb({ optaId, eventStatus: 'live' }));
    global.window.FMG.on = jest.fn((type, cb) => cb({ isAllowed: false, packageAllowed: true, userChannels: ['channel'] }));
    instance.fmgCustom({});
    wrapper.instance().setListeners();
    expect(dispatchSpy).toHaveBeenCalledTimes(0);
    expect(dispatchFormSpy).toHaveBeenCalledTimes(0);
  });

  it('should not show playlist when pre-event', () => {
    props.shouldShowPlaylist = jest.fn();
    const wrapper = shallow(<SoccerPlaylist {...props} />);
    wrapper.setState({ matchStatusReady: true });
    const instance = wrapper.instance();
    videoUtils.checkMatchStatus = jest.fn((optaId, cb) => cb({ optaId, eventStatus: 'pre-event' }));
    instance.componentDidMount();
    expect(props.shouldShowPlaylist).not.toBeCalled();
    expect(wrapper.state().matchStatusReady).toBe(true);
  });

  it('should show playlist when post event', () => {
    props.shouldShowPlaylist = jest.fn();
    const wrapper = shallow(<SoccerPlaylist {...props} />);
    wrapper.setState({ matchStatusReady: true });
    const instance = wrapper.instance();
    videoUtils.checkMatchStatus = jest.fn((optaId, cb) => cb({ optaId, eventStatus: 'post-event' }));
    instance.componentDidMount();
    expect(props.shouldShowPlaylist).toBeCalled();
    expect(wrapper.state().matchStatusReady).toBe(true);
  });

  it('should show playlist when live', () => {
    props.shouldShowPlaylist = jest.fn();
    const wrapper = shallow(<SoccerPlaylist {...props} />);
    wrapper.setState({ matchStatusReady: true });
    const instance = wrapper.instance();
    videoUtils.checkMatchStatus = jest.fn((optaId, cb) => cb({ optaId, eventStatus: 'live' }));
    instance.componentDidMount();
    expect(props.shouldShowPlaylist).toBeCalled();
    expect(instance.gamePlaying).toBe(true);
    expect(wrapper.state().matchStatusReady).toBe(true);
  });

  it('should set language from url params and call appropriate stream id', () => {
    props.settings.soccerMatch.enableDai = true;
    props.settings.soccerMatch.streamIdEnglish = 'lsEnglish';
    jest.spyOn(URLSearchParams.prototype, 'get').mockImplementation(() => 'en');
    const wrapper = mount(<SoccerPlaylist {...props} store={Store} />);
    const instance = wrapper.instance();
    instance.setLanguage();
    expect(wrapper.state('lang')).toEqual('en');
    instance.fmgCustom({});
    expect(global.window.FMG.soccerPlaylist).toHaveBeenLastCalledWith(expect.objectContaining(
      {
        streamId: 'lsEnglish',
      }
    ));
  });

  it('should set language without url params', () => {
    jest.spyOn(URLSearchParams.prototype, 'get').mockImplementation(() => null);
    const wrapper = mount(<SoccerPlaylist {...props} store={Store} />);
    const instance = wrapper.instance();
    instance.setLanguage();
    expect(wrapper.state('lang')).toEqual('es');
  });

  it('should set language with on language changed function', () => {
    const wrapper = mount(<SoccerPlaylist {...props} store={Store} />);
    const instance = wrapper.instance();
    expect(wrapper.state('lang')).toEqual('es');
    global.window.FMG.on = jest.fn(() => 'en');
    instance.onLanguageChanged({ lang: 'en' });
    expect(wrapper.state('lang')).toEqual('en');
  });

  it('should not set language with on language changed function if it has same language', () => {
    const wrapper = shallow(<SoccerPlaylist {...props} />);
    const instance = wrapper.instance();
    expect(wrapper.state('lang')).toEqual('es');
    global.window.FMG.on = jest.fn(() => 'en');
    instance.onLanguageChanged({ lang: 'es' });
    expect(wrapper.state('lang')).toEqual('es');
  });

  it('should not disable ads if event state change to live', () => {
    SdkHelpers.initSoccerPlaylist = jest.fn();
    const wrapper = shallow(<SoccerPlaylist {...props} />);
    const instance = wrapper.instance();
    videoUtils.checkMatchStatus = jest.fn((optaId, cb) => cb({ optaId, eventStatus: 'post-event' }));
    instance.fmgCustom({});
    jest.runOnlyPendingTimers();
    expect(instance.eventStatus).toBe('post-event');
    videoUtils.checkMatchStatus = jest.fn((optaId, cb) => cb({ optaId, eventStatus: 'live' }));
    instance.fmgCustom({});
    jest.runOnlyPendingTimers();
    expect(wrapper.state().reloadPlayer).toBe(true);
    expect(instance.eventStatus).toBe('live');
    expect(SdkHelpers.initSoccerPlaylist).toBeCalledWith(
      expect.objectContaining({
        disableFirstPreroll: false,
      }),
    );
  });

  it('should call set cuepoints when cue module is ready, and after props update', () => {
    const setCuePointsSpy = jest.spyOn(SoccerPlaylist.prototype, 'setCuePoints');
    const hasExtraTimePeriodSpy = jest.spyOn(SoccerPlaylist.prototype, 'hasExtraTimePeriod');
    const wrapper = shallow(<SoccerPlaylist {...props} cuepoints={[]} shouldShowCuePoints />);
    const instance = wrapper.instance();
    global.window.FMG.on = jest.fn((type, cb) => cb(cueModule));
    instance.fmgCustom({});
    wrapper.instance().setListeners();
    expect(setCuePointsSpy).toHaveBeenCalledTimes(1);
    expect(hasExtraTimePeriodSpy).toHaveBeenCalledTimes(1);

    wrapper.setProps({
      cuepoints: [{
        period: '3',
        seconds: 300,
        mcpid: '30',
        svg: 'gol',
      }],
    });
    wrapper.update();
    expect(setCuePointsSpy).toHaveBeenCalledTimes(2);
  });

  it('should call set cuepoints when cue module is ready and set extra time if period is 3', () => {
    const cuePoints = [{
      period: '4',
      seconds: 350,
      mcpid: '31',
      svg: 'gol',
    }, {
      period: '3',
      seconds: 300,
      mcpid: '30',
      svg: 'gol',
    }, {
      period: '2',
      seconds: 250,
      mcpid: '29',
      svg: 'gol',
    }];
    const setCuePointsSpy = jest.spyOn(SoccerPlaylist.prototype, 'setCuePoints');
    const hasExtraTimePeriodSpy = jest.spyOn(SoccerPlaylist.prototype, 'hasExtraTimePeriod');
    const wrapper = shallow(
      <SoccerPlaylist
        {...props}
        cuePoints={cuePoints}
        shouldShowCuePoints
      />
    );
    const instance = wrapper.instance();
    global.window.FMG.on = jest.fn((type, cb) => cb(cueModule));
    instance.fmgCustom({});
    instance.setListeners();
    expect(setCuePointsSpy).toHaveBeenCalledTimes(1);
    expect(hasExtraTimePeriodSpy).toHaveBeenCalledTimes(1);
  });

  it('should call set cuepoints set extra time event if not comes sorted desc', () => {
    const cuePoints = [{
      period: '2',
      seconds: 250,
      mcpid: '29',
      svg: 'gol',
    }, {
      period: '3',
      seconds: 350,
      mcpid: '31',
      svg: 'gol',
    }, {
      period: '1',
      seconds: 300,
      mcpid: '30',
      svg: 'gol',
    }];
    const setCuePointsSpy = jest.spyOn(SoccerPlaylist.prototype, 'setCuePoints');
    const hasExtraTimePeriodSpy = jest.spyOn(SoccerPlaylist.prototype, 'hasExtraTimePeriod');
    const wrapper = shallow(
      <SoccerPlaylist
        {...props}
        cuePoints={cuePoints}
        shouldShowCuePoints
      />
    );
    const instance = wrapper.instance();
    global.window.FMG.on = jest.fn((type, cb) => cb(cueModule));
    instance.fmgCustom({});
    instance.setListeners();
    expect(setCuePointsSpy).toHaveBeenCalledTimes(1);
    expect(hasExtraTimePeriodSpy).toHaveBeenCalledTimes(1);
  });

  it('should call set cuepoints when props update but handle gracefully if cue module is undefined', () => {
    const setCuePointsSpy = jest.spyOn(SoccerPlaylist.prototype, 'setCuePoints');
    const hasExtraTimePeriodSpy = jest.spyOn(SoccerPlaylist.prototype, 'hasExtraTimePeriod');
    const wrapper = shallow(<SoccerPlaylist {...props} cuepoints={[]} shouldShowCuePoints />);
    expect(setCuePointsSpy).toHaveBeenCalledTimes(0);
    wrapper.setProps({
      cuepoints: [{
        period: '3',
        seconds: 300,
        mcpid: '30',
        svg: 'gol',
      }],
    });
    wrapper.update();
    expect(setCuePointsSpy).toHaveBeenCalledTimes(1);
    expect(hasExtraTimePeriodSpy).toHaveBeenCalledTimes(0);
  });

  it('Should set listeners should set custom listeners', async () => {
    const wrapper = shallow(<SoccerPlaylist {...props} />);
    SdkHelpers.onPreauthorizedResources = jest.fn();
    SdkHelpers.onVideoLanguageChanged = jest.fn();
    SdkHelpers.onCuePointsModuleReady = jest.fn();
    wrapper.instance().setListeners();
    expect(SdkHelpers.onPreauthorizedResources).toBeCalled();
    expect(SdkHelpers.onVideoLanguageChanged).toBeCalled();
    expect(SdkHelpers.onCuePointsModuleReady).toBeCalled();
  });

  it('should set language with prop language update', () => {
    const onLanguageChangedSpy = jest.spyOn(SoccerPlaylist.prototype, 'onLanguageChanged');
    const wrapper = shallow(<SoccerPlaylist {...props} />);
    const instance = wrapper.instance();
    instance.setLanguage();
    expect(wrapper.state('lang')).toEqual('es');
    wrapper.update();
    // Should not set language if its same as before:
    wrapper.setProps({ language: 'es' });
    wrapper.update();
    expect(wrapper.state('lang')).toEqual('es');
    // Should set language if different:
    wrapper.setProps({ language: 'en' });
    wrapper.update();
    expect(wrapper.state('lang')).toEqual('en');
    expect(onLanguageChangedSpy).toHaveBeenCalledTimes(1);
  });

  it('should return live for ON playerState', () => {
    props.pageData = {
      broadcastEvent: {
        playerState: 'ON',
      },
    };

    const wrapper = mount(<SoccerPlaylist {...props} store={Store} />);
    const instance = wrapper.instance();
    expect(instance.getEventStatus('ON')).toBe('live');
  });

  it('should return pre-event for PRE playerState', () => {
    props.pageData = {
      broadcastEvent: {
        playerState: 'PRE',
      },
    };

    const wrapper = mount(<SoccerPlaylist {...props} store={Store} />);
    const instance = wrapper.instance();
    expect(instance.getEventStatus('PRE')).toBe('pre-event');
  });

  it('should return post-event for POST playerState', () => {
    props.pageData = {
      broadcastEvent: {
        playerState: 'POST',
      },
    };

    const wrapper = mount(<SoccerPlaylist {...props} store={Store} />);
    const instance = wrapper.instance();
    expect(instance.getEventStatus('POST')).toBe('post-event');
  });

  it('should return post-event if nothing matches playerState', () => {
    props.pageData = {
      broadcastEvent: {
        playerState: 'UNKNOWN',
      },
    };

    const wrapper = mount(<SoccerPlaylist {...props} store={Store} />);
    const instance = wrapper.instance();
    expect(instance.getEventStatus('UNKNOWN')).toBe('post-event');
  });

  it('should return broadcast event if MX and worldcup mvp', () => {
    userLocationSpy.mockReturnValue('MX');
    features.deportes.isWorldCupMVP = jest.fn(() => true);

    props.pageData = {
      broadcastEvent: {
        playerState: 'ON',
      },
    };

    const wrapper = mount(<SoccerPlaylist {...props} store={Store} />);
    const instance = wrapper.instance();
    expect(instance.getCurrentEventStatus('post-event', 'ON')).toBe('live');
  });

  it('should return broadcast event if MX and worldcup mvp', () => {
    userLocationSpy.mockReturnValue('US');
    features.deportes.isWorldCupMVP = jest.fn(() => true);

    props.pageData = {
      broadcastEvent: {
        playerState: 'ON',
      },
    };

    const wrapper = mount(<SoccerPlaylist {...props} store={Store} />);
    const instance = wrapper.instance();
    expect(instance.getCurrentEventStatus('post-event', 'ON')).toBe('post-event');
  });

  it('should return post-event if nothing matches playerState', () => {
    props.pageData = {};

    const wrapper = mount(<SoccerPlaylist {...props} store={Store} />);
    const instance = wrapper.instance();
    expect(instance.getEventStatus()).toBe('post-event');
  });

  it('should return opta/cms status if US', () => {
    userLocationSpy.mockReturnValue('US');
    features.deportes.isWorldCupMVP = jest.fn(() => true);

    props.pageData = {
      broadcastEvent: {
        playerState: 'ON',
      },
    };

    const wrapper = mount(<SoccerPlaylist {...props} store={Store} />);
    const instance = wrapper.instance();
    expect(instance.getCurrentEventStatus('post-event')).toBe('post-event');
  });

  it('should return post-event status if US and nothing from api', () => {
    userLocationSpy.mockReturnValue('US');
    features.deportes.isWorldCupMVP = jest.fn(() => true);

    props.pageData = {
      broadcastEvent: {
        playerState: 'ON',
      },
    };

    const wrapper = mount(<SoccerPlaylist {...props} store={Store} />);
    const instance = wrapper.instance();
    expect(instance.getCurrentEventStatus(undefined, 'post-event')).toBe('post-event');
  });

  it('should return vixPlayerMx event if MX and worldcup mvp', () => {
    userLocationSpy.mockReturnValue('MX');
    features.deportes.isWorldCupMVP = jest.fn(() => true);

    props.pageData = {
      vixPlayerMx: {
        status: 'ON',
      },
    };

    const wrapper = mount(<SoccerPlaylist {...props} store={Store} />);
    const instance = wrapper.instance();
    expect(instance.getCurrentEventStatus('post-event', 'null', 'ON')).toBe('live');
  });

  it('should return broadcast auth status if MX and worldcup mvp', () => {
    userLocationSpy.mockReturnValue('MX');
    features.deportes.isWorldCupMVP = jest.fn(() => true);

    props.settings = {
      soccerMatch: {
        isAuth: false,
      },
    };

    props.pageData = {
      broadcastEvent: {
        playerState: 'ON',
      },
      broadcastEventLogin: true,
    };

    const wrapper = mount(<SoccerPlaylist {...props} store={Store} />);
    const instance = wrapper.instance();
    expect(instance.getAuthStatus()).toBe(true);
  });

  it('should return broadcast auth status if MX and worldcup mvp', () => {
    userLocationSpy.mockReturnValue('US');
    features.deportes.isWorldCupMVP = jest.fn(() => true);

    props.settings = {
      soccerMatch: {
        isAuth: false,
      },
    };

    props.pageData = {
      broadcastEvent: {
        playerState: 'ON',
      },
      broadcastEventLogin: true,
    };

    const wrapper = mount(<SoccerPlaylist {...props} store={Store} />);
    const instance = wrapper.instance();
    expect(instance.getAuthStatus()).toBe(false);
  });

  it('should have soccerMatch object even if livestream', () => {
    userLocationSpy.mockReturnValue('US');
    features.deportes.isWorldCupMVP = jest.fn(() => true);

    props.settings = {
      livestream: {
        isAuth: false,
      },
    };

    props.pageData = {
      broadcastEvent: {
        playerState: 'ON',
      },
      broadcastEventLogin: true,
    };

    const wrapper = mount(<SoccerPlaylist {...props} store={Store} />);
    wrapper.setState({ matchStatusReady: true });
    expect(wrapper.find(Video)).toHaveLength(1);
  });
});
