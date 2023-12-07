import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';

import mockData from './__mocks__/topQuickLinksData.json';
import TopQuickLinks from '.';

const Wrapper = styled.div`
  margin: -10px;
`;

storiesOf('Widgets/TopQuickLinks', module)
  .add('default', () => (
    <Wrapper>
      <TopQuickLinks {...mockData} />
    </Wrapper>
  ));
