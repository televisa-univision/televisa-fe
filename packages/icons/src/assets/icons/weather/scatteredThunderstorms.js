import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import { Svg, G, Path } from 'svgs';

import { BLUE, LIGHT_GREY, YELLOW } from '../../../constants/colors';

/**
 * scatteredThunderstorms icon component
 * @param {!Object} props - components props
 * @param {number} props.size - icon size
 * @param {string} props.fill - icon fill modifier
 * @param {string} props.viewBox - viewBox
 * @param {string} props.className - modifier class name
 * @param {(style|Object)} props.style - style override
 * @returns {JSX}
 */
const scatteredThunderstorms = ({
  width, height, fill, viewBox, className, style,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <G fill="none" fillRule="evenodd">
      <Path d="M172.7 199.4l-.8 1.3-13.3 15.5a5.4 5.4 0 0 1-6.3 1.3 4.7 4.7 0 0 1-1.1-.8 5.3 5.3 0 0 1-.6-7.5l13.3-15.4c1.9-2.2 5.2-2.4 7.4-.6a5.3 5.3 0 0 1 1.4 6.2m-54.1-20l-13.3 15.5A5.3 5.3 0 0 1 99 196c-.4 0-.8-.4-1.1-.7a5.4 5.4 0 0 1-.7-7.5l13.2-15.4c2-2.2 5.4-2.5 7.6-.6a5.5 5.5 0 0 1 1.4 6.2c-.2.6-.5.9-.9 1.3zm-31.9-6.2l-13.2 15.4a5.3 5.3 0 0 1-6.3 1.3c-.4 0-.9-.4-1.2-.7a5.4 5.4 0 0 1-.6-7.5l13.2-15.5c2-2 5.3-2.4 7.6-.5a5.5 5.5 0 0 1 1.4 6.2l-.9 1.3z" fill={`${fill || BLUE}`} fillRule="nonzero" />
      <Path d="M191.5 135.5v.2c0 1-.2 1.8-.9 2.5l-5.6 6.6-58.2 68.6c-1 1.3-3.8.9-4.4.5-1.4-.7-2-2.6-1.4-4.3l14.5-47-25 .5c-1.5 0-2.7-.9-3.4-2.3-.5-1-.3-2.7.5-3.8l62.6-76.4c1.2-1.4 3-1.8 4.7-.7 1.4.7 2 2.7 1.4 4.3L160.5 132h27.4c1.5 0 2.8.9 3.3 2l.3 1.5" fill={`${fill || YELLOW}`} />
      <Path d="M234.1 171a112.4 112.4 0 0 1-21.8 30.8 111.5 111.5 0 0 1-158.2 0 111 111 0 0 1-32.8-79A111 111 0 0 1 85 21.7c2-1 4.5-.5 6 1.1 1.7 1.6 2 4 1 6.2a102 102 0 0 0-7.4 64.8c5.6-10 15.2-13.5 27.3-13.5 3.2 0 6.6.5 9.8 1.6a42.9 42.9 0 0 1 79.5 9.8c19 3.1 33.5 20 33.5 39.5 0 15.4-8.8 29.1-22.8 35.8l-1 .7-.9.4c-.3 0-.7.3-1.1.4l-1.1.4a5.2 5.2 0 0 1-.8.4c-1 .3-1.9.6-2.7.7l-8.2-7c.3-.4.6-.7 1-.8.6-1 1.3-1.5 2.2-1.9l.6-.2 3.7-1c1.4-.5 2.8-1 4.2-1.7a29.5 29.5 0 0 0-11.3-55.6 5.7 5.7 0 0 1-5-4.8 32.3 32.3 0 0 0-31.8-27.6 32.3 32.3 0 0 0-30.1 21.1 5.6 5.6 0 0 1-3.2 3.2c-1.6.6-3 .5-4.6-.3a21.4 21.4 0 0 0-31.4 18.9c0 3-2.5 5.5-5.4 5.5h-.7a21.4 21.4 0 0 0 .2 42.7h13.4c2.9 0 5.4 2.5 5.4 5.3 0 3-2.5 5.4-5.4 5.4h-8l-1.8-.1c0 .2-4.1-.2-12.4-1.2a32 32 0 0 1 1.6-62c1.1.3 2 0 2.8-.5l-2.8.5-1-3.8a110.7 110.7 0 0 1 .5-65.3A100.5 100.5 0 0 0 32 122.7c0 27.1 10.6 52.5 29.7 71.6A102 102 0 0 0 174.9 215a108 108 0 0 0 35.6-27c6.4-7.1 11.6-15 16.6-23.1a3.5 3.5 0 0 1 2-1.5c1.2-.3 2.7.3 3.9 1.5 1.7 1.7 2 4 1.1 6z" fill={`${fill || LIGHT_GREY}`} />
      <Path d="M203.5 170.4l-13.2 15.5a5.4 5.4 0 0 1-6.3 1.4 4.7 4.7 0 0 1-1.2-.9 5.3 5.3 0 0 1-.5-7.5l13.2-15.4c2-2.2 5.3-2.4 7.5-.6a5.3 5.3 0 0 1 1.4 6.2c-.2.6-.5.9-.9 1.3z" fill={`${fill || BLUE}`} fillRule="nonzero" />
    </G>
  </Svg>
);

scatteredThunderstorms.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  viewBox: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default scatteredThunderstorms;
