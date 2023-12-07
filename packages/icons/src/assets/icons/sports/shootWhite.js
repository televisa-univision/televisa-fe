import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, { Path } from 'svgs';

import { WHITE } from '../../../constants/colors';

/**
 * goal component
 * @param {!Object} props - components props
 * @param {style} props.fill - custom fill color
 * @param {number} props.width - icon width size
 * @param {number} props.height - icon height size
 * @param {string} props.viewBox - viewBox layout
 * @param {style} props.className - class name modifier
 * @param {style} props.style - style override
 * @returns {JSX}
 */
const shootWhite = ({
  width,
  height,
  viewBox,
  style,
  className,
}) => (
  <Svg
    height={height}
    width={width}
    viewBox={viewBox}
    className={className}
    style={style}
  >
    <Path fill={WHITE} d="M7.111 8.952h1.778v10.857h-1.778v-10.857z" />
    <Path fill={WHITE} d="M23.111 8.952h1.778v10.857h-1.778v-10.857z" />
    <Path fill={WHITE} d="M7.111 8.952h17.778v1.81h-17.778v-1.81z" />
    <Path fill={WHITE} d="M21.049 22.53c-0.002-0.046-0.002-0.057-0.009-0.103-0.015-0.102-0.052-0.2-0.106-0.287-0.027-0.044-0.059-0.083-0.094-0.121l-4.366-4.602c-0.032-0.032-0.040-0.041-0.075-0.069-0.040-0.032-0.083-0.059-0.128-0.082-0.198-0.1-0.435-0.104-0.636-0.011-0.046 0.021-0.090 0.047-0.131 0.078-0.036 0.027-0.044 0.036-0.077 0.066l-4.522 4.444c-0.031 0.033-0.040 0.040-0.068 0.076-0.073 0.095-0.123 0.207-0.145 0.325-0.016 0.084-0.017 0.171-0.004 0.256 0.010 0.068 0.030 0.134 0.058 0.197 0.106 0.237 0.331 0.405 0.586 0.437 0.101 0.012 0.203 0.003 0.3-0.026 0.081-0.025 0.157-0.063 0.225-0.114 0.036-0.027 0.044-0.036 0.077-0.066l3.989-3.921 3.888 4.096c0.034 0.029 0.042 0.038 0.079 0.064 0.070 0.048 0.148 0.084 0.229 0.106 0.065 0.017 0.133 0.026 0.2 0.025 0.256-0.004 0.497-0.148 0.627-0.373 0.043-0.074 0.073-0.156 0.088-0.24 0.008-0.045 0.008-0.057 0.012-0.102 0-0.017 0.001-0.034 0.001-0.051v0z" />
    <Path fill={WHITE} d="M15.111 18h1.778v8.143h-1.778v-8.143z" />
  </Svg>
);

shootWhite.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  viewBox: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default shootWhite;
