import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import {
  WHITE,
} from '@univision/fe-utilities/styled/constants';
import isValidValue from '@univision/fe-utilities/helpers/common/isValidValue';
import Icon from '@univision/fe-icons/dist/components/Icon';

import Styles from '../CastingControlsButton/CastingControlsButton.styles';

const ControlButtonWrapper = styled(motion.div).attrs({
  whileHover: { scale: 1.1 },
  whileTap: { scale: 0.80 },
})`${Styles.button}`;

/**
 * Casting Fixed Button Component
 * @param {Object} props - component props
 * @param {function} [props.buttonCallback] - the function for tis playback button
 * @param {string} [props.name] - the default name for the button
 * @param {string} [props.fill] - the fill color for the button icon
 * @param {bool} [props.hasExtendedControls] - if has more tha two types of control
 * @param {bool} [props.isLeft = false] - true if is is for left layout
 * @param {bool} [props.isPlaybackButton = false] - true if is playback button
 * @returns {JSX}
 */
const CastingFixedButton = ({
  buttonCallback,
  name,
  fill,
  hasExtendedControls,
  isLeft,
  isPlaybackButton,
}) => {
  if (!isValidValue(name)) {
    return null;
  }
  return (
    <ControlButtonWrapper
      onClick={buttonCallback}
      hasExtendedControls={hasExtendedControls}
      isPlaybackButton={isPlaybackButton}
      isLeft={isLeft}
    >
      <Icon
        name={name}
        fill={fill}
      />
    </ControlButtonWrapper>
  );
};

CastingFixedButton.propTypes = {
  buttonCallback: PropTypes.func,
  name: PropTypes.string,
  fill: PropTypes.string,
  hasExtendedControls: PropTypes.bool,
  isLeft: PropTypes.bool,
  isPlaybackButton: PropTypes.bool,
};

CastingFixedButton.defaultProps = {
  fill: WHITE,
  hasExtendedControls: false,
  isLeft: false,
  isPlaybackButton: false,
};

export default CastingFixedButton;
