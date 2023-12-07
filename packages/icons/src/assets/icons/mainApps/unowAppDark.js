import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, {
  Path, G, RadialGradient, LinearGradient, Stop, Defs, Rect,
} from 'svgs';

/**
 * univisionAppDark component
 * @param {size} size - icon size
 * @param {string} fill - icon fill modifier
 * @param {string} viewBox - viewBox
 * @param {style} style - style override
 * @param {string} [className] - modifier class
 * @returns {JSX}
 */
const univisionAppDark = ({
  width, height, fill, viewBox, style, className,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} style={style} className={className}>
    <Defs>
      <RadialGradient cx="62.5%" cy="-87.8%" fx="62.5%" fy="-87.8%" r="137.7%" id="univisionAppDark1">
        <Stop offset="0%" />
        <Stop stopColor="#FFF" offset="100%" />
      </RadialGradient>
      <LinearGradient x1="0%" y1="49.5%" y2="49.5%" id="univisionAppDark2">
        <Stop stopColor="#51BB83" offset="0%" />
        <Stop stopColor="#4DBA81" offset="20%" />
        <Stop stopColor="#41B77B" offset="40%" />
        <Stop stopColor="#2CB272" offset="70%" />
        <Stop stopColor="#0FAB65" offset="90%" />
        <Stop stopColor="#00A75E" offset="100%" />
      </LinearGradient>
      <LinearGradient x1="12.8%" y1=".5%" x2="75.8%" y2="72%" id="univisionAppDark3">
        <Stop stopColor="#1D1DEA" offset="50%" />
        <Stop stopColor="#2022E0" offset="60%" />
        <Stop stopColor="#292EC4" offset="80%" />
        <Stop stopColor="#374199" offset="100%" />
      </LinearGradient>
      <LinearGradient x1="28.7%" y1="69.8%" x2="87.3%" y2="15.9%" id="univisionAppDark4">
        <Stop stopColor="#AE1F23" offset="0%" />
        <Stop stopColor="#CC1E23" offset="40%" />
        <Stop stopColor="#E41C24" offset="80%" />
        <Stop stopColor="#ED1C24" offset="100%" />
      </LinearGradient>
      <LinearGradient x1="100%" y1="49.8%" x2="0%" y2="49.8%" id="univisionAppDark5">
        <Stop stopColor="#C626B6" offset="0%" />
        <Stop stopColor="#BE27AF" offset="30%" />
        <Stop stopColor="#A82C9B" offset="80%" />
        <Stop stopColor="#9B2E90" offset="100%" />
      </LinearGradient>
    </Defs>
    <G fill="none" fillRule="evenodd">
      <Rect fill={`${fill || '#000'}`} width="256" height="256" rx="43" />
      <Path d="M96.9 180.4a23 23 0 0 1 23.6-23.6 23 23 0 0 1 23.6 23.6 23 23 0 0 1-23.6 23.6 23 23 0 0 1-23.6-23.6z" fill="url(#univisionAppDark1)" />
      <Path d="M106.3 180.4c0 8.7 6 15.8 14.2 15.8 8.1 0 14.1-7 14.1-15.8 0-8.7-6-15.8-14.1-15.8s-14.2 7.1-14.2 15.8z" fill="#000" />
      <Path fill="#fff" d="M53.6 202.9v-45h6.1L85 187.2V158h8.7v45h-6.2l-25.1-29.3V203zm102.5 0l-14.8-45h8.8l9.1 28 9.9-28h6l9.9 28 9.2-28h8.7l-14.8 45h-6l-10-28.5-10 28.5z" />
      <Path d="M117.8 53v61.7c3 0 20.3.6 34.7-.8l10.6-1.4a52.5 52.5 0 0 0 17.8-6.1V59.1c-6.4-4.7-33.1-6-63.1-6z" fill="url(#univisionAppDark2)" />
      <Path d="M180.8 107.2v-.9c-2.5 2-9.4 4.5-17.7 6.2l-10.6 1.3c-14.5 1.4-31.7.9-34.8.9v10l.3 8.9a97 97 0 0 0 2.2 16.7c1.2 5.2 2.8 9.4 5.3 11.6h2.2c17.8 0 33.7-8.9 43.4-22.5a59.2 59.2 0 0 0 9.7-32.2z" fill="url(#univisionAppDark3)" />
      <Path d="M120.3 150.1c-1.1-4.7-1.7-10.6-2.2-16.7l-.3-8.9v-9.9c-14 0-25.9-1.2-31.7-2.3-6.1-1.1-10-3.3-10.9-4.5a53.7 53.7 0 0 0 9.8 31.5 50.4 50.4 0 0 0 40.6 22.5 27 27 0 0 1-5.3-11.7z" fill="url(#univisionAppDark4)" />
      <Path d="M77.2 56.5c-1.1 0-2 .9-2 2V108c.9 1 4.8 3.3 10.9 4.4l3.3.6a231 231 0 0 0 28.4 1.6v-38a54.8 54.8 0 0 0-40.6-20z" fill="url(#univisionAppDark5)" />
    </G>
  </Svg>
);

/**
 * univisionAppDark props
 * @property {number} width - icon width size
 * @property {number} height - icon height size
 * @property {string} fill - fill color, default: svg file color
 * @property {string} viewBox - viewBox width, height, default: 0 0 256 256
 * @property {(Object|style)} [style] - modifier styles
 * @property {string} [className] - modifier class
 */
univisionAppDark.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  viewBox: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  className: PropTypes.string,
};

export default univisionAppDark;
