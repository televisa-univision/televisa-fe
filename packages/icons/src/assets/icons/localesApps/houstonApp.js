import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, {
  Path, Defs, G, LinearGradient, Stop,
} from 'svgs';

/**
 * houstonApp component
 * @param {size} size - icon size
 * @param {string} fill - icon fill modifier
 * @param {string} viewBox - viewBox
 * @param {style} style - style override
 * @param {string} [className] - modifier class
 * @param {bool} [removeGradient] - indicates if shoudl render the linear Gradient.
 * @returns {JSX}
 */
const houstonApp = ({
  width, height, fill, viewBox, style, className, removeGradient,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} style={style} className={className}>
    {!removeGradient && (
      <Defs>
        <LinearGradient x1="1%" y1="-2%" x2="62%" y2="92%" id="houstonApp">
          <Stop stopColor="#222E57" offset="0%" />
          <Stop stopColor="#222E57" offset="45%" />
          <Stop stopColor="#101833" offset="100%" />
        </LinearGradient>
      </Defs>
    )}
    <G fillRule="nonzero" fill="none">
      {!removeGradient && <Path fill={`${fill || 'url(#houstonApp)'}`} d="M27 0h202c15 0 27 12 27 27v202c0 15-12 27-27 27H27c-15 0-27-12-27-27V27C0 12 12 0 27 0z" />}
      <Path d="M48 183H32v14h-5v-30h5v11h16v-11h5v30h-5v-14zm25 9c6 0 10-4 10-10s-4-11-10-11-10 5-10 11 4 10 10 10zm0-26c9 0 16 7 16 16 0 8-7 15-16 15s-16-7-16-15c0-9 7-16 16-16zm24 28c-3-2-4-5-4-10v-17h6v18c0 2 0 4 2 5 1 2 3 2 5 2s4 0 5-2l2-5v-18h6v17c0 5-2 8-4 10l-9 3c-4 0-7-1-9-3zm28-5c2 2 5 3 7 3 3 0 5-1 5-4 0-4-6-4-10-6-2-2-4-4-4-7 0-6 5-9 10-9l9 3-3 4-6-2c-2 0-4 1-4 4 0 5 14 3 14 13 0 6-5 9-11 9-4 0-7-1-10-4l3-4zm40-22v5h-8v25h-6v-25h-8v-5h22zm17 25c6 0 10-4 10-10s-4-11-10-11-10 5-10 11 4 10 10 10zm0-26c9 0 16 7 16 16 0 8-7 15-16 15s-16-7-16-15c0-9 7-16 16-16zm20 1h4l17 19v-19h5v30h-4l-17-20v20h-5v-30zM149 110V91l-15 19h15zm16-48v48h13v14h-13v19h-16v-19h-37v-9l42-53h11zm28 62c3 3 8 6 14 6 3 0 7-1 9-4 3-2 5-6 5-10s-2-8-5-11c-3-2-6-3-10-3s-8 1-12 4l-9-1 5-43h42v14h-30l-1 12a33 33 0 0 1 25 6c7 5 11 13 11 22 0 16-14 28-30 28-10 0-18-3-25-10l11-10z" fill="#FFF" />
      <Path d="M53 59v50l28-1 8-1 14-5V64c-5-3-26-5-50-5" fill="#00C56E" />
      <Path d="M103 102l-14 5-8 1-28 1a341 341 0 0 0 2 28c1 4 2 7 4 9h2c14 0 27-7 35-18l6-14 1-11v-1" fill="#1717EF" />
      <Path d="M59 146c-2-2-3-5-4-9a91 91 0 0 1-2-22 238 238 0 0 1 0-6l-25-2c-5-1-8-3-9-4l2 13a42 42 0 0 0 38 30" fill="#FF161F" />
      <Path d="M21 62l-2 2v39c1 1 4 3 9 4h2l23 2V78a43 43 0 0 0-32-16" fill="#E621BB" />
    </G>
  </Svg>
);

/**
 * houstonApp props
 * @property {number} width - icon width size
 * @property {number} height - icon height size
 * @property {string} fill - fill color, default: svg file color
 * @property {string} viewBox - viewBox width, height, default: 0 0 256 256
 * @property {(Object|style)} [style] - modifier styles
 * @property {string} [className] - modifier class
 * @param {bool} [removeGradient] - indicates if shoudl render the linear Gradient.
 */
houstonApp.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  viewBox: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  className: PropTypes.string,
  removeGradient: PropTypes.bool,
};

export default houstonApp;
