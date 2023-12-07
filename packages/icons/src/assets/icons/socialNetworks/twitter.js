import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, { Path } from 'svgs';

import { TWITTER_BACKGROUND, WHITE } from '@univision/fe-utilities/styled/constants';

/**
 * twitterIcon component
 * @param {size} size - icon size
 * @param {string} fill - icon fill modifier
 * @param {string} viewBox - viewBox
 * @param {style} style - style override
 * @param {string} [className] - modifier class
 * @returns {JSX}
 */
const twitterIcon = ({
  width, height, fill, viewBox, style, className,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} style={style} className={className}>
    <Path d="M128 256A128 128 0 011 128a128 128 0 11127 128z" fill={`${fill || TWITTER_BACKGROUND}`} />
    <Path
      d="M171 102a36 36 0 01-9 9v2a48 48 0 01-8 27l-10 11c-4 4-9 6-14 8a51 51 0 01-44-5 34 34 0 0026-7 17 17 0 01-11-3c-3-2-5-5-6-9l3 1 5-1a17 17 0 01-10-6c-3-3-4-7-4-11l8 2a17 17 0 01-5-23c4 5 9 10 15 13a49 49 0 0020 5v-4c0-4 2-9 5-12a18 18 0 0125 1l11-5c-1 4-4 8-8 10a35 35 0 0011-3"
      fill={WHITE}
    />
  </Svg>
);
/**
 * twitterIcon props
 * @property {number} width - icon width size
 * @property {number} height - icon height size
 * @property {string} fill - fill color, default: svg file color
 * @property {string} viewBox - viewBox width, height, default: 0 0 256 256
 * @property {(Object|style)} [style] - modifier styles
 * @property {string} [className] - modifier class
 */
twitterIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  viewBox: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  className: PropTypes.string,
};

export default twitterIcon;
