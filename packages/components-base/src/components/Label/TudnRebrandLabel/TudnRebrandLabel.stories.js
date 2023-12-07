import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';

import {
  BREAKING_NEWS,
  LIVEBLOG,
  LIVECONTENT,
  LIVESTREAM,
} from './constants';

import Styles from './TudnRebrandLabel.stories.styles';
import TudnRebrandLabel from '.';

const LabelCanvas = styled.div`${Styles.canvas}`;

/**
 * Label renderer
 * @param {!Object} props - components props
 * @returns {JSX}
 */
const LabelRenderer = props => (
  <LabelCanvas>
    <TudnRebrandLabel {...props} />
  </LabelCanvas>
);

storiesOf('Base/Label/TudnRebrandLabel', module)
  .add('default', () => <LabelRenderer label="Label" />)
  .add('livestream', () => <LabelRenderer label="Live Stream" href="www.google.com" type={LIVESTREAM} />)
  .add('liveContent', () => <LabelRenderer label="Live Content" type={LIVECONTENT} />)
  .add('breakingNews', () => <LabelRenderer label="Última hora" type={BREAKING_NEWS} />)
  .add('liveblog', () => <LabelRenderer label="Live Blog" type={LIVEBLOG} />);
