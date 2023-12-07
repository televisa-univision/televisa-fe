import React from 'react';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

import configureStore from '@univision/fe-commons/dist/store/configureStore';

import videoPlaylistMock from '../__mocks__/videoPlaylist.json';
import videoLivestreamPlaylistMock from '../__mocks__/videoLivestreamPlaylist.json';

import VideoWrapper from '.';

let props;
const store = configureStore();

jest.useFakeTimers();

describe('VideoWrapper test', () => {
  beforeEach(() => {
    props = {
      contentItem: videoPlaylistMock.contents[0],
    };
  });

  it('should renders as expected', () => {
    const wrapper = shallow(
      <VideoWrapper {...props} />
    );

    expect(wrapper.find('VideoPlaylistPlayerWrapper')).toHaveLength(1);
    expect(wrapper.find('VideoWrapper__ToolTipStyled')).toHaveLength(0);
    expect(wrapper.find('VideoWrapper__SlateStyled')).toHaveLength(0);
  });

  it('should renders video slate', () => {
    const wrapper = shallow(
      <VideoWrapper {...props} slate="slate.png" showSlate />
    );

    expect(wrapper.find('VideoPlaylistPlayerWrapper')).toHaveLength(0);
    expect(wrapper.find('VideoWrapper__SlateStyled')).toHaveLength(1);
    expect(wrapper.find('VideoWrapper__SlateStyled')).toHaveStyleRule('background-image', 'url(slate.png)');
  });

  describe('Video tooltip tests', () => {
    it('should show tooltip if have stream english id and current item is livestream', async () => {
      const newProps = {
        ...props,
        contentItem: { ...videoLivestreamPlaylistMock.contents[0], is360: true },
        pageData: {
          ...props.pageData,
        },
      };
      const eventMock = {
        type: 'play',
      };
      const wrapper = shallow(
        <VideoWrapper {...newProps} />
      );
      let onPlayVideo = wrapper.find('VideoPlaylistPlayerWrapper').prop('onPlay');

      await act(async () => {
        await onPlayVideo(eventMock);
        wrapper.update();
      });

      expect(wrapper.find('VideoWrapper__ToolTipStyled')).toHaveLength(1);
      expect(wrapper.find('VideoWrapper__ToolTipStyled').prop('showToolTip')).toBe(true);

      wrapper.setProps({
        contentItem: { ...videoPlaylistMock.contents[1], is360: true },
      });
      wrapper.update();
      onPlayVideo = wrapper.find('VideoPlaylistPlayerWrapper').prop('onPlay');
      await act(async () => {
        await onPlayVideo(eventMock);
        wrapper.update();
      });

      expect(wrapper.find('VideoWrapper__ToolTipStyled')).toHaveLength(1);
      expect(wrapper.find('VideoWrapper__ToolTipStyled').prop('showToolTip')).toBe(false);
    });

    it('should auto hide tooltip after 10sec', async () => {
      const newProps = {
        ...props,
        contentItem: { ...videoLivestreamPlaylistMock.contents[0], is360: true },
        pageData: {
          ...props.pageData,
        },
      };
      const eventMock = {
        type: 'play',
      };
      const wrapper = mount(
        <Provider store={store}>
          <VideoWrapper {...newProps} />
        </Provider>
      );

      await act(async () => {
        const onPlayVideo = wrapper.find('VideoPlaylistPlayerWrapper').prop('onPlay');
        await onPlayVideo(eventMock);
        wrapper.update();
      });

      expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 10000);
      expect(wrapper.find('VideoWrapper__ToolTipStyled')).toHaveLength(1);
      expect(wrapper.find('VideoWrapper__ToolTipStyled').prop('showToolTip')).toBe(true);

      await act(async () => {
        jest.advanceTimersByTime(10000);
        wrapper.update();
      });

      expect(wrapper.find('VideoWrapper__ToolTipStyled')).toHaveLength(1);
      expect(wrapper.find('VideoWrapper__ToolTipStyled').prop('close')).toBe(true);
    });

    it('should not show tooltip if is not match play event type', async () => {
      const newProps = {
        ...props,
        cuepoints: [],
        contentItem: { ...videoLivestreamPlaylistMock.contents[0], is360: true },
        pageData: {
          ...props.pageData,
        },
      };
      const eventAdMock = {
        type: 'adplay',
      };
      const wrapper = shallow(
        <VideoWrapper {...newProps} />
      );
      const videoPlayerWrapper = wrapper.find('VideoPlaylistPlayerWrapper');
      const onPlayVideo = videoPlayerWrapper.prop('onPlay');

      await act(async () => {
        await onPlayVideo(eventAdMock);
      });
      wrapper.update();

      expect(wrapper.find('VideoWrapper__ToolTipStyled')).toHaveLength(1);
      expect(wrapper.find('VideoWrapper__ToolTipStyled').prop('showToolTip')).toBe(false);
    });

    it('should not nore render tooltip if not livestream', async () => {
      const newProps = {
        ...props,
        cuepoints: [],
        contentItem: { ...videoLivestreamPlaylistMock.contents[0], type: 'video' },
        pageData: {
          ...props.pageData,
        },
      };
      const eventMock = {
        type: 'play',
      };
      const wrapper = shallow(
        <VideoWrapper {...newProps} />
      );
      const videoPlayerWrapper = wrapper.find('VideoPlaylistPlayerWrapper');
      const onPlayVideo = videoPlayerWrapper.prop('onPlay');

      await act(async () => {
        await onPlayVideo(eventMock);
      });
      wrapper.update();

      expect(wrapper.find('VideoWrapper__ToolTipStyled')).toHaveLength(0);
    });
  });

  it('should render tooltip if is video 360', async () => {
    const newProps = {
      ...props,
      cuepoints: [],
      contentItem: { ...videoLivestreamPlaylistMock.contents[0], is360: true },
      pageData: {
        ...props.pageData,
      },
    };
    const eventMock = {
      type: 'play',
    };
    const wrapper = shallow(
      <VideoWrapper {...newProps} />
    );
    const videoPlayerWrapper = wrapper.find('VideoPlaylistPlayerWrapper');
    const onPlayVideo = videoPlayerWrapper.prop('onPlay');

    await act(async () => {
      await onPlayVideo(eventMock);
    });
    wrapper.update();

    expect(wrapper.find('VideoWrapper__ToolTipStyled')).toHaveLength(1);
    expect(wrapper.find('VideoWrapper__ToolTipStyled').prop('showToolTip')).toBe(true);
    expect(wrapper.find('VideoWrapper__ToolTipStyled').prop('showTimes')).toBe(4);
    expect(wrapper.find('VideoWrapper__ToolTipStyled').prop('arrowPosition')).toBe(0);
  });
});
