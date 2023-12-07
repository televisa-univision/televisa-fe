import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import { Svg, Path, G } from 'svgs';

import { BLACK } from '../../../constants/colors';

/**
 * more dots icon component
 * @param {!Object} props - components props
 * @param {number} props.size - icon size
 * @param {string} props.fill - icon fill modifier
 * @param {string} props.viewBox - viewBox
 * @param {string} props.className - modifier class name
 * @param {(style|Object)} props.style - style override
 * @returns {JSX}
 */
const moreDots = ({
  width, height, fill, viewBox, className, style,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <G fill="none" fillRule="evenodd">
      <Path d="M250 0v250H0V0z" />
      <Path
        d="M104.167 125c0-11.506 9.327-20.833 20.833-20.833 11.506 0 20.833 9.327 20.833 20.833 0 11.506-9.327 20.833-20.833 20.833-11.506 0-20.833-9.327-20.833-20.833zm0-72.917c0-11.506 9.327-20.833 20.833-20.833 11.506 0 20.833 9.327 20.833 20.833 0 11.506-9.327 20.834-20.833 20.834-11.506 0-20.833-9.328-20.833-20.834zm0 145.834c0-11.506 9.327-20.834 20.833-20.834 11.506 0 20.833 9.328 20.833 20.834S136.506 218.75 125 218.75c-11.506 0-20.833-9.327-20.833-20.833z"
        fill={`${fill || BLACK}`}
      />
    </G>
  </Svg>
);

moreDots.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  viewBox: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default moreDots;
