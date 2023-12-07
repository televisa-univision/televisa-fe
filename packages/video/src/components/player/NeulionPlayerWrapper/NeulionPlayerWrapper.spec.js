import React from 'react';
import { shallow, mount } from 'enzyme';
import * as reactRedux from 'react-redux';
import * as helpers from '@univision/fe-commons/dist/utils/helpers';
import * as utilsVideo from '@univision/fe-commons/dist/utils/video';

import Video from '../../Video';
import RatingValidator from './NeulionPlayerRatingValidator';
import NeulionLivestream, * as NeulionFunctions from '.';

let props;
let store;

beforeEach(() => {
  props = {
    settings: {
      livestream: {
        mainImage: '',
        image: { renditions: { original: { href: 'test.jpg' } } },
      },
    },
    pageData: {
      data: { brandable: { tvStation: { call: 'KDTV' } } },
    },
    market: 'KMEX',
  };
  store = {
    getState: () => ({
      nodeId: 123,
    }),
    subscribe: jest.fn(),
    dispatch: jest.fn(),
  };
  global.window.FMG = {
    callFn: jest.fn(),
    clearInstanceEvents: jest.fn(),
    on: jest.fn((name, fn) => fn({ nodeId: 'playerId' })),
    off: jest.fn(),
    playLivestream: jest.fn(),
    preloadLibraries: jest.fn(),
    removeInstance: jest.fn(),
    trigger: jest.fn(),
  };
  jest.spyOn(reactRedux, 'useSelector').mockImplementation(() => 'KMEX');
  jest.spyOn(RatingValidator, 'initLivestreamValidation').mockImplementation(() => {});
});

describe('LivestreamPlaylist tests', () => {
  it('should render video', () => {
    const wrapper = mount(<NeulionLivestream {...props} store={store} />);
    expect(wrapper.find(Video)).toHaveLength(1);
  });

  it('should clear timer on unmount', () => {
    const clearTimerSpy = jest.spyOn(RatingValidator, 'clearTimer').mockImplementation(() => {});
    const wrapper = mount(<NeulionLivestream {...props} store={store} />);
    wrapper.unmount();
    expect(global.window.FMG.off).toBeCalled();
    expect(clearTimerSpy).toBeCalled();
  });

  it('should stop player if `mvpdCheckAuthorizationFail` is called', async () => {
    const player = { stop: jest.fn() };
    const doIfPlayerExistsSpy = jest.spyOn(utilsVideo, 'doIfPlayerExists')
      .mockImplementation((nodeId, fn) => fn(player));
    await NeulionFunctions.fmgCustom(props)({});
    expect(doIfPlayerExistsSpy).toBeCalled();
    expect(player.stop).toBeCalled();
  });

  it('should render video with correct fmgCall', () => {
    const wrapper = shallow(<NeulionLivestream {...props} />);
    expect(wrapper.find(Video).props().fmgCall.name).toBe('playLivestream');
  });

  it('should return correct data structure from getLivestreamData function', async () => {
    const data = await NeulionFunctions.getLivestreamData(props);
    expect(data.channelId).toEqual(4);
  });

  it('should use correct image from getLivestreamData when mainImage is missing', async () => {
    delete props.settings.livestream.mainImage;
    const data = await NeulionFunctions.getLivestreamData(props);
    expect(data.image).toEqual('test.jpg');
  });

  it('should not call playLivestream if this is not defined', () => {
    jest.spyOn(helpers, 'hasKey').mockReturnValueOnce(false);
    NeulionFunctions.initNeulionLivestream({});
    expect(global.window.FMG.playLivestream).not.toBeCalled();
  });

  it('should call playLivestream if it defined', () => {
    jest.spyOn(helpers, 'hasKey').mockReturnValueOnce(true);
    NeulionFunctions.initNeulionLivestream({});
    expect(global.window.FMG.playLivestream).toBeCalledWith({});
  });

  it('should call playLivestream with default values', async () => {
    jest.spyOn(helpers, 'hasKey').mockReturnValueOnce(false);
    await NeulionFunctions.fmgCustom(props)({});
    expect(global.window.FMG.playLivestream).toBeCalledWith(expect.objectContaining({
      channelId: 4,
      disableAds: false,
      disableFirstPreroll: false,
      image: 'test.jpg',
      mainImage: '',
    }));
  });
});
