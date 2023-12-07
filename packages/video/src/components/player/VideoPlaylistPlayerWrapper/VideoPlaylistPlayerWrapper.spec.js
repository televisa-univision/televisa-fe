import React from 'react';
import { mount } from 'enzyme';
import * as reactRedux from 'react-redux';

import Features from '@univision/fe-commons/dist/config/features';
import * as storeHelpers from '@univision/fe-commons/dist/store/storeHelpers';

import Video from '../../Video';
import VideoPlaylist from '.';
import SoccerPlaylist from '../SoccerPlayerWrapper';
import LivestreamPlaylist from '../LivestreamPlayerWrapper';
import NeulionLivestream from '../NeulionPlayerWrapper';

let props;

storeHelpers.isSpa = jest.fn();

beforeEach(() => {
  props = {
    settings: {},
    multitab: false,
    pageData: {},
    nodeId: 'player-123',
    store: {
      getState: () => ({
        nodeId: 123,
      }),
      subscribe: jest.fn(),
      dispatch: jest.fn(),
    },
  };
  jest.spyOn(reactRedux, 'useSelector').mockImplementation(() => 'KMEX');
});

describe('VideoPlaylist tests', () => {
  it('should render video', () => {
    const wrapper = mount(<VideoPlaylist {...props} />);
    expect(wrapper.find(Video)).toHaveLength(1);
  });

  it('should render video with multitabPlaylist fmgCall', () => {
    props.multitab = true;

    const wrapper = mount(<VideoPlaylist {...props} />);
    expect(wrapper.find(Video)).toHaveLength(1);
    expect(wrapper.find(Video).props().fmgCall.name).toBe('playlist');
  });

  it('should render SoccerPlaylist', () => {
    props.settings = {
      soccerMatch: {},
    };

    const wrapper = mount(<VideoPlaylist {...props} />);
    expect(wrapper.find(SoccerPlaylist)).toHaveLength(1);
  });

  it('should render LivestreamPlaylist', () => {
    Features.video.useNeulionLivestream = jest.fn();
    Features.video.useNeulionLivestream.mockReturnValue(false);

    props.settings = {
      livestream: {},
    };

    const wrapper = mount(<VideoPlaylist {...props} />);
    expect(wrapper.find(LivestreamPlaylist)).toHaveLength(1);
  });

  it('should render NeulionLivestream', () => {
    Features.video.useNeulionLivestream = jest.fn();
    Features.video.useNeulionLivestream.mockReturnValue(true);

    props.settings = {
      livestream: {},
    };

    const wrapper = mount(<VideoPlaylist {...props} />);
    expect(wrapper.find(NeulionLivestream)).toHaveLength(1);
  });

  it('should render for prende playlist video', () => {
    const wrapper = mount(<VideoPlaylist {...props} showPrendeCTA />);
    expect(wrapper.find(Video)).toHaveLength(1);
  });
});
