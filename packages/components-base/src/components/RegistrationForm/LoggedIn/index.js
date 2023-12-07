import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

import useRegistrationTheme from '@univision/fe-commons/dist/hooks/useRegistrationTheme';
import localization from '@univision/fe-utilities/localization';

import UserBadge from './UserBadge';
import Styles from './LoggedIn.styles';
import EditUser from './EditUser';

const Container = styled.div`
  ${Styles.container}
`;
const UserName = styled.div`
  ${Styles.userName}
`;
const BadgeWrapper = styled.div`
  ${Styles.badgeWrapper}
`;
const Wrapper = styled.div`
  ${Styles.wrapper}
`;
const EditAccountButton = styled.button`
  ${Styles.editAccountButton}
`;
const FormContainer = styled.div`
  ${Styles.formContainer}
`;

/**
 * This is hardcoded data that will be removed
 * once we finish the user data reducer with registration data
 */
const userData = {
  name: 'Manuela Pineda',
};

/**
 * LoggedIn component
 * @returns {JSX}
 */
const LoggedIn = () => {
  const { mvpd: theme } = useRegistrationTheme();

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <Container>
          <BadgeWrapper>
            <UserBadge name={userData.name} />
          </BadgeWrapper>
          <UserName className="uvs-font-a-bold">
            {userData.name}
          </UserName>
          <EditAccountButton className="uvs-font-c-regular">
            {localization.get('editMyAccount')}
          </EditAccountButton>
        </Container>
        <FormContainer>
          <EditUser />
        </FormContainer>
      </Wrapper>
    </ThemeProvider>
  );
};

export default LoggedIn;
