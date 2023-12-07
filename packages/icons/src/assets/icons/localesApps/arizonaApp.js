import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, {
  Path, Defs, G, LinearGradient, Stop,
} from 'svgs';

/**
 * arizonaApp component
 * @param {size} size - icon size
 * @param {string} fill - icon fill modifier
 * @param {string} viewBox - viewBox
 * @param {style} style - style override
 * @param {string} [className] - modifier class
 * @param {bool} [removeGradient] - indicates if shoudl render the linear Gradient.
 * @returns {JSX}
 */
const arizonaApp = ({
  width, height, fill, viewBox, style, className, removeGradient,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} style={style} className={className}>
    {!removeGradient && (
      <Defs>
        <LinearGradient x1="1%" y1="-2%" x2="62%" y2="92%" id="arizonaApp">
          <Stop stopColor="#222E57" offset="0%" />
          <Stop stopColor="#222E57" offset="45%" />
          <Stop stopColor="#101833" offset="100%" />
        </LinearGradient>
      </Defs>
    )}
    <G fillRule="nonzero" fill="none">
      {!removeGradient && <Path fill={`${fill || 'url(#arizonaApp)'}`} d="M27 0h202c15 0 27 12 27 27v202c0 15-12 27-27 27H27c-15 0-27-12-27-27V27C0 12 12 0 27 0z" />}
      <Path d="M36 197h-6l13-30h4l13 30h-6l-3-7H39l-3 7zm9-21l-4 9h7l-3-9zm26 8h-2v13h-6v-30h11l7 2a9 9 0 0 1 0 12l-3 2 11 14h-7l-11-13zm-2-6h5l3-1 1-2-1-2-3-1h-5v6zm23 19v-30h6v30h-6zm11 0v-4l15-21h-14v-5h22v3l-15 22h16v5h-24zm32-15c0 6 4 10 10 10s10-4 10-10-4-11-10-11-10 5-10 11zm-6 0c0-9 7-16 16-16s16 7 16 16c0 8-7 15-16 15s-16-7-16-15zm37 15v-30h4l17 19v-19h6v30h-5l-16-20v20h-6zm36 0h-6l13-30h4l13 30h-6l-3-7h-12l-3 7zm9-21l-4 9h8l-4-9z" fill="#FFF" />
      <Path d="M119 59v49h27l9-1 14-5V64c-5-4-26-5-50-5" fill="#00C56E" />
      <Path d="M169 102l-14 5-9 1h-27a341 341 0 0 0 2 29c1 4 2 7 4 9h2c14 0 27-7 34-18l7-14 1-12" fill="#1717EF" />
      <Path d="M125 146c-2-2-3-5-4-9a91 91 0 0 1-2-22 238 238 0 0 1 0-7l-25-1c-5-1-8-3-9-4l2 13a42 42 0 0 0 38 30" fill="#FF161F" />
      <Path d="M87 62l-2 2v39c1 1 4 3 9 4h2l23 1V78a43 43 0 0 0-32-16" fill="#E621BB" />
    </G>
  </Svg>
);

/**
 * arizonaApp props
 * @property {number} width - icon width size
 * @property {number} height - icon height size
 * @property {string} fill - fill color, default: svg file color
 * @property {string} viewBox - viewBox width, height, default: 0 0 256 256
 * @property {(Object|style)} [style] - modifier styles
 * @property {string} [className] - modifier class
 * @param {bool} [removeGradient] - indicates if shoudl render the linear Gradient.
 */
arizonaApp.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  viewBox: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  className: PropTypes.string,
  removeGradient: PropTypes.bool,
};

export default arizonaApp;
