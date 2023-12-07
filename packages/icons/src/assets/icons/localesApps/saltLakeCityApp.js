import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, {
  Path, Defs, G, LinearGradient, Stop,
} from 'svgs';

/**
 * saltLakeCityApp component
 * @param {size} size - icon size
 * @param {string} fill - icon fill modifier
 * @param {string} viewBox - viewBox
 * @param {style} style - style override
 * @param {string} [className] - modifier class
 * @param {bool} [removeGradient] - indicates if shoudl render the linear Gradient.
 * @returns {JSX}
 */
const saltLakeCityApp = ({
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
      <Path d="M19 189l4 2 4-2c0-3-4-3-7-5-2-1-3-3-3-5 0-4 3-6 7-6l6 2-2 3-4-1c-1 0-3 0-3 2 0 3 10 2 10 9 0 4-4 7-8 7-2 0-5-1-7-3l3-3zm20-3h6l-3-6-3 6zm-7 8l9-20h3l9 20h-5l-2-4h-8l-2 4h-4zm23-20h4v17h9v3H55v-20zm27 0v3h-5v17h-4v-17h-6v-3h15zm11 0h4v17h9v3H93v-20zm23 12h5l-3-6-2 6zm-8 8l9-20h3l9 20h-5l-2-4h-8l-2 4h-4zm27-10v10h-4v-20h4v8l8-8h5l-9 9 10 11h-5l-9-10zm21-7v4h6v4h-6v6h9v3h-13v-20h12v3h-8zm23 7c0 4 3 7 7 7 3 0 5-1 6-3l3 3c-2 2-5 4-9 4-7 0-11-5-11-11s4-11 11-11c3 0 6 1 7 3l-2 3-5-2c-4 0-7 3-7 7zm19 10v-20h4v20h-4zm22-20v3h-6v17h-4v-17h-5v-3h15zm13 11v9h-4v-9l-7-11h4l5 7 5-7h4l-7 11zM127 129c3 5 9 9 15 9 8 0 16-7 16-16 0-8-7-15-17-15l-10 2v-9l16-19h-28V67h51v9l-15 19c11 4 19 15 19 27 0 18-14 30-31 30-11 0-21-5-28-13l12-10zm57-44c3-12 14-20 26-20 15 0 27 11 27 26 0 11-5 18-11 25l-18 20h30v15h-55v-10l30-33c6-8 8-12 8-17 0-6-5-11-11-11s-10 4-11 9l-15-4z" fill="#FFF" />
      <Path d="M52 66v49l28-1 8-1c7-1 13-3 15-5V71c-5-4-27-5-51-5" fill="#00C56E" />
      <Path d="M103 109v-1c-2 2-8 4-15 5l-8 1-28 1a341 341 0 0 0 3 28c1 4 2 8 4 10h2c14 0 26-7 34-18 3-4 5-9 6-15l2-11" fill="#1717EF" />
      <Path d="M59 153c-2-2-3-6-4-10a91 91 0 0 1-2-22 238 238 0 0 1-1-6l-25-2c-5 0-8-2-8-3l1 12a42 42 0 0 0 39 31" fill="#FF161F" />
      <Path d="M20 69l-1 2v39c0 1 3 3 8 3l3 1 22 1V85a43 43 0 0 0-32-16" fill="#E621BB" />
    </G>
  </Svg>
);

/**
 * saltLakeCityApp props
 * @property {number} width - icon width size
 * @property {number} height - icon height size
 * @property {string} fill - fill color, default: svg file color
 * @property {string} viewBox - viewBox width, height, default: 0 0 256 256
 * @property {(Object|style)} [style] - modifier styles
 * @property {string} [className] - modifier class
 * @param {bool} [removeGradient] - indicates if shoudl render the linear Gradient.
 */
saltLakeCityApp.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  viewBox: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  className: PropTypes.string,
  removeGradient: PropTypes.bool,
};

export default saltLakeCityApp;
