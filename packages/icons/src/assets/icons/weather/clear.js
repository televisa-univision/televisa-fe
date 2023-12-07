import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import { Svg, Path } from 'svgs';

import { LIGHT_GREY } from '../../../constants/colors';

/**
 * clear icon component
 * @param {!Object} props - components props
 * @param {number} props.size - icon size
 * @param {string} props.fill - icon fill modifier
 * @param {string} props.viewBox - viewBox
 * @param {string} props.className - modifier class name
 * @param {(style|Object)} props.style - style override
 * @returns {JSX}
 */
const clear = ({
  width, height, fill, viewBox, className, style,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <Path d="M133.187 223.891c-27.03 0-52.33-10.506-71.53-29.6-19.094-19.082-29.6-44.501-29.6-71.53 0-27.03 10.506-52.438 29.6-71.531 4.714-4.619 9.76-8.683 15.125-12.33-12.555 39.455-2.037 83.21 27.552 112.714 21.13 21.12 49.237 32.81 79.05 32.81 11.254 0 22.838-1.823 33.782-5.247-3.648 5.354-7.83 10.506-12.448 15.114-19.083 19.094-44.501 29.6-71.53 29.6m99.84-58.986c-1.494-1.611-3.958-2.038-6.006-1.067-13.504 6.432-28.63 9.856-43.637 9.856-27.03 0-52.448-10.496-71.531-29.59C81.71 113.865 73.774 67.53 92.11 29.023c.97-2.027.65-4.49-.96-6.101-1.61-1.611-4.075-2.048-6.112-1.078-11.477 5.472-21.877 12.875-30.89 21.878-21.131 21.13-32.811 49.12-32.811 79.04 0 29.813 11.68 57.909 32.81 79.04 21.13 21.13 49.227 32.81 79.04 32.81 29.92 0 58.016-11.68 79.147-32.81 8.896-9.014 16.299-19.307 21.77-30.891.971-2.037.534-4.395-1.077-6.005" fill={`${fill || LIGHT_GREY}`} />
  </Svg>
);

clear.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  viewBox: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default clear;
