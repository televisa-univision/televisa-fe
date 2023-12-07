import { configure } from '@storybook/react';

import '@univision/fe-commons/dist/assets/styles/main.scss';

import './storybook.scss';

const req = require.context('../src/app/components', true, /\.stories\.js$/)

function loadStories() {
  req.keys().forEach((filename) => req(filename))
}

configure(loadStories, module);
