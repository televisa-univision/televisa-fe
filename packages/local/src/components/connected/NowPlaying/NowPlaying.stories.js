/* eslint-disable require-jsdoc */
import React from 'react';

import { storiesOf } from '@storybook/react';
import ApiProvider from '@univision/fe-commons/dist/components/ApiProvider';

import { NowPlayingComponent } from './NowPlaying';

const player = {
  playPerformance: false,
  data: {
    largeimage: null,
    title: 'Song title',
    artist: 'Album artist',
  },
};

const actions = {
  initPlayer: () => { },
  initAbacast: () => { },
};

storiesOf('Widgets/NowPlaying', module)
  .add('default', () => (
    <ApiProvider
      url="http://univision.com/los-angeles/klve"
      render={() => {
        player.data.largeimage = null;
        player.error = false;
        return <NowPlayingComponent {...actions} />;
      }}
    />
  ))
  .add('with album art', () => (
    <ApiProvider
      url="http://univision.com/los-angeles/klve"
      render={() => {
        player.data.largeimage = 'http://images.mndigital.com/artists/000/014/318/a.jpeg';
        player.error = false;
        return <NowPlayingComponent {...actions} />;
      }}
    />
  ))
  .add('with error', () => (
    <ApiProvider
      url="http://univision.com/los-angeles/klve"
      render={() => {
        player.error = true;
        return <NowPlayingComponent {...actions} />;
      }}
    />
  ));
