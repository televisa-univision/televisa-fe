import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, {
  Path, Defs, G, LinearGradient, Stop,
} from 'svgs';

/**
 * puertoRicoApp component
 * @param {size} size - icon size
 * @param {string} fill - icon fill modifier
 * @param {string} viewBox - viewBox
 * @param {style} style - style override
 * @param {string} [className] - modifier class
 * @param {bool} [removeGradient] - indicates if shoudl render the linear Gradient.
 * @returns {JSX}
 */
const puertoRicoApp = ({
  width, height, fill, viewBox, style, className, removeGradient,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} style={style} className={className}>
    {!removeGradient && (
      <Defs>
        <LinearGradient x1="1%" y1="-2%" x2="62%" y2="92%" id="puertoRicoApp">
          <Stop stopColor="#222E57" offset="0%" />
          <Stop stopColor="#222E57" offset="45%" />
          <Stop stopColor="#101833" offset="100%" />
        </LinearGradient>
      </Defs>
    )}
    <G fillRule="nonzero" fill="none">
      {!removeGradient && <Path fill={`${fill || 'url(#puertoRicoApp)'}`} d="M27 0h202c15 0 27 12 27 27v202c0 15-12 27-27 27H27c-15 0-27-12-27-27V27C0 12 12 0 27 0z" />}
      <Path d="M113 185h-6v12h-6v-31h12c4 0 6 1 8 3l2 6-2 7c-2 2-4 3-8 3zm-6-6h6l3-1 1-3-1-2-3-1h-6v7zm29 5h-2v13h-6v-31h11c3 0 5 1 7 3a9 9 0 0 1 0 12l-3 2 12 14h-8l-11-13zm-2-6h5l3-1 1-2-1-2-3-1h-5v6z" fill="#FFF" />
      <Path d="M119 59v49h28l8-1 15-5V64c-5-4-27-5-51-5" fill="#00C56E" />
      <Path d="M170 102l-15 5-8 1h-28a341 341 0 0 0 2 29c1 4 3 7 5 9h2c14 0 26-7 34-18 3-4 5-9 6-14l2-12" fill="#1717EF" />
      <Path d="M126 146c-2-2-4-5-5-9a91 91 0 0 1-2-22 238 238 0 0 1 0-7l-25-1c-5-1-8-3-8-4l1 13a42 42 0 0 0 39 30" fill="#FF161F" />
      <Path d="M87 62l-1 2v39c0 1 3 3 8 4h3l22 1V78a43 43 0 0 0-32-16" fill="#E621BB" />
    </G>
  </Svg>
);

/**
 * puertoRicoApp props
 * @property {number} width - icon width size
 * @property {number} height - icon height size
 * @property {string} fill - fill color, default: svg file color
 * @property {string} viewBox - viewBox width, height, default: 0 0 256 256
 * @property {(Object|style)} [style] - modifier styles
 * @property {string} [className] - modifier class
 * @param {bool} [removeGradient] - indicates if shoudl render the linear Gradient.
 */
puertoRicoApp.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  viewBox: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  className: PropTypes.string,
  removeGradient: PropTypes.bool,
};

export default puertoRicoApp;
