import React from 'react';
import { shallow } from 'enzyme';

import Picture from '@univision/fe-components-base/dist/components/Picture';

import VideoPlaceholder, { TYPE_LOADER, TYPE_PLAY_ICON } from './index';

describe('VideoPlaceholder', () => {
  let props = {};
  beforeEach(() => {
    props = {
      image: {
        renditions: {
          original: {
            href: 'test.png',
          },
        },
      },
    };
  });

  it('should fall back to Picture element if BackgroundImage has error', () => {
    const wrapper = shallow(<VideoPlaceholder {...props} />);
    const fallback = wrapper.find('ErrorBoundary').prop('fallbackRender')();
    expect(fallback).toEqual(<Picture />);
  });

  it('should show the Loading indicator if the Player not is ready', () => {
    const wrapper = shallow(<VideoPlaceholder
      {...props}
      placeholderType={TYPE_LOADER}
      isPlayerReady={false}
    />);
    expect(wrapper.find('Loading')).toHaveLength(1);
  });

  it('should show the Play Icon', () => {
    const wrapper = shallow(<VideoPlaceholder
      {...props}
      placeholderType={TYPE_PLAY_ICON}
      isPlayerReady={false}
    />);
    expect(wrapper.find('VideoPlayerButton')).toHaveLength(1);
  });

  it('should not show the Loading indicator if the Player is ready', () => {
    const wrapper = shallow(<VideoPlaceholder {...props} isPlayerReady />);
    expect(wrapper.find('Loading')).toHaveLength(0);
  });

  it('should not render full height on normal mode', () => {
    const wrapper = shallow(<VideoPlaceholder {...props} />);
    expect(wrapper.find('.videoStillFullHeight')).toHaveLength(0);
  });
});
