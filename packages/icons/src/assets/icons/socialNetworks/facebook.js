import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, { Path } from 'svgs';

import { FACEBOOK_BACKGROUND, WHITE } from '@univision/fe-utilities/styled/constants';

/**
 * facebookIcon component
 * @param {size} size - icon size
 * @param {string} fill - icon fill modifier
 * @param {string} viewBox - viewBox
 * @param {style} style - style override
 * @param {string} [className] - modifier class
 * @returns {JSX}
 */
const facebookIcon = ({
  width, height, fill, viewBox, style, className,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} style={style} className={className}>
    <Path d="M128 256a128 128 0 110-256 128 128 0 010 256z" fill={`${fill || FACEBOOK_BACKGROUND}`} />
    <Path
      d="M150 95v10h-8a8 8 0 00-6 2 6 6 0 00-2 4v8h15l-2 12h-13v31h-15v-31h-13v-12h13v-9a14 14 0 015-12c4-3 9-4 14-4l12 1"
      fill={WHITE}
    />
  </Svg>
);
/**
 * facebookIcon props
 * @property {number} width - icon width size
 * @property {number} height - icon height size
 * @property {string} fill - fill color, default: svg file color
 * @property {string} viewBox - viewBox width, height, default: 0 0 256 256
 * @property {(Object|style)} [style] - modifier styles
 * @property {string} [className] - modifier class
 */
facebookIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  viewBox: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  className: PropTypes.string,
};

export default facebookIcon;
