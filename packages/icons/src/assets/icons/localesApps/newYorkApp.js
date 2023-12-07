import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, {
  Path, Defs, G, LinearGradient, Stop,
} from 'svgs';

/**
 * newYorkApp component
 * @param {size} size - icon size
 * @param {string} fill - icon fill modifier
 * @param {string} viewBox - viewBox
 * @param {style} style - style override
 * @param {string} [className] - modifier class
 * @param {bool} [removeGradient] - indicates if shoudl render the linear Gradient.
 * @returns {JSX}
 */
const newYorkApp = ({
  width, height, fill, viewBox, style, className, removeGradient,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} style={style} className={className}>
    {!removeGradient && (
      <Defs>
        <LinearGradient x1="1%" y1="-2%" x2="62%" y2="92%" id="newYorkApp">
          <Stop stopColor="#222E57" offset="0%" />
          <Stop stopColor="#222E57" offset="45%" />
          <Stop stopColor="#101833" offset="100%" />
        </LinearGradient>
      </Defs>
    )}
    <G fillRule="nonzero" fill="none">
      {!removeGradient && <Path fill={`${fill || 'url(#newYorkApp)'}`} d="M27 0h202c15 0 27 12 27 27v202c0 15-12 27-27 27H27c-15 0-27-12-27-27V27C0 12 12 0 27 0z" />}
      <Path d="M97 167h4l18 20v-20h6v31h-4l-18-21v21h-6v-31zm51 17v14h-6v-14l-11-17h7l7 11 7-11h7l-11 17z" fill="#FFF" fillRule="nonzero" />
      <Path d="M163 111V92l-16 19h16zm16-48v48h13v14h-13v19h-16v-19h-38v-9l42-53h12zm15 11l20-11h11v81h-16V81l-15 8V74z" fill="#FFF" />
      <Path d="M65 59v50l27-1 9-1 14-5V64c-5-3-27-5-50-5" fill="#00C56E" />
      <Path d="M115 102l-14 5-9 1-27 1a341 341 0 0 0 2 28c1 4 2 7 4 9h2c14 0 27-7 34-18 3-4 5-9 6-14l2-11v-1" fill="#1717EF" />
      <Path d="M71 146c-2-2-3-5-4-9a91 91 0 0 1-2-22 238 238 0 0 1 0-6l-26-2c-5-1-8-3-8-4l1 13a42 42 0 0 0 39 30" fill="#FF161F" />
      <Path d="M32 62l-1 2v39c0 1 3 3 8 4h3l23 2V78a43 43 0 0 0-33-16" fill="#E621BB" />
    </G>
  </Svg>
);

/**
 * newYorkApp props
 * @property {number} width - icon width size
 * @property {number} height - icon height size
 * @property {string} fill - fill color, default: svg file color
 * @property {string} viewBox - viewBox width, height, default: 0 0 256 256
 * @property {(Object|style)} [style] - modifier styles
 * @property {string} [className] - modifier class
 * @param {bool} [removeGradient] - indicates if shoudl render the linear Gradient.
 */
newYorkApp.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  viewBox: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  className: PropTypes.string,
  removeGradient: PropTypes.bool,
};

export default newYorkApp;
