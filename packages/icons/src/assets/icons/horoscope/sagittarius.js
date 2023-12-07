import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import { Svg, Path } from 'svgs';

import { BLACK } from '../../../constants/colors';

/**
 * sagittarius icon component
 * @param {Object} props - components props
 * @param {string} props.className - modifier class name
 * @param {string} props.fill - icon fill modifier
 * @param {number} props.height - icon height
 * @param {(style|Object)} props.style - style override
 * @param {string} props.viewBox - viewBox
 * @param {number} props.width - icon width
 * @returns {JSX}
 */
const sagittarius = ({
  width, height, fill, viewBox, className, style,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M181.875 145.665l.03.005c1.74.395 3.565.07 5.065-.89 1.5-.96 2.55-2.49 2.91-4.24l17.47-83.32c.055-.495.055-.995 0-1.49l-.015-.275v-.29c0-.15 0-.15.01-.07-.035-.36-.095-.715-.175-1.025l-.14-.525c-.115-.335-.255-.665-.425-.98l-.235-.445c-.51-.86-1.23-1.58-2.055-2.07l-.445-.255c-.315-.17-.64-.31-.85-.385l-.615-.17c-.35-.09-.705-.155-.84-.175h-.58l-.275-.015c-.495-.055-.995-.055-1.26-.035l-83.7 17.535c-2.445.35-4.49 2.025-5.32 4.35-.83 2.325-.295 4.92 1.375 6.735 1.675 1.815 4.215 2.55 6.73 1.885L180.3 66.585 87.795 159.09l-26.53-26.53c-2.6-2.6-6.815-2.6-9.415 0-2.6 2.6-2.6 6.815 0 9.415l26.53 26.53-23.845 23.845c-1.68 1.68-2.34 4.135-1.725 6.43.615 2.295 2.41 4.09 4.705 4.705 2.295.615 4.75-.04 6.43-1.725l23.845-23.845 26.53 26.53c1.68 1.68 4.135 2.34 6.43 1.725 2.295-.615 4.09-2.41 4.705-4.705.615-2.295-.04-4.75-1.725-6.43l-26.53-26.53L189.705 76l-12.97 61.885c-.705 3.56 1.58 7.03 5.13 7.79l.01-.01z"
      fill={`${fill || BLACK}`}
      fillRule="nonzero"
    />
  </Svg>
);

sagittarius.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default sagittarius;
