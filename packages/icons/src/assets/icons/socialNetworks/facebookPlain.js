import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, { Path } from 'svgs';

import { DARKER_GREY } from '@univision/fe-utilities/styled/constants';

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
    <Path
      d="M210.7 2.013v40.465h-29.888a31.65 31.65 0 0 0-22.098 5.598 22.152 22.152 0 0 0-5.723 15.994v29.75h55.8l-7.471 45.582h-47.693V256h-58.98V139.243H46V93.819h48.647V60.231c-.837-17.042 6.493-33.455 19.713-44.144A82.318 82.318 0 0 1 167.14.093c14.491-.164 28.98.477 43.4 1.92"
      fill={`${fill || DARKER_GREY}`}
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
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default facebookIcon;
