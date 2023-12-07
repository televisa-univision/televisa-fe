import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import { Svg, Path } from 'svgs';

import { BLACK } from '../../../constants/colors';

/**
 * star icon component
 * @param {Object} props - components props
 * @param {string} props.className - modifier class name
 * @param {string} props.fill - icon fill modifier
 * @param {number} props.height - icon height
 * @param {(style|Object)} props.style - style override
 * @param {string} props.viewBox - viewBox
 * @param {number} props.width - icon width
 * @returns {JSX}
 */
const star = ({
  width, height, fill, viewBox, className, style,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M248.74402 94.09114c-.70023-2.15947-2.72482-3.6221-5.00059-3.6221h-84.2184L133.50219 10.6221C132.80194 8.46262 130.77736 7 128.50159 7c-2.27575 0-4.29273 1.46262-5.00058 3.6221L97.47817 90.46904h-84.2184c-2.27577 0-4.29275 1.46263-5.0006 3.6221-.70784 2.15947.0685 4.5257 1.91043 5.85815l68.13585 49.34628-26.02284 79.8546c-.70024 2.15948.0685 4.51806 1.91042 5.8505s4.3308 1.33244 6.17272 0l68.13585-49.34629 68.13585 49.34629c1.84192 1.33244 4.3308 1.33244 6.17272 0s2.61066-3.69868 1.91042-5.8505l-26.02284-79.8546L246.8336 99.9493c1.84192-1.33244 2.61066-3.69868 1.91042-5.85815z"
      fill={`${fill || BLACK}`}
      fillRule="nonzero"
    />
  </Svg>
);

star.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default star;
