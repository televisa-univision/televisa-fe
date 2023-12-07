import React, { useRef, useState, useCallback } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import { isValidEmail } from '@univision/shared-components/dist/utils/helpers';
import isValidFunction from '@univision/fe-utilities/helpers/common/isValidFunction';
import useRegistrationTheme from '@univision/fe-commons/dist/hooks/useRegistrationTheme';
import Modal from '../../Modal';
import Styles from './ForgotPassword.styles';
import InputField from '../../../InputField';
import Button from '../../../RegistrationForm/Button';
import { LOGIN_WITH_EMAIL, RECOVERY_PASSWORD } from '../../RegistrationConfiguration';
import TitleBack from '../../TitleBack';

const Form = styled.form`${Styles.form}`;
const PageDesc = styled.div`${Styles.pageDesc}`;
const Wrapper = styled.div`${Styles.wrapper}`;
const InputWrapper = styled.div`${Styles.inputWrapper}`;
const ContentWrapper = styled.div`${Styles.contentWrapper}`;

/**
 * RegistrationForm base component.
 * @returns {JSX}
 * @constructor
 */
const ForgotPassword = ({ navigateToPage }) => {
  const formRef = useRef();
  const [emailError, setEmailError] = useState('');
  const [isEnableModal, setIsEnableModal] = useState(false);
  const { primary, gradient } = useRegistrationTheme();

  /**
   * Handle submit
   * @param {Object} e - event submit
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      current: {
        email,
      },
    } = formRef;
    let sendEmail = true;
    if (!isValidEmail(email?.value)) {
      setEmailError(localization.get('registrationWrongEmail'));
      sendEmail = false;
    } else {
      setEmailError(null);
    }
    if (sendEmail) {
      setIsEnableModal(true);
    }
  };

  /**
   * Handle modal click
   */
  const handleModalClick = useCallback(() => {
    if (isValidFunction(navigateToPage)) navigateToPage(RECOVERY_PASSWORD);
    setIsEnableModal(false);
  }, [navigateToPage]);

  /**
   * Handle click
   */
  const handleClick = useCallback(() => {
    if (isValidFunction(navigateToPage)) navigateToPage(LOGIN_WITH_EMAIL);
  }, [navigateToPage]);
  return (
    <Wrapper>
      <ContentWrapper>
        <TitleBack
          color={primary}
          label={localization.get('registrationForgotPassword')}
          onClick={handleClick}
        />
      </ContentWrapper>
      <ContentWrapper>
        <PageDesc>{localization.get('registrationForgotPasswordMsg')}</PageDesc>
      </ContentWrapper>
      <Form ref={formRef} onSubmit={e => handleSubmit(e)}>
        <InputWrapper>
          <InputField error={emailError} label={localization.get('email')} id="email" placeholder={localization.get('placeholderEmail')} />
        </InputWrapper>
        <Button label={localization.get('registrationForgotPasswordButton')} gradient={gradient} />
      </Form>
      {isEnableModal && <Modal onClick={handleModalClick} />}
    </Wrapper>
  );
};

/**
 * propTypes
 * @property {Array} [ForgotPassword] - RegistrationForm for registration
 */
ForgotPassword.propTypes = {
  navigateToPage: PropTypes.func,
};

export default ForgotPassword;
