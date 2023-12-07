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
 * sad icon component
 * @param {Object} props - components props
 * @param {string} props.className - modifier class name
 * @param {number} props.height - icon height
 * @param {(style|Object)} props.style - style override
 * @param {string} props.viewBox - viewBox
 * @param {number} props.width - icon width
 * @returns {JSX}
 */
const sad = ({
  width, height, viewBox, className, style,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <Defs>
      <LinearGradient
        x1="50%"
        y1="111.073%"
        x2="50%"
        y2="-11.6%"
        id="prefix__sada"
      >
        <Stop stopColor="#F5A238" offset="0%" />
        <Stop stopColor="#FAD156" offset="100%" />
      </LinearGradient>
      <LinearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="prefix__sadb">
        <Stop stopColor="#945F1A" offset="0%" />
        <Stop stopColor="#25180C" offset="100%" />
      </LinearGradient>
      <LinearGradient x1="50%" y1="100%" x2="50%" y2="0%" id="prefix__sadc">
        <Stop stopColor="#F5A238" stopOpacity={0} offset="0%" />
        <Stop stopColor="#FFFDF7" offset="100%" />
      </LinearGradient>
    </Defs>
    <G fill="none" fillRule="evenodd">
      <Path
        d="M128 0C57.308 0 0 57.308 0 128s57.308 128 128 128 128-57.308 128-128S198.692 0 128 0z"
        fill="url(#prefix__sada)"
        fillRule="nonzero"
      />
      <Path
        d="M127.623 179.729c-46.392 0-66.435 37.65-45.071 32.31 21.364-5.34 53.41-5.34 85.456 0 32.046 5.34 6.006-32.31-40.385-32.31z"
        fill="url(#prefix__sadb)"
        fillRule="nonzero"
      />
      <Path
        d="M125.845 10.572c-46.147 0-83.556 29.45-83.556 65.778s37.41 65.778 83.556 65.778S209.4 112.678 209.4 76.35s-37.409-65.778-83.555-65.778z"
        fill="url(#prefix__sadc)"
        fillRule="nonzero"
        opacity={0.4}
      />
      <Path
        d="M188.79 152.543c-16.658 0-30.206-13.548-30.206-30.207a7.554 7.554 0 017.552-7.551 7.554 7.554 0 017.551 7.551c0 8.322 6.767 15.104 15.104 15.104s15.103-6.782 15.103-15.104a7.554 7.554 0 017.551-7.551 7.554 7.554 0 017.552 7.551c0 16.66-13.548 30.207-30.206 30.207zm-120.825 0c-16.66 0-30.207-13.548-30.207-30.207 0-4.168 3.383-7.551 7.552-7.551s7.551 3.383 7.551 7.551c0 8.322 6.782 15.104 15.104 15.104s15.103-6.782 15.103-15.104a7.554 7.554 0 017.551-7.551 7.554 7.554 0 017.552 7.551c0 16.66-13.548 30.207-30.206 30.207z"
        fill="#3D3B3B"
      />
    </G>
  </Svg>
);

sad.propTypes = {
  className: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default sad;
