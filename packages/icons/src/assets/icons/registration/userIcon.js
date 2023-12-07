import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import {
  Svg, G, Path, Ellipse,
} from 'svgs';

import { BLACK } from '../../../constants/colors';

/**
 * userIcon icon component
 * @param {Object} props - components props
 * @param {string} props.className - modifier class name
 * @param {string} props.fill - icon fill modifier
 * @param {number} props.height - icon height
 * @param {(style|Object)} props.style - style override
 * @param {string} props.viewBox - viewBox
 * @param {number} props.width - icon width
 * @returns {JSX}
 */
const userIcon = ({
  width, height, fill, viewBox, className, style,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <G
      transform="translate(53 41)"
      stroke={`${fill || BLACK}`}
      strokeWidth={18.9}
      fill="none"
      fillRule="evenodd"
    >
      <Ellipse cx={75.5} cy={37.9} rx={37.8} ry={37.9} />
      <Path d="M151 180a75.6 75.6 0 00-75.5-75.8C33.8 104.2 0 138.2 0 180" />
    </G>
  </Svg>
);

userIcon.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default userIcon;
