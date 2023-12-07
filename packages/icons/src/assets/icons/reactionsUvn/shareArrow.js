import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import { Svg, Path } from 'svgs';

import { BLACK } from '../../../constants/colors';

/**
 * shareArrow icon component
 * @param {Object} props - components props
 * @param {string} props.className - modifier class name
 * @param {string} props.fill - icon fill modifier
 * @param {number} props.height - icon height
 * @param {(style|Object)} props.style - style override
 * @param {string} props.viewBox - viewBox
 * @param {number} props.width - icon width
 * @returns {JSX}
 */
const shareArrow = ({
  width, height, fill, viewBox, className, style,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} className={className} style={style}>
    <Path fill="none" d="M0 0h256v256H0z" />
    <Path
      d="M150.4 64c.8.1 1.5.4 2.1.9l69.8 55.2c1.1.8 1.7 2.1 1.7 3.5s-.6 2.6-1.7 3.5l-69.8 55.2c-1.3 1-3.1 1.2-4.6.5s-2.4-2.2-2.5-3.9v-26.3c-2.1 0-3.5 0-8.3.3-7.1.6-16.8 1.8-27.7 4.3-21.8 4.9-48.6 14.6-70.3 33.9-1.5 1.3-3.6 1.5-5.3.4-1.6-1.1-2.4-3.2-1.7-5 18.2-56.8 73.9-79.8 113.3-90.3V68.7c0-1.3.5-2.5 1.5-3.3 1-1.1 2.2-1.5 3.5-1.4zm3.8 13.4v21.9c0 2-1.3 3.8-3.3 4.3-34.6 8.9-82.3 27.6-104.1 70.7 20.2-13.8 42.2-21.7 60.8-25.9 11.4-2.5 21.5-3.8 28.9-4.4 7.5-.6 12-.6 13.5-.6 2.3.1 4.2 2.1 4.2 4.4v21.9l58.4-46.1-58.4-46.2z"
      fillRule="evenodd"
      clipRule="evenodd"
      fill={`${fill || BLACK}`}
    />
  </Svg>
);

shareArrow.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default shareArrow;
