import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import isValidFunction from '@univision/fe-utilities/helpers/common/isValidFunction';
import Styles from './MvpdItem.styles';

const Container = styled.button`${Styles.container}`;
/**
 * Button base component.
 * @param {Object} props - component props
 * @param {string} description - description on the submenu
 * @param {string} title - title of submenu
 * @returns {JSX}
 * @constructor
 */
const MvpdItem = ({
  height,
  logo,
  onClick,
  width,
}) => {
  return (
    <Container
      onClick={isValidFunction(onClick) ? onClick : undefined}
    >
      <img height={height} width={width} src={logo} alt="" />
    </Container>
  );
};

MvpdItem.propTypes = {
  height: PropTypes.number,
  logo: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
  onClick: PropTypes.func,
  width: PropTypes.number,
};

MvpdItem.defaultProps = {
  height: 70,
  width: 100,
};

export default MvpdItem;
