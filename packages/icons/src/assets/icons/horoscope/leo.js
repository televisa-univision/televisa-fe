import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import { Svg, Path } from 'svgs';

import { BLACK } from '../../../constants/colors';

/**
 * leo icon component
 * @param {Object} props - components props
 * @param {string} props.className - modifier class name
 * @param {string} props.fill - icon fill modifier
 * @param {number} props.height - icon height
 * @param {(style|Object)} props.style - style override
 * @param {string} props.viewBox - viewBox
 * @param {number} props.width - icon width
 * @returns {JSX}
 */
const leo = ({
  width, height, fill, viewBox, className, style,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M100.685 147.305c.28 18.73-14.735 34.155-33.63 34.61v-.07l-1.25-.085c-18.335-1.24-32.6-16.33-32.6-34.54 0-18.605 14.865-33.875 33.7-34.6 6.685.035 13.25 2.12 18.75 5.965l2.105 1.47V87.08c-.325-20.645 16.285-37.66 37.2-38.075 20.82.415 37.425 17.435 37.1 38.06v83.165c0 8.585 4.63 16.515 12.145 20.805 7.515 4.29 16.775 4.29 24.285 0 7.515-4.29 12.145-12.22 12.145-20.805 0-3.525 2.89-6.39 6.465-6.39 3.575 0 6.465 2.865 6.465 6.39 0 20.32-16.66 36.8-37.215 36.8-20.555 0-37.215-16.48-37.215-36.8V87.06c.33-13.54-10.475-24.855-24.145-25.275-13.815.42-24.63 11.725-24.3 25.335V147.31l-.005-.005zm-54.965.11c0 11.32 9.325 20.665 21.11 21.225 12-.56 21.34-9.885 21.34-21.225 0-11.32-9.31-20.635-21.16-21.22-11.98.585-21.29 9.9-21.29 21.22z"
      fill={`${fill || BLACK}`}
      fillRule="nonzero"
    />
  </Svg>
);

leo.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default leo;
