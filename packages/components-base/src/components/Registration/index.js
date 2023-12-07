import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { deviceSelector } from '@univision/fe-commons/dist/store/selectors/page-selectors';
import PropTypes from 'prop-types';
import RegistrationContainer from './RegistrationContainer';
import RegistrationMenu from './RegistrationMenu';
import Styles from './Registration.syles';
import { LANDING, SHOW_MENU_IN } from './RegistrationConfiguration';

const Container = styled.div`${Styles.container}`;
const Wrapper = styled.div`${Styles.wrapper}`;
/**
 * Button base component.
 * @returns {JSX}
 * @constructor
 */
const Registration = ({ initContent }) => {
  const [contentToShow, setContentToShow] = useState(initContent);
  const device = useSelector(deviceSelector);
  const isMobile = device === 'mobile';
  return (
    <Wrapper data-element-name="Registration">
      <Container className="container">
        {(SHOW_MENU_IN.includes(contentToShow) || !isMobile)
        && <RegistrationMenu setContentToShow={setContentToShow} />}
        <RegistrationContainer
          contentToShow={contentToShow}
          setContentToShow={setContentToShow}
        />
      </Container>
    </Wrapper>
  );
};

Registration.defaultProps = {
  initContent: LANDING,
};
/**
 * propTypes
 * @property {Array} [Registration] - Registrarion options
 */
Registration.propTypes = {
  initContent: PropTypes.number,
};

export default Registration;
