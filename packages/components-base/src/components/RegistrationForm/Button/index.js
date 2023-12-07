import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import classname from 'classnames';

import Icon from '@univision/fe-icons/dist/components/Icon';
import { BLACK } from '@univision/fe-utilities/styled/constants';

import Styles from './Button.styles';

const StyledButton = styled.button`
  ${Styles.button}
`;

const Label = styled.span`
  ${Styles.label}
`;

/**
 * Registration Form Button Component
 * @param {Object} props - props of the component
 * @property {string} props.backgroundColor - background color of the button
 * @property {boolean} props.disabled - flag to disable the button
 * @property {Object} props.gradient - gradient background of the button
 * @property {Object} props.gradient.end - color to end the gradient
 * @property {Object} props.gradient.start - color to start the gradient
 * @property {string} props.icon - icon to be displayed
 * @property {string} props.icon - to know if icon is right or left
 * @property {boolean} props.isRounded - flag to enable rounded button
 * @property {string} props.label - label to be displayed
 * @property {Function} props.onClick - onClick callback to be passed
 * @property {string} props.width - width of the button
 * @returns {JSX}
 */
const Button = ({
  backgroundColor,
  borderColor,
  colorLabel,
  disabled,
  gradient,
  icon,
  iconPositionRight,
  isRounded,
  label,
  onClick,
  width,
}) => {
  return (
    <StyledButton
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      className={classname({
        'uvs-font-c-bold': !isRounded,
        'uvs-font-a-regular': isRounded,
      })}
      disabled={disabled}
      gradient={gradient}
      isRounded={isRounded}
      onClick={onClick}
      width={width}
      showIconRight={iconPositionRight}
    >
      {icon && <Icon name={icon} size="medium" />}
      <Label
        colorLabel={colorLabel}
        icon={icon}
        isRounded={isRounded}
      >
        {label}
      </Label>
    </StyledButton>
  );
};

Button.propTypes = {
  backgroundColor: PropTypes.string,
  borderColor: PropTypes.string,
  colorLabel: PropTypes.string,
  disabled: PropTypes.bool,
  gradient: PropTypes.shape({
    end: PropTypes.string,
    start: PropTypes.string,
  }),
  icon: PropTypes.string,
  iconPositionRight: PropTypes.bool,
  isRounded: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  width: PropTypes.string,
};

Button.defaultProps = {
  backgroundColor: BLACK,
  gradient: {},
  width: '100%',
};

export default Button;
