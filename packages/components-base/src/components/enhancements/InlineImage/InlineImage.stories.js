import React from 'react';

import { storiesOf } from '@storybook/react';
import { image } from '../../../config/storyMocks';

import InlineImage from '.';

storiesOf('Enhancement/Image Enhancement', module)
  .add('Default', () => (
    <InlineImage
      caption="This is a caption for the image enhancement"
      credit="Univision"
      renditions={image.renditions}
    />
  ))
  .add('Left aligned', () => (
    <InlineImage
      caption="This is a caption for the image enhancement"
      credit="Univision"
      alignment="left"
      renditions={image.renditions}
    />
  ))
  .add('Right aligned', () => (
    <InlineImage
      caption="This is a caption for the image enhancement"
      credit="Univision"
      alignment="right"
      renditions={image.renditions}
    />
  ))
  .add('Fullwidth', () => (
    <InlineImage
      caption="This is a caption for the image enhancement"
      credit="Univision"
      renditions={image.renditions}
      fullWidth
    />
  ))
  .add('Fullwidth Lead (panoramic crop)', () => (
    <InlineImage
      caption="This is a caption for the image enhancement"
      credit="Univision"
      renditions={image.renditions}
      fullWidth
      isLead
    />
  ));
