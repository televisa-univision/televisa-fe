import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import * as languages from '@univision/fe-commons/dist/utils/localization/languages';

import PlayVideoButton from '.';

storiesOf('Clickable/PlayVideoButton', module)
  .add('Default', () => {
    localization.setLanguage(languages.ES);
    return (
      <PlayVideoButton
        onClick={() => action('clicked!')}
      />
    );
  })
  .add('Custom label', () => {
    localization.setLanguage(languages.EN);
    return (
      <PlayVideoButton
        label="Watch video"
        onClick={() => action('clicked!')}
      />
    );
  })
  .add('With duration', () => {
    localization.setLanguage(languages.EN);
    return (
      <PlayVideoButton
        onClick={() => action('clicked!')}
        duration="2:30"
      />
    );
  });
