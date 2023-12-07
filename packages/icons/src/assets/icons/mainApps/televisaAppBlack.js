import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, {
  Path, G, Defs, Stop, LinearGradient,
} from 'svgs';
import { BLACK } from '../../../../dist/constants/colors';

/**
 * televisaAppBlack component
 * @param {size} size - icon size
 * @param {string} fill - icon fill modifier
 * @param {string} viewBox - viewBox
 * @param {style} style - style override
 * @param {string} [className] - modifier class
 * @returns {JSX}
 */
const televisaAppBlack = ({
  width, height, fill, viewBox, style, className,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} style={style} className={className}>
    <Defs>
      <LinearGradient x1="98.75%" y1="90.06%" x2="35.8%" y2="38.77%" id="televisaApp">
        <Stop stopColor="#FFF" stopOpacity=".55" offset="0%" />
        <Stop stopColor="#FFF" stopOpacity=".5" offset="0%" />
        <Stop stopOpacity=".12" offset="100%" />
      </LinearGradient>
    </Defs>
    <G fill={fill || BLACK}>
      <Path d="M25.5,0c-3.2,0-6.2,0.5-8.9,1.2h17.8C31.7,0.5,28.7,0,25.5,0z" />
      <Path d="M11.1,3.4c-0.9,0.4-1.8,0.9-2.6,1.4h8.6c0.7-0.5,1.5-1,2.4-1.4H11.1z" />
      <Path d="M42.5,4.8c-0.8-0.5-1.7-1-2.6-1.4h-8.2c0.8,0.4,1.6,0.9,2.4,1.4H42.5L42.5,4.8z" />
      <Path d="M47.7,8.8C47,8,46.1,7.3,45.2,6.6H36c0.6,0.7,1.2,1.4,1.7,2.2H47.7L47.7,8.8z" />
      <Path d="M5.8,6.6C4.9,7.3,4,8,3.3,8.8h10.2c0.5-0.8,1-1.5,1.7-2.2H5.8z" />
      <Path d="M2,10.4c-0.7,1-1.3,2.1-1.6,3.2h11.3c0.2-1.1,0.5-2.2,1-3.2H2z" />
      <Path d="M50.7,13.6c-0.3-1.1-0.9-2.2-1.6-3.2H38.4c0.4,1,0.8,2.1,1,3.2H50.7z" />
      <Path d="M11.5,14.9H0.1C0,15.3,0,15.6,0,16c0,0.8,0.1,1.6,0.3,2.3h11.3c-0.1-0.8-0.2-1.5-0.2-2.3
        C11.4,15.6,11.4,15.3,11.5,14.9z"
      />
      <Path d="M39.4,18.3h11.3c0.2-0.7,0.3-1.5,0.3-2.3c0-0.4,0-0.7-0.1-1.1H39.6c0,0.3,0,0.7,0,1.1
        C39.6,16.8,39.5,17.6,39.4,18.3z"
      />
      <Path d="M0.7,19.5c0.5,1.3,1.4,2.4,2.4,3.6h10.2c-0.6-1.1-1.1-2.3-1.5-3.6H0.7z" />
      <Path d="M47.9,23c1-1.1,1.9-2.3,2.4-3.6H39.2c-0.3,1.3-0.8,2.5-1.5,3.6H47.9z" />
      <Path d="M32.3,28.3h8.3c0.9-0.4,1.7-0.9,2.5-1.4c1.4-0.9,2.7-1.8,3.8-2.9h-9.9C35.9,25.8,34.2,27.2,32.3,28.3
        L32.3,28.3z"
      />
      <Path d="M13.9,24H4.1c1.1,1,2.4,2,3.8,2.9c0.8,0.5,1.6,1,2.5,1.4h8.3C16.8,27.2,15.2,25.8,13.9,24L13.9,24z" />
      <Path d="M19.8,28.8h-8.3c4,1.9,8.7,3.2,14.1,3.2s10.1-1.3,14.1-3.2h-8.3c-1.8,0.8-3.7,1.2-5.7,1.2
        C23.5,30,21.5,29.6,19.8,28.8z"
      />
    </G>
  </Svg>
);

/**
 * televisaApp props
 * @property {number} width - icon width size
 * @property {number} height - icon height size
 * @property {string} fill - fill color, default: svg file color
 * @property {string} viewBox - viewBox width, height, default: 0 0 256 256
 * @property {(Object|style)} [style] - modifier styles
 * @property {string} [className] - modifier class
 */
televisaAppBlack.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  viewBox: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  className: PropTypes.string,
};

export default televisaAppBlack;
