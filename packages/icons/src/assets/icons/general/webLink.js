import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import { Svg, Path } from 'svgs';

import { ASTRONAUT } from '../../../constants/colors';

/**
 * webLink icon component
 * @param {Object} props - components props
 * @param {string} props.className - modifier class name
 * @param {string} props.fill - icon fill modifier
 * @param {number} props.height - icon height
 * @param {(style|Object)} props.style - style override
 * @param {string} props.viewBox - viewBox
 * @param {number} props.width - icon width
 * @returns {JSX}
 */
const webLink = ({
  width, height, fill, viewBox, className, style,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <Path d="M233.2444 221.8667V147.911H256v73.9556C256 240.8297 240.8296 256 221.8667 256H34.1333C15.1703 256 0 240.8296 0 221.8667V34.1333C0 15.1703 15.1704 0 34.1333 0h73.9556v22.7556H34.1333c-6.321 0-11.3777 5.0567-11.3777 11.3777v187.7334c0 6.321 5.0567 11.3777 11.3777 11.3777h187.7334c6.321 0 11.3777-5.0567 11.3777-11.3777zM147.9111 0H256v108.0889h-22.7556V38.874l-89.442 89.442-16.1185-16.1186 89.442-89.442h-69.2148V0z" fill={`${fill || ASTRONAUT}`} fillRule="nonzero" />
  </Svg>
);

webLink.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default webLink;
