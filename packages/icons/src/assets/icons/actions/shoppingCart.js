import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import Svg, { G, Path } from 'svgs';

import { BLACK } from '../../../constants/colors';

/**
 * shoppingCart component
 * @param {size} size - icon size
 * @param {string} fill - icon fill modifier
 * @param {style} style - style override
 * @returns {JSX}
 */
const shoppingCart = ({
  width, height, fill, style, className,
}) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    style={style}
    className={className}
  >
    <G fill="none" fillRule="evenodd">
      <Path d="m0 0h24v24h-24z" />
      <Path d="m7 18c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-6-15c0 .55.45 1 1 1h1l3.6 7.59-1.35 2.44c-.73 1.34.23 2.97 1.75 2.97h11c.55 0 1-.45 1-1s-.45-1-1-1h-11l1.1-2h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.37-.66-.11-1.48-.87-1.48h-14.8l-.67-1.43c-.16-.35-.52-.57-.9-.57h-1.64c-.55 0-1 .45-1 1zm16 15c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" fill={fill} fillRule="nonzero" />
    </G>
  </Svg>
);

/**
 * shoppingCart props
 * @property {number} width - icon width size
 * @property {number} height - icon height size
 * @property {string} fill - fill color, default: svg file color
 * @property {(Object|style)} [style] - modifier styles
 * @property {string} className - modifier class
 */
shoppingCart.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  className: PropTypes.string,
};

shoppingCart.defaultProps = {
  fill: BLACK,
};

export default shoppingCart;
