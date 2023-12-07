import React from 'react';

import { storiesOf } from '@storybook/react';
import ApiProvider from '@univision/fe-commons/dist/components/ApiProvider';

import VideoPlaceholder, { TYPE_LOADER, TYPE_PLAY_ICON } from './index';

const url = 'http://univision.com/shows/despierta-america/dos-heroes-mas-del-tiroteo-en-colorado-joven-relata-como-junto-a-kendrick-castillo-frenaron-la-agresion-video?mode=prod';

const wrapperStyles = {
  position: 'relative',
  overflow: 'hidden',
  maxWidth: 1279,
};

storiesOf('Widgets/Video/Placeholder', module)
  .add('Loader', () => (
    <ApiProvider
      url={url}
      render={d => (
        <div style={wrapperStyles}>
          <VideoPlaceholder
            image={d.image}
            placeholderType={TYPE_LOADER}
          />
        </div>
      )}
    />
  ))
  .add('Play Icon', () => (
    <ApiProvider
      url={url}
      render={d => (
        <div style={wrapperStyles}>
          <VideoPlaceholder
            image={d.image}
            isPlayerReady
            placeholderType={TYPE_PLAY_ICON}
          />
        </div>
      )}
    />
  ));
