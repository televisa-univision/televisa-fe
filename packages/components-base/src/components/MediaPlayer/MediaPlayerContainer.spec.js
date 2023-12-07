import React from 'react';
import { shallow } from 'enzyme';

import features from '@univision/fe-commons/dist/config/features';
import * as storeHelpers from '@univision/fe-commons/dist/store/storeHelpers';
import MediaPlayerContainer from './MediaPlayerContainer';

global.window.FMG = {
  callFn: jest.fn(),
  init: jest.fn(),
  on: jest.fn(),
  off: jest.fn(),
  clearInstanceEvents: jest.fn(),
  clearAllEvents: jest.fn(),
};
jest.mock('@univision/fmg-video-sdk', () => jest.fn(() => global.window.FMG));

describe('MediaPlayerContainer', () => {
  it('should not render MediaPlayerContainer', () => {
    const wrapper = shallow(
      <MediaPlayerContainer
        mediaPlayer={{
          anchorPlayer: {
            abacastId: null,
            stationTitle: null,
          },
          videoPlaying: null,
        }}
        videoPip={{
          placeholderId: null,
          anchored: false,
          videoOptions: null,
        }}
      />
    );
    expect(wrapper.find('AbacastPlayer')).toHaveLength(0);
    expect(wrapper.find('#mediaplayer-video-anchor-portal')).toHaveLength(1);
  });

  it('should render MediaPlayerContainer and Radio Player', () => {
    storeHelpers.isRadioPage = jest.fn();
    storeHelpers.isRadioPage.mockReturnValue(true);
    const wrapper = shallow(
      <MediaPlayerContainer
        mediaPlayer={{
          anchorPlayer: {
            abacast: {},
            stationTitle: 'station title',
          },
          videoPlaying: null,
        }}
        videoPip={{
          placeholderId: null,
          anchored: false,
        }}
      />
    );
    expect(wrapper.find('Connect(AbacastPlayerContainer)')).toHaveLength(1);
    expect(wrapper.find('#mediaplayer-video-anchor-portal')).toHaveLength(1);
  });

  it('should render MediaPlayerContainer and PodcastEpisode', () => {
    const wrapper = shallow(
      <MediaPlayerContainer
        mediaPlayer={{
          anchorPlayer: {
            abacast: {
              url: 'podcastEpisode.mp3',
            },
            abacastId: '1',
            stationTitle: 'station title',
            isPodcastEpisode: true,
          },
          videoPlaying: null,
        }}
        videoPip={{
          placeholderId: null,
          anchored: false,
        }}
      />
    );
    expect(wrapper.find('Connect(AbacastPlayerContainer)').props().streamUrl).toBe('podcastEpisode.mp3');
  });

  it('should render casting wrapper when feature flag is enabled', () => {
    const props = {
      mediaPlayer: {
        anchorPlayer: {
          abacastId: null,
          stationTitle: null,
        },
        videoPlaying: null,
      },
      videoPip: {
        placeholderId: null,
        anchored: false,
        videoOptions: null,
      },
    };

    jest.spyOn(features.video, 'enableCasting').mockReturnValue(true);

    const wrapper = shallow(<MediaPlayerContainer {...props} />);
    expect(wrapper.find('CastingWrapper')).toHaveLength(1);
  });
});
