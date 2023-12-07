import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import Icon from '@univision/fe-icons/dist/components/Icon';
import { isValidFunction } from '@univision/fe-commons/dist/utils/helpers';
import PropTypes from 'prop-types';
import Styles from './Toggle.styles';

const Container = styled.div`${Styles.container}`;
/**
 * Button base component.
 * @param {Object} props - component props
 * @param {string} description - description on the submenu
 * @param {string} title - title of submenu
 * @returns {JSX}
 * @constructor
 */
const Toggle = ({
  fill, height, isEnabled, width, onClick,
}) => {
  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    setToggle(isEnabled);
  }, [isEnabled]);

  /**
   * Handle click toggle
   */
  const handleClick = () => {
    setToggle(!toggle);
    if (isValidFunction(onClick)) onClick(!toggle);
  };

  return (
    <Container onClick={handleClick}>
      <Icon fill={fill} height={height} width={width} name={toggle ? 'toggleOn' : 'toggleOff'} />
    </Container>
  );
};

Toggle.defaultProps = {
  isEnabled: false,
};

Toggle.propTypes = {
  fill: PropTypes.string,
  onClick: PropTypes.func,
  height: PropTypes.number,
  isEnabled: PropTypes.bool,
  width: PropTypes.number,
};

export default Toggle;
