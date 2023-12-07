import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import { Svg, Path, G } from 'svgs';

import { BLACK } from '../../../constants/colors';

/**
 * alertWeather icon component
 * @param {!Object} props - components props
 * @param {number} props.size - icon size
 * @param {string} props.fill - icon fill modifier
 * @param {string} props.viewBox - viewBox
 * @param {string} props.className - modifier class name
 * @param {(style|Object)} props.style - style override
 * @returns {JSX}
 */
const alertWeather = ({
  width, height, fill, viewBox, className, style,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} className={className} style={style}>
    <G fillRule="evenodd" clipRule="evenodd" fill={`${fill || BLACK}`}>
      <Path d="M238.1 233H18c-4.3 0-8.3-2.3-10.4-6.1-2.1-3.7-2.1-8.3 0-12l110.1-186c2.1-3.7 6.1-6 10.4-6 4.3 0 8.3 2.3 10.4 6l110.1 186c2.2 3.7 2.3 8.3.2 12-2.1 3.8-6.1 6.1-10.5 6.1h-.2z" fillOpacity=".2" />
      <Path d="M156.1 142.8c.1.3.2.7.3 1v.2c0 .7-.2 1.3-.7 1.7l-4.3 4.8-44.8 49.4c-.8.9-2.9.7-3.4.4-1.1-.5-1.6-1.9-1.1-3.1l11.1-34-19.2.4c-1.1 0-2.1-.6-2.6-1.6-.4-.9-.3-2 .4-2.7l48.1-55c.9-1 2.5-1.3 3.6-.5 1.1.5 1.6 1.9 1.1 3.1l-12.1 34.4h21.1c1.1 0 2.1.6 2.5 1.5z" />
    </G>
  </Svg>
);

alertWeather.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  viewBox: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default alertWeather;
