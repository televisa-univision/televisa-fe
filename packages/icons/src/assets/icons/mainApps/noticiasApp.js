import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, {
  Path, Defs, G, LinearGradient, Stop,
} from 'svgs';

/**
 * noticiasApp component
 * @param {size} size - icon size
 * @param {string} fill - icon fill modifier
 * @param {string} viewBox - viewBox
 * @param {style} style - style override
 * @param {string} [className] - modifier class
 * @returns {JSX}
 */
const noticiasApp = ({
  width, height, fill, viewBox, style, className,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} style={style} className={className}>
    <Defs>
      <LinearGradient x1="98.75%" y1="90.06%" x2="35.8%" y2="38.77%" id="noticiasApp">
        <Stop stopColor="#FFF" stopOpacity=".55" offset="0%" />
        <Stop stopColor="#FFF" stopOpacity=".5" offset="0%" />
        <Stop stopOpacity=".12" offset="100%" />
      </LinearGradient>
    </Defs>
    <G fill="none" fillRule="nonzero">
      <Path d="M26.67 0h202.66A26.66 26.66 0 0 1 256 26.67v202.66A26.66 26.66 0 0 1 229.33 256H26.67A26.66 26.66 0 0 1 0 229.33V26.67A26.66 26.66 0 0 1 26.67 0z" fill={`${fill || '#0072C1'}`} />
      <Path d="M174.75 59.17L125.71.82v81l-20.78 30.14-12.9 22.94-43.12 21H37.96L8.66 141.5 0 139.63 55.85 201h92.9c13.87 0 26-12.3 26-25.99V59.17z" style={{ mixBlendMode: 'multiply' }} transform="translate(81.25 55)" fill="url(#noticiasApp)" fillOpacity=".8" />
      <Path d="M207 124.9c-12.14 7.58-59.43 10.57-88.68 10.57L118.25 47c42.66.01 79.63 2.11 88.7 8.82l.05 69.08zm0 9.6c-.3 42.67-34.28 76.47-76.62 76.5-.58 0-1.17-.04-1.72-.04-8.86-12.24-10.3-35.08-10.33-65.2 31.36-.27 70.9-1.27 88.67-11.26zm-87.8 76.4c-39.8-2.85-70.9-35.27-71.2-76.3 11.22 6.8 43.35 11.05 58.8 11.28.13 24.9 3.07 53.19 12.4 65.01zm-12.03-75.42c-8.68-.24-38.01-1.43-59.16-8.42V57.44v-.14a3 3 0 0 1 3-2.97c9.85 0 38.19 4.16 57.31 27.1l-1.15 54.05z" fill="#FFF" />
    </G>
  </Svg>
);

/**
 * noticiasApp props
 * @property {number} width - icon width size
 * @property {number} height - icon height size
 * @property {string} fill - fill color, default: svg file color
 * @property {string} viewBox - viewBox width, height, default: 0 0 256 256
 * @property {(Object|style)} [style] - modifier styles
 * @property {string} [className] - modifier class
 */
noticiasApp.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  viewBox: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  className: PropTypes.string,
};

export default noticiasApp;
