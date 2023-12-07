import React, { Fragment } from 'react';
import { configure, addDecorator } from '@storybook/react';
import Helmet from 'react-helmet';

import '@univision/fe-commons/dist/assets/styles/main.scss';

import './storybook.scss';

const Decorator = storyFn => (
  <Fragment>
    <Helmet meta={[{ name: 'viewport', content: 'width=device-width, initial-scale=1.0' }]} />
    {storyFn()}
  </Fragment>
);

addDecorator(Decorator);

const req = require.context('../src/components', true, /\.stories\.js$/)

function loadStories() {
  req.keys().forEach((filename) => req(filename))
}

configure(loadStories, module);
