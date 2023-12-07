import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, {
  Path, Defs, G, LinearGradient, Stop,
} from 'svgs';

/**
 * atlantaApp component
 * @param {size} size - icon size
 * @param {string} fill - icon fill modifier
 * @param {string} viewBox - viewBox
 * @param {style} style - style override
 * @param {string} [className] - modifier class
 * @param {bool} [removeGradient] - indicates if shoudl render the linear Gradient.
 * @returns {JSX}
 */
const atlantaApp = ({
  width, height, fill, viewBox, style, className, removeGradient,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} style={style} className={className}>
    {!removeGradient && (
      <Defs>
        <LinearGradient x1="1%" y1="-2%" x2="62%" y2="92%" id="atlantaApp">
          <Stop stopColor="#222E57" offset="0%" />
          <Stop stopColor="#222E57" offset="45%" />
          <Stop stopColor="#101833" offset="100%" />
        </LinearGradient>
      </Defs>
    )}
    <G fillRule="nonzero" fill="none">
      {!removeGradient && <Path fill={`${fill || 'url(#atlantaApp)'}`} d="M27 0h202c15 0 27 12 27 27v202c0 15-12 27-27 27H27c-15 0-27-12-27-27V27C0 12 12 0 27 0z" />}
      <Path d="M122 122c3 5 9 8 15 8 7 0 15-6 15-15 0-8-7-14-16-14-3 0-7 0-10 2v-9l15-18h-27V62h49v9l-14 18c11 4 18 14 18 26 0 18-13 29-30 29-10 0-20-5-27-13l12-9zm91-11V92l-16 19h16zm15-49v49h14v14h-14v19h-15v-19h-38v-9l42-54h11zM34 197h-6l13-31h4l13 31h-6l-3-7H37l-3 7zm9-21l-4 9h8l-4-9zm17-10h22v6h-8v25h-6v-25h-8v-6zm27 31v-31h6v26h13v5H87zm26 0h-6l13-31h4l14 31h-6l-3-7h-13l-3 7zm9-21l-4 9h8l-4-9zm19 21v-31h5l17 21v-21h6v31h-4l-18-20v20h-6zm33-31h22v6h-8v25h-6v-25h-8v-6zm29 31h-6l14-31h4l13 31h-6l-3-7h-13l-3 7zm10-21l-4 9h8l-4-9z" fill="#FFF" />
      <Path d="M48 59v49h27l9-1 14-5V64c-5-4-27-5-50-5" fill="#00C56E" />
      <Path d="M98 102l-14 5-9 1H48a341 341 0 0 0 2 29c1 4 2 7 4 9h2c14 0 27-7 34-18 3-4 5-9 6-14l2-12" fill="#1717EF" />
      <Path d="M54 146c-2-2-3-5-4-9a91 91 0 0 1-2-22 238 238 0 0 1 0-7l-26-1c-5-1-8-3-8-4l1 13a42 42 0 0 0 39 30" fill="#FF161F" />
      <Path d="M15 62l-1 2v39c0 1 3 3 8 4h3l23 1V78a43 43 0 0 0-33-16" fill="#E621BB" />
    </G>
  </Svg>
);

/**
 * atlantaApp props
 * @property {number} width - icon width size
 * @property {number} height - icon height size
 * @property {string} fill - fill color, default: svg file color
 * @property {string} viewBox - viewBox width, height, default: 0 0 256 256
 * @property {(Object|style)} [style] - modifier styles
 * @property {string} [className] - modifier class
 * @param {bool} [removeGradient] - indicates if shoudl render the linear Gradient.
 */
atlantaApp.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  viewBox: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  className: PropTypes.string,
  removeGradient: PropTypes.bool,
};

export default atlantaApp;
