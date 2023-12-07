import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, { Path } from 'svgs';

import { WHITE } from '@univision/fe-utilities/styled/constants';

/**
 * facebookTelevisaIcon component
 * @param {size} size - icon size
 * @param {string} fill - icon fill modifier
 * @param {style} style - style override
 * @param {string} [className] - modifier class
 * @returns {JSX}
 */
const facebookTelevisaIcon = ({
  width, height, fill, style, className,
}) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    style={style}
    className={className}
  >
    <Path
      d="m16.7 15.5.5-3.5h-3.3V9.7c0-.9.5-1.9 2-1.9h1.5v-3s-1.4-.2-2.7-.2c-2.7 0-4.5 1.7-4.5 4.7V12h-3v3.5h3v8.4c.5.1 1.2.1 1.8.1s1.3 0 1.9-.1v-8.4h2.8z"
      fill={fill || WHITE}
    />
  </Svg>
);
/**
 * facebookTelevisaIcon props
 * @property {number} width - icon width size
 * @property {number} height - icon height size
 * @property {string} fill - fill color, default: svg file color
 * @property {(Object|style)} [style] - modifier styles
 * @property {string} [className] - modifier class
 */
facebookTelevisaIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  className: PropTypes.string,
};

export default facebookTelevisaIcon;
