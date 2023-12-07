import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import { Svg, G, Path } from 'svgs';

import { BLUE, LIGHT_GREY } from '../../../constants/colors';

/**
 * scatteredShowers icon component
 * @param {!Object} props - components props
 * @param {number} props.size - icon size
 * @param {string} props.fill - icon fill modifier
 * @param {string} props.viewBox - viewBox
 * @param {string} props.className - modifier class name
 * @param {(style|Object)} props.style - style override
 * @returns {JSX}
 */
const scatteredShowers = ({
  width, height, fill, viewBox, className, style,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <G fill="none" fillRule="evenodd">
      <Path d="M122.6 182.7l-.9 1.2-13.2 15.5a5.3 5.3 0 0 1-6.3 1.3c-.4-.1-.9-.5-1.2-.7a5.4 5.4 0 0 1-.6-7.5l13.3-15.5c2-2 5.3-2.4 7.5-.5a5.4 5.4 0 0 1 1.4 6.2zm70-8.3l-5 6.1a6120.5 6120.5 0 0 1-10.6 12.8l-2.4 2.8a5.4 5.4 0 0 1-6.3 1.4 5.4 5.4 0 0 1-1.8-8.3l6-7 8-9.4 3.7-4.4c1.3-1.4 2.6-3.1 4.3-4 1.8-1 4.2-.8 5.8.5 1.1 1 1.7 2.3 1.7 3.7a5.4 5.4 0 0 1-.6 2.1c-.7 1.4-1.8 2.6-2.7 3.7zm-59.1 40.4a2.7 2.7 0 1 1-4.2-3.3l38.1-47a2.7 2.7 0 0 1 4.1 3.4l-38 47zm5.1-27.1a2.7 2.7 0 1 1-4.1-3.4l17.4-21.5a2.7 2.7 0 1 1 4.2 3.3l-17.5 21.6z" fill={`${fill || BLUE}`} />
      <Path d="M90.8 170l-13.2 15.4a5.3 5.3 0 0 1-6.3 1.4 5.4 5.4 0 0 1-1.7-8.3l13.2-15.4c2-2.1 5.3-2.4 7.5-.6a5.4 5.4 0 0 1 1.4 6.2c-.3.5-.5.9-.9 1.3z" fill={`${fill || BLUE}`} fillRule="nonzero" />
      <Path d="M85 115.6c3 0 5.6-2.6 5.6-5.5a21.4 21.4 0 0 1 31.3-19c1.5.8 3 1 4.6.4a6.2 6.2 0 0 0 3.2-3.2A32.2 32.2 0 0 1 159.9 67c15.9 0 29.5 12 31.8 27.7a5.7 5.7 0 0 0 5 4.7 29.4 29.4 0 0 1 11.3 55.7 48.4 48.4 0 0 1-4.2 1.7 28 28 0 0 1-9.1 1.5H84.6l-3.4-.3a21.3 21.3 0 0 1-18-21.2c0-11.8 9.5-21.4 21.2-21.4l.6.1zm142 49.3c-5 8-10.1 16-16.5 23a108 108 0 0 1-35.7 27.1 102 102 0 0 1-113.1-20.7c-19.1-19-29.7-44.5-29.7-71.6A100.5 100.5 0 0 1 76.8 39a110.7 110.7 0 0 0-.1 66.9 32.1 32.1 0 0 0 .5 62.4c.3 0 .6 0 .9.2l69 .6h36.6c10.3-.1 16-.3 17.2-.5l1-.1 1-.2.7-.1.9-.3c.8-.1 1.7-.4 2.9-.8a5.2 5.2 0 0 1 .7-.3l1-.3c.5-.2 1-.3 1.1-.6l1-.4c.4 0 .7-.3 1-.5a39.6 39.6 0 0 0 22.7-36 40.3 40.3 0 0 0-33.5-39.5 43 43 0 0 0-41.5-33c-15.9 0-30.7 9-38 23.1A31.5 31.5 0 0 0 112 78a32.5 32.5 0 0 0-27.5 15.5A102 102 0 0 1 92 29.1c1-2.1.6-4.6-1-6.2-1.6-1.6-4-2-6-1a112.3 112.3 0 0 0-63.8 100.8 111 111 0 0 0 32.8 79 111.5 111.5 0 0 0 158.2 0A112.4 112.4 0 0 0 234 171c1-2 .6-4.4-1.1-6.1-1.2-1.2-2.7-1.8-4-1.5-.7.2-1.4.6-2 1.5z" fill={`${fill || LIGHT_GREY}`} />
    </G>
  </Svg>
);

scatteredShowers.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  viewBox: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default scatteredShowers;
