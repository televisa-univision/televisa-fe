/**
 * @module PrendeTV HeroSlider storybook
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import { getDevice } from '@univision/fe-commons/dist/utils/storybook';
import VideoPlayerPIPWrapper from '@univision/fe-video/dist/components/VideoPlayerPIPWrapper';
import { mockImages, mockImagesAndVideos } from './__mocks__/heroSliderMock';
import HeroSlider from '.';

const device = getDevice();

storiesOf('PromoCards/HeroSlider', module)
  .add('default', () => {
    Store.dispatch(setPageData({ device }));

    return (
      <>
        <div id="app-root">
          <HeroSlider {...mockImages} />
        </div>
        <VideoPlayerPIPWrapper />
      </>
    );
  })
  .add('with videos', () => {
    Store.dispatch(setPageData({ device }));

    return (
      <>
        <div id="app-root" style={{ backgroundColor: 'gray' }}>
          <HeroSlider {...mockImagesAndVideos} />
        </div>
        <VideoPlayerPIPWrapper />
      </>
    );
  });
