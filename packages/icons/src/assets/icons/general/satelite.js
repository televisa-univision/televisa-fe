import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import { Svg, Path } from 'svgs';

import { BLACK } from '../../../constants/colors';

/**
 * satelite icon component
 * @param {!Object} props - components props
 * @param {number} props.size - icon size
 * @param {string} props.fill - icon fill modifier
 * @param {string} props.viewBox - viewBox
 * @param {string} props.className - modifier class name
 * @param {(style|Object)} props.style - style override
 * @returns {JSX}
 */
const satelite = ({
  width, height, fill, viewBox, className, style,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <Path d="M128 149.333333c-11.782075 0-21.333333-9.551258-21.333333-21.333333 0-11.782075 9.551258-21.333333 21.333333-21.333333 11.782075 0 21.333333 9.551258 21.333333 21.333333 0 11.782075-9.551258 21.333333-21.333333 21.333333zm-56.7466667-35.84C76.584869 92.5118639 93.018802 76.1598956 114.026667 70.9333333L123.2 80.1066667c-22.538409 2.3094602-40.3572065 20.1282583-42.6666667 42.6666663l-9.28-9.28zm104.3199997 19.413334l9.28 9.28c-5.279085 20.994646-21.67202 37.387581-42.666666 42.666666l-9.28-9.28c22.538408-2.30946 40.357206-20.128258 42.666666-42.666666zM122.666667 21.3333333h10.666666V64h-10.666666V21.3333333zM20.3733333 122.666667H63.04v10.666666H20.3733333v-10.666666zM122.666667 192h10.666666v42.666667h-10.666666V192zM192 122.666667h42.666667v10.666666H192v-10.666666zm-64 96c-50.0738173 0-90.6666667-40.59285-90.6666667-90.666667 0-50.0738173 40.5928494-90.6666667 90.6666667-90.6666667 50.073817 0 90.666667 40.5928494 90.666667 90.6666667-.058778 50.04945-40.617217 90.607889-90.666667 90.666667zM128 48c-44.18278 0-80 35.81722-80 80s35.81722 80 80 80 80-35.81722 80-80c-.05876-44.1584177-35.841582-79.9412396-80-80z" fill={`${fill || BLACK}`} fillRule="nonzero" />
  </Svg>
);

satelite.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  viewBox: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default satelite;
