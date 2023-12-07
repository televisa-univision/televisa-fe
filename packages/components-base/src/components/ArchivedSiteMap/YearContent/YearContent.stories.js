import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
import Styles from './YearContent.stories.styles';
import mockYears from './__mock__/yearContent';
import YearContent from '.';

const Wrapper = styled.div`${Styles.wrapper}`;

storiesOf('ArchivedSiteMap/YearContent', module)
  .add('Default', () => (
    <Wrapper>
      <YearContent {...mockYears} />
    </Wrapper>
  ));
