import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import { Svg, Path } from 'svgs';

import { LIGHT_GREY } from '../../../constants/colors';

/**
 * cloudy icon component
 * @param {!Object} props - components props
 * @param {number} props.size - icon size
 * @param {string} props.fill - icon fill modifier
 * @param {string} props.viewBox - viewBox
 * @param {string} props.className - modifier class name
 * @param {(style|Object)} props.style - style override
 * @returns {JSX}
 */
const cloudy = ({
  width, height, fill, viewBox, className, style,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <Path d="M204.16 180.373a32.9 32.9 0 0 1-5.013 2.027c-3.307 1.173-7.04 1.813-11.094 1.813H58.133c-1.173 0-2.56-.106-4.16-.32C41.28 181.76 32 170.88 32 157.973c0-14.4 11.627-26.24 26.027-26.24l.64.107c2.986 0 5.546-2.56 5.546-5.547 0-14.4 11.734-26.133 26.24-26.133 4.267 0 8.427 1.067 12.16 2.987 1.494.746 3.094.853 4.694.32 1.386-.534 2.666-1.814 3.2-3.2 5.546-15.254 20.266-25.6 36.48-25.6 19.2 0 35.733 14.4 38.4 33.493.32 2.453 2.56 4.587 5.12 4.8 18.666 1.067 33.28 16.747 33.28 35.627 0 13.44-7.467 25.6-19.627 31.786m-8.96-77.653C190.187 80.213 170.133 64 146.987 64c-18.774 0-36.054 10.773-44.48 27.52-3.84-1.387-8-2.133-12.054-2.133C72 89.387 56.32 103.36 53.76 121.28c-18.347 2.24-32.427 18.027-32.427 36.693 0 16.64 11.094 30.934 26.774 35.52.426.214.96.32 1.493.427.64.107 1.28.32 1.813.427h.107c.64.106 1.173.213 1.813.213h.32c.747.107 1.6.213 2.454.213.64.107 1.173.107 1.92.107h130.026c2.454 0 4.907-.213 7.254-.533.32 0 .64-.107.96-.107.426-.107.853-.107 1.173-.213.32-.107.64-.107.96-.214.427-.106.747-.213 1.067-.32 1.066-.213 2.133-.533 3.093-.853.747-.32 1.493-.533 2.133-.853.534-.107.96-.32 1.387-.534.32-.106.64-.32.96-.426.427-.214.853-.427 1.28-.747 16-7.68 26.24-23.68 26.24-41.493 0-22.934-16.853-42.454-39.36-45.867" fill={`${fill || LIGHT_GREY}`} />
  </Svg>
);

cloudy.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  viewBox: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default cloudy;
