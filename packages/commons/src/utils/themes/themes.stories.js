import React from 'react';
import PropTypes from 'prop-types';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import getThemeFromURL from './themes';

/**
 * Caption component
 * @param {Object} props Properties
 * @returns {JSX}
 */
const ThemesCpm = ({ theme }) => (
  <div>
    <p>The theme is applied based on the URL</p>
    <ul>
      <li>
        Primary color:
        {' '}
        {theme.primary}
        <div style={{ backgroundColor: theme.primary, width: 50, height: 50 }} />
      </li>
      <li>
        Secondary color:
        {' '}
        {theme.secondary}
        <div style={{ backgroundColor: theme.secondary, width: 50, height: 50 }} />
      </li>
      <li>
        Alpha gradient:
        {' '}
        {theme.alphaGradient}
        <div style={{ background: theme.alphaGradient, width: 50, height: 50 }} />
      </li>
      <li>
        Solid gradient:
        {' '}
        {theme.solidGradient}
        <div style={{ background: theme.solidGradient, width: 50, height: 50 }} />
      </li>
      <li>
        Horizontal gradient:
        {' '}
        {theme.horizontalGradient}
        <div style={{ background: theme.horizontalGradient, width: 250, height: 50 }} />
      </li>
      <li>
        Horizontal Left gradient:
        {' '}
        {theme.horizontalLeftGradient}
        <div style={{ background: theme.horizontalLeftGradient, width: 250, height: 50 }} />
      </li>
    </ul>
  </div>
);

ThemesCpm.propTypes = {
  theme: PropTypes.object,
};

const themeURls = [
  'default',
  '/musica',
  '/austin/klqb',
  '/arizona/komr',
  '/albuquerque/kkss',
  '/miami/wqba-am',
  '/puerto-rico/wkaq-am',
  '/houston/klat-am',
  '/deportes',
  '/deportes/futbol/liga-mx',
];

const Stories = storiesOf('Themes', module);
themeURls.forEach((url) => {
  Stories.add(
    `URL: ${url}`,
    withInfo('Applies the theme associated with the current url')(() => (
      <ThemesCpm theme={getThemeFromURL(url)} />
    ))
  );
});
