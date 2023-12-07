import React from 'react';

import { storiesOf } from '@storybook/react';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import * as languages from '@univision/fe-commons/dist/utils/localization/languages';
import props from './__mocks__/props.json';

import Follow from '.';

storiesOf('Clickable/Follow', module)
  .add('default', () => {
    localization.setLanguage(languages.ES);
    return (
      <Follow
        {...props}
      />
    );
  });
