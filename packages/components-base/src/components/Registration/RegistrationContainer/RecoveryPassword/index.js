import React, { useCallback } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import useRegistrationTheme from '@univision/fe-commons/dist/hooks/useRegistrationTheme';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import PropTypes from 'prop-types';
import isValidFunction from '@univision/fe-utilities/helpers/common/isValidFunction';
import { LANDING } from '../../RegistrationConfiguration';
import InputField from '../../../InputField';
import Button from '../../../RegistrationForm/Button';
import fields from './fields';
import Styles from './RecoveryPassword.styles';
import TitleBack from '../../TitleBack';

const Wrapper = styled.div`
  ${Styles.wrapper}
`;
const InputItem = styled.div`
  ${Styles.inputItem}
`;
const Container = styled.div`
  ${Styles.container}
`;
const FormContainer = styled.div`
  ${Styles.formContainer}
`;
const Title = styled.div`
  ${Styles.title}
`;
const TitleBackWrapper = styled.div`
  ${Styles.titleBack}
`;

/**
 * EditUser component
 * @returns {JSX}
 */
const RecoveryPassword = ({ navigateToPage }) => {
  const { mvpd: theme, primary, gradient } = useRegistrationTheme();
  const renderFields = fields.map((item) => {
    const { key, ...rest } = item;

    return (
      <InputItem key={key}>
        <InputField {...rest} />
      </InputItem>
    );
  });

  /**
   * Handle click
   */
  const handleClick = useCallback(() => {
    if (isValidFunction(navigateToPage)) navigateToPage(LANDING);
  }, [navigateToPage]);

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <TitleBackWrapper>
          <TitleBack
            color={primary}
            label={localization.get('myAccount')}
            onClick={handleClick}
          />
        </TitleBackWrapper>
        <Container>
          <FormContainer>
            <Title className="uvs-font-c-bold">Recuperar contraseña</Title>
            {renderFields}
            <Button label={localization.get('send')} gradient={gradient} />
          </FormContainer>
        </Container>
      </Wrapper>
    </ThemeProvider>
  );
};

/**
 * propTypes
 * @property {Array} [RecoveryPassword] - RegistrationForm for registration
 */
RecoveryPassword.propTypes = {
  navigateToPage: PropTypes.func,
};

export default React.memo(RecoveryPassword);
