import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, { Path } from 'svgs';

import { BLACK } from '../../../constants/colors';

/**
 * arrow component
 * @param {!Object} props - components props
 * @param {style} props.fill - custom fill color
 * @param {number} props.width - icon width size
 * @param {number} props.height - icon height size
 * @param {style} props.className - class name modifier
 * @param {style} props.style - style override
 * @returns {JSX}
 */
const wavesLeft = ({
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
      d="M876.8 102.4c0 0-218.453 141.312-218.453 409.6s218.453 409.6 218.453 409.6h-109.227c0 0-218.453-137.216-218.453-409.6 0-273.408 218.453-409.6 218.453-409.6h109.227z M549.12 0c0 0-218.453 206.848-218.453 512 0 307.2 218.453 512 218.453 512h-109.227c0 0-218.453-104.448-218.453-512 0-409.6 218.453-512 218.453-512h109.227z"
    />
  </Svg>
);

wavesLeft.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default wavesLeft;
