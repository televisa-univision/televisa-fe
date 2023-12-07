import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import Svg, { Path } from 'svgs';

/**
 * alarmOn component
 * @param {size} size - icon size
 * @param {string} fill - icon fill modifier
 * @param {string} viewBox - viewBox
 * @param {style} style - style override
 * @returns {JSX}
 */
const alarmOn = ({
  width, height, fill, viewBox, style,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} style={style}>
    <Path
      fill={`${fill || '#E44233'}`}
      d="M106.667 213.333c0 11.782 9.55 21.334 21.333 21.334 11.782 0 21.333-9.552 21.333-21.334h-42.666zm90.88-10.666H58.88a16.533 16.533 0 0 1-13.653-25.92l19.306-21.334v-49.386C63.35 78.656 80.938 53.989 107.2 46.187v-3.52c0-11.782 9.551-21.334 21.333-21.334 11.782 0 21.334 9.552 21.334 21.334v3.52c26.149 8.252 43.453 33.09 42.133 60.48v49.066l19.52 20.694a16.533 16.533 0 0 1-13.973 26.24z"
    />
  </Svg>
);

/**
 * alarmOn props
 * @property {number} width - icon width size
 * @property {number} height - icon height size
 * @property {string} fill - fill color, default: svg file color
 * @property {string} viewBox - viewBox width, height, default: 0 0 256 256
 * @property {(Object|style)} [style] - modifier styles
 */
alarmOn.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  viewBox: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default alarmOn;
