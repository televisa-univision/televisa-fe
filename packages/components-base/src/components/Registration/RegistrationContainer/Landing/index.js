import React, { useCallback } from 'react';
import styled from 'styled-components';
import {
  BLACK,
  GREY_GAINSBORO,
  FACEBOOK_BACKGROUND,
  WHITE,
} from '@univision/fe-commons/dist/utils/styled/constants';
import PropTypes from 'prop-types';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import useRegistrationTheme from '@univision/fe-commons/dist/hooks/useRegistrationTheme';
import isValidFunction from '@univision/fe-utilities/helpers/common/isValidFunction';
import Styles from './Landing.styles';
import StylesAnimation from '../RegistrationContainer.styles';
import Button from '../../../RegistrationForm/Button';
import { REGISTRATION_FORM, LOGIN_WITH_EMAIL } from '../../RegistrationConfiguration';

const AnimationWrapper = styled.div`${StylesAnimation.animationWrapper}`;
const ButtonContainer = styled.div`${Styles.buttonContainer}`;
const Title = styled.div`${Styles.title}`;
const Wrapper = styled.div`${Styles.wrapper}`;
const LoginWithEmail = styled.button`${Styles.loginWithEmail}`;

/**
 * Landing base component.
 * @returns {JSX}
 * @constructor
 */
const Landing = ({ navigateToPage }) => {
  const { gradient } = useRegistrationTheme();

  /**
   * Handle click
   * @param {Object} page to redirect
   * @returns {function | undefined}
   */
  const handleClick = useCallback(page => () => {
    if (isValidFunction(navigateToPage)) navigateToPage(page);
  }, [navigateToPage]);
  return (
    <AnimationWrapper>
      <Wrapper>
        <Title>{localization.get('createAccountMsg')}</Title>
        <ButtonContainer>
          <Button
            onClick={handleClick(REGISTRATION_FORM)}
            label={localization.get('createAccountEmail')}
            gradient={gradient}
            isRounded
          />
          <Button
            backgroundColor={FACEBOOK_BACKGROUND}
            label={localization.get('logInFacebook')}
            icon="facebookRegistration"
            isRounded
          />
          <Button
            backgroundColor={WHITE}
            colorLabel={BLACK}
            borderColor={GREY_GAINSBORO}
            label={localization.get('logInGoogle')}
            icon="google"
            isRounded
          />
          <Button
            backgroundColor={BLACK}
            label={localization.get('logInApple')}
            icon="apple"
            isRounded
          />
          <LoginWithEmail onClick={handleClick(LOGIN_WITH_EMAIL)} className="uvs-font-a-bold">
            {localization.get('logInEmail')}
          </LoginWithEmail>
        </ButtonContainer>
      </Wrapper>
    </AnimationWrapper>
  );
};

/**
 * propTypes
 * @property {Array} [Landing] - Landing for registration
 */
Landing.propTypes = {
  navigateToPage: PropTypes.func,
};

export default React.memo(Landing);
