import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';

import ArchiveList from '.';
import Styles from './ArchiveList.stories.styles';
import listContentMock from './__mock__/listContent';

const Wrapper = styled.div`${Styles.wrapper}`;

storiesOf('ArchivedSiteMap/ArchiveList', module)
  .add('Default', () => (
    <Wrapper>
      <ArchiveList
        page="1"
        year={2010}
        month="Octubre"
        isArrowActive
        {...listContentMock}
      />
    </Wrapper>
  ));
