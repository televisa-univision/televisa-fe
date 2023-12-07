import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';

import types from '@univision/fe-commons/dist/constants/labelTypes';

import Styles from './Label.stories.styles';
import Label from '.';

const LabelCanvas = styled.div`${Styles.canvas}`;

/**
 * Label renderer
 * @param {!Object} props - components props
 * @returns {JSX}
 */
const LabelRenderer = props => (
  <LabelCanvas>
    <Label {...props} />
  </LabelCanvas>
);

storiesOf('Widgets/Label', module)
  .add('default', () => <LabelRenderer label="Label" />)
  .add('breaking news', () => <LabelRenderer label="Última hora" type={types.BREAKING_NEWS} />)
  .add('advertising', () => <LabelRenderer label="Publicidad" type={types.ADVERTISING} />)
  .add('podcast', () => <LabelRenderer label="Podcast" type={types.PODCAST} />);
