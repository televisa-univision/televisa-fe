import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import { Svg, Path } from 'svgs';

import { MILANO_RED } from '../../../constants/colors';

/**
 * tropicalStorm icon component
 * @param {!Object} props - components props
 * @param {number} props.size - icon size
 * @param {string} props.fill - icon fill modifier
 * @param {string} props.viewBox - viewBox
 * @param {string} props.className - modifier class name
 * @param {(style|Object)} props.style - style override
 * @returns {JSX}
 */
const tropicalStorm = ({
  width, height, fill, viewBox, className, style,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <Path d="M127.573 153.493c-14.4 0-26.026-11.626-26.026-26.026s11.626-26.027 26.026-26.027 26.027 11.627 26.027 26.027-11.627 26.026-26.027 26.026m0-100.69c58.56 0 106.134 55.466 106.134 123.626v1.386H224v-1.386c0-31.254-10.56-60.374-29.333-81.707 5.013 10.133 7.573 21.333 7.573 32.747 0 58.56-55.467 106.24-123.627 106.24h-1.386v-9.814h1.386c31.254 0 60.374-10.56 81.707-29.226-10.133 5.013-21.333 7.573-32.747 7.573-58.56 0-106.24-55.467-106.24-123.627V77.23h9.814v1.386c0 31.254 10.453 60.374 29.226 81.6C55.36 150.082 52.8 138.99 52.8 127.47c0-58.56 55.467-106.134 123.627-106.134h1.386v9.707h-1.386c-31.254 0-60.374 10.56-81.6 29.333 10.133-5.013 21.226-7.573 32.746-7.573zm0 139.732c35.84 0 64.96-29.226 64.96-65.066s-29.12-64.96-64.96-64.96c-35.84 0-65.066 29.12-65.066 64.96 0 35.84 29.226 65.066 65.066 65.066zm0-101.868c20.267 0 36.8 16.533 36.8 36.8 0 20.373-16.533 36.906-36.8 36.906-20.373 0-36.906-16.533-36.906-36.906 0-20.267 16.533-36.8 36.906-36.8z" fill={`${fill || MILANO_RED}`} />
  </Svg>
);

tropicalStorm.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  viewBox: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default tropicalStorm;
