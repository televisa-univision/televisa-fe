import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, {
  Path, Defs, G, LinearGradient, Stop,
} from 'svgs';

/**
 * miamiApp component
 * @param {size} size - icon size
 * @param {string} fill - icon fill modifier
 * @param {string} viewBox - viewBox
 * @param {style} style - style override
 * @param {string} [className] - modifier class
 * @param {bool} [removeGradient] - indicates if shoudl render the linear Gradient.
 * @returns {JSX}
 */
const miamiApp = ({
  width, height, fill, viewBox, style, className, removeGradient,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} style={style} className={className}>
    {!removeGradient && (
      <Defs>
        <LinearGradient x1="1%" y1="-2%" x2="62%" y2="92%" id="miamiApp">
          <Stop stopColor="#222E57" offset="0%" />
          <Stop stopColor="#222E57" offset="45%" />
          <Stop stopColor="#101833" offset="100%" />
        </LinearGradient>
      </Defs>
    )}
    <G fillRule="nonzero" fill="none">
      {!removeGradient && <Path fill={`${fill || 'url(#miamiApp)'}`} d="M27 0h202c15 0 27 12 27 27v202c0 15-12 27-27 27H27c-15 0-27-12-27-27V27C0 12 12 0 27 0z" />}
      <Path d="M115 78c4-11 15-19 27-19 14 0 27 11 27 26 0 10-5 18-11 24l-18 21h29v15h-54v-10l29-34c7-7 9-12 9-16 0-6-5-12-11-12s-10 4-12 10l-15-5zm72 45c4 5 9 8 16 8 8 0 15-6 15-15s-7-16-16-16c-4 0-7 1-10 3V93l15-18h-28V60h51v10l-15 19c12 4 20 14 20 27 0 18-14 30-32 30-10 0-20-5-28-13l12-10zM47 166l11 19 12-19h4v31h-6v-17l-7 12h-5l-7-12v17h-6v-31h4zm34 31v-31h6v31h-6zm16 0h-6l13-31h4l14 31h-7l-3-7h-12l-3 7zm9-21l-4 9h8l-4-9zm19 7h14v5h-14v-5zm40-11h-13v6h10v5h-10v14h-6v-31h19v6zm4 25v-31h6v26h13v5h-19zm24 0v-31h6v26h13v5h-19z" fill="#FFF" />
      <Path d="M54 59v49h28l8-1 14-5V64c-5-4-26-5-50-5" fill="#00C56E" />
      <Path d="M104 102l-14 5-8 1H54a341 341 0 0 0 2 29l4 9h2c15 0 27-7 35-18 2-4 5-9 6-14l1-12" fill="#1717EF" />
      <Path d="M60 146l-4-9a91 91 0 0 1-2-22 238 238 0 0 1 0-7l-25-1c-5-1-8-3-9-4l2 13a42 42 0 0 0 38 30" fill="#FF161F" />
      <Path d="M22 62l-2 2v39c1 1 4 3 9 4h2l23 1V78a43 43 0 0 0-32-16" fill="#E621BB" />
    </G>
  </Svg>
);

/**
 * miamiApp props
 * @property {number} width - icon width size
 * @property {number} height - icon height size
 * @property {string} fill - fill color, default: svg file color
 * @property {string} viewBox - viewBox width, height, default: 0 0 256 256
 * @property {(Object|style)} [style] - modifier styles
 * @property {string} [className] - modifier class
 * @param {bool} [removeGradient] - indicates if shoudl render the linear Gradient.
 */
miamiApp.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  viewBox: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  className: PropTypes.string,
  removeGradient: PropTypes.bool,
};

export default miamiApp;
