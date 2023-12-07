import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, { Path } from 'svgs';

import { BLACK } from '../../../constants/colors';

/**
 * refresh component
 * @param {size} size - icon size
 * @param {string} fill - icon fill modifier
 * @param {string} viewBox - viewBox
 * @param {style} style - style override
 * @param {string} props.className - modifier class name
 * @returns {JSX}
 */
const refresh = ({
  width, height, fill, viewBox, className, style,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M233.639 4.43L195.982 46.27C177.71 29.266 153.972 18.807 128 18.807c-58.778 0-105.639 52.693-105.639 116.382 0 63.69 46.861 116.381 105.639 116.381 50.638 0 92.452-39.244 102.975-90.715l2.197-10.746h-29.156l-1.608 6.93c-8.727 37.62-38.92 64.69-74.408 64.69-42.097 0-76.99-38.158-76.99-86.54 0-48.381 34.893-86.54 76.99-86.54 18.2 0 34.8 7.166 48.053 19.251l-48.121 49.45 79.705-.05H233.639V4.43z"
      fillRule="evenodd"
      fill={fill || BLACK}
    />
  </Svg>
);

/**
 * refresh props
 * @property {number} width - icon width size
 * @property {number} height - icon height size
 * @property {string} fill - fill color, default: svg file color
 * @property {string} viewBox - viewBox width, height, default: 0 0 256 256
 * @property {(Object|style)} [style] - modifier styles
 */
refresh.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  viewBox: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default refresh;
