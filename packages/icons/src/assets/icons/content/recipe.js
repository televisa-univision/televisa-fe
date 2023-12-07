import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import Svg, { Path } from 'svgs';

/**
 * recipe component
 * @param {size} size - icon size
 * @param {string} fill - icon fill modifier
 * @param {string} viewBox - viewBox
 * @param {style} style - style override
 * @returns {JSX}
 */
const recipe = ({
  width, height, fill, viewBox, style, className,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} style={style} className={className}>
    <Path
      fill={`${fill || '#000000'}`}
      fillRule="nonzero"
      d="M87 235H53c-11.046 0-20-8.954-20-20V39c0-11.046 8.954-20 20-20h123c11.046 0 20 8.954 20 20v62c0 5.523 4.477 10 10 10s10-4.477 10-10V39c0-22-18-40-40-40H53C31-1 13 17 13 39v176c0 22 18 40 40 40h34c5.523 0 10-4.477 10-10s-4.477-10-10-10zm89-126c0-5.523-4.477-10-10-10H63c-5.523 0-10 4.477-10 10s4.477 10 10 10h103c5.523 0 10-4.477 10-10zM63 139c-5.523 0-10 4.477-10 10s4.477 10 10 10h63c5.523 0 10-4.477 10-10s-4.477-10-10-10H63zm150-4c8 0 15 3 21 9 11.434 11.665 11.434 30.335 0 42l-55 55-4 2-41 12a10 10 0 0 1-12-13l12-39 2-4 55-55c6-6 14-9 22-9zm-67 96l21-6 36-37-14-14-37 37-6 20zm72-57l2-2a10 10 0 0 0-14-14l-2 2 14 14zM63 59h103c5.523 0 10 4.477 10 10s-4.477 10-10 10H63c-5.523 0-10-4.477-10-10s4.477-10 10-10z"
    />
  </Svg>
);

/**
 * recipe props
 * @property {number} width - icon width size
 * @property {number} height - icon height size
 * @property {string} fill - fill color, default: svg file color
 * @property {string} viewBox - viewBox width, height, default: 0 0 256 256
 * @property {(Object|style)} [style] - modifier styles
 * @property {string} className - modifier class
 */
recipe.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  viewBox: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  className: PropTypes.string,
};

export default recipe;
