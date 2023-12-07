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
 * check icon component
 * @param {Object} props - components props
 * @param {string} props.className - modifier class name
 * @param {string} props.fill - icon fill modifier
 * @param {number} props.height - icon height
 * @param {(style|Object)} props.style - style override
 * @param {string} props.viewBox - viewBox
 * @param {number} props.width - icon width
 * @returns {JSX}
 */
const check = ({
  width, height, fill, viewBox, className, style,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <Defs>
      <LinearGradient
        x1="94.9%"
        y1="15.8%"
        x2="3.1%"
        y2="95.5%"
        id="prefix__checka"
      >
        <Stop stopColor={`${fill || BLACK}`} offset="0%" />
        <Stop stopColor={`${fill || BLACK}`} offset="100%" />
      </LinearGradient>
    </Defs>
    <G
      transform="translate(38 38)"
      strokeWidth={5.5}
      fill="none"
      fillRule="evenodd"
    >
      <Circle stroke="url(#prefix__checka)" cx={90} cy={90} r={90} />
      <Path stroke={`${fill || BLACK}`} d="M55.4 90.5l21.5 19.7 45.3-52" />
    </G>
  </Svg>
);

check.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default check;
