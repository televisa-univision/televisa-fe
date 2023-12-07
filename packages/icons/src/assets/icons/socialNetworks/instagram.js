import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, { Path } from 'svgs';

import { INSTAGRAM_BACKGROUND, WHITE } from '@univision/fe-utilities/styled/constants';

/**
 * instagramIcon component
 * @param {size} size - icon size
 * @param {string} fill - icon fill modifier
 * @param {string} viewBox - viewBox
 * @param {style} style - style override
 * @param {string} [className] - modifier class
 * @returns {JSX}
 */
const instagramIcon = ({
  width, height, fill, viewBox, style, className,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} style={style} className={className}>
    <Path d="M128 256A128 128 0 011 128a128 128 0 11127 128z" fill={`${fill || INSTAGRAM_BACKGROUND}`} />
    <Path
      d="M128 93a203 203 0 0125 2c4 1 7 4 8 8l2 8v34l-2 8a14 14 0 01-8 8l-8 1-17 1-17-1-8-1a14 14 0 01-8-8l-2-8v-17a206 206 0 012-25c1-4 4-7 8-8l8-2h17zm0-8h-17l-11 2a22 22 0 00-12 13 31 31 0 00-2 10v35l2 11a22 22 0 0012 12l10 2h36l10-2a22 22 0 0012-12c2-4 2-7 2-11l1-17-1-18c0-3 0-7-2-10a22 22 0 00-12-13 31 31 0 00-10-2h-18zm0 21a22 22 0 100 44 22 22 0 000-44zm0 36a14 14 0 110-28 14 14 0 010 28zm23-32a5 5 0 110-10 5 5 0 010 10z"
      fill={WHITE}
    />
  </Svg>
);
/**
 * instagramIcon props
 * @property {number} width - icon width size
 * @property {number} height - icon height size
 * @property {string} fill - fill color, default: svg file color
 * @property {string} viewBox - viewBox width, height, default: 0 0 256 256
 * @property {(Object|style)} [style] - modifier styles
 * @property {string} [className] - modifier class
 */
instagramIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  viewBox: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  className: PropTypes.string,
};

export default instagramIcon;
