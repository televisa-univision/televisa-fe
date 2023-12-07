import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import { Svg, Path } from 'svgs';

import { BLACK } from '../../../constants/colors';

/**
 * libra icon component
 * @param {Object} props - components props
 * @param {string} props.className - modifier class name
 * @param {string} props.fill - icon fill modifier
 * @param {number} props.height - icon height
 * @param {(style|Object)} props.style - style override
 * @param {string} props.viewBox - viewBox
 * @param {number} props.width - icon width
 * @returns {JSX}
 */
const libra = ({
  width, height, fill, viewBox, className, style,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M83.62 171.315c2.575.00501 4.895-1.54 5.88-3.915.985-2.375.44-5.105-1.385-6.92-22.24-22.23-22.23-58.26.02-80.48 22.25-22.22 58.315-22.22 80.565 0s22.26 58.25.02 80.485c-1.82 1.815-2.365 4.545-1.38 6.92.985 2.375 3.305 3.92 5.88 3.91501h41.41c3.51 0 6.35-2.84001 6.35-6.34501 0-3.505-2.845-6.345-6.35-6.345h-28.025l1.235-2.015c17.93-29.205 11.935-67.095-14.14-89.35-26.075-22.255-64.485-22.255-90.56 0C57.065 89.52 51.065 127.41 69 156.615l1.235 2.015H42.21c-3.51 0-6.35 2.84-6.35 6.345s2.845 6.34501 6.35 6.34501h41.41v-.00501zM42.205 206.67h172.42c3.51 0 6.35-2.84 6.35-6.345s-2.845-6.345-6.35-6.345H42.205c-3.51 0-6.35 2.84-6.35 6.345s2.845 6.345 6.35 6.345z"
      fill={`${fill || BLACK}`}
      fillRule="nonzero"
    />
  </Svg>
);

libra.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default libra;
