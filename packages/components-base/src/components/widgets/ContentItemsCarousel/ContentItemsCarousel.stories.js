/* eslint-disable require-jsdoc */
import React from 'react';

import { storiesOf } from '@storybook/react';

import ContentItemsCarousel from '.';
import Styles from './ContentItemsCarousel.stories.scss';
import mockData from './mockData.json';

const CarouselWrapper = props => (
  <div className={Styles.container}>
    <ContentItemsCarousel {...props} />
  </div>
);

storiesOf('Slidable/ContentItemsCarousel', module)

  .add('default', () => {
    return (
      <CarouselWrapper
        settings={{
          title: 'Widget title',
          titleLink: 'http://univision.com',
        }}
        content={mockData}
        theme={{ primary: 'red' }}
      />
    );
  })

  .add('default /w authors', () => {
    const moddedContent = mockData.map((card, idx) => (
      {
        ...card,
        authors: [{
          title: `Author #${idx}`,
        }],
      }
    ));
    return (
      <CarouselWrapper
        settings={{
          title: 'Widget title',
          titleLink: 'http://univision.com',
        }}
        content={moddedContent}
        theme={{ primary: 'red' }}
      />
    );
  });
