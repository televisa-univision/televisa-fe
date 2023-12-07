import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import { WHITE } from '@univision/fe-icons/dist/constants/colors';

import ElTiempoHeader from './ElTiempo';

storiesOf('Layout/Header - El Tiempo', module)
  .add('Default', () => (
    <ElTiempoHeader />
  ))
  .add('Width Right Component', () => {
    const RightComponent = styled.div`
      display: block;
    `;
    const Title = styled.div`
      color: ${WHITE};
      font-size: 16px;
      font-weight: bold;
      line-height: 17px;
    `;
    const SubTitle = styled.div`
      color: ${WHITE};
      font-size: 14px;
      font-weight: light;
      line-height: 15px;
    `;
    const RightElement = (
      <RightComponent>
        <Title>New York</Title>
        <SubTitle>Martes 9:55 AM</SubTitle>
      </RightComponent>
    );
    return (
      <ElTiempoHeader rightComponent={RightElement} />
    );
  });
