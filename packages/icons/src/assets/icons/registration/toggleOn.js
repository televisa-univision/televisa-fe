import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import {
  Svg,
  Defs,
  LinearGradient,
  Stop,
  G,
  Rect,
  Circle,
} from 'svgs';

import { BLACK } from '../../../constants/colors';

/**
 * toggleOn icon component
 * @param {Object} props - components props
 * @param {string} props.className - modifier class name
 * @param {string} props.fill - icon fill modifier
 * @param {number} props.height - icon height
 * @param {(style|Object)} props.style - style override
 * @param {string} props.viewBox - viewBox
 * @param {number} props.width - icon width
 * @returns {JSX}
 */
const toggleOn = ({
  width, height, fill, viewBox, className, style,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <Defs>
      <LinearGradient x1="0%" y1="100%" x2="100%" y2="0%" id="prefix__toggleOna">
        <Stop stopColor={`${fill || BLACK}`} offset="0%" />
        <Stop stopColor={`${fill || BLACK}`} offset="100%" />
      </LinearGradient>
    </Defs>
    <G fill="none" fillRule="evenodd">
      <Rect fill="url(#prefix__toggleOna)" width={105} height={60} rx={30} />
      <Circle fill="#FFF" cx={75} cy={30} r={26.3} />
    </G>
  </Svg>
);

toggleOn.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default toggleOn;
