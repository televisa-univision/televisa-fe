import React, { useRef, useState, useCallback } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import { isValidEmail, isValidName } from '@univision/shared-components/dist/utils/helpers';
import isValidFunction from '@univision/fe-utilities/helpers/common/isValidFunction';
import useRegistrationTheme from '@univision/fe-commons/dist/hooks/useRegistrationTheme';
import Link from '../../../Link';
import StylesAnimation from '../RegistrationContainer.styles';
import Styles from './RegistrationForm.styles';
import InputField from '../../../InputField';
import Button from '../../../RegistrationForm/Button';
import { LANDING, WELCOME } from '../../RegistrationConfiguration';
import TitleBack from '../../TitleBack';
import FullWidth from '../../../FullWidth';

const AnimationWrapper = styled.div`${StylesAnimation.animationWrapper}`;
const InputItem = styled.div`${Styles.inputItem}`;
const Login = styled.div`${Styles.login}`;
const Form = styled.form`${Styles.form}`;
const PageDesc = styled.div`${Styles.pageDesc}`;
const Terms = styled.div`${Styles.terms}`;
const Title = styled.div`${Styles.title}`;
const Wrapper = styled.div`${Styles.wrapper}`;

/**
 * RegistrationForm base component.
 * @returns {JSX}
 * @constructor
 */
const RegistrationForm = ({ navigateToPage }) => {
  const formRef = useRef();
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passError, setPassError] = useState('');
  const { primary, gradient } = useRegistrationTheme();

  /**
   * Handle submit
   * @param {Object} e - event submit
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      current: {
        name,
        email,
        password,
      },
    } = formRef;
    let continueToWelcome = true;
    if (!isValidName(name?.value)) {
      setNameError(localization.get('registrationWrongName'));
      continueToWelcome = false;
    } else {
      setNameError(null);
    }
    if (!isValidEmail(email?.value)) {
      setEmailError(localization.get('registrationWrongEmail'));
      continueToWelcome = false;
    } else {
      setEmailError(null);
    }
    if (password?.value?.length < 8) {
      setPassError(localization.get('registrationWrongPass'));
      continueToWelcome = false;
    } else {
      setPassError(null);
    }
    if (continueToWelcome) {
      if (isValidFunction(navigateToPage)) navigateToPage(WELCOME);
    }
  };
  /**
   * Handle click
   */
  const handleTitleOnClick = useCallback(() => {
    if (isValidFunction(navigateToPage)) navigateToPage(LANDING);
  }, [navigateToPage],);
  return (
    <AnimationWrapper>
      <Wrapper>
        <Title>
          <TitleBack
            label={localization.get('createAnAccount')}
            color={primary}
            onClick={handleTitleOnClick}
          />
        </Title>
        <PageDesc>{localization.get('createAccountMsg')}</PageDesc>
        <FullWidth breakpoints={['xxs', 'xs']}>
          <Form ref={formRef} onSubmit={e => handleSubmit(e)} noValidate>
            <InputItem>
              <InputField error={nameError} label={localization.get('name')} id="name" placeholder={localization.get('placeholderName')} />
            </InputItem>
            <InputItem>
              <InputField error={emailError} label={localization.get('email')} id="email" placeholder={localization.get('placeholderEmail')} type="email" />
            </InputItem>
            <InputItem>
              <InputField error={passError} label={localization.get('password')} id="password" placeholder={localization.get('placeholderPassword')} type="password" />
            </InputItem>
            <InputItem>
              <Button label={localization.get('createAccount')} gradient={gradient} />
            </InputItem>
          </Form>
        </FullWidth>
        <Terms>
          <div>{localization.get('registrationTerms')}</div>
          <div>
            <Link href="#test">{localization.get('registrationTermsService')}</Link>
            {localization.get('registrationTermsConcat')}
            <Link href="#test">{localization.get('registrationTermsPolicy')}</Link>
          </div>
        </Terms>
        <Login>
          <span>{localization.get('registrationHaveAcountQuestion')}</span>
          <Link href="#test" className="uvs-font-c-bold">{localization.get('registrationLogIn')}</Link>
        </Login>
      </Wrapper>
    </AnimationWrapper>
  );
};

/**
 * propTypes
 * @property {Array} [RegistrationForm] - RegistrationForm for registration
 */
RegistrationForm.propTypes = {
  navigateToPage: PropTypes.func,
};

export default RegistrationForm;
