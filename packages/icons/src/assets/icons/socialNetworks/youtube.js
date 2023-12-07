import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, { Path } from 'svgs';

import { YOUTUBE_BACKGROUND, WHITE } from '@univision/fe-utilities/styled/constants';

/**
 * youtubeIcon component
 * @param {size} size - icon size
 * @param {string} fill - icon fill modifier
 * @param {string} viewBox - viewBox
 * @param {style} style - style override
 * @param {string} [className] - modifier class
 * @returns {JSX}
 */
const youtubeIcon = ({
  width, height, fill, viewBox, style, className,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} style={style} className={className}>
    <Path d="M128 256A128 128 0 010 128a128 128 0 11128 128z" fill={`${fill || YOUTUBE_BACKGROUND}`} />
    <Path
      d="M168 107a111 111 0 010 41c-1 4-4 7-7 8-7 2-34 2-34 2s-26 0-33-2c-4-1-7-4-7-8a111 111 0 010-41c1-3 3-6 7-7 7-2 33-2 33-2s27 0 34 2c3 1 6 4 7 7zm-49 34l22-13-22-13v26z"
      fill={WHITE}
    />
  </Svg>
);

/**
 * youtubeIcon props
 * @property {number} width - icon width size
 * @property {number} height - icon height size
 * @property {string} fill - fill color, default: svg file color
 * @property {string} viewBox - viewBox width, height, default: 0 0 256 256
 * @property {(Object|style)} [style] - modifier styles
 * @property {string} [className] - modifier class
 */
youtubeIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  viewBox: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  className: PropTypes.string,
};

export default youtubeIcon;
