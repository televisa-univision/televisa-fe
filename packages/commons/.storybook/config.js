import { configure } from '@storybook/react';

import '../src/assets/styles/main.scss';

import './storybook.scss';

const req = require.context('../src', true, /\.stories\.js$/)

function loadStories() {
  req.keys().forEach((filename) => req(filename))
}

configure(loadStories, module);
