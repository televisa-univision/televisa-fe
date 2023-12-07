import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import { Svg, Path } from 'svgs';

import { BLUE } from '../../../constants/colors';

/**
 * rainChance icon component
 * @param {!Object} props - components props
 * @param {string} props.className - modifier class name
 * @param {string} props.fill - icon fill modifier
 * @param {(style|Object)} props.style - style override
 * @param {string} props.viewBox - viewBox
 * @param {number} props.width - icon width
 * @returns {JSX}
 */
const rainChance = ({
  width, height, fill, viewBox, className, style,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} className={className} style={style}>
    <Path d="M199.4 13.2L194 30.8l-13 42c-5.4 18-11 36-16.5 53.9l-16 52c-3.4 12-17.3 57.3-25.2 65-7 6.6-16.1 12.3-25.6 12.3-25.4 0-43.1-16-40.4-42.6.7-6.7 3.5-13 7-18.8a7363.7 7363.7 0 0 0 23.3-37.3l6.9-11 7.4-12 8-12.8a11504.2 11504.2 0 0 0 16.6-26.7l8.3-13.4 8.2-13.2 7.8-12.6 7.3-11.7 6.7-10.8 5.8-9.4 4.9-7.8 3.7-6 2.4-3.8 1-1.6a9.4 9.4 0 0 1 7.9-4.5 9.7 9.7 0 0 1 8.9 13.2z" fill={`${fill || BLUE}`} />
  </Svg>
);

rainChance.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default rainChance;
