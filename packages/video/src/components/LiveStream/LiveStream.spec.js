import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from '@univision/fe-commons/dist/store/configureStore';
import * as popUpActions from '@univision/fe-commons/dist/store/actions/popups-actions';
import { TUDN_MVPD_POPUP, TUDN_MVPD_POPUP_FORM } from '@univision/fe-deportes/dist/constants';
import * as RatingValidator from '../player/NeulionPlayerWrapper/NeulionPlayerRatingValidator';
import LiveStream, { mapStateToProps } from '.';
import Video from '../Video';

const store = configureStore();

const FMG = {
  callFn: jest.fn(),
  init: jest.fn(),
  playLivestream: jest.fn(),
  trigger: jest.fn(),
  on: jest.fn((type, cb) => cb(false)),
};

const mockState = {
  content: [
    {
      description: '',
      uri: '123',
      sharingOptions: {},
      longform: { episode: 2 },
      mcpid: '123',
      title: 'Video 1',
      authRequired: true,
      videoType: 'long-form',
      hasNewLabel: false,
    },
  ],
  show: {
    name: 'Caer en tentacion',
    seasons: [
      {
        name: 'Temporada 1',
        number: 1,
      },
      {
        name: 'Temporada 2',
        number: 2,
      },
      {
        name: 'Temporada 3',
        number: 3,
      },
    ],
    seasonInView: {
      name: 'Temporada 1',
      number: 1,
    },
    nextSeason: {
      name: 'Temporada 2',
      number: 2,
    },
  },
  nextEpisodes: true,
  prevEpisodes: true,
  nodeId: 'player-123',
};

describe('LiveStream', () => {
  beforeEach(() => {
    global.window.FMG = FMG;
    RatingValidator.default.initLivestreamValidation = jest.fn(() => Promise.resolve());
  });

  describe('Map state to props tests', () => {
    it('Returns default user location', () => {
      const props = mapStateToProps(mockState);

      expect(props.userLocation).toBe('US');
    });
  });

  it('should render a Video with the proper FMG call', () => {
    const component = mount(
      <Provider store={store}>
        <LiveStream livestreamId="123" tvssUrl="test" primaryTag="test" />
      </Provider>
    );
    const wrapper = component.find(Video);
    expect(wrapper.props().fmgCall.name).toBe('playLivestream');
  });

  it('should render a Video with the proper FMG call and dfp override', async () => {
    const props = {
      livestreamid: 123,
      tvssUrl: 'test',
      primaryTag: 'test',
      dfp: {
        advalue: 'override',
      },
      enabled: false,
      channels: ['udn'],
      enableDai: true,
    };
    const component = mount(
      <Provider store={store}>
        <LiveStream {...props} />
      </Provider>
    );

    const wrapper = component.find('LiveStream');
    expect(wrapper.find(Video).props().fmgCall.name).toBe('playLivestream');
    const instance = wrapper.instance();
    await instance.fmgCustom({ disableAds: true });
    expect(global.window.FMG.playLivestream).toHaveBeenCalledWith(expect.objectContaining(
      {
        dfp: {
          advalue: 'override',
        },
        channels: ['udn'],
      }
    ));
  });

  it('should dispatch the default TDUN popup', async () => {
    const dispatchSpy = jest.spyOn(popUpActions, 'showPopup');
    const component = mount(
      <Provider store={store}>
        <LiveStream livestreamId="123" tvssUrl="test" primaryTag="test" />
      </Provider>
    );
    const wrapper = component.find('LiveStream');
    const instance = wrapper.instance();
    instance.checkMatchStatus = jest.fn(cb => cb({ eventStatus: 'live' }));
    global.window.FMG.on = jest.fn((type, cb) => cb({ isAllowed: false, packageAllowed: true }));
    await instance.fmgCustom({});
    expect(dispatchSpy).toHaveBeenCalledWith(TUDN_MVPD_POPUP);
    dispatchSpy.mockRestore();
  });

  it('should dispatch the form TDUN popup', async () => {
    const dispatchSpy = jest.spyOn(popUpActions, 'showPopup');
    const component = mount(
      <Provider store={store}>
        <LiveStream livestreamId="123" tvssUrl="test" primaryTag="test" />
      </Provider>
    );
    const wrapper = component.find('LiveStream');
    const instance = wrapper.instance();
    global.window.FMG.on = jest.fn((type, cb) => cb({ isAllowed: false, packageAllowed: false, userChannels: ['channel'] }));
    await instance.fmgCustom({});
    expect(dispatchSpy).toHaveBeenCalledWith(TUDN_MVPD_POPUP_FORM);
    dispatchSpy.mockRestore();
  });

  it('should not dispatch any popup if packageAllowed is true', async () => {
    const dispatchSpy = jest.spyOn(popUpActions, 'showPopup');
    const dispatchFormSpy = jest.spyOn(popUpActions, 'showPopup');
    const component = mount(
      <Provider store={store}>
        <LiveStream livestreamId="123" tvssUrl="test" primaryTag="test" />
      </Provider>
    );
    const wrapper = component.find('LiveStream');
    const instance = wrapper.instance();
    global.window.FMG.on = jest.fn((type, cb) => cb({ isAllowed: false, packageAllowed: true, userChannels: ['channel'] }));
    await instance.fmgCustom({});
    expect(dispatchSpy).toHaveBeenCalledTimes(0);
    expect(dispatchFormSpy).toHaveBeenCalledTimes(0);
  });

  it('should not dispatch any popup if isAllowed is true', async () => {
    const dispatchSpy = jest.spyOn(popUpActions, 'showPopup');
    const dispatchFormSpy = jest.spyOn(popUpActions, 'showPopup');
    const component = mount(
      <Provider store={store}>
        <LiveStream livestreamId="123" tvssUrl="test" primaryTag="test" />
      </Provider>
    );
    const wrapper = component.find('LiveStream');
    const instance = wrapper.instance();
    global.window.FMG.on = jest.fn((type, cb) => cb({
      isAllowed: true, packageAllowed: false, userChannels: [],
    }));
    await instance.fmgCustom({});
    expect(dispatchSpy).toHaveBeenCalledTimes(0);
    expect(dispatchFormSpy).toHaveBeenCalledTimes(0);
  });

  it('should send disableAds like true', async () => {
    const component = mount(
      <Provider store={store}>
        <LiveStream livestreamId="123" tvssUrl="test" primaryTag={{}} disableVideoAds />
      </Provider>
    );
    const wrapper = component.find('LiveStream');
    const instance = wrapper.instance();
    global.window.FMG.on = jest.fn();
    instance.pageDisableAds = true;
    await instance.fmgCustom({ disableAds: true });
    expect(global.window.FMG.playLivestream).toBeCalledWith(expect.objectContaining({
      disableAds: true,
    }));
  });

  it('should send disableAds like true if disableVideoAds is acive in parent section', async () => {
    const props = {
      livestreamId: '123',
      tvssUrl: 'test',
      primaryTag: {},
      videoProps: { nodeId: 'player-123' },
    };
    const component = mount(
      <Provider store={store}>
        <LiveStream {...props} />
      </Provider>
    );
    const wrapper = component.find('LiveStream');
    const instance = wrapper.instance();
    global.window.FMG.on = jest.fn();
    instance.pageDisableAds = true;
    await instance.fmgCustom({});
    expect(global.window.FMG.playLivestream).toBeCalledWith(expect.objectContaining({
      disableAds: true,
    }));
  });

  it('should send disableAds like false', async () => {
    const component = mount(
      <Provider store={store}>
        <LiveStream livestreamId="123" tvssUrl="test" primaryTag={{}} />
      </Provider>
    );
    const wrapper = component.find('LiveStream');
    const instance = wrapper.instance();
    global.window.FMG.on = jest.fn();
    instance.pageDisableAds = false;
    await instance.fmgCustom({ disableAds: false });
    expect(global.window.FMG.playLivestream).toBeCalledWith(expect.objectContaining({
      disableAds: false,
    }));
  });
});
