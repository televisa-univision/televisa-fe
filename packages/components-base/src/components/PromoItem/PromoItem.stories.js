/* eslint-disable require-jsdoc */
import React from 'react';

import { storiesOf } from '@storybook/react';

import { image } from '../../config/storyMocks';

import Styles from './PromoItem.stories.scss';
import PromoItem from '.';

const PromoWrapper = props => (
  <div className={Styles.container}>
    <PromoItem {...props} />
  </div>
);

storiesOf('Widgets/PromoItem', module)
  .add('Vertical', () => {
    return (
      <PromoWrapper
        image={image}
        view="vertical"
        primaryTag={{ name: 'Noticias' }}
        showIcon
        type="slideshow"
      />
    );
  })
  .add('Horizontal', () => {
    return (
      <PromoWrapper
        image={image}
        view="horizontal"
        primaryTag={{ name: 'Noticias' }}
        showText
        title="Promo title"
      />
    );
  })
  .add('With sponsor', () => {
    return (
      <PromoWrapper
        image={image}
        view="horizontal"
        sponsor={{
          name: 'Walgreens',
          logo: 'https://botw-pd.s3.amazonaws.com/styles/logo-original-577x577/s3/122012/walgreens-logo-corner-w.png?itok=Hx1fwXxX',
          link: '#',
        }}
        showText
        title="This is a title"
        primaryTag={{ name: 'Noticias' }}
      />
    );
  });
