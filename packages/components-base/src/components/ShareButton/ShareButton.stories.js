/* eslint-disable require-jsdoc */
import React from 'react';
import styled from 'styled-components';

import { storiesOf } from '@storybook/react';
import { decorateAction } from '@storybook/addon-actions';

import Styles from './ShareButton.styles.stories';
import ShareButton from '.';

const Wrapper = styled.div`${Styles.wrapper}`;

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
  whatsapp: {
    url: 'http://univision.com/test',
  },
};

const facebookDialogSharingOptions = {
  facebook: {
    appId: '645138725541385',
    url: 'http://univision.com/test',
    title: 'The content title',
    imageUrl: 'http://loremflickr.com/320/240',
    description: 'test',
    isFeedDialog: true,
  },
};

const ExternalWrapper = props => (
  <Wrapper>
    <ShareButton {...props} />
  </Wrapper>
);

const blockTransition = decorateAction([
  (args) => {
    args[0].preventDefault();
    return args;
  },
]);

storiesOf('Clickable/ShareButton', module)
  .add('Facebook', () => <ExternalWrapper name="facebook" sharingOptions={sharingOptions} />)
  .add('Facebook Feed Dialog', () => <ExternalWrapper name="facebook" sharingOptions={facebookDialogSharingOptions} />)
  .add('Twitter', () => <ExternalWrapper name="twitter" sharingOptions={sharingOptions} />)
  .add('Whatsapp', () => <ExternalWrapper name="whatsapp" sharingOptions={sharingOptions} />)
  .add('With onClick callback', () => (
    <ExternalWrapper
      name="twitter"
      sharingOptions={sharingOptions}
      onClick={blockTransition('clicked')}
    />
  ));
