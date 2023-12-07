import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import Svg, { Path } from 'svgs';

/**
 * heart component
 * @param {size} size - icon size
 * @param {string} props.fill - icon fill modifier
 * @param {string} viewBox - viewBox
 * @param {string} props.className - modifier class name
 * @param {style} style - style override
 * @returns {JSX}
 */
const heart = ({
  width, height, fill, viewBox, style, className,
}) => (
  <Svg width={width} height={height} className={className} viewBox={viewBox} style={style}>
    <Path d="M198.78 70.06a47.47 47.47 0 0 0-33.8-13.95 47.6 47.6 0 0 0-33.84 13.99l-4.72 4.71-4.8-4.78A47.71 47.71 0 0 0 87.75 56a47.54 47.54 0 0 0-33.76 13.95A47.17 47.17 0 0 0 40 103.71a47.3 47.3 0 0 0 14.06 33.71l68.77 68.6a4.94 4.94 0 0 0 6.96.04l68.91-68.5a47.36 47.36 0 0 0 14.03-33.74 47.14 47.14 0 0 0-13.95-33.76z" fill={`${fill || '#D0021B'}`} fillRule="evenodd" />
  </Svg>
);

/**
 * heart props
 * @param {string} props.className - modifier class name
 * @property {number} width - icon width size
 * @property {number} height - icon height size
 * @property {string} fill - fill color, default: svg file color
 * @property {string} viewBox - viewBox width, height, default: 0 0 256 256
 * @property {(Object|style)} [style] - modifier styles
 */
heart.propTypes = {
  className: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  viewBox: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default heart;
