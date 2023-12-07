import React from 'react';
import { storiesOf } from '@storybook/react';
import { withViewport } from '@storybook/addon-viewport';

import noticiasTheme from '@univision/fe-commons/dist/themes/noticias';

import data from './__mocks__/indexCard.json';

import IndexCard from '.';

storiesOf('Cards/Redesign 2021/IndexCard', module)
  .addDecorator(withViewport('Default'))
  .add('default - mobile', () => (
    <IndexCard
      {...data[0]}
      theme={noticiasTheme()}
    />
  ), { viewport: 'iphonex' })
  .add('default - tablet', () => (
    <IndexCard
      {...data[0]}
      theme={noticiasTheme()}
      device="tablet"
    />
  ), { viewport: 'ipad' })
  .add('default - desktop', () => (
    <IndexCard
      {...data[0]}
      theme={noticiasTheme()}
      device="desktop"
    />
  ))
  .add('no image', () => (
    <IndexCard
      {...data[0]}
      theme={noticiasTheme()}
      device="desktop"
      hideImage
    />
  ))
  .add('relative time', () => {
    const time = new Date();
    time.setHours(time.getHours() - 2);

    return (
      <IndexCard
        {...data[1]}
        theme={noticiasTheme()}
        updateDate={time.toISOString()}
        device="desktop"
      />
    );
  })
  .add('video', () => (
    <IndexCard
      {...data[1]}
      theme={noticiasTheme()}
      device="desktop"
    />
  ))
  .add('slideshow', () => (
    <IndexCard
      {...data[2]}
      theme={noticiasTheme()}
      device="desktop"
    />
  ));
