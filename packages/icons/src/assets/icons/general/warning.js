import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import { Svg, Path } from 'svgs';

import { BLACK } from '../../../constants/colors';

/**
 * warning icon component
 * @param {!Object} props - components props
 * @param {number} props.size - icon size
 * @param {string} props.fill - icon fill modifier
 * @param {string} props.viewBox - viewBox
 * @param {string} props.className - modifier class name
 * @param {(style|Object)} props.style - style override
 * @returns {JSX}
 */
const warning = ({
  width, height, fill, viewBox, className, style,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <Path d="M130.15 211.46c-4.17 0-7.66-1.35-10.22-3.78a12.61 12.61 0 0 1-4.03-9.47 12.6 12.6 0 0 1 4.03-9.6c2.7-2.57 6.05-3.8 10.22-3.8 4.3 0 7.8 1.23 10.36 3.66a12.9 12.9 0 0 1 4.03 9.74c0 3.79-1.34 7.03-4.03 9.47-2.56 2.57-6.06 3.78-10.36 3.78zm0-129.03c7.53 0 13.18 14.6 12.5 32.46l-.8 23.8c-.4 17.59-5.78 32.06-11.7 32.06-5.78 0-11.03-14.47-11.7-32.19l-.8-23.94c-.54-17.72 5.1-32.33 12.5-32.33v.14zm14.12-48.97c-9-15.28-23.53-15.28-32.54 0L10.87 207c-9 15.42-1.75 28 16.14 28h201.98c17.89 0 25.15-12.58 16.14-28L144.4 33.46h-.14z" fill={`${fill || BLACK}`} fillRule="evenodd" />
  </Svg>
);

warning.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  viewBox: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default warning;
