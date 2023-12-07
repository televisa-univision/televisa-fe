import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import { Svg, G, Path } from 'svgs';

import { BLACK } from '../../../constants/colors';

/**
 * ray icon component
 * @param {!Object} props - components props
 * @param {number} props.size - icon size
 * @param {string} props.fill - icon fill modifier
 * @param {string} props.viewBox - viewBox
 * @param {string} props.className - modifier class name
 * @param {(style|Object)} props.style - style override
 * @returns {JSX}
 */
const ray = ({
  width, height, fill, viewBox, className, style,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <G fill="none" fillRule="evenodd">
      <Path d="M196.03 107.8v.43c0 1.43-.44 2.72-1.45 3.72l-8.7 10.16-90.82 105.61c-1.6 2-5.8 1.43-6.8.86-2.18-1.14-3.2-4-2.18-6.58l22.6-72.55-38.97.85a5.65 5.65 0 0 1-5.21-3.43c-.87-1.72-.58-4.15.72-5.87l97.49-117.63a5.63 5.63 0 0 1 7.39-1.14c2.17 1.14 3.19 4.15 2.17 6.73l-24.62 73.55h42.73c2.32 0 4.34 1.29 5.07 3.15.29.71.43 1.57.58 2.14" fill={`${fill || BLACK}`} />
    </G>
  </Svg>
);

ray.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  viewBox: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default ray;
