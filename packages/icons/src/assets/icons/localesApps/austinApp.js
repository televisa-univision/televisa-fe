import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, {
  Path, Defs, G, LinearGradient, Stop,
} from 'svgs';

/**
 * austinApp component
 * @param {size} size - icon size
 * @param {string} fill - icon fill modifier
 * @param {string} viewBox - viewBox
 * @param {style} style - style override
 * @param {string} [className] - modifier class
 * @param {bool} [removeGradient] - indicates if shoudl render the linear Gradient.
 * @returns {JSX}
 */
const austinApp = ({
  width, height, fill, viewBox, style, className, removeGradient,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} style={style} className={className}>
    {!removeGradient && (
      <Defs>
        <LinearGradient x1="1%" y1="-2%" x2="62%" y2="92%" id="austinApp">
          <Stop stopColor="#222E57" offset="0%" />
          <Stop stopColor="#222E57" offset="45%" />
          <Stop stopColor="#101833" offset="100%" />
        </LinearGradient>
      </Defs>
    )}
    <G fillRule="nonzero" fill="none">
      {!removeGradient && <Path fill={`${fill || 'url(#austinApp)'}`} d="M27 0h202c15 0 27 12 27 27v202c0 15-12 27-27 27H27c-15 0-27-12-27-27V27C0 12 12 0 27 0z" />}
      <Path d="M58 197h-6l13-30h4l13 30h-7l-2-7H60l-2 7zm9-21l-4 9h7l-3-9zm31 21c-4 0-7-1-9-3-3-2-4-5-4-10v-17h6v18c0 2 0 4 2 5 1 2 3 2 5 2s4 0 5-2l2-5v-18h6v17c0 5-2 8-4 10s-6 3-9 3zm16-4l4-4c2 2 5 3 7 3 3 0 5-1 5-4 0-4-6-4-10-6-2-2-4-4-4-7 0-6 5-9 10-9l9 3-3 4-6-2c-2 0-4 1-4 4 0 5 14 3 14 13 0 6-5 9-11 9-4 0-7-1-11-4zm24-26h22v5h-8v25h-6v-25h-8v-5zm27 30v-30h5v30h-5zm12 0v-30h4l17 19v-19h6v30h-4l-17-20v20h-6zM132 116c1 8 7 14 15 14s14-7 14-15c0-7-6-14-15-14-3 0-6 0-9 2-3 4-4 8-5 13zm30-55l-15 26h1c15 0 28 12 28 28s-13 29-29 29c-15 0-30-11-30-28 0-8 4-15 8-23l20-32h17zm20 19c4-12 14-19 26-19 14 0 26 10 26 25 0 10-5 17-10 24l-18 20h29v14h-53v-10l28-32c7-7 8-12 8-16 0-6-4-11-10-11s-10 4-11 9l-15-4z" fill="#FFF" />
      <Path d="M55 59v49h27l9-1 14-5V64c-5-4-26-5-50-5" fill="#00C56E" />
      <Path d="M105 102l-14 5-9 1H55a341 341 0 0 0 2 29c1 4 2 7 4 9h2c14 0 27-7 34-18 3-4 5-9 6-14l2-12" fill="#1717EF" />
      <Path d="M61 146c-2-2-3-5-4-9a91 91 0 0 1-2-22 238 238 0 0 1 0-7l-26-1-8-4c0 4 0 9 2 13a42 42 0 0 0 38 30" fill="#FF161F" />
      <Path d="M22 62l-1 2v39l8 4h3l23 1V78a43 43 0 0 0-33-16" fill="#E621BB" />
    </G>
  </Svg>
);

/**
 * austinApp props
 * @property {number} width - icon width size
 * @property {number} height - icon height size
 * @property {string} fill - fill color, default: svg file color
 * @property {string} viewBox - viewBox width, height, default: 0 0 256 256
 * @property {(Object|style)} [style] - modifier styles
 * @property {string} [className] - modifier class
 * @param {bool} [removeGradient] - indicates if shoudl render the linear Gradient.
 */
austinApp.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  viewBox: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  className: PropTypes.string,
  removeGradient: PropTypes.bool,
};

export default austinApp;
