import React, { Fragment } from 'react';
import { Provider } from 'react-redux';

import { storiesOf } from '@storybook/react';
import getTheme from '@univision/fe-commons/dist/utils/themes/themes';
import ApiProvider from '@univision/fe-commons/dist/components/ApiProvider';
import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import BKPIndicator from '@univision/fe-commons/dist/components/breakpoint/BreakPointIndicator';

import VideoWithPlaylist from '.';

const theme = getTheme('/radio');

Store.dispatch(setPageData({ requestParams: { mode: 'prod' } }));

storiesOf('VideoWithPlaylist', module)
  .add('Regular', () => {
    return (
      <ApiProvider
        env="performance"
        url="https://performance.univision.com/musica"
        store={Store}
        render={(d) => {
          const widget = d.widgets[1];
          const { title, type } = widget.settings;
          const props = {
            content: widget.contents,
            settings: { title, type },
          };
          return (
            <Provider store={Store}>
              <Fragment>
                <BKPIndicator />
                <VideoWithPlaylist theme={theme} {...props} pageData={d} />
              </Fragment>
            </Provider>
          );
        }}
      />
    );
  })
  .add('With tabs', () => {
    return (
      <ApiProvider
        env="performance"
        url="https://performance.univision.com/deportes"
        store={Store}
        render={(d) => {
          const widget = d.widgets[5];
          const props = {
            content: widget.contents,
            settings: widget.settings,
          };
          return (
            <Provider store={Store}>
              <Fragment>
                <BKPIndicator />
                <VideoWithPlaylist theme={theme} {...props} pageData={d} />
              </Fragment>
            </Provider>
          );
        }}
      />
    );
  })
  .add('Livestream playlist', () => {
    return (
      <ApiProvider
        env="performance"
        url="https://performance.univision.com/local/philadelphia-wuvp"
        store={Store}
        render={(d) => {
          const widget = d.widgets[0];
          const props = {
            content: widget.contents,
            settings: widget.settings,
          };
          return (
            <Provider store={Store}>
              <Fragment>
                <BKPIndicator />
                <VideoWithPlaylist theme={theme} {...props} pageData={d} />
              </Fragment>
            </Provider>
          );
        }}
      />
    );
  })
  .add('Livestream full width', () => {
    return (
      <ApiProvider
        env="performance"
        url="https://performance.univision.com/local/philadelphia-wuvp"
        store={Store}
        render={(d) => {
          const widget = d.widgets[0];
          const props = {
            content: [],
            settings: widget.settings,
          };
          return (
            <Provider store={Store}>
              <Fragment>
                <BKPIndicator />
                <VideoWithPlaylist theme={theme} {...props} pageData={d} />
              </Fragment>
            </Provider>
          );
        }}
      />
    );
  })
  .add('Soccer Playlist', () => {
    const soccerMatch = {
      isAuth: true,
      matchId: 'g993786',
      optaId: '993786',
      publishDate: '2018-06-29T12:25:30-04:00',
      title: 'Veracruz vs Pumas UNAM',
      uri: 'https://www.univision.com/deportes/futbol/liga-mx-apertura/veracruz-vs-pumas-unam-liga-mx-apertura-2018-07-20',
      uid: 1,
    };

    return (
      <ApiProvider
        env="performance"
        url="https://www.univision.com/deportes/futbol/liga-mx-apertura/veracruz-vs-pumas-unam-liga-mx-apertura-2018-07-20"
        store={Store}
        render={(d) => {
          const props = {
            content: [],
            settings: { soccerMatch },
          };
          return (
            <Provider store={Store}>
              <Fragment>
                <BKPIndicator />
                <VideoWithPlaylist theme={theme} {...props} pageData={d} />
              </Fragment>
            </Provider>
          );
        }}
      />
    );
  });
