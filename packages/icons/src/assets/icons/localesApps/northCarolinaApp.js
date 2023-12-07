import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, {
  Path, Defs, G, LinearGradient, Stop,
} from 'svgs';

/**
 * northCarolinaApp component
 * @param {size} size - icon size
 * @param {string} fill - icon fill modifier
 * @param {string} viewBox - viewBox
 * @param {style} style - style override
 * @param {string} [className] - modifier class
 * @param {bool} [removeGradient] - indicates if shoudl render the linear Gradient.
 * @returns {JSX}
 */
const northCarolinaApp = ({
  width, height, fill, viewBox, style, className, removeGradient,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} style={style} className={className}>
    {!removeGradient && (
      <Defs>
        <LinearGradient x1="1%" y1="-2%" x2="62%" y2="92%" id="northCarolinaApp">
          <Stop stopColor="#222E57" offset="0%" />
          <Stop stopColor="#222E57" offset="45%" />
          <Stop stopColor="#101833" offset="100%" />
        </LinearGradient>
      </Defs>
    )}
    <G fillRule="nonzero" fill="none">
      {!removeGradient && <Path fill={`${fill || 'url(#northCarolinaApp)'}`} d="M27 0h202c15 0 27 12 27 27v202c0 15-12 27-27 27H27c-15 0-27-12-27-27V27C0 12 12 0 27 0z" />}
      <Path d="M148 109V90l-15 19h15zm16-50v50h14v14h-14v19h-16v-19h-38v-9l43-55h11zm51 14c-10 0-13 13-13 28s3 27 13 27c9 0 12-12 12-27s-3-28-12-28zm0-14c20 0 28 19 28 42s-8 41-28 41c-21 0-28-18-28-41s7-42 28-42zM98 197v-30h5l16 19v-19h6v30h-4l-17-20v20h-6zm48-26c-6 0-10 5-10 11s4 10 10 10c4 0 7-2 9-4l4 4c-3 3-7 5-13 5-9 0-16-6-16-15s7-16 16-16c4 0 8 2 11 5l-4 4c-2-2-4-4-7-4z" fill="#FFF" />
      <Path d="M47 59v49h28l8-1 14-5V64c-5-4-26-5-50-5" fill="#00C56E" />
      <Path d="M97 102l-14 5-8 1H47a341 341 0 0 0 2 29c1 4 2 7 4 9h2c14 0 27-7 35-18l6-14 1-12" fill="#1717EF" />
      <Path d="M53 146c-2-2-3-5-4-9a91 91 0 0 1-2-22 238 238 0 0 1 0-7l-25-1c-5-1-8-3-9-4l2 13a42 42 0 0 0 38 30" fill="#FF161F" />
      <Path d="M15 62l-2 2v39c1 1 4 3 9 4h2l23 1V78a43 43 0 0 0-32-16" fill="#E621BB" />
    </G>
  </Svg>
);

/**
 * northCarolinaApp props
 * @property {number} width - icon width size
 * @property {number} height - icon height size
 * @property {string} fill - fill color, default: svg file color
 * @property {string} viewBox - viewBox width, height, default: 0 0 256 256
 * @property {(Object|style)} [style] - modifier styles
 * @property {string} [className] - modifier class
 * @param {bool} [removeGradient] - indicates if shoudl render the linear Gradient.
 */
northCarolinaApp.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  viewBox: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  className: PropTypes.string,
  removeGradient: PropTypes.bool,
};

export default northCarolinaApp;
