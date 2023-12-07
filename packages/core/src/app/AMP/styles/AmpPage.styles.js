import { createGlobalStyle } from 'styled-components';

import {
  BLACK,
} from '@univision/fe-commons/dist/utils/styled/constants';

export default createGlobalStyle`
*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  font-family: sans-serif;
  line-height: 1.15;
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: rgba(${BLACK}, 0);
}

article, aside, figcaption, figure, footer, header, hgroup, main, nav, section {
  display: block;
}

hr {
  box-sizing: content-box;
  height: 0;
  overflow: visible;
}

h1, h2, h3, h4, h5, h6 {
  margin-top: 0;
  margin-bottom: .5rem;
}

p {
  margin-top: 0;
  margin-bottom: 1rem;
}

ol,
ul,
dl {
  margin-top: 0;
  margin-bottom: 1rem;
}

ol ol,
ul ul,
ol ul,
ul ol {
  margin-bottom: 0;
}

blockquote {
  margin: 0 0 1rem;
}

a {
  text-decoration: none;
  background-color: transparent;
}

div[data-element-name="bkp-indicator"] {
  display: none;
}

html {
  -webkit-tap-highlight-color: transparent;
}

body {
  color: ${BLACK};
  font-family: Roboto,sans-serif;
  font-weight: 400;
  overflow-x: hidden;
  margin: 0;
  text-align: left;
  line-height: 1.5rem;
}

@font-face {
  font-family: Roboto;
  font-weight: 400;
  src: url(/assets/styles/fonts/roboto-regular.woff2) format("woff2")
}

@font-face {
  font-family: Roboto;
  font-weight: 700;
  src: url(/assets/styles/fonts/roboto-bold.woff2) format("woff2")
}

@font-face {
  font-family: "Roboto Slab";
  font-weight: 400;
  src: url(/assets/styles/fonts/roboto-slab-regular.woff2) format("woff2")
}

@font-face {
  font-family: "Roboto Slab";
  font-weight: 700;
  src: url(/assets/styles/fonts/roboto-slab-bold.woff2) format("woff2")
}

.uvs-font-a-regular {
  font-family: Roboto, sans-serif;
  font-weight: 400
}

.uvs-font-a-bold {
  font-family: Roboto, sans-serif;
  font-weight: 700
}

.uvs-container {
  width: 100%;
  padding-right: 23px;
  padding-left: 23px;
  margin-right: auto;
  margin-left: auto;
}

a:hover, a:visited, a:active, a:focus {
  text-decoration: none;
}

button {
  border: none;
  cursor: pointer;
}

button:focus {
  outline: 0;
}

.px-0, .pl-0{
  padding-left: 0;
}

.px-0, .pr-0{
  padding-right: 0;
}

.mx-0, .ml-0{
  margin-left: 0;
}

.mx-0, .mr-0{
  margin-right: 0;
}

amp-iframe[style="height: 666px;"], amp-iframe[height="666"] {
  display: none;
}
`;
