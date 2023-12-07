import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import { BLACK } from '@univision/fe-utilities/styled/constants';

import Svg, { Path } from 'svgs';

/**
 * textAlignLeft component
 * @param {string} fill - icon fill modifier
 * @param {string} viewBox - viewBox
 * @param {style} style - style override
 * @param {string} className - className selector
 * @returns {JSX}
 */
const textAlignLeft = ({
  width, height, fill, viewBox, style, className,
}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox={viewBox}
    width={width}
    height={height}
    style={style}
    className={className}
    fill="none"
  >
    <Path
      fill={fill || BLACK}
      d="M40 76h176a8 8 0 1 0 0-16H40a8 8 0 0 0 0 16ZM40 116h128a8 8 0 1 0 0-16H40a8 8 0 0 0 0 16ZM216 140H40a8 8 0 0 0 0 16h176a8 8 0 1 0 0-16ZM168 180H40a8 8 0 0 0 0 16h128a8 8 0 1 0 0-16Z"
    />
  </Svg>
);

/**
 * textAlignLeft props
 * @property {number} width - icon width size
 * @property {number} height - icon height size
 * @property {string} fill - fill color, default: svg file color
 * @property {string} viewBox - viewBox width, height, default: 0 0 256 256
 * @property {(Object|style)} [style] - modifier styles
 * @property {string} className - modifier class
 */
textAlignLeft.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  viewBox: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  className: PropTypes.string,
};

export default textAlignLeft;
