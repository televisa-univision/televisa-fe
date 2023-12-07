import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import { Svg, Path } from 'svgs';

import { ASTRONAUT } from '../../../constants/colors';

/**
 * phone icon component
 * @param {Object} props - components props
 * @param {string} props.className - modifier class name
 * @param {string} props.fill - icon fill modifier
 * @param {number} props.height - icon height
 * @param {(style|Object)} props.style - style override
 * @param {string} props.viewBox - viewBox
 * @param {number} props.width - icon width
 * @returns {JSX}
 */
const phone = ({
  width, height, fill, viewBox, className, style,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <Path d="M14.2222 0C6.3573 0 0 6.3573 0 14.2222 0 147.7404 108.2596 256 241.7778 256 249.6427 256 256 249.6427 256 241.7778V192c0-7.8507-6.3573-14.208-14.2222-14.208-17.7494 0-34.816-2.8587-50.8018-8.0924-1.4222-.4552-2.9156-.6827-4.3947-.6827-3.6266 0-7.2675 1.3938-10.0409 4.1671l-31.303 31.3316c-40.2774-20.48-73.2018-53.4045-93.7103-93.6676L82.816 79.4596c3.9111-3.897 5.0631-9.5147 3.4844-14.4356-5.2337-16-8.0924-33.0667-8.0924-50.8018C78.208 6.3573 71.8507 0 64 0H14.2222z" fill={`${fill || ASTRONAUT}`} fillRule="nonzero" />
  </Svg>
);

phone.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default phone;
