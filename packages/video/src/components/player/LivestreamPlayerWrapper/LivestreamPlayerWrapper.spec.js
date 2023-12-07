import React from 'react';
import { shallow, mount } from 'enzyme';

import Video from '../../Video';
import LivestreamPlaylist from '.';
import * as SdkHelpers from '../SoccerPlayerWrapper/SdkHelpers';

import mockData from './mockData.json';

let props;
const store = {
  getState: () => ({
    nodeId: 123,
  }),
  subscribe: jest.fn(),
  dispatch: jest.fn(),
};
const FMG = {
  callFn: jest.fn(),
  on: jest.fn((name, fn) => fn({ nodeId: 'playerId' })),
  playlistLivestream: jest.fn(),
  playLivestream: jest.fn(),
  preloadLibraries: jest.fn(),
  clearInstanceEvents: jest.fn(),
};

describe('LivestreamPlaylist tests', () => {
  beforeEach(() => {
    props = {
      settings: {
        livestream: mockData.playlistLiveStream.original,
      },
      pageData: {},
    };
    global.window.FMG = FMG;
  });

  it('should render video', () => {
    const wrapper = mount(<LivestreamPlaylist {...props} store={store} />);
    expect(wrapper.find(Video)).toHaveLength(1);
  });

  it('should call fmgCall for livestream without playlist', () => {
    const wrapper = shallow(<LivestreamPlaylist {...props} />);
    expect(wrapper.find(Video).props().fmgCall.name).toBe('playLivestream');
  });

  it('should call fmgCall for livestream with playlist', () => {
    const mcpid = [{ test: 'something' }];
    const wrapper = shallow(<LivestreamPlaylist {...props} mcpid={mcpid} />);
    expect(wrapper.find(Video).props().fmgCall.name).toBe('playLivestream');
  });

  it('should return correct data structure from getLivestreamData function', () => {
    const wrapper = shallow(<LivestreamPlaylist {...props} />);
    const data = wrapper.instance().getLivestreamData();
    expect(data).toEqual(mockData.playlistLiveStream.parsed);
  });

  it('should use correct image from getLivestreamData when mainImage is missing', () => {
    delete props.settings.livestream.mainImage;

    const wrapper = shallow(<LivestreamPlaylist {...props} />);
    const data = wrapper.instance().getLivestreamData();
    expect(data.image).toEqual(mockData.playlistLiveStream.original.image.renditions.original.href);
  });

  it('should send streamId on DAI livestreams', () => {
    props.settings.livestream.enableDai = true;
    props.settings.livestream.streamIdEnglish = 'LSENG02';
    const wrapper = shallow(<LivestreamPlaylist {...props} />);
    expect(wrapper.props().fmgCall.name).toBe('playLivestream');
    const instance = wrapper.instance();
    instance.fmgCustom({});
    expect(global.window.FMG.playLivestream).toHaveBeenLastCalledWith(expect.objectContaining(
      {
        streamId: 'LS123456',
      }
    ));
  });

  it('should send streamId undefined on non DAI livestreams', () => {
    delete props.settings.livestream.enableDai;
    const wrapper = shallow(<LivestreamPlaylist {...props} />);
    expect(wrapper.props().fmgCall.name).toBe('playLivestream');
    const instance = wrapper.instance();
    instance.fmgCustom({});
    expect(global.window.FMG.playLivestream).toHaveBeenLastCalledWith(expect.objectContaining(
      {
        streamId: undefined,
      }
    ));
  });

  it('should update state with on language change', () => {
    jest.spyOn(URLSearchParams.prototype, 'get').mockImplementation(() => 'es');
    const wrapper = mount(<LivestreamPlaylist {...props} store={store} />);
    expect(wrapper.state('lang')).toEqual('es');
    global.window.FMG.on = jest.fn((type, cb) => cb({ lang: 'en' }));
    const instance = wrapper.instance();
    instance.fmgCustom({});
    wrapper.instance().setListeners();
    expect(wrapper.state('lang')).toEqual('en');
    expect(wrapper.state('reloadPlayer')).toEqual(true);
  });

  it('should set language from url params and call appropriate stream id', () => {
    props.settings.livestream.enableDai = true;
    props.settings.livestream.streamIdEnglish = 'lsEnglish';
    jest.spyOn(URLSearchParams.prototype, 'get').mockImplementation(() => 'en');
    const wrapper = mount(<LivestreamPlaylist {...props} store={store} />);
    const instance = wrapper.instance();
    wrapper.instance().setListeners();
    instance.setLanguage();
    expect(wrapper.state('lang')).toEqual('en');
    instance.fmgCustom({});
    expect(global.window.FMG.playLivestream).toHaveBeenLastCalledWith(expect.objectContaining(
      {
        streamId: 'lsEnglish',
      }
    ));
  });

  it('should set language without url params and update language from updated props', () => {
    jest.spyOn(URLSearchParams.prototype, 'get').mockImplementation(() => null);
    const wrapper = mount(<LivestreamPlaylist {...props} store={store} />);
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
  });

  it('Should set listeners should set custom listeners', async () => {
    const wrapper = shallow(<LivestreamPlaylist {...props} />);
    SdkHelpers.onPreauthorizedResources = jest.fn();
    SdkHelpers.onVideoLanguageChanged = jest.fn();
    SdkHelpers.onCuePointsModuleReady = jest.fn();
    wrapper.instance().setListeners();
    expect(SdkHelpers.onPreauthorizedResources).toBeCalled();
    expect(SdkHelpers.onVideoLanguageChanged).toBeCalled();
  });
});
