import React from 'react';
import styled from 'styled-components';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import Icon from '@univision/fe-icons/dist/components/Icon';
import useRegistrationTheme from '@univision/fe-commons/dist/hooks/useRegistrationTheme';
import Styles from './Welcome.styles';
import StylesAnimation from '../RegistrationContainer.styles';

const AnimationWrapper = styled.div`${StylesAnimation.animationWrapper}`;
const Title = styled.div`${Styles.title}`;
const Msg = styled.div`${Styles.msg}`;
const Wrapper = styled.div`${Styles.wrapper}`;

/**
 * Welcome base component.
 * @returns {JSX}
 * @constructor
 */
const Welcome = () => {
  const { primary, welcomeIcon } = useRegistrationTheme();
  return (
    <AnimationWrapper>
      <Wrapper>
        <Title primary={primary}>{localization.get('welcomePageTitle')}{welcomeIcon && ` ${localization.get('to')}`}</Title>
        {welcomeIcon && <Icon name={welcomeIcon} width={200} height={50} /> }
        <Msg>{localization.get('welcomePageMsg1')}</Msg>
        <Msg>{localization.get('welcomePageMsg2')}</Msg>
      </Wrapper>
    </AnimationWrapper>
  );
};

export default Welcome;
