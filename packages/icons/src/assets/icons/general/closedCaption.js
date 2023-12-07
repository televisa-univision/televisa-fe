import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, { Path, G } from 'svgs';

import { BLACK } from '../../../constants/colors';

/**
 * closed caption icon component
 * @param {!Object} props - components props
 * @param {number} props.size - icon size
 * @param {string} props.fill - icon fill modifier
 * @param {string} props.viewBox - viewBox
 * @param {string} props.className - modifier class name
 * @param {(style|Object)} props.style - style override
 * @returns {JSX}
 */
const closedCaption = ({
  width, height, fill, viewBox, className, style,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <Path fill="none" d="M-1-1h279v248H-1z" />
    <Path fill="none" d="M-45.033953-60.506222h663.067922V396.782H-45.033953z" />
    <G fill="none">
      <Path d="M-45.033996-60.506156H321.79672v366.830718H-45.033996V-60.506156z" />
      <Path d="M245.373653 245.186105H31.389072c-16.813074 0-30.569234-13.756149-30.569234-30.569223V31.201524C.819838 14.38845 14.575998.6323 31.389072.6323h213.984581c16.813074 0 30.569223 13.75615 30.569223 30.569223v183.415358c0 16.813074-13.75615 30.569223-30.569223 30.569223zm-122.276902-106.99229h-22.926923v7.64231H69.600606V99.98228h30.569222v7.642312h22.926923V92.339969c0-9.170762-6.11385-15.284611-15.284623-15.284611H61.958294c-9.170762 0-15.284611 6.113849-15.284611 15.284611v61.138457c0 9.170773 6.11385 15.284611 15.284611 15.284611h45.853834c9.170774 0 15.284623-6.113838 15.284623-15.284611v-15.284612zm106.99229 0H207.16212v7.64231h-30.569223V99.98228h30.569223v7.642312h22.926923V92.339969c0-9.170762-6.11385-15.284611-15.284612-15.284611h-45.853845c-9.170762 0-15.284611 6.113849-15.284611 15.284611v61.138457c0 9.170773 6.113849 15.284611 15.284611 15.284611h45.853845c9.170763 0 15.284612-6.113838 15.284612-15.284611v-15.284612z" fill={`${fill || BLACK}`} />
    </G>
  </Svg>
);

closedCaption.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  viewBox: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default closedCaption;
