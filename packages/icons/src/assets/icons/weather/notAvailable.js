import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import { Svg, Path } from 'svgs';

import { BLACK } from '../../../constants/colors';

/**
 * notAvailable icon component
 * @param {!Object} props - components props
 * @param {number} props.size - icon size
 * @param {string} props.fill - icon fill modifier
 * @param {string} props.viewBox - viewBox
 * @param {string} props.className - modifier class name
 * @param {(style|Object)} props.style - style override
 * @returns {JSX}
 */
const notAvailable = ({
  width, height, fill, viewBox, className, style,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <Path d="M128.026667 223.8176c-23.541334 0-45.034667-8.533333-61.770667-22.677333 0 0-.7573333-.650667-2.048-1.728L197.466667 66.1536l.970666-.9813333.864-.864c.970667 1.1946666 1.728 2.0586666 1.728 2.0586666 14.261334 16.736 22.784 38.1119997 22.784 61.6639997 0 52.810667-42.976 95.786667-95.786666 95.786667zm-70.5173337-32.938667l-.864.864c-.7573333-.650666-1.2906666-1.408-1.8346666-2.048-14.144-16.746666-22.6773334-38.122666-22.6773334-61.664 0-52.8106663 42.9866667-95.9039997 95.8933337-95.9039997 23.114666.1173334 44.277333 8.32 60.8 22.144.213333.2133334.437333.4373334.757333.6506667.544.32 1.301333.864 2.165333 1.728l-.864.864-.981333.9706667L58.48 189.908267l-.9706667.970666zM207.514667 56.9696c-3.466667-4.096-8.533334-8.5333333-8.533334-8.5333333-18.901333-16.8426667-43.744-27.104-70.954666-27.104-58.858667 0-106.6880003 47.84-106.6880003 106.6986663 0 27.104 10.2506666 51.946667 26.9866666 70.730667 0 0 6.592 7.669333 8.864 8.853333 18.784 16.746667 43.7333337 26.997334 70.8373337 26.997334 58.645333 0 106.474666-47.84 106.592-106.581334 0-27.328-10.261334-52.1599997-27.104-71.061333z" fill={`${fill || BLACK}`} />
  </Svg>
);

notAvailable.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  viewBox: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default notAvailable;
