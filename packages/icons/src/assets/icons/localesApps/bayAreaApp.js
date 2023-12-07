import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, {
  Path, Defs, G, LinearGradient, Stop,
} from 'svgs';

/**
 * bayAreaApp component
 * @param {size} size - icon size
 * @param {string} fill - icon fill modifier
 * @param {string} viewBox - viewBox
 * @param {style} style - style override
 * @param {string} [className] - modifier class
 * @param {bool} [removeGradient] - indicates if shoudl render the linear Gradient.
 * @returns {JSX}
 */
const bayAreaApp = ({
  width, height, fill, viewBox, style, className, removeGradient,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} style={style} className={className}>
    {!removeGradient && (
      <Defs>
        <LinearGradient x1="1%" y1="-2%" x2="62%" y2="92%" id="bayAreaApp">
          <Stop stopColor="#222E57" offset="0%" />
          <Stop stopColor="#222E57" offset="45%" />
          <Stop stopColor="#101833" offset="100%" />
        </LinearGradient>
      </Defs>
    )}
    <G fillRule="nonzero" fill="none">
      {!removeGradient && <Path fill={`${fill || 'url(#bayAreaApp)'}`} d="M27 0h202c15 0 27 12 27 27v202c0 15-12 27-27 27H27c-15 0-27-12-27-27V27C0 12 12 0 27 0z" />}
      <Path d="M122 76l19-11h11v81h-15V83l-15 8V76zm80 37V94l-15 19h15zm16-48v48h13v14h-13v19h-16v-19h-37v-9l42-53h11z" fill="#FFF" />
      <Path d="M57 59v49h28l8-1 15-5V64c-5-4-27-5-51-5" fill="#00C56E" />
      <Path d="M108 102l-15 5-8 1H57a341 341 0 0 0 3 29c0 4 2 7 4 9h2c14 0 26-7 34-18 3-4 5-9 6-14l2-12" fill="#1717EF" />
      <Path d="M64 146c-2-2-4-5-4-9a91 91 0 0 1-3-22 238 238 0 0 1 0-7l-25-1c-5-1-8-3-8-4l1 13a42 42 0 0 0 39 30" fill="#FF161F" />
      <Path d="M25 62l-1 2v39c0 1 3 3 8 4h3l22 1V78a43 43 0 0 0-32-16" fill="#E621BB" />
      <Path d="M22 166h5l-5 6h-3l3-6zm-9 34H8l11-26h4l11 26h-6l-2-6H16l-3 6zm8-18l-3 8h6l-3-8zm22 7h-2v11h-5v-26h9l6 2a7 7 0 0 1 0 11l-3 1 10 12h-6l-9-11zm-2-5h4l3-1v-2-2h-7v5zm35-5H65v5h8v4h-8v8h11v4H60v-26h16v5zm7 21h-5l11-26h3l11 26h-5l-2-6H85l-2 6zm8-18l-4 8h7l-3-8zm48-8h9l6 2 2 5-2 4c3 2 4 4 4 7l-2 6-7 2h-10v-26zm5 5v5h3l3-1 1-2-1-2h-6zm0 17h5c2 0 3-1 3-2l1-2-1-2-3-1h-5v7zm19 4h-5l11-26h4l11 26h-5l-3-6h-10l-3 6zm8-18l-3 8h6l-3-8zm33 18v-12h-13v12h-5v-26h5v10h13v-10h5v26h-5zm10 0v-26h5v26h-5zm4-34h5l-5 6h-3l3-6zm9 34h-5l11-26h3l11 26h-5l-2-6h-11l-2 6zm7-18l-3 8h7l-4-8zm-116-1l-1-3-3-1h-2v8h2l3-2 1-2zm-8-7h4l4 2c2 1 3 3 3 5s-1 4-3 5l-4 1h-4v-13zm20 3h-5v2h3v2h-3v4h5v2h-8v-13h8v3zm-20 25v-13h2v11h5v2h-7zm11 0h-3l6-13h2l5 13h-3l-1-3h-5l-1 3zm4-9l-2 4h3l-1-4z" fill="#FFF" fillRule="nonzero" />
    </G>
  </Svg>
);

/**
 * bayAreaApp props
 * @property {number} width - icon width size
 * @property {number} height - icon height size
 * @property {string} fill - fill color, default: svg file color
 * @property {string} viewBox - viewBox width, height, default: 0 0 256 256
 * @property {(Object|style)} [style] - modifier styles
 * @property {string} [className] - modifier class
 * @param {bool} [removeGradient] - indicates if shoudl render the linear Gradient.
 */
bayAreaApp.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  viewBox: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  className: PropTypes.string,
  removeGradient: PropTypes.bool,
};

export default bayAreaApp;
