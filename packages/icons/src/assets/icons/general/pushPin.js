import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import Svg, { Path } from 'svgs';
import { BLACK } from '../../../constants/colors';

/**
 * pushPin component
 * @param {string} className - modifier class name
 * @param {size} size - icon size
 * @param {string} fill - icon fill modifier
 * @param {string} viewBox - viewBox
 * @param {style} style - style override
 * @returns {JSX}
 */
const pushPin = ({
  className, width, height, fill, viewBox, style,
}) => (
  <Svg className={className} width={width} height={height} viewBox={viewBox} style={style}>
    <Path
      fill={`${fill || BLACK}`}
      d="M0 256l65.023-104.731a205.622 205.622 0 0 0 39.708 39.762L0 256zM250.284 87.59c-6.565 6.582-17.72 7.222-30.108 3.007l-33.124 33.097c16.65 27.045 20.608 53.376 7.616 66.377-5.257 5.266-12.7 7.744-21.485 7.744-16.183 0-36.937-8.466-57.024-23.634-.457-.338-.896-.695-1.335-1.042a167.02 167.02 0 0 1-10.011-8.357 172.707 172.707 0 0 1-12.892-12.8c-1.179-1.28-2.285-2.587-3.391-3.895-.613-.713-1.244-1.417-1.847-2.14a153.848 153.848 0 0 1-4.16-5.256l-.503-.65c-23.552-31.076-31.086-63.743-16.11-78.72 5.267-5.266 12.709-7.752 21.495-7.752 12.946 0 28.8 5.421 44.91 15.341l33.096-33.088c-4.215-12.388-3.566-23.533 3.017-30.116 12.325-12.334 40.658-4.014 63.268 18.606 22.61 22.6 30.94 50.925 18.588 63.268v.01z"
    />
  </Svg>
);

/**
 * pushPin props
 * @property {number} width - icon width size
 * @property {number} height - icon height size
 * @property {string} fill - fill color, default: svg file color
 * @property {string} viewBox - viewBox width, height, default: 0 0 256 256
 * @property {(Object|style)} [style] - modifier styles
 */
pushPin.propTypes = {
  className: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  viewBox: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default pushPin;
