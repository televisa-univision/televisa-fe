import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import { Svg, Path } from 'svgs';

import { ASTRONAUT } from '../../../constants/colors';

/**
 * address icon component
 * @param {Object} props - components props
 * @param {string} props.className - modifier class name
 * @param {string} props.fill - icon fill modifier
 * @param {number} props.height - icon height
 * @param {(style|Object)} props.style - style override
 * @param {string} props.viewBox - viewBox
 * @param {number} props.width - icon width
 * @returns {JSX}
 */
const address = ({
  width, height, fill, viewBox, className, style,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <Path d="M137.5666 244.80403L130.81568 253l-6.95278-8.01899c-.69988-.8072-1.9854-2.31264-3.7732-4.44253-2.96467-3.5319-6.26428-7.54-9.81567-11.95079-10.14621-12.60146-20.2932-25.92341-29.77897-39.38623-7.00658-9.94418-13.38848-19.5999-19.0049-28.84904C45.1738 133.48264 36 111.40894 36 94.63663 36 43.96263 77.47486 3 128.5 3S221 43.96263 221 94.63663c0 16.67057-8.70165 38.71018-24.17737 65.53695-5.33473 9.24762-11.397 18.90248-18.05289 28.84612-9.01166 13.46307-18.65181 26.78575-28.29137 39.38807-3.37418 4.41126-6.50921 8.41985-9.32604 11.95228-1.6988 2.13036-2.92044 3.63628-3.58573 4.44398zm-1.35295-27.71514c9.4195-12.31465 18.83842-25.33156 27.61522-38.44376 6.44003-9.62116 12.28755-18.93402 17.40303-27.80156 13.9355-24.15684 21.6854-43.78584 21.6854-56.20694 0-40.37333-33.25656-73.21915-74.4173-73.21915S54.0827 54.2633 54.0827 94.63663c0 12.31937 8.14362 31.91427 22.78645 56.0281 5.38378 8.86602 11.53851 18.17802 18.3171 27.79863 9.23893 13.11247 19.15412 26.1301 29.07009 38.44561 2.1729 2.69873 4.2479 5.2414 6.20433 7.60963 1.81715-2.3169 3.74085-4.79915 5.75298-7.4297zm-7.5967-78.74737c-23.49517 0-42.54176-19.19713-42.54176-42.878 0-23.68086 19.04659-42.878 42.54175-42.878 23.49516 0 42.54175 19.19714 42.54175 42.878 0 23.68087-19.04659 42.878-42.54175 42.878z" fill={`${fill || ASTRONAUT}`} fillRule="nonzero" />
  </Svg>
);

address.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default address;
