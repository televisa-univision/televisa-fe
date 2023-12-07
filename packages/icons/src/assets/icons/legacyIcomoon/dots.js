import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, { Path } from 'svgs';

import { BLACK } from '../../../constants/colors';

/**
 * dots component
 * @param {!Object} props - components props
 * @param {style} props.fill - custom fill color
 * @param {number} props.width - icon width size
 * @param {number} props.height - icon height size
 * @param {style} props.className - class name modifier
 * @param {style} props.style - style override
 * @returns {JSX}
 */
const dots = ({
  fill,
  height,
  width,
  className,
  style,
}) => (
  <Svg
    height={height}
    width={width}
    viewBox="0 0 1024 1024"
    className={className}
    style={style}
  >
    <Path
      fill={`${fill || BLACK}`}
      d="M512 256c69.9 0 127.1-57.6 127.1-128s-57.2-128-127.1-128-127.1 57.6-127.1 128c0 70.4 57.2 128 127.1 128v0zM512 384c-69.9 0-127.1 57.6-127.1 128s57.2 128 127.1 128 127.1-57.6 127.1-128-57.2-128-127.1-128v0zM512 768c-69.9 0-127.1 57.6-127.1 128s57.2 128 127.1 128 127.1-57.6 127.1-128c0-70.4-57.2-128-127.1-128v0z"
    />
  </Svg>
);

dots.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default dots;
