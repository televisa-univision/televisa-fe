import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
import Styles from './MonthContent.stories.styles';
import mockMonths from './__mock__/monthContent';
import MonthContent from '.';

const Wrapper = styled.div`${Styles.wrapper}`;

storiesOf('ArchivedSiteMap/MonthContent', module)
  .add('Default', () => (
    <Wrapper>
      <MonthContent {...mockMonths} />
    </Wrapper>
  ));
