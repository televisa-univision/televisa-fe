import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import Svg, { Path } from 'svgs';

/**
 * hotReaction component
 * @param {size} size - icon size
 * @param {string} fill - icon fill modifier
 * @param {string} viewBox - viewBox
 * @param {style} style - style override
 * @returns {JSX}
 */
const hotReaction = ({
  width, height, fill, viewBox, style,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} style={style}>
    <Path d="M85.46 238c-15.12-30.37-7.07-47.77 4.55-64.17 12.73-17.96 16.01-35.73 16.01-35.73s10 12.55 6 32.19c17.68-19 21.01-49.25 18.35-60.84 39.95 26.95 57.02 85.3 34.01 128.55 122.4-66.84 30.45-166.85 14.44-178.12 5.33 11.27 6.35 30.34-4.43 39.6C156.14 32.67 111.02 19 111.02 19c5.34 34.44-19.34 72.1-43.14 100.25-.83-13.74-1.72-23.21-9.2-36.36-1.68 24.95-21.44 45.29-26.79 70.29-7.24 33.85 5.43 58.63 53.57 84.82z" fill={`${fill || '#000000'}`} fillRule="nonzero" />
  </Svg>
);

/**
 * hotReaction props
 * @property {number} width - icon width size
 * @property {number} height - icon height size
 * @property {string} fill - fill color, default: svg file color
 * @property {string} viewBox - viewBox width, height, default: 0 0 256 256
 * @property {(Object|style)} [style] - modifier styles
 */
hotReaction.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  viewBox: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default hotReaction;
