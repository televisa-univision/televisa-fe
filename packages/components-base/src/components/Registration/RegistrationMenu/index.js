import React from 'react';
import styled from 'styled-components';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import useRegistrationTheme from '@univision/fe-commons/dist/hooks/useRegistrationTheme';
import PropTypes from 'prop-types';
import MenuOptions from './registrationMenuOptions';
import MvpdLogin from './MvpdLogin';
import Styles from './RegistrationMenu.styles';
import SubMenu from './SubMenu';

const Container = styled.div`${Styles.container}`;
const SubmenuContainer = styled.div`${Styles.submenuContainer}`;
const Title = styled.div`${Styles.title}`;
/**
 * RegistrationMenu base component.
 * @returns {JSX}
 * @constructor
 */
const RegistrationMenu = ({ setContentToShow, mvpdProviderIcon }) => {
  const { primary } = useRegistrationTheme();
  const isLoggedIn = mvpdProviderIcon !== undefined; // it will be removed when logic is done
  return (
    <Container className="uvs-font-a-light">
      <Title primary={primary}>{localization.get('myAccount')}</Title>
      <SubmenuContainer isLoggedIn={isLoggedIn}>
        {MenuOptions.map(
          submenu => (
            <SubMenu
              onClick={submenu.setPage ? () => setContentToShow(submenu.setPage) : undefined}
              title={submenu.title}
              description={submenu.description}
            />
          )
        )}
        <MvpdLogin iconName={mvpdProviderIcon} />
      </SubmenuContainer>
    </Container>
  );
};

/**
 * propTypes
 * @property {Array} [RegistrationMenu] - Landing for registration
 */
RegistrationMenu.propTypes = {
  mvpdProviderIcon: PropTypes.string,
  setContentToShow: PropTypes.func,
};

export default RegistrationMenu;
