import React from 'react';
import { storiesOf } from '@storybook/react';
import { Provider } from 'react-redux';
import { withViewport } from '@storybook/addon-viewport';

import { getDevice } from '@univision/fe-commons/dist/utils/storybook';
import configureStore from '@univision/fe-commons/dist/store/configureStore';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';

import Carousel from './index';
import Styles from './CarouselEnhancement.stories.styles';
import cardProps
  from '../../../cards/SquareCards/SquareCard/__mocks__/squareCard';

const store = configureStore();

const BodyReset = Styles.bodyReset;
const BlackBody = Styles.blackBody;

const contents = [
  cardProps[0],
  cardProps[1],
  cardProps[3],
  cardProps[5],
  cardProps[4],
];

const device = getDevice();
const props = {
  settings: {
    title: 'Nueva York',
    seeMoreLink: {
      href: 'https://qa.x.univision.com/shows/entretenimiento',
      target: '_self',
      text: 'Entretenimiento ',
      uid: '0000016e-467e-dadd-af7e-f7ff35d50001',
    },
  },
  device,
};

storiesOf('Widgets/TUDN Enhancements/Carousel widget', module)
  .addDecorator(story => (
    <>
      <BodyReset />
      <div className="uvs-container" style={{ marginTop: '16px' }}>
        <Provider store={store}>
          {story()}
        </Provider>
      </div>
    </>
  ))
  .add('default', () => {
    store.dispatch(setPageData({ device }));
    return (
      <Carousel
        content={contents}
        {...props}
      />
    );
  })
  .add('default without cta', () => {
    store.dispatch(setPageData({ device }));
    return (
      <Carousel
        content={contents}
        {...props}
        settings={{ ...props.settings, seeMoreLink: null }}
      />
    );
  })
  .add('isWorldCupMVP true', () => {
    store.dispatch(setPageData({ device }));
    return (
      <Carousel
        content={contents}
        {...props}
        widgetContext={{ isWorldCupMVP: true }}
      />
    );
  })
  .add('default with title link', () => {
    const additionalProps = {
      ...props,
      settings: {
        ...props.settings,
        titleLink: {
          href: 'https://qa.x.univision.com/noticias',
          target: '_blank',
          text: null,
          uid: '0000016e-9374-d8a4-a37f-f7f45eb40000',
        },
      },
    };
    store.dispatch(setPageData({ device }));
    return (
      <Carousel
        content={contents}
        {...additionalProps}
      />
    );
  })
  .add('deportes', () => {
    store.dispatch(setPageData({ device }));
    const additionalProps = {
      ...props,
      commonRootSection: {
        uri: 'deportes',
      },
    };
    return (
      <Carousel
        content={contents}
        {...additionalProps}
      />
    );
  })
  .add('dark mode', () => {
    store.dispatch(setPageData({
      device,
      pageCategory: 'show',
    }));
    const darkProps = {
      ...props,
      commonRootSection: {
        uri: 'shows',
      },
      theme: {
        isDark: true,
      },
    };
    return (
      <>
        <BlackBody />
        <Carousel
          content={contents}
          {...darkProps}
        />
      </>
    );
  })
  .add('local market', () => {
    store.dispatch(setPageData({ device }));
    const additionalProps = {
      ...props,
      commonRootSection: {
        uri: 'local',
      },
      localMarket: 'WXTV',
    };
    return (
      <Carousel
        content={contents}
        {...additionalProps}
      />
    );
  })
  .addDecorator(withViewport('iphone8p'))
  .add('default without cta - mobile', () => {
    store.dispatch(setPageData({ device }));
    return (
      <Carousel
        content={contents}
        {...props}
        settings={{ ...props.settings, seeMoreLink: null }}
      />
    );
  }, { viewport: 'iphone8p' });
