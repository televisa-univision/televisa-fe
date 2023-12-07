import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import { Svg, Path } from 'svgs';

import { BLACK } from '../../../constants/colors';

/**
 * handPointing icon component
 * @param {Object} props - components props
 * @param {string} props.className - modifier class name
 * @param {string} props.fill - icon fill modifier
 * @param {number} props.height - icon height
 * @param {(style|Object)} props.style - style override
 * @param {string} props.viewBox - viewBox
 * @param {number} props.width - icon width
 * @returns {JSX}
 */
const handPointing = ({
  width, height, fill, viewBox, className, style, stroke,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={`${fill || 'none'}`}
      stroke={`${stroke || BLACK}`}
      d="M10.4996 7v-.75A1.2496 1.2496 0 0 0 9.2496 5a1.25 1.25 0 0 0-1.25 1.25v-4a1.25 1.25 0 0 0-2.5 0v7.5813L4.131 7.4563a1.2516 1.2516 0 0 0-2.1687 1.25C3.9996 13 5.2371 14.5 7.9996 14.5a4.9994 4.9994 0 0 0 4.6194-3.0866A4.9993 4.9993 0 0 0 12.9996 9.5V7a1.2496 1.2496 0 0 0-1.25-1.25 1.2498 1.2498 0 0 0-1.25 1.25v0Z"
    />
  </Svg>
);

handPointing.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
  stroke: PropTypes.string,
};

export default handPointing;
