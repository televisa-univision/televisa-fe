import React, { useRef, useState, useCallback } from 'react';
import styled from 'styled-components';

import useRegistrationTheme from '@univision/fe-commons/dist/hooks/useRegistrationTheme';
import localization from '@univision/fe-utilities/localization';
import isValidEmail from '@univision/fe-utilities/helpers/url/isValidEmail';
import PropTypes from 'prop-types';
import isValidFunction from '@univision/fe-utilities/helpers/common/isValidFunction';

import InputField from '../../../InputField';
import Button from '../../../RegistrationForm/Button';

import TitleBack from '../../TitleBack';
import Styles from './LoginWithEmail.styles';
import { FORGOT_PASSWORD } from '../../RegistrationConfiguration';

const Wrapper = styled.div`
  ${Styles.wrapper}
`;
const InputItem = styled.div`
  ${Styles.inputItem}
`;
const Title = styled.h1`
  ${Styles.title}
`;
const Intro = styled.p`
  ${Styles.intro}
`;
const ForgotPassword = styled.button`
  ${Styles.forgotPassword}
`;
const ButtonWrapper = styled.div`
  ${Styles.buttonWrapper}
`;

/**
 * Login With Email component
 * @returns {JSX}
 */
const LoginWithEmail = ({ navigateToPage }) => {
  const [errors, setErrors] = useState({});
  const formData = useRef({
    email: null,
    password: null,
  });

  const {
    primary: primaryColor,
    gradient,
  } = useRegistrationTheme();

  /**
   * onKeyUp field handle method
   * @param {*} e - input event
   */
  const handleOnKeyUp = (e) => {
    const { name, value } = e?.target;
    formData.current[name] = value;
  };

  /**
   * Handle click
   */
  const handleClick = useCallback(() => {
    if (isValidFunction(navigateToPage)) navigateToPage(FORGOT_PASSWORD);
  }, [navigateToPage]);

  /**
   * Handles form submission
   */
  const handleSubmit = () => {
    // Valid form flag
    // let validated = true;
    const { email, password } = formData.current;
    const errorMessages = {};

    // Email validation
    if (!email || !isValidEmail(email)) {
      errorMessages.email = `Error: ${localization.get('errorValidationEmail')}`;
      // let validated = false;
    }

    // Password validation
    if (!password) {
      errorMessages.password = `Error: ${localization.get('errorValidationPassword')}`;
      // let validated = false;
    }

    // This has to be called after all validation messages are set
    setErrors(errorMessages);

    // Once validated, send form values
    // if (validated) {
    //  actionToDo(formData.current)
    // }
  };

  return (
    <Wrapper>
      <Title>
        <TitleBack label={`${localization.get('loginWith')} ${localization.get('yourEmail').toLowerCase()}`} color={primaryColor} />
      </Title>

      <Intro>{localization.get('loginWithEmailIntro')}</Intro>

      <InputItem>
        <InputField
          error={errors?.email}
          label={localization.get('mail')}
          onKeyUp={handleOnKeyUp}
          id="loginEmail-email"
          name="email"
        />
      </InputItem>

      <InputItem>
        <InputField
          error={errors?.password}
          label={localization.get('password')}
          onKeyUp={handleOnKeyUp}
          type="password"
          id="loginEmail-password"
          name="password"
        />
      </InputItem>

      <ButtonWrapper>
        <Button
          label={localization.get('logInButton')}
          gradient={gradient}
          onClick={handleSubmit}
        />
      </ButtonWrapper>

      <ForgotPassword onClick={handleClick} className="uvs-font-a-bold">
        {localization.get('forgotMyPassword')}
      </ForgotPassword>
    </Wrapper>
  );
};

/**
 * propTypes
 * @property {Array} [LoginWithEmail] - Mvpd for registration
 */
LoginWithEmail.propTypes = {
  navigateToPage: PropTypes.func,
};

export default React.memo(LoginWithEmail);
