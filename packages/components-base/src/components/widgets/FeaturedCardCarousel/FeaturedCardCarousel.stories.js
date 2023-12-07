/* eslint-disable react/prop-types */
/* eslint-disable require-jsdoc */
import React from 'react';

import { storiesOf } from '@storybook/react';

import FeaturedCardCarousel from '.';
import mockData from './mockData.json';

const CarouselWrapper = ({ customHeight, ...otherProps }) => (
  <div className="uvs-container" style={{ height: customHeight ? '9000px' : 'auto' }}>
    <FeaturedCardCarousel {...otherProps} />
  </div>
);

storiesOf('Slidable/FeaturedCardCarousel', module)
  .add('default', () => {
    return <CarouselWrapper content={mockData} theme={{ primary: 'red' }} customHeight />;
  })
  .add('with autoplay disabled', () => {
    return <CarouselWrapper content={mockData} theme={{ primary: 'red' }} disableAutoplay />;
  })
  .add('with one content', () => {
    const newData = [mockData[0]];
    return <CarouselWrapper content={newData} theme={{ primary: 'red' }} />;
  })
  .add('with two contents', () => {
    const newData = [mockData[0], mockData[1]];
    return <CarouselWrapper content={newData} theme={{ primary: 'red' }} />;
  });
