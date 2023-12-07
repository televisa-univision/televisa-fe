import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Styles from './ProgressBar.styles';

const Trail = styled.div`${Styles.trail}`;
const Bar = styled.div`${Styles.bar}`;

/**
 * ProgressBar base component.
 * @param {Object} props React Props for this component
 * @returns {JSX}
 */
const ProgressBar = (props) => {
  const {
    className,
    strokeColor,
    trailColor,
    trailSize,
    rounded,
  } = props;

  let { percent } = props;

  percent = Math.min(100, percent);

  const trailStyle = {
    backgroundColor: trailColor,
    height: `${trailSize}px`,
  };

  const strokeStyle = {
    backgroundColor: strokeColor,
    transform: `translate3d(-${100 - percent}%,0,0)`,
  };

  if (rounded) {
    const round = trailSize / 2;
    trailStyle.borderRadius = `${round}px`;
    strokeStyle.borderRadius = `${round}px`;
  }

  return (
    <Trail
      className={className}
      style={trailStyle}
    >
      <Bar style={strokeStyle} />
    </Trail>
  );
};

/**
 * propTypes
 * @property {String} className Class name of the element
 * @property {Number} percent Number to be animated (0-100)
 * @property {String} strokeColor Color of the progress bar
 * @property {String} trailColor Background Color of the progress bar
 * @property {Number} trailSize Number in pixels of the progress bar width
 * @property {boolean} rounded true if you want the rounded corners
 */
ProgressBar.propTypes = {
  className: PropTypes.string,
  percent: PropTypes.number,
  strokeColor: PropTypes.string,
  trailColor: PropTypes.string,
  trailSize: PropTypes.number,
  rounded: PropTypes.bool,
};

/**
 * propTypes Default props
 */
ProgressBar.defaultProps = {
  className: '',
  percent: 0,
  strokeColor: '#000000',
  trailColor: '#F2F2F2',
  trailSize: 10,
  rounded: false,
};

export default ProgressBar;
