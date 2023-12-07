/* eslint-disable require-jsdoc */
import React from 'react';

import { storiesOf } from '@storybook/react';

import Styles from './TopicBar.stories.scss';
import TopicBar from '.';

const settings = { title: 'Widget Title' };
const withTitleLink = {
  ...settings,
  titleLink: {
    href: 'http://www.univision.com',
  },
};
const DarkContainer = props => (
  <div className={Styles.darkContainer}>
    <TopicBar {...props} />
  </div>
);

storiesOf('Text/TopicBar', module)
  .add('Default', () => <TopicBar settings={settings} />)
  .add('With theme', () => <TopicBar settings={settings} theme={{ primary: 'red' }} />)
  .add('As link', () => <TopicBar settings={withTitleLink} />)
  .add('Align center', () => <TopicBar settings={settings} align="center" />)
  .add('Bottom separator', () => <TopicBar settings={settings} separator="bottom" />)
  .add('Left separator', () => <TopicBar settings={settings} separator="left" />)
  .add('Top separator', () => <TopicBar settings={settings} separator="top" />)
  .add('Large size', () => <TopicBar settings={settings} size="large" />)
  .add('Dark variant', () => <DarkContainer settings={settings} variant="dark" />)
  .add('Dark variant top separator', () => <DarkContainer settings={settings} variant="dark" separator="top" />)
  .add('Dark variant left', () => (
    <DarkContainer settings={settings} variant="dark" separator="left" />
  ))
  .add('Dark variant large', () => (
    <DarkContainer settings={settings} variant="dark" size="large" />
  ))
  .add('Link with CTA', () => (
    <TopicBar
      cta={{ text: 'Ver Todos Los Shows' }}
      settings={withTitleLink}
      size="large"
    />
  ))
  .add('Text with CTA', () => (
    <TopicBar
      cta={{ text: 'Ver Todos Los Shows', href: 'https://google.com' }}
      settings={settings}
      size="large"
    />
  ))
  .add('Link with different CTA Link', () => (
    <TopicBar
      cta={{ text: 'Ver Todos Los Shows', href: 'https://google.com' }}
      settings={withTitleLink}
      size="large"
    />
  ))
  .add('Link with mega menu appearance', () => (
    <TopicBar
      cta={{ text: 'Ver Todos Los Shows' }}
      separator="bottom"
      separatorSpace={4}
      settings={withTitleLink}
      size="large"
      theme={{ primary: 'red' }}
    />
  ));
