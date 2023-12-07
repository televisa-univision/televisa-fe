import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, {
  Path, Defs, G, LinearGradient, Stop,
} from 'svgs';

/**
 * fresnoApp component
 * @param {size} size - icon size
 * @param {string} fill - icon fill modifier
 * @param {string} viewBox - viewBox
 * @param {style} style - style override
 * @param {string} [className] - modifier class
 * @param {bool} [removeGradient] - indicates if shoudl render the linear Gradient.
 * @returns {JSX}
 */
const fresnoApp = ({
  width, height, fill, viewBox, style, className, removeGradient,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} style={style} className={className}>
    {!removeGradient && (
      <Defs>
        <LinearGradient x1="1%" y1="-2%" x2="62%" y2="92%" id="fresnoApp">
          <Stop stopColor="#222E57" offset="0%" />
          <Stop stopColor="#222E57" offset="45%" />
          <Stop stopColor="#101833" offset="100%" />
        </LinearGradient>
      </Defs>
    )}
    <G fillRule="nonzero" fill="none">
      {!removeGradient && <Path fill={`${fill || 'url(#fresnoApp)'}`} d="M27 0h202c15 0 27 12 27 27v202c0 15-12 27-27 27H27c-15 0-27-12-27-27V27C0 12 12 0 27 0z" />}
      <Path d="M127 79c4-12 15-20 27-20 15 0 28 11 28 26 0 11-6 18-11 25l-19 21h30v15h-55v-10l30-34c6-8 8-12 8-17 0-6-4-11-11-11-6 0-10 4-12 9l-15-4zm64-8l21-12h12v86h-17V78l-16 9V71zM67 172H55v6h9v5h-9v14h-6v-30h18v5zm12 12h-2v13h-6v-30h11c4 0 6 1 7 2a9 9 0 0 1 0 12l-3 2 11 14h-7l-11-13zm-2-6h5l3-1 1-2-1-2-3-1h-5v6zm41-6h-12v6h9v5h-9v9h13v5h-19v-30h18v5zm3 21l4-4c2 2 4 3 7 3s4-1 4-4c0-4-5-4-9-6-3-2-5-4-5-7 0-6 5-9 10-9 4 0 6 1 9 3l-3 4-5-2c-2 0-5 1-5 4 0 5 14 3 14 13 0 6-5 9-10 9-4 0-8-1-11-4zm26 4v-30h4l17 19v-19h6v30h-4l-17-20v20h-6zm38-15c0 6 4 10 9 10 6 0 10-4 10-10s-4-11-10-11c-5 0-9 5-9 11zm-6 0c0-9 6-16 15-16 10 0 16 7 16 16 0 8-6 15-16 15-9 0-15-7-15-15z" fill="#FFF" />
      <Path d="M66 59v49h27l9-1 14-5V64c-5-4-26-5-50-5" fill="#00C56E" />
      <Path d="M116 102l-14 5-9 1H66a341 341 0 0 0 2 29c1 4 2 7 4 9h2c14 0 27-7 34-18 3-4 5-9 6-14l2-12" fill="#1717EF" />
      <Path d="M72 146c-2-2-3-5-4-9a91 91 0 0 1-2-22 238 238 0 0 1 0-7l-26-1-8-4c0 4 0 9 2 13a42 42 0 0 0 38 30" fill="#FF161F" />
      <Path d="M33 62l-1 2v39l8 4h3l23 1V78a43 43 0 0 0-33-16" fill="#E621BB" />
    </G>
  </Svg>
);

/**
 * fresnoApp props
 * @property {number} width - icon width size
 * @property {number} height - icon height size
 * @property {string} fill - fill color, default: svg file color
 * @property {string} viewBox - viewBox width, height, default: 0 0 256 256
 * @property {(Object|style)} [style] - modifier styles
 * @property {string} [className] - modifier class
 * @param {bool} [removeGradient] - indicates if shoudl render the linear Gradient.
 */
fresnoApp.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  viewBox: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  className: PropTypes.string,
  removeGradient: PropTypes.bool,
};

export default fresnoApp;
