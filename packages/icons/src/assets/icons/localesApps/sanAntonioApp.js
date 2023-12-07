import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, {
  Path, Defs, G, LinearGradient, Stop,
} from 'svgs';

/**
 * sanAntonioApp component
 * @param {size} size - icon size
 * @param {string} fill - icon fill modifier
 * @param {string} viewBox - viewBox
 * @param {style} style - style override
 * @param {string} [className] - modifier class
 * @param {bool} [removeGradient] - indicates if shoudl render the linear Gradient.
 * @returns {JSX}
 */
const sanAntonioApp = ({
  width, height, fill, viewBox, style, className, removeGradient,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} style={style} className={className}>
    {!removeGradient && (
      <Defs>
        <LinearGradient x1="1%" y1="-2%" x2="62%" y2="92%" id="sanAntonioApp">
          <Stop stopColor="#222E57" offset="0%" />
          <Stop stopColor="#222E57" offset="45%" />
          <Stop stopColor="#101833" offset="100%" />
        </LinearGradient>
      </Defs>
    )}
    <G fillRule="nonzero" fill="none">
      {!removeGradient && <Path fill={`${fill || 'url(#sanAntonioApp)'}`} d="M27 0h202c15 0 27 12 27 27v202c0 15-12 27-27 27H27c-15 0-27-12-27-27V27C0 12 12 0 27 0z" />}
      <Path d="M162 110V90l-16 20h16zm16-50v50h13v14h-13v20h-16v-20h-39v-9l43-55h12zm19 12l20-12h11v84h-16V79l-15 8V72zM95 193l4-4c2 2 5 3 7 3 3 0 5-1 5-4 0-4-6-4-10-6-2-2-4-4-4-7 0-6 5-9 10-9l9 3-3 4-6-2c-2 0-4 1-4 4 0 5 14 3 14 13 0 6-5 9-11 9-4 0-7-1-11-4zm29 4h-6l13-30h4l13 30h-6l-3-7h-12l-3 7zm9-21l-4 9h8l-4-9zm16-9h22v5h-8v25h-6v-25h-8v-5z" fill="#FFF" />
      <Path d="M61 59v49h28l8-1 14-5V64c-5-4-26-5-50-5" fill="#00C56E" />
      <Path d="M111 102l-14 5-8 1H61a341 341 0 0 0 2 29c1 4 3 7 5 9h1c15 0 27-7 35-18 3-4 5-9 6-14l1-12" fill="#1717EF" />
      <Path d="M68 146c-2-2-4-5-5-9a91 91 0 0 1-2-22 238 238 0 0 1 0-7l-25-1c-5-1-8-3-9-4l2 13a42 42 0 0 0 39 30" fill="#FF161F" />
      <Path d="M29 62l-2 2v39c1 1 4 3 9 4h3l22 1V78a43 43 0 0 0-32-16" fill="#E621BB" />
    </G>
  </Svg>
);

/**
 * sanAntonioApp props
 * @property {number} width - icon width size
 * @property {number} height - icon height size
 * @property {string} fill - fill color, default: svg file color
 * @property {string} viewBox - viewBox width, height, default: 0 0 256 256
 * @property {(Object|style)} [style] - modifier styles
 * @property {string} [className] - modifier class
 * @param {bool} [removeGradient] - indicates if shoudl render the linear Gradient.
 */
sanAntonioApp.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  viewBox: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  className: PropTypes.string,
  removeGradient: PropTypes.bool,
};

export default sanAntonioApp;
