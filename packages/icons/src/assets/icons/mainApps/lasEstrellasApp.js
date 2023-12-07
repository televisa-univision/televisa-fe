import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, {
  Path, G,
} from 'svgs';
import { WHITE } from '@univision/fe-utilities/styled/constants';

/**
 * lasEstrellasApp component
 * @param {size} size - icon size
 * @param {string} fill - icon fill modifier
 * @param {string} viewBox - viewBox
 * @param {style} style - style override
 * @param {string} [className] - modifier class
 * @returns {JSX}
 */
const lasEstrellasApp = ({
  width, height, fill, viewBox, style, className,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} style={style} className={className}>
    <G fill={fill || WHITE}>
      <Path d="M96.8,88.8h1.1l1.3-0.2l4.7-8.7l-5.1-72V7.6c0-0.4-0.2-0.6-0.6-0.6s-0.6,0.4-0.6,0.6v0.2l-5.5,70.9C92.1,78.7,96.8,88.8,96.8,88.8z" />
      <Path d="M162.2,33.5c-0.4-0.4-0.8-0.2-1.1,0l-0.2,0.2l-53.7,46.5l-3.6,10.4l0.6,0.8l1.1,0.8l9.3-2.8L162,34.8l0.2-0.2C162.5,34.4,162.7,34,162.2,33.5z" />
      <Path d="M189,97.9c0-0.4-0.4-0.6-0.6-0.6h-0.2l-70.7-5.1L107.2,97v1.1l0.2,1.5l8.5,4.5l72.4-5.3h0.2C188.6,98.7,189,97.9,189,97.9L189,97.9z" />
      <Path d="M162.2,161.2l-46.5-53.5l-11-4l-0.4,0.4l-0.8,1.1l3,9.3l55,47.6l0.2,0.2h1.1L162.2,161.2z" />
      <Path d="M98.5,106.8h-0.6l-1.3,0.2l-4.7,8.7l5.1,72.4v0.2c0,0.4,0.2,0.6,0.6,0.6s0.6-0.4,0.6-0.6v-0.2l5.1-70.5C103.4,117.6,98.5,106.8,98.5,106.8z" />
      <Path d="M92.2,104.7l-0.4-0.4l-0.8-0.6l-9.8,3l-47.4,54.6l-0.2,0.2v1.1h1.1l0.2-0.2l53.5-46.3C88.3,115.9,92.2,104.7,92.2,104.7z" />
      <Path d="M89.2,98.7v-1.9l-9.1-4.9L7.8,97.3H7.6c-0.4,0-0.6,0.2-0.6,0.6s0.4,0.6,0.6,0.6h0.2l70.9,5.1C78.7,103.6,89.2,98.7,89.2,98.7z" />
      <Path d="M90.7,92.2l0.8-0.6l0.8-0.8l-3-9.6L34.8,33.8l-0.2-0.2h-1.1v1.1l0.2,0.2l46.5,53.7C80.2,88.6,90.7,92.2,90.7,92.2z" />
    </G>
  </Svg>
);

/**
 * lasEstrellasApp props
 * @property {number} width - icon width size
 * @property {number} height - icon height size
 * @property {string} fill - fill color, default: svg file color
 * @property {string} viewBox - viewBox width, height, default: 0 0 256 256
 * @property {(Object|style)} [style] - modifier styles
 * @property {string} [className] - modifier class
 */
lasEstrellasApp.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  viewBox: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  className: PropTypes.string,
};

export default lasEstrellasApp;
