import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import Svg, { G, Path } from 'svgs';

/**
 * noReaction component
 * @param {size} size - icon size
 * @param {string} viewBox - viewBox
 * @param {style} style - style override
 * @returns {JSX}
 */
const noReaction = ({
  width, height, viewBox, style,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} style={style}>
    <G fillRule="nonzero" fill="none">
      <Path fill="#FFF" d="M131.1 164.17h-15.4l-31.03-51.9v51.9H68.83V87.13h15.51l31.03 51.57V87.13h15.41z" />
      <Path d="M141.8 134.95a30.7 30.7 0 0 1 7.17-21.4 24.93 24.93 0 0 1 19.8-8.13 25.14 25.14 0 0 1 19.9 8.13 30.6 30.6 0 0 1 7.17 21.4v1.07a30.6 30.6 0 0 1-7.17 21.4 25.04 25.04 0 0 1-19.8 8.14c-7.42.2-14.54-2.9-19.47-8.46a30.6 30.6 0 0 1-7.17-21.4l-.43-.75zm15.41 1.07c-.17 4.4.83 8.75 2.89 12.63a10.7 10.7 0 0 0 17.66 0 24.72 24.72 0 0 0 2.78-12.52v-1.07a24.5 24.5 0 0 0-2.78-12.41 9.52 9.52 0 0 0-9.1-5.35 9.42 9.42 0 0 0-8.77 4.81c-2 3.83-2.96 8.1-2.79 12.42l.11 1.5z" fill="#FFF" fillRule="nonzero" />
      <Path d="M128 235c-59.1 0-107-47.9-107-107S68.9 21 128 21s107 47.9 107 107-47.9 107-107 107zm0-203.3a96.3 96.3 0 1 0 0 192.6 96.3 96.3 0 0 0 0-192.6z" fill="#BC0D0D" fillRule="nonzero" />
    </G>
  </Svg>
);

/**
 * noReaction props
 * @property {number} width - icon width size
 * @property {number} height - icon height size
 * @property {string} viewBox - viewBox width, height, default: 0 0 256 256
 * @property {(Object|style)} [style] - modifier styles
 */
noReaction.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  viewBox: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default noReaction;
