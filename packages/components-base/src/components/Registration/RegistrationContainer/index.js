import React, { useCallback } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Styles from './RegistrationContainer.styles';
import components from './componentsMap';
import { LANDING } from '../RegistrationConfiguration';

const Container = styled.div`${Styles.container}`;
/**
 * Button base component.
 * @returns {JSX}
 * @constructor
 */
const RegistrationContainer = ({ contentToShow, setContentToShow }) => {
  const navigateToPage = useCallback(page => setContentToShow(page), [setContentToShow]);
  const contentPage = !contentToShow ? LANDING : contentToShow;
  const Content = components[contentPage];
  return (
    <Container>
      <Content navigateToPage={navigateToPage} />
    </Container>
  );
};

/**
 * propTypes
 * @property {Array} [RegistrationContainer] - Landing for registration
 */
RegistrationContainer.propTypes = {
  contentToShow: PropTypes.number,
  setContentToShow: PropTypes.func,
};

export default React.memo(RegistrationContainer);
