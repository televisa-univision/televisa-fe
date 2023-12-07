import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Clickable from '.';

const theme = {
  primary: '#3a3a3a',
  secondary: '#9d0000',
};

storiesOf('Clickable/Clickable', module)
  .add('Button - default primary', () => (
    <Clickable
      label="Ver más de música"
      type="button"
      appearance="primary"
      onClick={() => action()('clicked')}
    />
  ))
  .add('Button (primary, themed)', () => (
    <Clickable
      label="Ver más de música"
      type="button"
      appearance="primary"
      onClick={() => action()('clicked')}
      theme={theme}
    />
  ))
  .add('Button (primary, icon)', () => (
    <Clickable
      label="Ver más de música"
      type="button"
      appearance="primary"
      onClick={() => action()('clicked')}
      icon="arrow"
      theme={theme}
    />
  ))
  .add('Button (primary, icon, reversed)', () => (
    <Clickable
      reverse
      label="Ver más de música"
      type="button"
      appearance="primary"
      onClick={() => action()('clicked')}
      icon="slideshow"
      theme={theme}
    />
  ))
  .add('Button (primary, large)', () => (
    <Clickable
      label="Ver más de música"
      type="button"
      appearance="primary"
      onClick={() => action()('clicked')}
      icon="arrow"
      size="large"
      theme={theme}
    />
  ))
  .add('Button (primary, small right-aligned)', () => (
    <Clickable
      label="Ver más de música"
      type="button"
      appearance="primary"
      onClick={() => action()('clicked')}
      icon="arrowDown"
      theme={theme}
      align="right"
      size="small"
    />
  ))
  .add('Button (primary, medium, rounded)', () => (
    <Clickable
      label="Ver más de música"
      type="button"
      appearance="primary"
      onClick={() => action()('clicked')}
      icon="arrow"
      size="medium"
      theme={theme}
      rounded
    />
  ))
  .add('Button (secondary)', () => (
    <Clickable
      label="Ir a Latin Grammys"
      type="button"
      appearance="secondary"
      onClick={() => action()('clicked')}
    />
  ))
  .add('Button (secondary, icon)', () => (
    <Clickable
      label="Ir a Latin Grammys"
      type="button"
      appearance="secondary"
      onClick={() => action()('clicked')}
      icon="arrow"
    />
  ))
  .add('Button (secondary, themed)', () => (
    <Clickable
      label="Ir a Latin Grammys"
      type="button"
      appearance="secondary"
      onClick={() => action()('clicked')}
      icon="arrow"
      theme={theme}
    />
  ))
  .add('Button (auth, small)', () => (
    <Clickable
      type="link"
      appearance="auth"
      href="https://univision.com"
      label="Ver cápitulo"
      size="small"
      authRequired
    />
  ))
  .add('Button (auth, medium)', () => (
    <Clickable
      type="link"
      appearance="auth"
      href="https://univision.com"
      label="Ver cápitulo"
      size="medium"
      authRequired
    />
  ))
  .add('Button (auth, large)', () => (
    <Clickable
      type="link"
      appearance="auth"
      href="https://univision.com"
      label="Ver cápitulo"
      size="large"
      authRequired
    />
  ))
  .add('Button (no auth, small)', () => (
    <Clickable
      type="link"
      appearance="auth"
      href="https://univision.com"
      label="Ver cápitulo"
      size="small"
      authRequired={false}
    />
  ))
  .add('Link - (primary)', () => (
    <Clickable
      label="Ir a Latin Grammys"
      type="link"
      appearance="primary"
      href="http://univision.com"
    />
  ))
  .add('Link - (primary, icon, themed)', () => (
    <Clickable
      label="Ir a Latin Grammys"
      type="link"
      appearance="primary"
      href="http://univision.com"
      onClick={() => action('clicked')}
      icon="arrow"
      theme={theme}
    />
  ))
  .add('Link (secondary, small, reversed)', () => (
    <Clickable
      reverse
      label="Ir a Latin Grammys"
      type="link"
      appearance="secondary"
      onClick={() => action('clicked')}
      icon="playnocircle"
      theme={theme}
      size="small"
    />
  ))
  .add('Link - (secondary, small, left-aligned)', () => (
    <Clickable
      label="Ver más de música"
      type="link"
      appearance="secondary"
      onClick={() => action('clicked')}
      href="https://univision.com"
      icon="arrowDown"
      theme={theme}
      size="small"
      align="left"
    />
  ))
  .add('Link (plain)', () => (
    <p>
      Yandel tuvo que esperar <Clickable
        label="a ser famoso para realizar"
        type="link"
        href="https://univision.com"
      /> su sueno de navidad
    </p>
  ))
  .add('Link (plain, themed, icon)', () => (
    <p>
      Yandel tuvo que esperar <Clickable
        label="a ser famoso para realizar"
        type="link"
        href="https://univision.com"
        theme={theme}
        icon="slideshow"
      /> su sueno de navidad
    </p>
  ))
  .add('Button (plain)', () => (
    <p>
      Yandel tuvo que esperar <Clickable
        label="a ser famoso para realizar"
        type="button"
        onClick={() => action()('clicked')}
      /> su sueno de navidad
    </p>
  ))
  .add('Button (plain, icon, reversed)', () => (
    <p>
      Yandel tuvo que esperar <Clickable
        reverse
        label="a ser famoso para realizar"
        type="button"
        icon="playnocircle"
        onClick={() => action()('clicked')}
      /> su sueno de navidad
    </p>
  ));
