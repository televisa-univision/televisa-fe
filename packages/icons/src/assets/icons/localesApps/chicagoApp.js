import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, {
  Path, Defs, G, LinearGradient, Stop,
} from 'svgs';

/**
 * chicagoApp component
 * @param {size} size - icon size
 * @param {string} fill - icon fill modifier
 * @param {string} viewBox - viewBox
 * @param {style} style - style override
 * @param {string} [className] - modifier class
 * @param {bool} [removeGradient] - indicates if shoudl render the linear Gradient.
 * @returns {JSX}
 */
const chicagoApp = ({
  width, height, fill, viewBox, style, className, removeGradient,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} style={style} className={className}>
    {!removeGradient && (
      <Defs>
        <LinearGradient x1="1%" y1="-2%" x2="62%" y2="92%" id="chicagoApp">
          <Stop stopColor="#222E57" offset="0%" />
          <Stop stopColor="#222E57" offset="45%" />
          <Stop stopColor="#101833" offset="100%" />
        </LinearGradient>
      </Defs>
    )}
    <G fillRule="nonzero" fill="none">
      {!removeGradient && <Path fill={`${fill || 'url(#chicagoApp)'}`} d="M27 0h202c15 0 27 12 27 27v202c0 15-12 27-27 27H27c-15 0-27-12-27-27V27C0 12 12 0 27 0z" />}
      <Path d="M36 182c0 6 5 10 11 10 3 0 6-1 8-4l4 4c-3 3-7 6-13 6-9 0-15-7-15-16s6-16 15-16c5 0 9 2 11 5l-3 4c-2-2-5-3-8-3-5 0-10 4-10 10zm47 2H68v14h-6v-31h6v12h15v-12h6v31h-6v-14zm12 14v-31h6v31h-6zm15-16c0 6 4 10 10 10 4 0 7-1 8-4l4 4c-2 3-7 6-12 6-9 0-16-7-16-16s7-16 16-16c4 0 8 2 11 5l-4 4c-2-2-4-3-7-3-6 0-10 4-10 10zm35 4h7l-3-9-4 9zm-11 12l13-31h4l12 31h-6l-2-7h-12l-3 7h-6zm35-16c0 6 4 10 10 10l6-2v-6h-7v-6h13v14c-3 3-7 6-12 6-10 0-16-7-16-16s6-16 15-16c5 0 9 2 11 5l-3 4c-2-2-5-3-8-3-5 0-9 4-9 10zm41 10c6 0 10-4 10-10s-4-10-10-10-10 4-10 10 4 10 10 10zm0-26c9 0 15 7 15 16s-6 16-15 16-16-7-16-16 7-16 16-16z" fill="#FFF" />
      <Path d="M120 59v49l27-1 9-1c7-1 12-3 14-5V64c-5-4-26-5-50-5" fill="#00C56E" />
      <Path d="M170 102v-1c-2 2-7 4-14 5l-9 1-27 1a341 341 0 0 0 2 28c1 4 2 8 4 9v1h2c14 0 27-8 35-18l6-15 1-11" fill="#1717EF" />
      <Path d="M126 145c-2-1-3-5-4-9a91 91 0 0 1-2-22 238 238 0 0 1 0-6l-25-2-9-3 2 12a42 42 0 0 0 38 31v-1" fill="#FF161F" />
      <Path d="M88 62l-2 1v40l9 3 2 1 23 1V78a43 43 0 0 0-32-16" fill="#E621BB" />
    </G>
  </Svg>
);

/**
 * chicagoApp props
 * @property {number} width - icon width size
 * @property {number} height - icon height size
 * @property {string} fill - fill color, default: svg file color
 * @property {string} viewBox - viewBox width, height, default: 0 0 256 256
 * @property {(Object|style)} [style] - modifier styles
 * @property {string} [className] - modifier class
 * @param {bool} [removeGradient] - indicates if shoudl render the linear Gradient.
 */
chicagoApp.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  viewBox: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  className: PropTypes.string,
  removeGradient: PropTypes.bool,
};

export default chicagoApp;
