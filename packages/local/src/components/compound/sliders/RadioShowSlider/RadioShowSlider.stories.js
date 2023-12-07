/* eslint-disable require-jsdoc */
import React from 'react';

import { storiesOf } from '@storybook/react';
import ApiProvider from '@univision/fe-commons/dist/components/ApiProvider';

import RadioShowSlider from './RadioShowSlider';

storiesOf('Widgets/RadioShowSlider', module)
  .add('default', () => (
    <ApiProvider
      url="http://www.univision.com/musica/omar-y-argelia-show"
      render={api => <RadioShowSlider content={api.widgets[0].contents} />}
    />
  ));
