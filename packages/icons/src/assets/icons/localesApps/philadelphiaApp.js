import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, {
  Path, Defs, G, LinearGradient, Stop,
} from 'svgs';

/**
 * philadelphiaApp component
 * @param {size} size - icon size
 * @param {string} fill - icon fill modifier
 * @param {string} viewBox - viewBox
 * @param {style} style - style override
 * @param {string} [className] - modifier class
 * @param {bool} [removeGradient] - indicates if shoudl render the linear Gradient.
 * @returns {JSX}
 */
const philadelphiaApp = ({
  width, height, fill, viewBox, style, className, removeGradient,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} style={style} className={className}>
    {!removeGradient && (
      <Defs>
        <LinearGradient x1="1%" y1="-2%" x2="62%" y2="92%" id="philadelphiaApp">
          <Stop stopColor="#222E57" offset="0%" />
          <Stop stopColor="#222E57" offset="45%" />
          <Stop stopColor="#101833" offset="100%" />
        </LinearGradient>
      </Defs>
    )}
    <G fillRule="nonzero" fill="none">
      {!removeGradient && <Path fill={`${fill || 'url(#philadelphiaApp)'}`} d="M27 0h202c15 0 27 12 27 27v202c0 15-12 27-27 27H27c-15 0-27-12-27-27V27C0 12 12 0 27 0z" />}
      <Path d="M133 117a14 14 0 0 0 14 13c7 0 13-6 13-14 0-7-6-14-14-14l-9 2c-2 4-4 8-4 13zm28-53l-15 25h1c15 0 28 11 28 27 0 15-13 27-28 27s-29-10-29-26c0-8 4-15 8-22l18-31h17zm29 60c4 3 9 6 14 6a14 14 0 0 0 14-14c0-4-2-8-5-10-3-3-6-4-10-4s-8 2-11 5l-10-2 5-41h42v13h-29l-2 13 6-1c6 0 13 1 19 6s10 13 10 21c0 16-13 27-29 27-9 0-17-3-24-10l10-9zM103 185h-6v12h-6v-31h12c4 0 6 1 8 3l2 6-2 7c-2 2-4 3-8 3zm-6-6h5l4-1 1-3-1-2-4-1h-5v7zm42 18v-14h-15v14h-6v-31h6v12h15v-12h6v31h-6zm13 0v-31h6v26h13v5h-19z" fill="#FFF" />
      <Path d="M56 59v49h28l8-1 15-5V64c-6-4-27-5-51-5" fill="#00C56E" />
      <Path d="M107 102l-15 5-8 1H56a341 341 0 0 0 2 29c1 4 3 7 5 9h2c14 0 26-7 34-18 3-4 5-9 6-14l2-12" fill="#1717EF" />
      <Path d="M63 146c-2-2-4-5-5-9a91 91 0 0 1-2-22 238 238 0 0 1 0-7l-25-1c-5-1-8-3-9-4l2 13a42 42 0 0 0 39 30" fill="#FF161F" />
      <Path d="M24 62l-2 2v39c1 1 4 3 9 4h3l22 1V78a43 43 0 0 0-32-16" fill="#E621BB" />
    </G>
  </Svg>
);

/**
 * philadelphiaApp props
 * @property {number} width - icon width size
 * @property {number} height - icon height size
 * @property {string} fill - fill color, default: svg file color
 * @property {string} viewBox - viewBox width, height, default: 0 0 256 256
 * @property {(Object|style)} [style] - modifier styles
 * @property {string} [className] - modifier class
 * @param {bool} [removeGradient] - indicates if shoudl render the linear Gradient.
 */
philadelphiaApp.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  viewBox: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  className: PropTypes.string,
  removeGradient: PropTypes.bool,
};

export default philadelphiaApp;
