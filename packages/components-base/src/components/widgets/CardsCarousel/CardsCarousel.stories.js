import React from 'react';
import { storiesOf } from '@storybook/react';
import { createGlobalStyle } from 'styled-components';
import { Provider } from 'react-redux';
import { withViewport } from '@storybook/addon-viewport';

import { getDevice } from '@univision/fe-commons/dist/utils/storybook';
import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';

import CardsCarousel from '.';
import getCardByContentType from '../../../utils/cardMapper';
import slideshowData from '../../cards/__mocks__/slideshowCard.json';
import liveStreamData from '../../cards/__mocks__/livestreamCard.json';
import recipeCardData from '../../cards/__mocks__/recipeCard.json';
import liveblogData from '../../cards/__mocks__/liveBlogCard.json';
import storyCardProps from '../../cards/__mocks__/storyCard';

const articleMock = {
  type: 'article',
  label: null,
  ...storyCardProps,
};

const contents = [
  liveStreamData,
  slideshowData,
  liveblogData,
  recipeCardData,
  articleMock,
];

const BodyReset = createGlobalStyle`
  body #root {
    padding: 0;
  }
`;
const BlackBody = createGlobalStyle`
  body {
    background-color: #000;
  }
`;
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
const cardData = contents.map(content => getCardByContentType(content));

storiesOf('Widgets/Redesign 2019/Carousel widget', module)
  .addDecorator(story => (
    <>
      <BodyReset />
      <div className="uvs-container" style={{ marginTop: '16px' }}>
        <Provider store={Store}>
          {story()}
        </Provider>
      </div>
    </>
  ))
  .add('default', () => {
    Store.dispatch(setPageData({ device }));
    return (
      <CardsCarousel
        cardData={cardData}
        {...props}
      />
    );
  })
  .add('default without cta', () => {
    Store.dispatch(setPageData({ device }));
    return (
      <CardsCarousel
        cardData={cardData}
        {...props}
        settings={{ ...props.settings, seeMoreLink: null }}
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
    Store.dispatch(setPageData({ device }));
    return (
      <CardsCarousel
        cardData={cardData}
        {...additionalProps}
      />
    );
  })
  .add('deportes', () => {
    Store.dispatch(setPageData({ device }));
    const additionalProps = {
      ...props,
      commonRootSection: {
        uri: 'deportes',
      },
    };
    return (
      <CardsCarousel
        cardData={cardData}
        {...additionalProps}
      />
    );
  })
  .add('dark mode', () => {
    Store.dispatch(setPageData({
      device,
      pageCategory: 'show',
    }));
    const darkProps = {
      ...props,
      commonRootSection: {
        uri: 'shows',
      },
    };
    return (
      <>
        <BlackBody />
        <CardsCarousel
          cardData={cardData}
          {...darkProps}
        />
      </>
    );
  })
  .add('local market', () => {
    Store.dispatch(setPageData({ device }));
    const additionalProps = {
      ...props,
      commonRootSection: {
        uri: 'local',
      },
      localMarket: 'WXTV',
    };
    return (
      <CardsCarousel
        cardData={cardData}
        {...additionalProps}
      />
    );
  })
  .addDecorator(withViewport('iphone8p'))
  .add('default without cta - mobile', () => {
    Store.dispatch(setPageData({ device }));
    return (
      <CardsCarousel
        cardData={cardData}
        {...props}
        settings={{ ...props.settings, seeMoreLink: null }}
      />
    );
  }, { viewport: 'iphone8p' });
