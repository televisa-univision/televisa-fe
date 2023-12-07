import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import { Svg, Path } from 'svgs';

import { DARKER_GREY } from '../../../constants/colors';

/**
 * addFavoriteSoccer icon component
 * @param {Object} props - components props
 * @param {string} props.className - modifier class name
 * @param {string} props.fill - icon fill modifier
 * @param {number} props.height - icon height
 * @param {(style|Object)} props.style - style override
 * @param {string} props.viewBox - viewBox
 * @param {number} props.width - icon width
 * @returns {JSX}
 */
const addFavoriteSoccer = ({
  width, height, fill, viewBox, className, style,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <Path fill="none" d="M0-5h256v256H0z" />
    <Path
      d="M129 169.5l-1.8-1.1-52.2 32 13.9-60.2-46.2-40.5 60.8-5.2 23.8-56.8 23.8 56.7 60.8 5.3-43.9 38.5c-4.9-2.5-9.3-4.8-13.1-6.6l23.8-20.9-37-3.3-14.5-34.6-14.4 34.5-37 3.3 28.1 24.7-8.5 36.7 30.1-18.4c1.5 6.1 2.7 11.5 3.5 15.9zm59.9 8.2h16.8c4.2 0 7.7 3.4 7.7 7.7 0 4.2-3.4 7.7-7.7 7.7h-16.8v18.2c0 4.2-3.4 7.7-7.7 7.7s-7.7-3.4-7.7-7.7v-18.2H155c-4.2 0-7.7-3.4-7.7-7.7 0-4.2 3.4-7.7 7.7-7.7h18.5v-18.5c0-4.2 3.4-7.7 7.7-7.7s7.7 3.4 7.7 7.7v18.5z"
      fillRule="evenodd"
      clipRule="evenodd"
      fill={`${fill || DARKER_GREY}`}
    />
  </Svg>
);

addFavoriteSoccer.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default addFavoriteSoccer;
