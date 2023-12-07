import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import Svg, {
  G, Path, Defs, LinearGradient, Stop,
} from 'svgs';

/**
 * surprised component
 * @param {size} size - icon size
 * @param {string} viewBox - viewBox
 * @param {style} style - style override
 * @returns {JSX}
 */
const surprised = ({
  width, height, viewBox, style,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} style={style}>
    <Defs>
      <LinearGradient x1="49.99%" y1="0%" x2="49.99%" y2="100%" id="surprisedA">
        <Stop stopColor="#926505" offset="0%" />
        <Stop stopColor="#C28C2F" offset="100%" />
      </LinearGradient>
      <LinearGradient x1="50.01%" y1="0%" x2="50.01%" y2="100%" id="surprisedB">
        <Stop stopColor="#FAD256" offset="0%" />
        <Stop stopColor="#F9CD53" offset="51%" />
        <Stop stopColor="#F6B947" offset="100%" />
      </LinearGradient>
    </Defs>
    <G fill="none" fillRule="evenodd">
      <Path d="M128 216.62A92.31 92.31 0 1 0 128 32a92.31 92.31 0 0 0 0 184.62z" fill="#FBD15D" />
      <Path d="M26.58 57.6c14.69 0 26.59-12.9 26.59-28.8S41.27 0 26.58 0C11.9 0 0 12.9 0 28.8s11.9 28.8 26.58 28.8z" transform="translate(101.12 130.88)" fill="url(#surprisedA)" />
      <Path d="M127.7 145.06c12.38 0 22.68 9.06 25.65 21.27.55-2.29.94-4.63.94-7.1 0-15.65-11.91-28.35-26.59-28.35-14.67 0-26.58 12.7-26.58 28.36 0 2.46.39 4.8.94 7.09 2.97-12.21 13.27-21.27 25.64-21.27z" fill="#956900" />
      <Path d="M159 27.88C122.9-7.96 64.16-7.96 28.06 27.87a91.52 91.52 0 0 0 0 129.97c36.1 35.82 94.82 35.82 130.91-.01A91.51 91.51 0 0 0 159 27.88zM148.88 147.8c-30.52 30.3-80.2 30.3-110.72 0a77.41 77.41 0 0 1 0-109.92C68.7 7.6 118.36 7.6 148.9 37.9a77.4 77.4 0 0 1-.01 109.9h-.01z" transform="translate(34.25 31)" fill="url(#surprisedB)" fillRule="nonzero" />
      <Path d="M95.24 106.78a11.54 11.54 0 1 0 0-23.08 11.54 11.54 0 0 0 0 23.08z" fill="#926505" />
      <Path d="M95.24 89.47c5.37 0 9.84 3.69 11.13 8.65.24-.93.4-1.88.4-2.88a11.54 11.54 0 0 0-23.07 0c0 1 .17 1.95.41 2.88a11.51 11.51 0 0 1 11.13-8.65z" fill="#AB7934" />
      <Path d="M164.47 106.78a11.54 11.54 0 1 0 0-23.08 11.54 11.54 0 0 0 0 23.08z" fill="#926505" />
      <Path d="M164.47 89.47c5.37 0 9.84 3.69 11.13 8.65.24-.93.4-1.88.4-2.88a11.54 11.54 0 0 0-23.07 0c0 1 .17 1.95.4 2.88a11.52 11.52 0 0 1 11.14-8.65z" fill="#AB7934" />
    </G>
  </Svg>
);

/**
 * surprised props
 * @property {number} width - icon width size
 * @property {number} height - icon height size
 * @property {string} viewBox - viewBox width, height, default: 0 0 256 256
 * @property {(Object|style)} [style] - modifier styles
 */
surprised.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  viewBox: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default surprised;
