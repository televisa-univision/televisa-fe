import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, {
  Path, Defs, G, LinearGradient, Stop,
} from 'svgs';

/**
 * sacramentoApp component
 * @param {size} size - icon size
 * @param {string} fill - icon fill modifier
 * @param {string} viewBox - viewBox
 * @param {style} style - style override
 * @param {string} [className] - modifier class
 * @param {bool} [removeGradient] - indicates if shoudl render the linear Gradient.
 * @returns {JSX}
 */
const sacramentoApp = ({
  width, height, fill, viewBox, style, className, removeGradient,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} style={style} className={className}>
    {!removeGradient && (
      <Defs>
        <LinearGradient x1="1%" y1="-2%" x2="62%" y2="92%" id="sacramentoApp">
          <Stop stopColor="#222E57" offset="0%" />
          <Stop stopColor="#222E57" offset="45%" />
          <Stop stopColor="#101833" offset="100%" />
        </LinearGradient>
      </Defs>
    )}
    <G fillRule="nonzero" fill="none">
      {!removeGradient && <Path fill={`${fill || 'url(#sacramentoApp)'}`} d="M27 0h202c15 0 27 12 27 27v202c0 15-12 27-27 27H27c-15 0-27-12-27-27V27C0 12 12 0 27 0z" />}
      <Path d="M125 71l20-12h11v83h-16V78l-15 8V71zm86 16a14 14 0 0 0-24-10c-3 3-4 7-4 10 0 8 6 15 15 15l8-2c3-4 5-8 5-13zm-29 55l15-26h-1a28 28 0 0 1-28-28c0-16 13-29 28-29 16 0 30 11 30 28 0 8-3 15-8 22l-19 33h-17zM86 193l4-4c2 2 4 3 7 3s5-1 5-4c0-4-6-4-10-6-2-2-4-4-4-7 0-6 5-9 10-9 3 0 6 1 8 3l-3 4-5-2c-2 0-5 1-5 4 0 5 14 3 14 13 0 6-4 9-10 9-4 0-8-1-11-4zm29 4h-6l13-30h4l13 30h-6l-3-7h-12l-3 7zm9-21l-4 9h8l-4-9zm32-5c-6 0-10 5-10 11s5 10 10 10c4 0 7-2 9-4l4 4c-3 3-7 5-13 5-9 0-16-6-16-15s7-16 16-16c5 0 8 2 11 5l-4 4c-1-2-4-4-7-4z" fill="#FFF" />
      <Path d="M63 59v49h27l9-1 14-5V64c-5-4-26-5-50-5" fill="#00C56E" />
      <Path d="M113 102l-14 5-9 1H63a341 341 0 0 0 2 29c1 4 2 7 4 9h2c14 0 27-7 35-18l6-14 1-12" fill="#1717EF" />
      <Path d="M69 146c-2-2-3-5-4-9a91 91 0 0 1-2-22 238 238 0 0 1 0-7l-25-1c-5-1-8-3-9-4l2 13a42 42 0 0 0 38 30" fill="#FF161F" />
      <Path d="M31 62l-2 2v39c1 1 4 3 9 4h2l23 1V78a43 43 0 0 0-32-16" fill="#E621BB" />
    </G>
  </Svg>
);

/**
 * sacramentoApp props
 * @property {number} width - icon width size
 * @property {number} height - icon height size
 * @property {string} fill - fill color, default: svg file color
 * @property {string} viewBox - viewBox width, height, default: 0 0 256 256
 * @property {(Object|style)} [style] - modifier styles
 * @property {string} [className] - modifier class
 * @param {bool} [removeGradient] - indicates if shoudl render the linear Gradient.
 */
sacramentoApp.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  viewBox: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  className: PropTypes.string,
  removeGradient: PropTypes.bool,
};

export default sacramentoApp;
