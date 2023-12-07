/**
 * @module PrendeTV Supported Devices
 */
import React from 'react';
import styled from 'styled-components';

import localization from '../../constants/localization';
import {
  TV,
  COMPUTER,
  MOBILE,
} from '../../constants';
import Styles from './SupportedDevices.styles';

const Wrapper = styled.div`${Styles.wrapper}`;
const InnerWrapper = styled.div`${Styles.innerWrapper}`;
const Title = styled.h2`${Styles.title}`;
const List = styled.ul`${Styles.list}`;
const Item = styled.li`${Styles.item}`;
const ContainerLogoDevice = styled.div`${Styles.containerLogoDevice}`;
const LogoDevice = styled.img`${Styles.logoDevice}`;
const InfoDevice = styled.b`${Styles.infoDevice}`;

/**
 * Prende TV Supported Devices
 * @returns {JSX}
 */
const SupportedDevices = () => (
  <Wrapper>
    <InnerWrapper>
      <Title>{localization.get('deviceTitle')}</Title>
      <List>
        <Item>
          <ContainerLogoDevice>
            <LogoDevice
              src="https://st1.uvnimg.com/e3/5c/3ca76acf470f852e7fa4e9a8684f/tv-logo.svg"
              type={TV}
            />
          </ContainerLogoDevice>
          <InfoDevice>
            {localization.get('deviceTelevision')}
          </InfoDevice>
        </Item>
        <Item>
          <ContainerLogoDevice>
            <LogoDevice
              src="https://st1.uvnimg.com/07/db/0f7541724762b0639ee15bd109f6/computer-logo.svg"
              type={COMPUTER}
            />
          </ContainerLogoDevice>
          <InfoDevice>
            {localization.get('deviceComputer')}
          </InfoDevice>
        </Item>
        <Item>
          <ContainerLogoDevice>
            <LogoDevice
              src="https://st1.uvnimg.com/54/bf/7a755b2941faa832512f9e244fdc/mobile-logo.svg"
              type={MOBILE}
            />
          </ContainerLogoDevice>
          <InfoDevice>
            {localization.get('deviceTableMobile')}
          </InfoDevice>
        </Item>
      </List>
    </InnerWrapper>
  </Wrapper>
);

export default SupportedDevices;
