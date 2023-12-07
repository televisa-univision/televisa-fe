import React from 'react';
import { configure, addDecorator } from '@storybook/react';

import '@univision/fe-commons/dist/assets/styles/app.global.scss';
import Styles from './storybook.styles';

const GlobalStyle = Styles.global;
const req = require.context('../src', true, /\.stories\.js$/);

function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

addDecorator(story => <><GlobalStyle />{story()}</>);
configure(loadStories, module);
