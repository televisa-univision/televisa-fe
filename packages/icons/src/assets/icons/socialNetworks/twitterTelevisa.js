import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, { Path } from 'svgs';

import { WHITE } from '@univision/fe-utilities/styled/constants';

/**
 * twitterTelevisaIcon component
 * @param {size} size - icon size
 * @param {string} fill - icon fill modifier
 * @param {style} style - style override
 * @param {string} [className] - modifier class
 * @returns {JSX}
 */
const twitterTelevisaIcon = ({
  width, height, fill, style, className,
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    style={style}
    className={className}
  >
    <Path
      d="m5.5 5.9 5 6.7-5.1 5.5h1.1l4.4-4.8 3.6 4.8h3.9L13.2 11l4.7-5.1h-1.1l-4.1 4.4-3.3-4.4H5.5zm1.7.9H9l7.8 10.5H15L7.2 6.8z"
      fill={fill || WHITE}
    />
  </svg>
);
/**
 * twitterTelevisaIcon props
 * @property {number} width - icon width size
 * @property {number} height - icon height size
 * @property {string} fill - fill color, default: svg file color
 * @property {(Object|style)} [style] - modifier styles
 * @property {string} [className] - modifier class
 */
twitterTelevisaIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  className: PropTypes.string,
};

export default twitterTelevisaIcon;
