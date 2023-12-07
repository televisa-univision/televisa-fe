import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import {
  WHITE,
} from '@univision/fe-utilities/styled/constants';
import isValidValue from '@univision/fe-utilities/helpers/common/isValidValue';
import Icon from '@univision/fe-icons/dist/components/Icon';

import Styles from './CastingControlsButton.styles';

const ControlButtonWrapper = styled(motion.div).attrs({
  whileHover: { scale: 1.1 },
  whileTap: { scale: 0.80 },
})`${Styles.button}`;

/**
 * Check if should re-render the component based on props changes
 * @param {Object} prevProps - react previous props component
 * @param {Object} nextProps - react new props component
 * @returns {boolean}
 */
function areEqualProps(prevProps, nextProps) {
  return prevProps?.shouldUpdateName === nextProps?.shouldUpdateName;
}

/**
 * Casting Controls Button Component
 * @param {Object} props - component props
 * @param {function} [props.buttonCallback] - the function for tis playback button
 * @param {string} [props.className] - component class name
 * @param {string} [props.defaultName] - the default name for the button
 * @param {string} [props.fill] - the fill color for the button icon
 * @param {bool} [props.hasExtendedControls] - if has more tha two types of control
 * @param {bool} [props.isLeft = false] - true if is is for left layout
 * @param {bool} [props.isPlaybackButton = false] - true if is playback button
 * @param {bool} [props.shouldUpdateName = false] - true if button should update
 * @param {string} [props.updateName] - the name of the button to update to
 * @returns {JSX}
 */
const CastingControlsButton = ({
  buttonCallback,
  className,
  defaultName,
  fill,
  hasExtendedControls,
  isLeft,
  isPlaybackButton,
  shouldUpdateName,
  updateName,
}) => {
  if (!isValidValue(defaultName)) {
    return null;
  }
  return (
    <ControlButtonWrapper
      className={className}
      onClick={buttonCallback}
      hasExtendedControls={hasExtendedControls}
      isPlaybackButton={isPlaybackButton}
      isLeft={isLeft}
    >
      <Icon
        name={shouldUpdateName ? updateName : defaultName}
        fill={fill}
      />
    </ControlButtonWrapper>
  );
};

CastingControlsButton.propTypes = {
  buttonCallback: PropTypes.func,
  className: PropTypes.string,
  defaultName: PropTypes.string,
  fill: PropTypes.string,
  hasExtendedControls: PropTypes.bool,
  isLeft: PropTypes.bool,
  isPlaybackButton: PropTypes.bool,
  shouldUpdateName: PropTypes.bool,
  updateName: PropTypes.string,
};

CastingControlsButton.defaultProps = {
  fill: WHITE,
  hasExtendedControls: false,
  isLeft: false,
  isPlaybackButton: false,
  shouldUpdateName: false,
};

export default React.memo(CastingControlsButton, areEqualProps);
