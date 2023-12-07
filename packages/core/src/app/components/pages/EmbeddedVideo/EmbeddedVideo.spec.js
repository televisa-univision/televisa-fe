import React from 'react';
import { shallow } from 'enzyme';

import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';

import VideoPlayer from '@univision/fe-video/dist/components/VideoPlayer';
import EmbeddedVideo from './EmbeddedVideo';

/** @test {EmbeddedVideo} */
describe('EmbeddedVideo Spec', () => {
  it('should render a video player', () => {
    const props = {
      page: { image: { renditions: { } } },
    };
    Store.dispatch(setPageData({
      requestParams: {
        simple: true,
      },
    }));
    const wrapper = shallow(<EmbeddedVideo {...props} />);
    expect(wrapper.find(VideoPlayer)).toHaveLength(1);
  });

  it('should render a player with playlist', () => {
    const props = {
      page: { image: { renditions: { } } },
    };
    Store.dispatch(setPageData({
      requestParams: {
        playlist: true,
      },
    }));
    const wrapper = shallow(<EmbeddedVideo {...props} />);
    expect(wrapper.find('Connect(VideoPlayerComponent)').length).toBe(1);
  });

  it('should render a video player with playVOD call if embed id exists', () => {
    const props = {
      page: {
        image: { renditions: { } },
        eid: 1,
        ssid: 'e.news',
        adSettings: { targeting: {} }
      },
    };

    Store.dispatch(setPageData({
      requestParams: null
    }));

    const wrapper = shallow(<EmbeddedVideo {...props} />);
    expect(wrapper.find(VideoPlayer).length).toBe(1);
    expect(wrapper.find(VideoPlayer).props().fmgCall.name).toBe('playVOD');
  });

  it('should render a livestream player if embedId and livestreamId exist', () => {
    const props = {
      page: {
        image: { renditions: { } },
        eid: 1,
        livestreamId: 1,
        adSettings: { targeting: {} }
      },
    };

    Store.dispatch(setPageData({
      requestParams: null,
    }));

    const wrapper = shallow(<EmbeddedVideo {...props} />);
    expect(wrapper.find('Connect(LiveStream)')).toHaveLength(1);
  });

  it('should render a player with autoplay', () => {
    const props = {
      page: { image: { renditions: { } } },
    };
    Store.dispatch(setPageData({
      requestParams: {
        autoplay: ''
      }
    }));
    const wrapper = shallow(<EmbeddedVideo {...props} />);
    expect(wrapper.find(VideoPlayer).props().autoplay).toBe('viewable');
  });

  it('should render a player with autoplay', () => {
    const props = {
      page: { image: { renditions: { } } },
    };
    Store.dispatch(setPageData({
      requestParams: {
        autoplay: 'true'
      }
    }));
    const wrapper = shallow(<EmbeddedVideo {...props} />);
    expect(wrapper.find(VideoPlayer).props().autoplay).toBe('viewable');
  });

  it('should render a player with autoplay', () => {
    const props = {
      page: { image: { renditions: { } } },
    };
    Store.dispatch(setPageData({
      requestParams: {
        other: ''
      }
    }));
    const wrapper = shallow(<EmbeddedVideo {...props} />);
    expect(wrapper.find(VideoPlayer).props().autoplay).toBe('viewable');
  });

  it('should render a player without autoplay', () => {
    const props = {
      page: { image: { renditions: { } } },
    };
    Store.dispatch(setPageData({
      requestParams: {
        autoplay: 'false'
      }
    }));
    const wrapper = shallow(<EmbeddedVideo {...props} />);
    expect(wrapper.find(VideoPlayer).props().autoplay).toBe(false);
  });
});
