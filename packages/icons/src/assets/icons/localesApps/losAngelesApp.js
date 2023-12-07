import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, {
  Path, Defs, G, LinearGradient, Stop,
} from 'svgs';

/**
 * losAngelesApp component
 * @param {size} size - icon size
 * @param {string} fill - icon fill modifier
 * @param {string} viewBox - viewBox
 * @param {style} style - style override
 * @param {string} [className] - modifier class
 * @param {bool} [removeGradient] - indicates if shoudl render the linear Gradient.
 * @returns {JSX}
 */
const losAngelesApp = ({
  width, height, fill, viewBox, style, className, removeGradient,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} style={style} className={className}>
    {!removeGradient && (
      <Defs>
        <LinearGradient x1="1%" y1="-2%" x2="62%" y2="92%" id="losAngelesApp">
          <Stop stopColor="#222E57" offset="0%" />
          <Stop stopColor="#222E57" offset="45%" />
          <Stop stopColor="#101833" offset="100%" />
        </LinearGradient>
      </Defs>
    )}
    <G fillRule="nonzero" fill="none">
      {!removeGradient && <Path fill={`${fill || 'url(#losAngelesApp)'}`} d="M27 0h202c15 0 27 12 27 27v202c0 15-12 27-27 27H27c-15 0-27-12-27-27V27C0 12 12 0 27 0z" />}
      <Path d="M121 120c4 5 9 8 15 8 8 0 15-6 15-14 0-9-7-15-16-15l-9 2v-9l15-18h-27V60h49v9l-15 18c11 5 19 14 19 27 0 17-14 28-30 28-10 0-20-4-27-12l11-10zm90-11V90l-16 19h16zm15-49v49h13v14h-13v18h-15v-18h-38v-10l42-53h11zM101 166h6v26h13v5h-19v-31zm34 19h8l-4-9-4 9zm-12 12l14-31h4l13 31h-6l-3-7h-12l-3 7h-7z" fill="#FFF" />
      <Path d="M50 59v49h27l9-1 14-5V64c-5-4-26-5-50-5" fill="#00C56E" />
      <Path d="M100 102l-14 5-9 1H50a341 341 0 0 0 2 29c1 4 2 7 4 9h2c14 0 27-7 34-18 3-4 5-9 6-14l2-12" fill="#1717EF" />
      <Path d="M56 146c-2-2-3-5-4-9a91 91 0 0 1-2-22 238 238 0 0 1 0-7l-26-1-8-4c0 4 0 9 2 13a42 42 0 0 0 38 30" fill="#FF161F" />
      <Path d="M18 62l-2 2v39l8 4h3l23 1V78a43 43 0 0 0-32-16" fill="#E621BB" />
    </G>
  </Svg>
);

/**
 * losAngelesApp props
 * @property {number} width - icon width size
 * @property {number} height - icon height size
 * @property {string} fill - fill color, default: svg file color
 * @property {string} viewBox - viewBox width, height, default: 0 0 256 256
 * @property {(Object|style)} [style] - modifier styles
 * @property {string} [className] - modifier class
 * @param {bool} [removeGradient] - indicates if shoudl render the linear Gradient.
 */
losAngelesApp.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  viewBox: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  className: PropTypes.string,
  removeGradient: PropTypes.bool,
};

export default losAngelesApp;
