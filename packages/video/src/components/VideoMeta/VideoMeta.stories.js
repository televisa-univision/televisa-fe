/* eslint-disable require-jsdoc */
import React from 'react';

import { storiesOf } from '@storybook/react';
import ApiProvider from '@univision/fe-commons/dist/components/ApiProvider';
import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import Styles from './VideoMeta.stories.scss';
import VideoMeta from '.';

const url = 'https://www.univision.com/musica/padre-de-j-balvin-no-aguanta-el-orgullo-por-su-hijo-y-recuerda-su-carrera-con-este-video-video';

const theme = {
  dark: {
    alphaGradient: 'linear-gradient(to top, rgba(35, 88, 191, 0.95) 0%, rgba(35, 88, 191, 0) 50%)',
    horizontalGradient: 'linear-gradient(to right, #2358bf 0%, #23a2ee 100%)',
    primary: '#2358bf',
    secondary: '#23a2ee',
    solidGradient: 'linear-gradient(to bottom, #2358bf 0%, #23a2ee 100%)',
    theme: 'blue',
    variant: 'dark',
  },
  light: {
    alphaGradient: 'linear-gradient(to top, rgba(58, 58, 58, 0.95) 0%, rgba(58, 58, 58, 0) 50%)',
    horizontalGradient: 'linear-gradient(to right, #3a3a3a 0%, #000000 100%)',
    primary: '#3a3a3a',
    secondary: '#000000',
    solidGradient: 'linear-gradient(to bottom, #3a3a3a 0%, #000000 100%)',
    variant: 'light',
  },
};

storiesOf('Layout/VideoMeta', module)
  .add('meta - light mode', () => {
    const render = (data) => {
      const d2 = data;

      const info = {
        video: {
          uid: data.uid,
          title: data.title,
          publishDate: data.updateDate,
          source: data.source,
          mcpid: data.mcpid,
          sharingOptions: data.sharing.options,
        },
        uri: url,
        primaryTag: data.primaryTag,
        theme: theme.dark,
        variant: 'light',
      };

      Store.dispatch(setPageData({
        page: d2,
        requestParams: {
          mode: 'prod',
        },
      }));

      return (
        <VideoMeta {...d2} {...info} store={Store} />
      );
    };

    return (
      <ApiProvider
        url={url}
        render={render}
      />
    );
  })
  .add('meta - dark mode', () => {
    const render = (data) => {
      const d2 = data;

      const info = {
        video: {
          uid: data.uid,
          title: data.title,
          publishDate: data.updateDate,
          source: data.source,
          mcpid: data.mcpid,
          sharingOptions: data.sharing.options,
        },
        uri: url,
        primaryTag: data.primaryTag,
        theme: theme.light,
        variant: 'dark',
      };

      Store.dispatch(setPageData({
        page: d2,
        requestParams: {
          mode: 'prod',
        },
      }));

      return (
        <div className={Styles.VideoMeta__wrapper__dark}>
          <VideoMeta {...d2} {...info} store={Store} />
        </div>
      );
    };
    return (
      <ApiProvider
        url={url}
        render={render}
      />
    );
  })
  .add('meta - small / simple', () => {
    const render = (data) => {
      const d2 = data;

      const info = {
        video: {
          uid: data.uid,
          title: data.title,
          publishDate: data.updateDate,
          source: data.source,
          mcpid: data.mcpid,
          sharingOptions: data.sharing.options,
        },
        uri: url,
        primaryTag: data.primaryTag,
        theme: theme.light,
        variant: 'dark',
      };

      Store.dispatch(setPageData({
        page: d2,
        requestParams: {
          mode: 'prod',
        },
      }));

      return (
        <div className={Styles.VideoMeta__wrapper__dark}>
          <VideoMeta {...d2} {...info} store={Store} smallVersion simple />
        </div>
      );
    };
    return (
      <ApiProvider
        url={url}
        render={render}
      />
    );
  })
  .add('meta - simple with category', () => {
    const render = (data) => {
      const d2 = data;

      const info = {
        video: {
          uid: data.uid,
          title: data.title,
          publishDate: data.updateDate,
          source: data.source,
          mcpid: data.mcpid,
          sharingOptions: data.sharing.options,
        },
        uri: url,
        primaryTag: data.primaryTag,
        theme: theme.light,
        variant: 'dark',
      };

      Store.dispatch(setPageData({
        page: d2,
        requestParams: {
          mode: 'prod',
        },
      }));

      return (
        <div className={Styles.VideoMeta__wrapper__dark}>
          <VideoMeta {...d2} {...info} store={Store} smallVersion simple category="POLÍTICA" />
        </div>
      );
    };
    return (
      <ApiProvider
        url={url}
        render={render}
      />
    );
  });
