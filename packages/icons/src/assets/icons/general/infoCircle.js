import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import Svg, { Path } from 'svgs';

/**
 * infoCircle component
 * @param {number} width - icon width size
 * @param {number} height - icon height size
 * @param {string} fill - fill color, default: svg file color
 * @param {string} viewBox - viewBox width, height, default: 0 0 256 256
 * @param {(Object|style)} [style] - modifier styles
 * @param {string} className - modifier class
 * @returns {JSX}
 */
const infoCircle = ({
  width, height, fill, viewBox, style, className,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} style={style} className={className}>
    <Path d="M128 234.667C69.09 234.667 21.333 186.91 21.333 128 21.333 69.09 69.09 21.333 128 21.333c58.91 0 106.667 47.757 106.667 106.667 0 58.91-47.757 106.667-106.667 106.667zm0-9.35c53.747 0 97.317-43.57 97.317-97.317 0-53.747-43.57-97.317-97.317-97.317-53.747 0-97.317 43.57-97.317 97.317 0 53.747 43.57 97.317 97.317 97.317zm0-151.854c8.592 0 15.582 6.993 15.582 15.589 0 8.588-6.99 15.575-15.582 15.575s-15.582-6.987-15.582-15.575c0-8.596 6.99-15.59 15.582-15.59zm0 38.955c6.454 0 11.687 3.924 11.687 8.765v52.59c0 4.84-5.233 8.764-11.687 8.764s-11.687-3.924-11.687-8.765v-52.59c0-4.84 5.233-8.764 11.687-8.764z" fill={`${fill || '#000000'}`} fillRule="nonzero" />
  </Svg>
);

infoCircle.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  viewBox: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  className: PropTypes.string,
};

export default infoCircle;
