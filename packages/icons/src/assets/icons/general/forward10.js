import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import Svg, { Path } from 'svgs';

/**
 * forward10 component
 * @param {number} width - icon width size
 * @param {number} height - icon height size
 * @param {string} fill - fill color, default: svg file color
 * @param {string} viewBox - viewBox width, height, default: 0 0 256 256
 * @param {(Object|style)} [style] - modifier styles
 * @param {string} className - modifier class
 * @returns {JSX}
 */
const forward10 = ({
  width, height, fill, viewBox, style, className,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} style={style} className={className}>
    <Path d="M128 21.333c23.35 0 45.61 7.584 64 21.44v-21.44h10.667V64H160V53.333h28.288C171.253 39.541 150.155 32 128 32c-52.939 0-96 43.072-96 96s43.061 96 96 96 96-43.072 96-96c0-15.37-3.52-30.048-10.453-43.627l9.493-4.853c7.712 15.093 11.627 31.403 11.627 48.48 0 58.816-47.851 106.667-106.667 106.667S21.333 186.816 21.333 128 69.184 21.333 128 21.333zm32.79 97.373c0-4.084-.792-7.25-2.385-9.49-1.592-2.247-3.802-3.375-6.636-3.375-2.857 0-5.067 1.128-6.628 3.375-1.562 2.24-2.34 5.406-2.34 9.49v20.078c0 4.174.785 7.377 2.362 9.61 1.578 2.225 3.81 3.345 6.698 3.345 2.826 0 5.02-1.12 6.582-3.345 1.562-2.233 2.347-5.436 2.347-9.61v-20.078zm12.99 18.853c0 7.467-2.003 13.336-6.003 17.592-4 4.256-9.31 6.384-15.916 6.384-6.667 0-12.008-2.128-16.023-6.384-4.023-4.256-6.027-10.125-6.027-17.592V120.02c0-7.437 1.996-13.298 6.004-17.591 4-4.286 9.318-6.429 15.954-6.429 6.613 0 11.932 2.143 15.962 6.429 4.03 4.293 6.05 10.154 6.05 17.591v17.54zm-65.132 23.058h-12.99v-52.588h-13.44v-9.76L108.647 96v64.617z" fill={`${fill || '#000000'}`} fillRule="nonzero" />
  </Svg>
);

forward10.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  viewBox: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  className: PropTypes.string,
};

export default forward10;
