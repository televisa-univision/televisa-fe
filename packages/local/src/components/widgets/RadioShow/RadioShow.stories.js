/* eslint-disable require-jsdoc */
import React from 'react';

import { storiesOf } from '@storybook/react';
import ApiProvider from '@univision/fe-commons/dist/components/ApiProvider';

import getTheme from '@univision/fe-commons/dist/utils/themes/themes';

import RadioShow from './RadioShow';

const url = 'http://www.univision.com/musica/omar-y-argelia-show';
const theme = getTheme(url);

storiesOf('Widgets/RadioShow', module)
  .add('default', () => (
    <ApiProvider
      url={url}
      render={api => (
        <RadioShow
          content={api.widgets[0].contents}
          settings={api.widgets[0].contents[0]}
          theme={theme}
        />
      )}
    />
  ));
