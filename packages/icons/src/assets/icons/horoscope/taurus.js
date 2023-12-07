import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import { Svg, Path } from 'svgs';

import { BLACK } from '../../../constants/colors';

/**
 * taurus icon component
 * @param {Object} props - components props
 * @param {string} props.className - modifier class name
 * @param {string} props.fill - icon fill modifier
 * @param {number} props.height - icon height
 * @param {(style|Object)} props.style - style override
 * @param {string} props.viewBox - viewBox
 * @param {number} props.width - icon width
 * @returns {JSX}
 */
const taurus = ({
  width, height, fill, viewBox, className, style,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M183.835 55.475c0-3.575-2.91-6.475-6.505-6.475-3.595 0-6.505 2.9-6.505 6.475-.57 22.72-19.23 40.84-42.055 40.84s-41.49-18.12-42.055-40.84c0-3.575-2.91-6.475-6.505-6.475-3.595 0-6.505 2.9-6.505 6.475.02 20.225 11.22 38.8 29.14 48.33-22.3 11.84-33.65 37.27-27.52 61.68 6.13 24.41 28.16 41.535 53.435 41.535 25.275 0 47.305-17.125 53.435-41.535 6.13-24.41-5.22-49.84-27.52-61.68 17.93-9.525 29.14-28.1 29.165-48.33h-.005zm-13.01 96.69c0 23.13-18.835 41.88-42.07 41.88s-42.07-18.75-42.07-41.88c0-23.13 18.835-41.88 42.07-41.88 23.22.03 42.04 18.765 42.07 41.88z"
      fill={`${fill || BLACK}`}
      fillRule="nonzero"
    />
  </Svg>
);

taurus.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default taurus;
