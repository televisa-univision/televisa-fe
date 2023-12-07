import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Styles from './Overlay.styles';

const OverlayStyled = styled.div`${Styles.overlay}`;

/**
 * Component to take care of opacity and close popup interactions
 * @params {Object} props - props that component will receive
 * @params {function} props.close - Callback to allow the popup to close
 * @returns {JSX}
 */
const Overlay = ({ close }) => (
  <OverlayStyled role="presentation" onClick={close} />
);

Overlay.propTypes = {
  close: PropTypes.func,
};

export default Overlay;
