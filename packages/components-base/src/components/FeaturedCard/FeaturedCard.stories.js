/* eslint-disable require-jsdoc */
import React from 'react';

import { storiesOf } from '@storybook/react';

import { image } from '../../config/storyMocks';
import FeaturedCard from '.';

const PromoWrapper = props => (
  <div className="uvs-container">
    <FeaturedCard
      {...props}
      uri="http://www.univision.com/noticias/planeta/en-fotos-los-lugares-que-deberias-visitar-antes-de-que-el-cambio-climatico-los-destruya-fotos"
      image={image}
      primaryTag={{ name: 'Noticias' }}
      showIcon
      title="Belinda volvio locas a las redes sociales con este look"
      authors={[{
        fullName: 'José Fernando López',
        uri: 'https://www.univision.com/temas/jose-fernando-lopez',
      }]}
      description="Praesent id diam est. Etiam quis est ac ante rhoncus ultricies. Vivamus dictum eros erat. Etiam varius nisl sit amet leo pulvinar porttitor. Sed ornare euismod ante, a sagittis dolor sodales sed."
      mcpid="3373237"
      longform
      showBtnLongform
    />
  </div>
);

storiesOf('Cards/Legacy/FeaturedCard', module)
  .add('default (variant: dark)', () => {
    return (
      <PromoWrapper />
    );
  })
  .add('default (variant: light)', () => {
    return (
      <PromoWrapper variant="light" />
    );
  });

storiesOf('Cards/Legacy/FeaturedCard/with label', module)
  .add('with livestream label', () => {
    return (
      <PromoWrapper videoType="livestream" />
    );
  })
  .add('with breakingNews label', () => {
    return (
      <PromoWrapper type="breakingNews" />
    );
  })
  .add('with liveblog label', () => {
    return (
      <PromoWrapper type="liveblog" />
    );
  })
  .add('with label & auth', () => {
    return (
      <PromoWrapper authRequired type="liveblog" />
    );
  });

storiesOf('Cards/Legacy/FeaturedCard/with icon', module)
  .add('articule', () => {
    return (
      <PromoWrapper type="article" />
    );
  })
  .add('article (type recipe)', () => {
    return (
      <PromoWrapper articleType="recipe" type="article" />
    );
  })
  .add('slideshow', () => {
    return (
      <PromoWrapper type="slideshow" />
    );
  })
  .add('video', () => {
    return (
      <PromoWrapper duration="1:02" type="video" />
    );
  })
  .add('longform', () => {
    return (
      <PromoWrapper duration="1:02" type="video" longform />
    );
  });
