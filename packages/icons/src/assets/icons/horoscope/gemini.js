import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import { Svg, Path } from 'svgs';

import { BLACK } from '../../../constants/colors';

/**
 * gemini icon component
 * @param {Object} props - components props
 * @param {string} props.className - modifier class name
 * @param {string} props.fill - icon fill modifier
 * @param {number} props.height - icon height
 * @param {(style|Object)} props.style - style override
 * @param {string} props.viewBox - viewBox
 * @param {number} props.width - icon width
 * @returns {JSX}
 */
const gemini = ({
  width, height, fill, viewBox, className, style,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M158.96 74.915c8.295-3.635 15.84-8.76 22.255-15.12 2.175-2.485 2.055-6.21-.27-8.555-2.325-2.345-6.08-2.515-8.61-.39-23.96 23.74-62.75 23.74-86.715 0-2.48-2.465-6.505-2.465-8.985 0-2.48 2.465-2.48 6.46 0 8.92 6.41 6.355 13.945 11.48 22.23 15.12v105.49c-.015.25-.015.505 0 .755-8.32 3.63-15.89 8.755-22.33 15.12-2.48 2.465-2.48 6.46 0 8.92s6.505 2.465 8.985 0c11.52-11.425 27.135-17.84 43.42-17.83 16.285.01 31.89 6.44 43.395 17.88 2.525 1.88 6.06 1.63 8.295-.585 2.235-2.215 2.485-5.725.59-8.235-6.44-6.365-14.01-11.495-22.33-15.12.015-.25.015-.505 0-.755l.075-105.615h-.005zm-12.69 101.96c-11.435-2.725-23.355-2.725-34.79 0v-97.68c11.435 2.73 23.355 2.73 34.79 0v97.68z"
      fill={`${fill || BLACK}`}
      fillRule="nonzero"
    />
  </Svg>
);

gemini.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default gemini;
