/* eslint-disable require-jsdoc */
import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Styles from './ShareBar.stories.scss';
import ShareBar from '.';

const sharingOptions = {
  facebook: {
    url: 'http://univision.com/test',
    title: 'The content title',
    imageUrl: 'http://loremflickr.com/320/240',
    isFeedDialog: true,
  },
  twitter: {
    url: 'http://univision.com/test',
    title: 'The content title',
    via: 'Univision',
  },
  mail: {
    url: 'http://univision.com/test',
    title: 'The content title',
    body: 'The content of the email',
    subject: 'The subject of the email',
  },
};

const Wrapper = props => (
  <div className={Styles.light}>
    <ShareBar {...props} />
  </div>
);

const click = (name, e) => {
  e.preventDefault();
  action('a link was clicked')(name);
};

storiesOf('Clickable/ShareBar', module)
  .add('Light theme', () => <Wrapper theme="light" sharingOptions={sharingOptions} />)
  .add('Dark theme', () => <ShareBar sharingOptions={sharingOptions} />)
  .add('Color theme', () => <ShareBar theme="color" sharingOptions={sharingOptions} />)
  .add('Rounded theme', () => <ShareBar theme="rounded" sharingOptions={sharingOptions} />)
  .add('Compact layout ', () => <ShareBar compact theme="color" sharingOptions={sharingOptions} />)
  .add('Compact layout article', () => <ShareBar compact theme="rounded" padLeft={false} sharingOptions={sharingOptions} />)
  .add('Compact layout article comparte on top', () => <ShareBar compact theme="rounded" padLeft={false} shareOnTop sharingOptions={sharingOptions} />)
  .add('Compact layout with no comparte', () => <Wrapper compact theme="light" showComparte={false} sharingOptions={sharingOptions} />)
  .add('Stacked layout', () => <ShareBar stack sharingOptions={sharingOptions} />)
  .add('Custom icon size', () => <ShareBar iconSize="medium" sharingOptions={sharingOptions} />)
  .add('with onClick', () => <ShareBar sharingOptions={sharingOptions} onClick={click} />)
  .add('with mobileCollapse', () => <ShareBar sharingOptions={sharingOptions} onClick={click} mobileCollapse device="mobile" />)
  .add('with mobileCollapse, ignored on desktop', () => <ShareBar sharingOptions={sharingOptions} onClick={click} mobileCollapse device="desktop" />)
  .add('with mobileCollapse and stack', () => <ShareBar sharingOptions={sharingOptions} onClick={click} stack mobileCollapse device="tablet" />)
  .add('with mobileCollapse and Color in Icon', () => <ShareBar sharingOptions={sharingOptions} onClick={click} stack mobileCollapse device="mobile" themeIcon={{ primary: 'green' }} />);
