import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import {
  Circle,
  Defs,
  G,
  LinearGradient,
  Path,
  Stop,
  Svg,
} from 'svgs';

/**
 * dislikeReactionSoccer icon component
 * @param {Object} props - components props
 * @param {string} props.className - modifier class name
 * @param {number} props.height - icon height
 * @param {(style|Object)} props.style - style override
 * @param {string} props.viewBox - viewBox
 * @param {number} props.width - icon width
 * @returns {JSX}
 */
const dislikeReactionSoccer = ({
  width, height, viewBox, className, style,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <Defs>
      <LinearGradient
        x1="50%"
        y1="105.858%"
        x2="50%"
        y2="-8.934%"
        id="prefix__dislikereactiona"
      >
        <Stop stopColor="#F7FAB2" offset="0%" />
        <Stop stopColor="#FA2C00" offset="100%" />
      </LinearGradient>
      <LinearGradient x1="50%" y1="100%" x2="50%" y2="0%" id="prefix__dislikereactionb">
        <Stop stopColor="#EB6B16" stopOpacity={0} offset="0%" />
        <Stop stopColor="#F59A74" offset="100%" />
      </LinearGradient>
      <LinearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="prefix__dislikereactionc">
        <Stop stopColor="#945F1A" offset="0%" />
        <Stop stopColor="#25180C" offset="100%" />
      </LinearGradient>
    </Defs>
    <G fill="none" fillRule="evenodd">
      <Path
        d="M128 0C57.308 0 0 57.308 0 128s57.308 128 128 128 128-57.308 128-128S198.692 0 128 0z"
        fill="url(#prefix__dislikereactiona)"
        fillRule="nonzero"
      />
      <Path
        d="M126.222 10.667c-46.146 0-83.555 29.45-83.555 65.777 0 36.329 37.409 65.778 83.555 65.778 46.147 0 83.556-29.45 83.556-65.778s-37.41-65.777-83.556-65.777z"
        fill="url(#prefix__dislikereactionb)"
        fillRule="nonzero"
      />
      <Path
        d="M126.308 176c-46.325 0-64 37.333-42.667 32 21.334-5.333 53.334-5.333 85.334 0s3.658-32-42.667-32z"
        fill="url(#prefix__dislikereactionc)"
        fillRule="nonzero"
      />
      <Circle fill="#3D3B3B" cx={69.333} cy={144} r={21.333} />
      <Path
        d="M106.118 128.309a7.978 7.978 0 01-4.236 15.382L40.55 126.802a7.978 7.978 0 014.236-15.382l61.333 16.889z"
        fill="#963F28"
        fillRule="nonzero"
      />
      <Circle
        fill="#3D3B3B"
        transform="matrix(-1 0 0 1 352 0)"
        cx={176}
        cy={144}
        r={21.333}
      />
      <Path
        d="M141.882 128.309a7.978 7.978 0 004.236 15.382l61.333-16.889a7.978 7.978 0 00-4.236-15.382l-61.333 16.889z"
        fill="#963F28"
        fillRule="nonzero"
      />
    </G>
  </Svg>
);

dislikeReactionSoccer.propTypes = {
  className: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default dislikeReactionSoccer;
