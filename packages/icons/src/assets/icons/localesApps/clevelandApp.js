import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, {
  Path, Defs, G, LinearGradient, Stop,
} from 'svgs';

/**
 * clevelandApp component
 * @param {size} size - icon size
 * @param {string} fill - icon fill modifier
 * @param {string} viewBox - viewBox
 * @param {style} style - style override
 * @param {string} [className] - modifier class
 * @param {bool} [removeGradient] - indicates if shoudl render the linear Gradient.
 * @returns {JSX}
 */
const clevelandApp = ({
  width, height, fill, viewBox, style, className, removeGradient,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} style={style} className={className}>
    {!removeGradient && (
      <Defs>
        <LinearGradient x1="1%" y1="-2%" x2="62%" y2="92%" id="celevelandApp">
          <Stop stopColor="#222E57" offset="0%" />
          <Stop stopColor="#222E57" offset="45%" />
          <Stop stopColor="#101833" offset="100%" />
        </LinearGradient>
      </Defs>
    )}
    <G fillRule="nonzero" fill="none">
      {!removeGradient && <Path fill={`${fill || 'url(#celevelandApp)'}`} d="M27 0h202c15 0 27 12 27 27v202c0 15-12 27-27 27H27c-15 0-27-12-27-27V27C0 12 12 0 27 0z" />}
      <Path d="M61 59v49c2 0 16 1 28-1l8-1c7-1 12-3 14-5V64c-5-4-26-5-50-5" fill="#00C56E" />
      <Path d="M111 102v-1c-2 2-7 4-14 5l-8 1c-12 2-26 1-28 1a342 342 0 0 0 2 29c1 4 2 7 4 9h2c14 0 27-7 35-18 3-4 5-9 6-15l1-11" fill="#1717EF" />
      <Path d="M67 146c-2-2-3-5-4-9a91 91 0 0 1-2-22 236 236 0 0 1 0-7l-25-1c-5-1-9-3-9-4 0 4 0 9 2 13a42 42 0 0 0 38 30" fill="#FF161F" />
      <Path d="M29 62l-2 1v40c0 1 4 3 9 4h2l23 1V78a44 44 0 0 0-32-16" fill="#E621BB" />
      <Path d="M143 117c0 8 6 14 15 14 8 0 14-6 14-14s-6-15-15-15c-3 0-6 0-9 2-3 3-5 7-5 13zm30-57l-16 27h1c16 0 30 12 30 29 0 16-14 30-30 30s-31-12-31-29c0-8 4-16 8-23l20-34h18zm24 12l20-12h11v84h-16V79l-15 9V72zM97 182c0 5 4 10 10 10 4 0 6-2 8-5l4 4c-3 3-7 6-12 6-9 0-16-7-16-15 0-9 6-16 16-16 4 0 8 2 10 5l-3 3-7-3c-6 0-10 5-10 11zm26-15h6v24h12v5h-18v-29zm28 5v6h9v5h-9v8h12v5h-18v-29h18v5h-12z" fill="#FFF" />
    </G>
  </Svg>
);

/**
 * clevelandApp props
 * @property {number} width - icon width size
 * @property {number} height - icon height size
 * @property {string} fill - fill color, default: svg file color
 * @property {string} viewBox - viewBox width, height, default: 0 0 256 256
 * @property {(Object|style)} [style] - modifier styles
 * @property {string} [className] - modifier class
 * @param {bool} [removeGradient] - indicates if shoudl render the linear Gradient.
 */
clevelandApp.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  viewBox: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  className: PropTypes.string,
  removeGradient: PropTypes.bool,
};

export default clevelandApp;
