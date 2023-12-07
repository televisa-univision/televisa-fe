import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import Svg, { G, Path } from 'svgs';

/**
 * yesReaction component
 * @param {size} size - icon size
 * @param {string} viewBox - viewBox
 * @param {style} style - style override
 * @returns {JSX}
 */
const yesReaction = ({
  width, height, viewBox, style,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} style={style}>
    <G fillRule="nonzero" fill="none">
      <Path d="M127.04 145.5a9.81 9.81 0 0 0-3.41-7.8 33.92 33.92 0 0 0-11.95-5.54 67.73 67.73 0 0 1-22.19-10.67 19.63 19.63 0 0 1-7.57-16.32 20.48 20.48 0 0 1 8.53-16.96 34.56 34.56 0 0 1 21.34-6.61c8.1-.4 16.07 2.1 22.5 7.04a22.08 22.08 0 0 1 8.22 18.56h-16c.23-3.65-1.18-7.2-3.84-9.7-3.01-2.43-6.81-3.64-10.67-3.42-3.5-.24-6.95.83-9.7 2.99a9.81 9.81 0 0 0-3.42 7.68 8.43 8.43 0 0 0 3.73 7.04 49.6 49.6 0 0 0 12.8 5.86 54.93 54.93 0 0 1 21.34 10.67 21.33 21.33 0 0 1 7.25 16.75 20.16 20.16 0 0 1-8.43 17.06 36.7 36.7 0 0 1-22.4 6.3 39.9 39.9 0 0 1-23.36-6.83 22.3 22.3 0 0 1-9.49-20.16h16.43a13.23 13.23 0 0 0 4.37 10.67 18.56 18.56 0 0 0 11.95 3.52c3.78.3 7.55-.71 10.66-2.88a9.17 9.17 0 0 0 3.31-7.26zm59.87-70.58l-18.96 22-12 .3 12.96-22.4 18 .1zm-14 92.65h-16.96v-62.72h16.96v62.72z" fill="#FFF" />
      <Path d="M128 234.67C69.09 234.67 21.33 186.9 21.33 128 21.33 69.09 69.1 21.33 128 21.33c58.91 0 106.67 47.76 106.67 106.67 0 58.91-47.76 106.67-106.67 106.67zM128 32a96 96 0 0 0-96 96 96 96 0 0 0 96 96 96 96 0 0 0 96-96 96 96 0 0 0-96-96z" fill="#0B964C" />
    </G>
  </Svg>
);

/**
 * yesReaction props
 * @property {number} width - icon width size
 * @property {number} height - icon height size
 * @property {string} viewBox - viewBox width, height, default: 0 0 256 256
 * @property {(Object|style)} [style] - modifier styles
 */
yesReaction.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  viewBox: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default yesReaction;
