import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import {
  Defs,
  G,
  LinearGradient,
  Path,
  Stop,
  Svg,
} from 'svgs';

/**
 * like icon component
 * @param {Object} props - components props
 * @param {string} props.className - modifier class name
 * @param {number} props.height - icon height
 * @param {(style|Object)} props.style - style override
 * @param {string} props.viewBox - viewBox
 * @param {number} props.width - icon width
 * @returns {JSX}
 */
const like = ({
  width, height, viewBox, className, style,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <Defs>
      <LinearGradient
        x1="94.859%"
        y1="15.817%"
        x2="-2.081%"
        y2="100%"
        id="prefix__likea"
      >
        <Stop stopColor="#30344B" offset="0%" />
        <Stop stopColor="#4E5167" offset="100%" />
      </LinearGradient>
      <LinearGradient x1="50%" y1="100%" x2="50%" y2="0%" id="prefix__likeb">
        <Stop stopColor="#313445" stopOpacity={0} offset="0%" />
        <Stop stopColor="#5A5F76" stopOpacity={0.89} offset="100%" />
      </LinearGradient>
    </Defs>
    <G fill="none" fillRule="evenodd">
      <Path
        d="M128 0C57.308 0 0 57.308 0 128s57.308 128 128 128 128-57.308 128-128S198.692 0 128 0z"
        fill="url(#prefix__likea)"
      />
      <Path
        d="M126.222 10.667c-46.146 0-83.555 29.45-83.555 65.777 0 36.329 37.409 65.778 83.555 65.778 46.147 0 83.556-29.45 83.556-65.778s-37.41-65.777-83.556-65.777z"
        fill="url(#prefix__likeb)"
        fillRule="nonzero"
      />
      <Path
        d="M87.826 174.905H69.333v-67.509h18.493v67.51zm39.141 2.394l-33.162-13.932v-43.451s21.389-14.545 27.553-20.007c16.951-14.361 7.335-41.242 21.081-41.242 22.93 0 7.089 41.794 7.089 45.292.061 5.34 11.033 6.812 17.876 8.285l2.095.491 2.404.369a43.26 43.26 0 0115.78 6.137 12.249 12.249 0 014.285 10.206 12.266 12.266 0 01-5.702 9.494 10.15 10.15 0 011.356 9.405 10.215 10.215 0 01-7.027 6.43 8.87 8.87 0 011.708 9.728 8.94 8.94 0 01-8.366 5.307l-1.417-.184a12.254 12.254 0 01-4.194 8.667 12.363 12.363 0 01-9.182 2.994h-3.699a83.574 83.574 0 01-9.184-.614l-3.02-.307c-1.726-.307-3.514-.736-5.302-.736a43.311 43.311 0 01-10.972-2.332z"
        fill="#FFF"
        fillRule="nonzero"
      />
    </G>
  </Svg>
);

like.propTypes = {
  className: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default like;
