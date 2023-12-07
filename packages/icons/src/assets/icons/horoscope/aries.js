import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import { Svg, Path } from 'svgs';

import { BLACK } from '../../../constants/colors';

/**
 * aries icon component
 * @param {Object} props - components props
 * @param {string} props.className - modifier class name
 * @param {string} props.fill - icon fill modifier
 * @param {number} props.height - icon height
 * @param {(style|Object)} props.style - style override
 * @param {string} props.viewBox - viewBox
 * @param {number} props.width - icon width
 * @returns {JSX}
 */
const aries = ({
  width, height, fill, viewBox, className, style,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M182.81 51.665c-20.59-5.55-42.355 3.095-53.58 21.23l-.89 1.44-.89-1.44c-11.225-18.135-32.995-26.78-53.58-21.23-21.115 5.69-35.79 24.9-35.77501 46.83 0 3.58 2.89501 6.48 6.46001 6.48 3.565 0 6.46-2.9 6.465-6.51.525-19.23 16.235-34.555 35.43-34.555s34.905 15.33 35.43 34.61v100.79c0 3.58 2.895 6.48 6.46 6.48s6.46-2.9 6.46-6.48V98.465c.525-19.23 16.235-34.555 35.43-34.555s34.905 15.33 35.43 34.61c0 3.56 2.895 6.455 6.46 6.455s6.46-2.9 6.46-6.485c.01-21.93-14.66-41.135-35.775-46.83l.005.005z"
      fill={`${fill || BLACK}`}
      fillRule="nonzero"
    />
  </Svg>
);

aries.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default aries;
