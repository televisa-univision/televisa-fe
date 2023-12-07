import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, {
  ClipPath, Path, G, RadialGradient, LinearGradient, Stop, Defs, Ellipse,
} from 'svgs';

/**
 * univisionApp component
 * @param {size} size - icon size
 * @param {string} viewBox - viewBox
 * @param {style} style - style override
 * @param {string} [className] - modifier class
 * @returns {JSX}
 */
const univisionApp = ({
  width, height, viewBox, style, className,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} style={style} className={className}>
    <Defs>
      <LinearGradient id="uniNowLG1" x1="117.36" y1="172.23" x2="180.27" y2="172.23" gradientTransform="matrix(1 0 0 -1 0 256)" gradientUnits="userSpaceOnUse">
        <Stop offset="0" stopColor="#51bb83" />
        <Stop offset=".22" stopColor="#4dba81" />
        <Stop offset=".44" stopColor="#41b77b" />
        <Stop offset=".67" stopColor="#2cb272" />
        <Stop offset=".9" stopColor="#0fab65" />
        <Stop offset="1" stopColor="#00a75e" />
      </LinearGradient>
      <LinearGradient id="uniNowLG2" x1="125.46" y1="149.73" x2="165.01" y2="110.18" gradientTransform="matrix(1 0 0 -1 0 256)" gradientUnits="userSpaceOnUse">
        <Stop offset=".5" stopColor="#1d1dea" />
        <Stop offset=".6" stopColor="#2022e0" />
        <Stop offset=".78" stopColor="#292ec4" />
        <Stop offset="1" stopColor="#374199" />
      </LinearGradient>
      <LinearGradient id="uniNowLG3" x1="89.61" y1="110.76" x2="118.9" y2="140.05" gradientTransform="matrix(1 0 0 -1 0 256)" gradientUnits="userSpaceOnUse">
        <Stop offset="0" stopColor="#ae1f23" />
        <Stop offset=".38" stopColor="#cc1e23" />
        <Stop offset=".76" stopColor="#e41c24" />
        <Stop offset="1" stopColor="#ed1c24" />
      </LinearGradient>
      <LinearGradient id="uniNowLG4" x1="117.36" y1="170.37" x2="74.96" y2="170.37" gradientTransform="matrix(1 0 0 -1 0 256)" gradientUnits="userSpaceOnUse">
        <Stop offset="0" stopColor="#c626b6" />
        <Stop offset=".3" stopColor="#be27af" />
        <Stop offset=".78" stopColor="#a82c9b" />
        <Stop offset="1" stopColor="#9b2e90" />
      </LinearGradient>
      <RadialGradient id="uniNowRG1" cx="4529.03" cy="4854.19" r="210.5" gradientTransform="matrix(.19 0 0 -.13 -718.78 769.49)" gradientUnits="userSpaceOnUse">
        <Stop offset="0" />
        <Stop offset=".8" stopOpacity="0" />
      </RadialGradient>
      <ClipPath id="uniNowCP1">
        <Path d="M119.87 156.61c13.82 0 23.45 10.3 23.45 23.18S133.69 203 119.87 203s-23.46-10.3-23.46-23.18 9.59-23.21 23.46-23.21zm0 38.64c8.54 0 14.77-6.92 14.77-15.46s-6.23-15.45-14.77-15.45-14.78 6.91-14.78 15.45 6.23 15.46 14.78 15.46z" fill="none" />
      </ClipPath>
    </Defs>
    <Path d="M211.07 256H44.9A44.9 44.9 0 010 211.07V44.9A44.9 44.9 0 0144.9 0h166.18A44.9 44.9 0 01256 44.9v166.18A44.91 44.91 0 01211.07 256z" dataname="Layer 4" />
    <G dataname="Layer 3">
      <Path d="M53.3 157.28h6.1l25.08 29.29v-29.29h8.68v45h-6.1L62 172.88v29.28h-8.7zm66.57-.67c13.82 0 23.45 10.3 23.45 23.18S133.69 203 119.87 203s-23.46-10.3-23.46-23.18 9.59-23.21 23.46-23.21zm0 38.64c8.54 0 14.77-6.92 14.77-15.46s-6.23-15.45-14.77-15.45-14.78 6.91-14.78 15.45 6.23 15.46 14.78 15.46zm20.6-37.97h8.82l9.35 28.07 9.9-28.07h6.1l9.9 28.07 9.35-28.07h8.81l-14.91 45h-6.1l-10-28.47-10 28.47h-6.1z" fill="#fff" />
      <G clipPath="url(#uniNowCP1)">
        <Ellipse cx="124.07" cy="150.51" rx="39.18" ry="26.84" fill="url(#uniNowRG1)" />
      </G>
      <Path d="M117.42 53v61.41c3.12 0 20.07.41 34.58-.81 3.66-.41 7.18-.81 10.57-1.36 8.27-1.62 15.32-4.06 17.76-6.1v-47C174 54.38 147.25 53 117.42 53z" fill="url(#uniNowLG1)" />
      <Path d="M180.33 106.85V106c-2.44 2-9.49 4.47-17.76 6.1-3.39.54-6.91 1.08-10.57 1.35-14.51 1.22-31.46.82-34.58.82v1.08c0 2.44 0 4.48.14 6.92v1.89l.41 8.82a107.71 107.71 0 002.17 16.54c1.22 5.28 2.84 9.49 5.15 11.66l.13.13h2.31a52.53 52.53 0 0043.11-22.5 54.62 54.62 0 007.73-18 57.56 57.56 0 001.76-14z" fill="url(#uniNowLG2)" />
      <Path d="M125.29 161.35c-2.31-2.17-4.07-6.37-5.15-11.66a107.55 107.55 0 01-2.14-16.54l-.41-8.81v-1.9c0-2.3-.14-4.47-.14-6.91v-1.09a219.17 219.17 0 01-31.58-2c-6.11-1.09-10-3.39-10.72-4.48a61.64 61.64 0 002.17 15.87 52.73 52.73 0 0048 37.55z" fill="url(#uniNowLG3)" />
      <Path d="M77 56.69a2.08 2.08 0 00-2 2v49.21c.68 1.09 4.74 3.39 10.71 4.48 1 .13 2 .27 3.25.54a237.2 237.2 0 0028.34 1.63v-38C104.27 59.67 83.94 56.69 77 56.69z" fill="url(#uniNowLG4)" />
    </G>
  </Svg>
);

/**
 * univisionApp props
 * @property {number} width - icon width size
 * @property {number} height - icon height size
 * @property {string} viewBox - viewBox width, height, default: 0 0 256 256
 * @property {(Object|style)} [style] - modifier styles
 * @property {string} [className] - modifier class
 */
univisionApp.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  viewBox: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  className: PropTypes.string,
};

export default univisionApp;
