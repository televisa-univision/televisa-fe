import { configure } from "@storybook/react";

import '@univision/fe-commons/dist/assets/styles/main.scss';

const req = require.context(
  "../src", true,
  /^((?!node_modules).)*\.(stories|stories.web)\.js$/
);

const loadStories = () => req.keys().forEach(filename => req(filename));

configure(loadStories, module);
