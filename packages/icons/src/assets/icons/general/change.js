import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import Svg, { Path } from 'svgs';

/**
 * change component
 * @param {size} size - icon size
 * @param {string} fill - icon fill modifier
 * @param {string} viewBox - viewBox
 * @param {style} style - style override
 * @returns {JSX}
 */
const change = ({
  width, height, fill, viewBox, style,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} style={style}>
    <Path
      fill={`${fill || '#21B63B'}`}
      d="M235.2 155.093l-37.76-37.76-7.573 7.574 24.533 24.426H96V160h119.147l-25.28 25.28 7.573 7.573 37.76-37.76z"
    />
    <Path
      fill={`${fill || '#D0021B'}`}
      d="M42.667 96l24.426-24.427L59.52 64l-37.653 37.76 37.653 37.76 7.573-7.573-25.28-25.28H160V96z"
    />
  </Svg>
);

/**
 * change props
 * @property {number} width - icon width size
 * @property {number} height - icon height size
 * @property {string} fill - fill color, default: svg file color
 * @property {string} viewBox - viewBox width, height, default: 0 0 256 256
 * @property {(Object|style)} [style] - modifier styles
 */
change.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  viewBox: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default change;
