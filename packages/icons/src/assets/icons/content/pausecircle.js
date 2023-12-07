import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import Svg, { G, Path } from 'svgs';

import { BLACK } from '../../../constants/colors';

/**
 * pauseCircle component
 * @param {string} className - component's container className
 * @param {string} fill - icon fill modifier
 * @param {number} height - px height for icon
 * @param {style} style - style override
 * @param {string} viewBox - viewBox
 * @param {number} width - px width for icon
 * @returns {JSX}
 */
const pausecircle = ({
  className, fill, height, style, viewBox, width,
}) => (
  <Svg width={width} height={height} style={style} viewBox={viewBox} className={className}>
    <G fill="none" fillRule="evenodd">
      <Path
        fill={`${fill || BLACK}`}
        d="M104.51 96.471h16.079v64.314H104.51V96.471zm32.157 0h16.079v64.314h-16.079V96.471zm-8.775 153.15c67.704 0 122.582-54.694 122.582-122.155 0-67.46-54.878-122.155-122.582-122.155C60.19 5.31 5.311 60.006 5.311 127.466c0 67.46 54.878 122.155 122.581 122.155zm0 5.312C57.26 254.933 0 197.863 0 127.466 0 57.07 57.26 0 127.892 0c70.634 0 127.893 57.069 127.893 127.466 0 70.398-57.26 127.467-127.893 127.467z"
        fillRule="nonzero"
      />
    </G>
  </Svg>
);

/**
 * pausecircle props
 * @property {string} className - component's container className
 * @property {string} fill - fill color, default: svg file color
 * @property {number} height - px height for icon
 * @property {Object} style - Modifier class
 * @property {string} viewBox - viewBox size, default: 0 0 256 256
 * @property {number} width - px width for icon
 */
pausecircle.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default pausecircle;
