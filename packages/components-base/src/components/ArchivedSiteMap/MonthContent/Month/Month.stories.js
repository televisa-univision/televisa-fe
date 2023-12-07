import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
import Month from '.';
import Styles from './Month.stories.styles';

const Wrapper = styled.div`${Styles.wrapper}`;

storiesOf('ArchivedSiteMap/Month', module)
  .add('Default', () => (
    <Wrapper>
      <Month name="Ene" totalParts={4} />
    </Wrapper>
  ));
