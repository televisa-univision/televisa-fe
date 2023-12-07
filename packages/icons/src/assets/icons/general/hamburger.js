import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, { Path } from 'svgs';

import { BLACK } from '../../../constants/colors';

/**
 * pauseCircle component
 * @param {string} fill - icon fill modifier
 * @param {size} size - icon size
 * @param {style} style - style override
 * @param {string} viewBox - viewBox
 * @returns {JSX}
 */
const hamburger = ({
  width, height, fill, viewBox, style, className,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M0,39 L0,26 L256,26 L256,39 L0,39 Z M0,103 L0,90 L256,90 L256,103 L0,103 Z M0,166 L0,153 L256,153 L256,166 L0,166 Z M0,230 L0,217 L255,217 L255,230 L0,230 Z"
      fill={`${fill || BLACK}`}
      fillRule="evenodd"
    />
  </Svg>
);

/**
 * pauseCircle props
 * @property {number} size - icon size
 * @property {string} fill - fill color, default: svg file color
 * @property {style} Style Modifier class
 * @property {string} viewBox - viewBox size, default: 0 0 256 256
 */
hamburger.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  viewBox: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  className: PropTypes.string,
};

export default hamburger;
