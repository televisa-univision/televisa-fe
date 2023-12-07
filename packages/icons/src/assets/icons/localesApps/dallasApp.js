import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, {
  Path, Defs, G, LinearGradient, Stop,
} from 'svgs';

/**
 * dallasApp component
 * @param {size} size - icon size
 * @param {string} fill - icon fill modifier
 * @param {string} viewBox - viewBox
 * @param {style} style - style override
 * @param {string} [className] - modifier class
 * @param {bool} [removeGradient] - indicates if shoudl render the linear Gradient.
 * @returns {JSX}
 */
const dallasApp = ({
  width, height, fill, viewBox, style, className, removeGradient,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} style={style} className={className}>
    {!removeGradient && (
      <Defs>
        <LinearGradient x1="1%" y1="-2%" x2="62%" y2="92%" id="dallasApp">
          <Stop stopColor="#222E57" offset="0%" />
          <Stop stopColor="#222E57" offset="45%" />
          <Stop stopColor="#101833" offset="100%" />
        </LinearGradient>
      </Defs>
    )}
    <G fillRule="nonzero" fill="none">
      {!removeGradient && <Path fill={`${fill || 'url(#dallasApp)'}`} d="M27 0h202c15 0 27 12 27 27v202c0 15-12 27-27 27H27c-15 0-27-12-27-27V27C0 12 12 0 27 0z" />}
      <Path d="M116 81c4-11 14-18 26-18 13 0 25 10 25 25 0 9-4 17-10 23l-17 20h28v14h-52v-10l28-32c6-7 8-12 8-16 0-5-4-11-11-11-5 0-9 4-11 10l-14-5zm69 43c3 5 9 8 15 8 8 0 15-6 15-15 0-8-7-15-16-15l-9 3v-9l15-18h-27V64h49v9l-15 18c11 4 19 14 19 26 0 17-14 29-30 29-10 0-20-5-27-13l11-9zM105 182c0-3 0-5-2-7s-4-3-8-3h-4v20h4c4 0 6-1 8-3s2-5 2-7zm-20-16h10c5 0 8 1 10 3 4 3 6 8 6 13s-2 10-6 12c-2 2-5 3-10 3H85v-31zm49 6h-12v6h9v5h-9v14h-6v-31h18v6zm13 25l-11-31h7l6 20 7-20h4l7 20 6-20h6l-10 31h-4l-7-19-7 19h-4z" fill="#FFF" />
      <Path d="M58 59v50l28-1 8-1 14-5V64c-5-3-26-5-50-5" fill="#00C56E" />
      <Path d="M108 102l-14 5-8 1-28 1a341 341 0 0 0 2 28c1 4 2 7 4 9h2c14 0 27-7 35-18l6-14 1-11v-1" fill="#1717EF" />
      <Path d="M64 146c-2-2-3-5-4-9a91 91 0 0 1-2-22 238 238 0 0 1 0-6l-25-2c-5-1-8-3-9-4l2 13a42 42 0 0 0 38 30" fill="#FF161F" />
      <Path d="M26 62l-2 2v39c1 1 4 3 9 4h2l23 2V78a43 43 0 0 0-32-16" fill="#E621BB" />
    </G>
  </Svg>
);

/**
 * dallasApp props
 * @property {number} width - icon width size
 * @property {number} height - icon height size
 * @property {string} fill - fill color, default: svg file color
 * @property {string} viewBox - viewBox width, height, default: 0 0 256 256
 * @property {(Object|style)} [style] - modifier styles
 * @property {string} [className] - modifier class
 * @param {bool} [removeGradient] - indicates if shoudl render the linear Gradient.
 */
dallasApp.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  viewBox: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  className: PropTypes.string,
  removeGradient: PropTypes.bool,
};

export default dallasApp;
