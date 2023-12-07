import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import Svg, { Path } from 'svgs';

/**
 * rewind10 component
 * @param {number} width - icon width size
 * @param {number} height - icon height size
 * @param {string} fill - fill color, default: svg file color
 * @param {string} viewBox - viewBox width, height, default: 0 0 256 256
 * @param {(Object|style)} [style] - modifier styles
 * @param {string} className - modifier class
 * @returns {JSX}
 */
const rewind10 = ({
  width, height, fill, viewBox, style, className,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} style={style} className={className}>
    <Path d="M128 21.333c58.816 0 106.667 47.851 106.667 106.667S186.816 234.667 128 234.667 21.333 186.816 21.333 128c0-17.077 3.915-33.387 11.627-48.48l9.493 4.853C35.52 97.952 32 112.63 32 128c0 52.928 43.061 96 96 96s96-43.072 96-96-43.061-96-96-96c-22.155 0-43.253 7.541-60.288 21.333H96V64H53.333V21.333H64v21.44c18.39-13.856 40.65-21.44 64-21.44zm32.79 97.373c0-4.084-.792-7.25-2.385-9.49-1.592-2.247-3.802-3.375-6.636-3.375-2.857 0-5.067 1.128-6.628 3.375-1.562 2.24-2.34 5.406-2.34 9.49v20.078c0 4.174.785 7.377 2.362 9.61 1.578 2.225 3.81 3.345 6.698 3.345 2.826 0 5.02-1.12 6.582-3.345 1.562-2.233 2.347-5.436 2.347-9.61v-20.078zm12.99 18.853c0 7.467-2.003 13.336-6.003 17.592-4 4.256-9.31 6.384-15.916 6.384-6.667 0-12.008-2.128-16.023-6.384-4.023-4.256-6.027-10.125-6.027-17.592V120.02c0-7.437 1.996-13.298 6.004-17.591 4-4.286 9.318-6.429 15.954-6.429 6.613 0 11.932 2.143 15.962 6.429 4.03 4.293 6.05 10.154 6.05 17.591v17.54zm-65.132 23.058h-12.99v-52.588h-13.44v-9.76L108.647 96v64.617z" fill={`${fill || '#000000'}`} fillRule="nonzero" />
  </Svg>
);

rewind10.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  viewBox: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  className: PropTypes.string,
};

export default rewind10;
