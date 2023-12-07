import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { BLACK_50 } from '@univision/fe-commons/dist/utils/styled/constants';

import Animated from '../Animated';

import Styles from './AnimatedModalBackground.styles';

const ModalBackground = styled(Animated)`${Styles.modalBackground}}`;

/**
 * AnimatedModalBackground component
 * @param {string} backgroundColor = BLACK_50 - background color
 * @param {boolean} hideSpeed = 0.25 - transition speed when is not visible
 * @param {boolean} isVisible - if is set to true, displays the background
 * @param {func} onClick - onClick event
 * @param {boolean} showSpeed = 0.3 - transition speed when is visible
 * @returns {JSX}
 */
const AnimatedModalBackground = ({
  backgroundColor,
  hideSpeed,
  isVisible,
  onClick,
  showSpeed,
}) => {
  return (
    <ModalBackground
      backgroundColor={backgroundColor}
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      isVisible={isVisible}
      showSpeed={{ duration: showSpeed }}
      onClick={onClick}
      hideSpeed={{ duration: hideSpeed }}
      animate={{ opacity: 1 }}
    />
  );
};

AnimatedModalBackground.propTypes = {
  backgroundColor: PropTypes.string,
  hideSpeed: PropTypes.number,
  isVisible: PropTypes.bool,
  onClick: PropTypes.func,
  showSpeed: PropTypes.number,
};

AnimatedModalBackground.defaultProps = {
  backgroundColor: BLACK_50,
  hideSpeed: 0.25,
  showSpeed: 0.3,
};

export default AnimatedModalBackground;
