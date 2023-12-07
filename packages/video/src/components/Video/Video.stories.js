/* eslint-disable require-jsdoc */
import React from 'react';

import { storiesOf } from '@storybook/react';
import ApiProvider from '@univision/fe-commons/dist/components/ApiProvider';

import { VideoComponent as Video } from '.';

const url = 'http://univision.com/noticias';

storiesOf('Widgets/Video', module)
  .add('content page', () => (
    <ApiProvider
      url={url}
      render={d => <Video {...d.widgets[1].contents[0]} pageData={d} />}
    />
  ));
