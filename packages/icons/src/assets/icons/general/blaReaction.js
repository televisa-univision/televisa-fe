import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import Svg, { Path } from 'svgs';

/**
 * blaReaction component
 * @param {size} size - icon size
 * @param {string} fill - icon fill modifier
 * @param {string} viewBox - viewBox
 * @param {style} style - style override
 * @returns {JSX}
 */
const blaReaction = ({
  width, height, fill, viewBox, style,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} style={style}>
    <Path d="M207.38 50.33c-43.5-43.1-114.26-43.1-157.75 0a109.97 109.97 0 0 0 0 156.35c43.49 43.1 114.26 43.1 157.74-.01a109.96 109.96 0 0 0 .01-156.34zm-12.17 144.28c-36.78 36.45-96.63 36.46-133.42.01a93.01 93.01 0 0 1 0-132.24c36.79-36.44 96.63-36.45 133.43.01a93 93 0 0 1-.01 132.22zM86.89 98.58c0-7.13 5.83-12.92 13.04-12.92 7.2 0 13.03 5.79 13.03 12.92 0 7.14-5.83 12.92-13.03 12.92-7.2 0-13.04-5.78-13.04-12.92zm59.12 0c0-7.13 5.84-12.92 13.04-12.92 7.2 0 13.04 5.79 13.04 12.92 0 7.14-5.83 12.92-13.04 12.92-7.2 0-13.04-5.78-13.04-12.92z" fill={`${fill || '#000000'}`} fillRule="nonzero" />
  </Svg>
);

/**
 * blaReaction props
 * @property {number} width - icon width size
 * @property {number} height - icon height size
 * @property {string} fill - fill color, default: svg file color
 * @property {string} viewBox - viewBox width, height, default: 0 0 256 256
 * @property {(Object|style)} [style] - modifier styles
 */
blaReaction.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  viewBox: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default blaReaction;
