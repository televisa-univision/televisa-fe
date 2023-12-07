/* eslint-disable require-jsdoc */
import React from 'react';
import { Provider } from 'react-redux';

import { storiesOf } from '@storybook/react';
import ApiProvider from '@univision/fe-commons/dist/components/ApiProvider';
import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import Styles from './VideoPlayer.stories.scss';
import VideoPlayer from '.';

const host = 'https://www.univision.com';

const url = {
  recommended: {
    dark: `${host}/musica/padre-de-j-balvin-no-aguanta-el-orgullo-por-su-hijo-y-recuerda-su-carrera-con-este-video-video`,
    light: `${host}/noticias/en-un-minuto-no-alcanzan-acuerdo-en-el-congreso-para-reemplazar-daca-video`,
  },

  longform: {
    dark: `${host}/shows/amar-a-muerte/amar-a-muerte-capitulo-85-video`,
  },

  override: {
    dark: `${host}/shows/despierta-america/toma-el-control-de-tu-propio-dinero-todo-lo-que-debes-saber-sobre-tarjetas-de-credito-y-fondo-de-ahorro-video`,
  },
};

const initStore = (data, pageData = {}, mode = 'prod', jwRecommendationChannel = 'usbn2Hem') => {
  const localData = {
    page: { ...data },
    data: { ...pageData },
    requestParams: { mode },
  };

  if (!localData.data.jwRecommendationChannel) {
    localData.data.jwRecommendationChannel = jwRecommendationChannel;
  }
  Store.dispatch(setPageData(localData));

  return data;
};

storiesOf('Widgets/VideoPlayer', module)
  .add('Recommended Playlist - Light mode', () => {
    const render = (data) => {
      const localData = initStore(data);
      localData.variant = 'light';

      return (
        <Provider store={Store}>
          <VideoPlayer {...localData} />
        </Provider>
      );
    };
    return <ApiProvider url={url.recommended.light} render={render} />;
  })
  .add('Recommended Playlist - Dark mode', () => {
    const render = (data) => {
      const localData = initStore(data);
      localData.variant = 'dark';

      return (
        <Provider store={Store}>
          <div className={Styles.VideoPlayerWrapperDark}>
            <VideoPlayer {...localData} />
          </div>
        </Provider>
      );
    };
    return <ApiProvider url={url.recommended.dark} render={render} />;
  })
  .add('Longform Playlist - Dark mode', () => {
    const render = (data) => {
      const localData = initStore(data);
      localData.variant = 'dark';

      return (
        <Provider store={Store}>
          <div className={Styles.VideoPlayerWrapperDark}>
            <VideoPlayer {...localData} />
          </div>
        </Provider>
      );
    };
    return <ApiProvider url={url.longform.dark} render={render} />;
  })
  .add('Playlist override', () => {
    const render = (data) => {
      const localData = initStore(data);
      localData.variant = 'dark';

      return (
        <Provider store={Store}>
          <div className={Styles.VideoPlayerWrapperDark}>
            <VideoPlayer {...localData} />
          </div>
        </Provider>
      );
    };
    return <ApiProvider url={url.override.dark} render={render} />;
  });
