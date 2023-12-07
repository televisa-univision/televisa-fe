import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import {
  Svg, Defs,
  LinearGradient,
  Stop,
  G,
  Circle,
  Path,
} from 'svgs';

import { BLACK } from '../../../constants/colors';

/**
 * favs icon component
 * @param {Object} props - components props
 * @param {string} props.className - modifier class name
 * @param {string} props.fill - icon fill modifier
 * @param {number} props.height - icon height
 * @param {(style|Object)} props.style - style override
 * @param {string} props.viewBox - viewBox
 * @param {number} props.width - icon width
 * @returns {JSX}
 */
const favs = ({
  width, height, fill, viewBox, className, style,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <Defs>
      <LinearGradient
        x1="94.9%"
        y1="15.8%"
        x2="3.1%"
        y2="95.5%"
        id="prefix__favsa"
      >
        <Stop stopColor={`${fill || BLACK}`} offset="0%" />
        <Stop stopColor={`${fill || BLACK}`} offset="100%" />
      </LinearGradient>
    </Defs>
    <G fill="none" fillRule="evenodd">
      <Circle
        stroke="url(#prefix__favsa)"
        strokeWidth={5.5}
        cx={127}
        cy={129}
        r={90}
      />
      <Path d="M70 75h111.8v111.8H70z" />
      <Path
        fill="url(#prefix__favsa)"
        d="M55.9 80.4l28.8 17.4L77 65.1l25.5-22L69 40 55.9 9.4 42.8 40.2 9.3 43l25.4 22-7.6 32.8z"
        transform="translate(70 75)"
      />
    </G>
  </Svg>
);

favs.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default favs;
