import React from 'react';
import { storiesOf } from '@storybook/react';

import ExternalEmbed from '.';

const settings = {
  html: '',
};

storiesOf('Widgets/ExternalEmbed', module)
  .add('styled html', () => {
    settings.html = '<style>p { padding: 5px; color: white; background: black; }</style><p>HTML</p>';
    return <ExternalEmbed settings={settings} />;
  });
