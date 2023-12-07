import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, { Path } from 'svgs';

import { DARKER_GREY } from '../../../constants/colors';

/**
 * whatsappIcon component
 * @param {size} size - icon size
 * @param {string} fill - icon fill modifier
 * @param {string} viewBox - viewBox
 * @param {style} style - style override
 * @param {string} [className] - modifier class
 * @returns {JSX}
 */
const whatsappIcon = ({
  width, height, fill, viewBox, style, className,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} style={style} className={className}>
    <Path
      d="M23.276 201.67l-12.8 44.158 45.695-11.776 4.736 2.944c55.449 34.133 127.686 21.197 167.846-30.055 40.16-51.253 35.442-124.487-10.962-170.163C171.388-8.9 98.088-12.46 47.476 28.506c-50.611 40.964-62.404 113.397-27.4 168.3l3.2 4.864zM50.923 81.354a45.566 45.566 0 0 1 15.103-23.04 12.8 12.8 0 0 1 8.576-2.943h9.984a5.248 5.248 0 0 1 4.736 3.711l14.335 34.047a5.12 5.12 0 0 1-.896 5.376l-12.8 14.72a3.84 3.84 0 0 0 0 4.223 103.932 103.932 0 0 0 55.935 48.639 3.84 3.84 0 0 0 4.223-1.28l12.8-17.152a5.12 5.12 0 0 1 6.272-1.536l33.79 15.616a5.12 5.12 0 0 1 2.945 5.76l-1.664 7.423a32.255 32.255 0 0 1-14.08 20.48 42.623 42.623 0 0 1-36.095 4.48 162.298 162.298 0 0 1-87.549-63.998 69.63 69.63 0 0 1-15.615-54.526z"
      fill={`${fill || DARKER_GREY}`}
    />
  </Svg>
);

/**
 * whatsappIcon props
 * @property {number} width - icon width size
 * @property {number} height - icon height size
 * @property {string} fill - fill color, default: svg file color
 * @property {string} viewBox - viewBox width, height, default: 0 0 256 256
 * @property {(Object|style)} [style] - modifier styles
 * @property {string} [className] - modifier class
 */
whatsappIcon.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default whatsappIcon;
