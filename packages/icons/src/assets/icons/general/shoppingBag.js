import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import { KEPPEL, WHITE } from '@univision/fe-utilities/styled/constants';

import Svg, { Path, G } from 'svgs';

/**
 * shopping bag icon component
 * @param {size} size - icon size
 * @param {string} fill - icon fill modifier
 * @param {string} viewBox - viewBox
 * @param {style} style - style override
 * @param {string} props.className - modifier class name
 * @returns {JSX}
 */
const shoppingBag = ({
  width, height, fill, viewBox, style, className, stroke,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} style={style} className={className}>
    <G fill={fill || KEPPEL}>
      <Path
        d="M13.55 4.5H3.45C3.32697 4.50058 3.20836 4.54594 3.11634 4.62761C3.02432 4.70927 2.96519 4.82166 2.95 4.94375L2.0625 12.9438C2.05461 13.0135 2.06147 13.084 2.08264 13.1509C2.10381 13.2178 2.13882 13.2795 2.18539 13.3319C2.23196 13.3844 2.28904 13.4265 2.35294 13.4554C2.41683 13.4844 2.4861 13.4996 2.55625 13.5H14.4438C14.5139 13.4996 14.5832 13.4844 14.6471 13.4554C14.711 13.4265 14.768 13.3844 14.8146 13.3319C14.8612 13.2795 14.8962 13.2178 14.9174 13.1509C14.9385 13.084 14.9454 13.0135 14.9375 12.9438L14.05 4.94375C14.0348 4.82166 13.9757 4.70927 13.8837 4.62761C13.7916 4.54594 13.673 4.50058 13.55 4.5V4.5Z"
        stroke={stroke || WHITE}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6 6.5V4.5C6 3.83696 6.26339 3.20107 6.73223 2.73223C7.20107 2.26339 7.83696 2 8.5 2C9.16304 2 9.79893 2.26339 10.2678 2.73223C10.7366 3.20107 11 3.83696 11 4.5V6.5"
        stroke={stroke || WHITE}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
  </Svg>
);

/**
 * shoppingBag props
 * @property {number} width - icon width size
 * @property {number} height - icon height size
 * @property {string} fill - fill color, default: svg file color
 * @property {string} viewBox - viewBox width, height, default: 0 0 256 256
 * @property {(Object|style)} [style] - modifier styles
 */
shoppingBag.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  stroke: PropTypes.string,
  fill: PropTypes.string,
  viewBox: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  className: PropTypes.string,
};

export default shoppingBag;
