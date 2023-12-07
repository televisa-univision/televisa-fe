import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, {
  Path, Defs, G, LinearGradient, Stop, Rect,
} from 'svgs';

/**
 * uforiaApp component
 * @param {size} size - icon size
 * @param {string} fill - icon fill modifier
 * @param {string} viewBox - viewBox
 * @param {style} style - style override
 * @param {string} [className] - modifier class
 * @returns {JSX}
 */
const uforiaApp = ({
  width, height, fill, viewBox, style, className,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} style={style} className={className}>
    <Defs>
      <LinearGradient x1="42.05%" y1="26.74%" x2="87.99%" y2="91.2%" id="uforiaApp">
        <Stop stopColor="#C90043" offset="0%" />
        <Stop stopColor="#F2001C" offset="100%" />
      </LinearGradient>
    </Defs>
    <G fill="none" fillRule="evenodd">
      <Rect fill={`${fill || 'url(#uforiaApp)'}`} width="256" height="256" rx="62" />
      <G fill="#FFFFFE">
        <Path d="M178.17 91.74h16.6v-6.69h-16.6v6.7zm0 8.44h16.6V93.5h-16.6v6.7zm0-16.88h16.6v-6.69h-16.6v6.7zm0 25.33h16.6v-6.7h-16.6v6.7zm0 8.44h16.6v-6.7h-16.6v6.7zm0 18.63v6.69h1.1a40.5 40.5 0 0 0 10.28-6.7h-11.38zm0-8.44v6.69h13.14c.41-.45.82-.9 1.2-1.36l2.27-2.74v-2.6h-16.61zm0-8.44h16.6v6.68h-16.6v-6.68zM157.32 117.07h16.61v-6.7h-16.6v6.7zm0 27.07v3.2a57.15 57.15 0 0 0 16.61-2.82v-.38h-16.6zm0-18.64h16.61v-6.68h-16.6v6.68zm0 8.45h16.61v-6.7h-16.6v6.7zm0-25.32h16.61v-6.69h-16.6v6.69zm0 27.07h16.61v6.69h-16.6v-6.7zM136.47 91.74h16.6v-6.69h-16.6v6.7zm0-8.44h16.6v-6.69h-16.6v6.7zm0-8.44h16.6v-6.69h-16.6v6.7zm0 69.28v.16c4.5 1.55 9.97 2.63 16.6 2.96v-3.12h-16.6zm0-43.96h16.6V93.5h-16.6v6.7zm0-33.76h16.6v-6.69h-16.6v6.69zm0 75.97h16.6v-6.7h-16.6v6.7zm0-33.76h16.6v-6.7h-16.6v6.7zm0 25.32h16.6v-6.7h-16.6v6.7zm0-8.45h16.6v-6.68h-16.6v6.68zm0-15.13h16.6v6.7h-16.6v-6.7zM115.62 117.07h16.6v-6.7h-16.6v6.7zm0-8.44h16.6v-6.7h-16.6v6.7zm0-16.89h16.6v-6.69h-16.6v6.69zm0 8.44h16.6V93.5h-16.6v6.7zm7.17 35.52a30.32 30.32 0 0 0 9.09 6.69h.35v-6.7h-9.44zm-7.1-16.88c.12 1.82.47 4.15 1.26 6.68h15.28v-6.68h-16.54zm16.54 8.43v6.7h-10.91a26.9 26.9 0 0 1-3.76-6.7h14.67z" />
        <Path d="M195.64 135.17c-7.94 9.63-22.51 16.11-39.22 16.25-36.66-.45-44.86-21.61-44.86-34.5v-20.8c0-27.05-35.02-36.34-46.2-36.34-3.94 0-5.58.9-5.58 2.83v62.68a69.86 69.86 0 0 0 69.88 69.84c34.37 0 60.84-24.88 65.98-59.96" />
      </G>
    </G>
  </Svg>
);

/**
 * uforiaApp props
 * @property {number} width - icon width size
 * @property {number} height - icon height size
 * @property {string} fill - fill color, default: svg file color
 * @property {string} viewBox - viewBox width, height, default: 0 0 256 256
 * @property {(Object|style)} [style] - modifier styles
 * @property {string} [className] - modifier class
 */
uforiaApp.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  viewBox: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  className: PropTypes.string,
};

export default uforiaApp;
