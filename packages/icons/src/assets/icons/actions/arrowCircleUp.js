import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import Svg, { G, Path } from 'svgs';

import { BLACK } from '../../../constants/colors';

/**
 * arrowCircleUp component
 * @param {size} size - icon size
 * @param {string} fill - icon fill modifier
 * @param {style} style - style override
 * @returns {JSX}
 */
const arrowCircleUp = ({
  width, height, fill, style, className,
}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" style={style} className={className}>
    <G fill="none" fillRule="evenodd">
      <Path d="m0 0h24v24h-24z" />
      <Path d="m12 20c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8m0 2c5.52 0 10-4.48 10-10s-4.48-10-10-10-10 4.48-10 10 4.48 10 10 10zm-1-10v3c0 .55.45 1 1 1 .55 0 1-.45 1-1v-3h1.79c.45 0 .67-.54.35-.85l-2.79-2.79c-.2-.2-.51-.2-.71 0l-2.79 2.79c-.31.31-.09.85.36.85z" fill={fill} fillRule="nonzero" />
    </G>
  </Svg>
);

/**
 * arrowCircleUp props
 * @property {number} width - icon width size
 * @property {number} height - icon height size
 * @property {string} fill - fill color, default: svg file color
 * @property {(Object|style)} [style] - modifier styles
 * @property {string} className - modifier class
 */
arrowCircleUp.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  className: PropTypes.string,
};

arrowCircleUp.defaultProps = {
  fill: BLACK,
};

export default arrowCircleUp;
