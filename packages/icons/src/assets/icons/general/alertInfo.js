import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import { Svg, Path, Circle } from 'svgs';

import { BLACK } from '../../../constants/colors';

/**
 * alertInfo icon component
 * @param {!Object} props - components props
 * @param {number} props.size - icon size
 * @param {string} props.fill - icon fill modifier
 * @param {string} props.viewBox - viewBox
 * @param {string} props.className - modifier class name
 * @param {(style|Object)} props.style - style override
 * @returns {JSX}
 */
const alertInfo = ({
  width, height, fill, viewBox, className, style,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} className={className} style={style}>
    <Circle cx="128" cy="128" r="117.3" fillOpacity=".2" fill={`${fill || BLACK}`} />
    <Path d="M131.3 74.7c7.7 0 13.9 6.3 13.9 13.9s-6.3 13.9-13.9 13.9c-7.7 0-13.9-6.2-13.9-13.9-.1-7.7 6.2-13.9 13.9-13.9z" fill={`${fill || BLACK}`} />
    <Path d="M131.3 115.1c5.8 0 10.5 4.2 10.5 9.4v56.4c0 5.2-4.7 9.4-10.5 9.4s-10.4-4.2-10.4-9.4v-56.4c-.1-5.2 4.6-9.5 10.4-9.4z" fill={`${fill || BLACK}`} />
  </Svg>
);

alertInfo.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  viewBox: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default alertInfo;
