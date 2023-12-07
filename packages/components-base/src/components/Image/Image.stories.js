import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Image from '.';

const imageSrc = 'http://qa.univision.psdops.com/dims4/default/b468e04/2147483647/crop/1000x561%2B0%2B36/resize/246x138/quality/75/?url=http%3A%2F%2Funivision-bs.s3.amazonaws.com%2F6f%2Fc3%2Fb06507cd4f16962d78e7fe86d211%2F2017-06-14t124046z-2096246918-rc1f6f762ed0-rtrmadp-3-virginia-shooting.JPG';

storiesOf('Images/Image', module)
  .add('with src and alt', () => (
    <Image
      src={imageSrc}
      alt="Test Image"
    />
  ))
  .add('with default image', () => <Image />)
  .add('with with onError function', () => (
    <Image
      src="http://test.com/abc.jpg"
      alt="Test Image"
      onError={() => action('Wrong image src')}
    />
  ))
  .add('with onLoad function', () => (
    <Image
      src={imageSrc}
      alt="Test Image"
      onLoad={() => action('Image Loaded')}
    />
  ));
