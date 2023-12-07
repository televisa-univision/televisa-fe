import React from 'react';

import { storiesOf } from '@storybook/react';

import Tag from '.';

storiesOf('Text/Tag', module)
  .add('with link', () => {
    return <Tag name="Noticias" link="https://univision.com/noticias" />;
  })
  .add('without link', () => {
    return <Tag name="Noticias" />;
  });
