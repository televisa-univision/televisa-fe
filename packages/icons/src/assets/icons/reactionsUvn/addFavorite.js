import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import { Svg, Path } from 'svgs';

import { BLACK } from '../../../constants/colors';

/**
 * addFavorite icon component
 * @param {Object} props - components props
 * @param {string} props.className - modifier class name
 * @param {string} props.fill - icon fill modifier
 * @param {number} props.height - icon height
 * @param {(style|Object)} props.style - style override
 * @param {string} props.viewBox - viewBox
 * @param {number} props.width - icon width
 * @returns {JSX}
 */
const addFavorite = ({
  width, height, fill, viewBox, className, style,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <Path fill="none" d="M0 0h256v256H0z" />
    <Path
      d="M223.8 101c-.6-1.7-2.2-2.9-4-2.9h-67.1L132 34.9c-.6-1.7-2.2-2.9-4-2.9s-3.4 1.2-4 2.9l-20.7 63.2H36.2c-1.8 0-3.4 1.2-4 2.9s.1 3.6 1.5 4.6L88 144.7l-20.7 63.2c-.6 1.7.1 3.6 1.5 4.6 1.5 1.1 3.5 1.1 4.9 0l59.5-43.3.3-.2-3-4.1c-1.5-1.1-3.5-1.1-4.9 0l-46.3 33.3 17.7-54c.6-1.7-.1-3.6-1.5-4.6l-46.3-33.3h57.3c1.8 0 3.4-1.2 4-2.9l17.7-54 17.7 54c.6 1.7 2.2 2.9 4 2.9h57.3l-46.3 33.3c-1.5 1.1-2.1 2.9-1.5 4.6l2.9 4.1 60.3-42.9c1.1-.9 1.8-2.7 1.2-4.4zm-34.1 84.5h25.4c1.7 0 3.2 1.4 3.2 3.2v4.4c0 1.7-1.4 3.2-3.2 3.2h-25.4v24.6c0 1.7-1.4 3.2-3.2 3.2h-4.4c-1.7 0-3.2-1.4-3.2-3.2v-24.6h-25.2c-1.7 0-3.2-1.4-3.2-3.2v-4.4c0-1.7 1.4-3.2 3.2-3.2h25.2v-24.6c0-1.7 1.4-3.2 3.2-3.2h4.4c1.7 0 3.2 1.4 3.2 3.2v24.6z"
      fillRule="evenodd"
      clipRule="evenodd"
      fill={`${fill || BLACK}`}
    />
  </Svg>
);

addFavorite.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default addFavorite;
