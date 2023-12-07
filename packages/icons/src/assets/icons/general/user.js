import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import { Svg, Path } from 'svgs';

import { BLACK } from '../../../constants/colors';

/**
 * user icon component
 * @param {!Object} props - components props
 * @param {number} props.size - icon size
 * @param {string} props.fill - icon fill modifier
 * @param {string} props.viewBox - viewBox
 * @param {string} props.className - modifier class name
 * @param {(style|Object)} props.style - style override
 * @returns {JSX}
 */
const user = ({
  width, height, fill, viewBox, className, style,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <Path d="M37.6 216.39A126.27 126.27 0 0 0 128.5 255c69.72 0 126.5-56.78 126.5-126.5S198.22 2 128.5 2 2 58.78 2 128.5c0 33.24 12.94 63.54 33.98 86.12a7.47 7.47 0 0 0 1.62 1.77zm90.9 24.05c-27.5 0-52.8-10-72.3-26.55 32.8-10.89 44.94-24.13 49.43-32.95a53.3 53.3 0 0 0 20.96 4.26h1.69c8.38-.14 15.96-1.83 22.5-5 4.2 8.83 16.11 22.5 49.87 33.69a110.92 110.92 0 0 1-72.15 26.55zM87.6 105.1v-.44c1.77-38.32 30.02-41.33 38.7-41.33h2.35c8.6 0 36.92 3.01 38.68 41.33v.44c.08.37 3.68 35.82-12.87 54.43-6.54 7.35-15.3 11.03-26.7 11.1h-.44c-11.47-.14-20.15-3.75-26.7-11.1C84 141.08 87.54 105.48 87.62 105.1zm40.9-88.55c61.7 0 111.94 50.23 111.94 111.94 0 28.24-10.6 54.13-27.88 73.84-47.5-13.83-49.35-30.6-49.35-30.82v.37h-.51c.88-.88 1.76-1.76 2.65-2.72 20.22-22.72 16.84-61.63 16.47-65.46-1.98-40.6-29.86-55-53.17-55h-2.36c-23.31 0-51.26 14.4-53.17 55-.37 3.76-3.68 42.66 16.47 65.46a59.17 59.17 0 0 0 3.68 3.75c-1.54 4.27-9.34 17.8-48.83 29.35a111.25 111.25 0 0 1-27.88-73.77c0-61.7 50.23-111.94 111.94-111.94z" fill={`${fill || BLACK}`} fillRule="nonzero" />
  </Svg>
);

user.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  viewBox: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default user;
