import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';

import mockSettings from './__mocks__/countdown.json';

import Countdown from '.';

const Wrapper = styled.div`
  margin: 0;
`;

const now = new Date();
const tomorrow = new Date(Date.now() + 86400 * 1000 * 1);

storiesOf('Widgets/Countdown', module)
  .add('default', () => (
    <Wrapper>
      <Countdown {...mockSettings} date={tomorrow} />
    </Wrapper>
  ))
  .add('finished event', () => (
    <Wrapper>
      <Countdown {...mockSettings} date={now} />
    </Wrapper>
  ));
