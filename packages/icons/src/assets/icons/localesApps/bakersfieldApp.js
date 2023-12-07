import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, {
  Path, Defs, G, LinearGradient, Stop,
} from 'svgs';

/**
 * bakersfieldApp component
 * @param {size} size - icon size
 * @param {string} fill - icon fill modifier
 * @param {string} viewBox - viewBox
 * @param {style} style - style override
 * @param {string} [className] - modifier class
 * @param {bool} [removeGradient] - indicates if shoudl render the linear Gradient.
 * @returns {JSX}
 */
const bakersfieldApp = ({
  width, height, fill, viewBox, style, className, removeGradient,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} style={style} className={className}>
    {!removeGradient && (
      <Defs>
        <LinearGradient x1="1%" y1="-2%" x2="62%" y2="92%" id="bakersfieldApp">
          <Stop stopColor="#222E57" offset="0%" />
          <Stop stopColor="#222E57" offset="45%" />
          <Stop stopColor="#101833" offset="100%" />
        </LinearGradient>
      </Defs>
    )}
    <G fillRule="nonzero" fill="none">
      {!removeGradient && <Path fill={`${fill || 'url(#bakersfieldApp)'}`} d="M27 0h202c15 0 27 12 27 27v202c0 15-12 27-27 27H27c-15 0-27-12-27-27V27C0 12 12 0 27 0z" />}
      <Path d="M51 59v48h27l8-1 14-5V64c-5-4-26-5-49-5" fill="#00C56E" />
      <Path d="M100 101l-14 5-8 1H51a171 171 0 0 0 2 28c1 5 2 8 4 10h2c14 0 26-7 34-18 3-4 5-9 6-14l1-12" fill="#1717EF" />
      <Path d="M57 145c-2-2-3-5-4-10a90 90 0 0 1-2-21v-6-1l-25-1c-5-1-8-3-9-4l2 13a42 42 0 0 0 38 30" fill="#FF161F" />
      <Path d="M19 62l-2 1v39c1 1 4 3 9 4h2l23 1V77a43 43 0 0 0-32-15" fill="#E621BB" />
      <Path d="M122 124c3 5 9 8 15 8 8 0 15-6 15-15s-7-15-16-15l-10 2v-9l16-19h-28V62h50v10l-15 18c12 5 19 14 19 27 0 18-13 29-31 29-10 0-20-4-27-13l12-9zm100-35c0-7-7-14-15-14s-14 7-14 15 6 14 15 14c3 0 6 0 9-2 2-3 5-7 5-13zm-30 56l16-26h-1c-16 0-29-12-29-29 0-16 13-29 29-29s30 11 30 28c0 9-3 16-8 23l-19 33h-18zM102 192l4-1 1-3-1-3-4-1h-6v8h6zm-6-13h4c2 0 3-1 3-2l1-2-1-2-3-1h-4v7zm4-12c4 0 6 1 7 2 2 1 3 4 3 6l-2 5c3 1 5 4 5 8l-3 6c-2 2-4 3-8 3H90v-30h10zm23 5v6h9v5h-9v14h-6v-30h18v5h-12zm34 3c-1-2-4-3-7-3h-5v20h5c3 0 6-1 7-3 2-2 2-5 2-7 0-3 0-5-2-7zm-8-8c5 0 8 1 10 3 4 2 6 7 6 12s-2 9-6 12c-2 2-5 3-10 3h-10v-30h10z" fill="#FFF" />
    </G>
  </Svg>
);

/**
 * bakersfieldApp props
 * @property {number} width - icon width size
 * @property {number} height - icon height size
 * @property {string} fill - fill color, default: svg file color
 * @property {string} viewBox - viewBox width, height, default: 0 0 256 256
 * @property {(Object|style)} [style] - modifier styles
 * @property {string} [className] - modifier class
 * @param {bool} [removeGradient] - indicates if shoudl render the linear Gradient.
 */
bakersfieldApp.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  viewBox: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  className: PropTypes.string,
  removeGradient: PropTypes.bool,
};

export default bakersfieldApp;
