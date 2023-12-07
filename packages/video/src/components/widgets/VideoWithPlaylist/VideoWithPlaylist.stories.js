import React from 'react';
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';

import { getThemeFromVertical } from '@univision/fe-commons/dist/components/ThemeProvider/helpers';
import ApiProvider from '@univision/fe-commons/dist/components/ApiProvider';
import configureStore from '@univision/fe-commons/dist/store/configureStore';

import videoPlaylistMock from './__mocks__/videoPlaylist.json';
import videoTabsMock from './__mocks__/videoWithTabs.json';
import videoLivestreamMock from './__mocks__/videoLivestream.json';
import videoSoccerMatchMock from './__mocks__/videoSoccerMatch.json';
import Styles from './VideoWithPlaylist.stories.styles';
import VideoWithPlaylist from '.';

const GlobalStyled = Styles.global;

const store = configureStore();

/**
 * Get device type based on screen
 * @returns {string}
 */
function getDevice() {
  return window.innerWidth >= 1020 ? 'desktop' : 'mobile';
}

storiesOf('Widgets/VideoWithPlaylist', module)
  .add('Regular', () => {
    return (
      <ApiProvider
        env="uat"
        url="https://uat2.x.univision.com/noticias"
        store={store}
        render={(pageData) => {
          const theme = getThemeFromVertical(pageData.uri);
          const props = {
            ...videoPlaylistMock,
            content: videoPlaylistMock.contents,
            device: getDevice(),
          };
          return (
            <Provider store={store}>
              <VideoWithPlaylist theme={theme} pageData={pageData} {...props} />
            </Provider>
          );
        }}
      />
    );
  })
  .add('With tabs', () => {
    return (
      <ApiProvider
        env="uat"
        url="https://uat.tudn.com"
        store={store}
        render={(pageData) => {
          const theme = getThemeFromVertical(pageData.uri);
          const props = {
            ...videoTabsMock,
            content: videoTabsMock.contents,
            device: getDevice(),
          };
          return (
            <Provider store={store}>
              <VideoWithPlaylist theme={theme} pageData={pageData} {...props} />
            </Provider>
          );
        }}
      />
    );
  })
  .add('Dark variant', () => {
    return (
      <ApiProvider
        env="uat"
        url="https://uat2.x.univision.com/shows"
        store={store}
        render={(pageData) => {
          const theme = getThemeFromVertical(pageData.uri);
          const props = {
            ...videoPlaylistMock,
            content: videoPlaylistMock.contents,
            device: getDevice(),
          };
          return (
            <Provider store={store}>
              <GlobalStyled />
              <VideoWithPlaylist theme={theme} pageData={pageData} {...props} />
            </Provider>
          );
        }}
      />
    );
  })
  .add('Dark variant with tabs', () => {
    return (
      <ApiProvider
        env="uat"
        url="https://uat2.x.univision.com/shows"
        store={store}
        render={(pageData) => {
          const theme = getThemeFromVertical(pageData.uri);
          const props = {
            ...videoTabsMock,
            content: videoTabsMock.contents,
            device: getDevice(),
          };
          return (
            <Provider store={store}>
              <GlobalStyled />
              <VideoWithPlaylist theme={theme} pageData={pageData} {...props} />
            </Provider>
          );
        }}
      />
    );
  })
  .add('Livestream playlist', () => {
    return (
      <ApiProvider
        env="uat"
        url="https://uat2.x.univision.com/local/philadelphia-wuvp"
        store={store}
        render={(pageData) => {
          const theme = getThemeFromVertical(pageData.uri);
          const props = {
            ...videoLivestreamMock,
            content: videoLivestreamMock.contents,
            device: getDevice(),
          };
          return (
            <Provider store={store}>
              <VideoWithPlaylist theme={theme} pageData={pageData} {...props} />
            </Provider>
          );
        }}
      />
    );
  })
  .add('Soccer Playlist', () => {
    return (
      <ApiProvider
        env="uat"
        url="https://uat.tudn.com/futbol/liga-mx-apertura/veracruz-vs-pumas-unam-liga-mx-apertura-2018-07-20"
        store={store}
        render={(pageData) => {
          const theme = getThemeFromVertical(pageData.uri);
          const props = {
            ...videoSoccerMatchMock.settings,
            device: getDevice(),
          };
          return (
            <Provider store={store}>
              <VideoWithPlaylist theme={theme} pageData={pageData} {...props} />
            </Provider>
          );
        }}
      />
    );
  });
