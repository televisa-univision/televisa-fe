import React from 'react';
import { storiesOf } from '@storybook/react';
import { image } from '../../config/storyMocks';

import Picture from '.'; /* eslint-disable-line */
import * as sizes from './imageSizes';
import Styles from './Picture.stories.scss';

/**
 * Picture wrapper component
 * @param {Object} props - Picture component props
 * @returns {JSX}
 */
const PictureWrapper = props => (
  <div className={Styles.container}>
    <Picture {...props} />
  </div>
);

storiesOf('Images/Picture', module)
  .add('Default', () => (
    <PictureWrapper image={image} preload={false} />
  ))
  .add('With deviceSizeOverrides', () => (
    <PictureWrapper
      image={image}
      deviceSizeOverrides={{
        lg: sizes.LARGE,
      }}
      preload={false}
    />
  ))
  .add('With deviceSizeOverrides and preload with blurred image', () => (
    <PictureWrapper
      image={image}
      deviceSizeOverrides={{
        lg: sizes.LARGE,
      }}
    />
  ))
  .add('Without renditions (using DIMS)', () => (
    <div>
      <h1>Without Focus Point</h1>
      <PictureWrapper aspectRatio="1x1" image={{ renditions: { original: { href: 'https://st1.uvnimg.com/4f/03/82a660fe411e89d2805256c8c7cf/20190124-5352-1.jpg', width: 1280, height: 720 } } }} />

      <h1>With Focus Point</h1>
      <PictureWrapper
        aspectRatio="1x1"
        image={{
          renditions: {
            original: {
              href: 'https://st1.uvnimg.com/4f/03/82a660fe411e89d2805256c8c7cf/20190124-5352-1.jpg', width: 1280, height: 720, focusPoint: { x: 0.5, y: 0.5 },
            },
          },
        }}
      />
    </div>
  ));
