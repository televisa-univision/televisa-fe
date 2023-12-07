import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, { Path } from 'svgs';

import { BLACK } from '../../../constants/colors';

/**
 * tiktok component
 * @param {!Object} props - components props
 * @param {style} props.fill - custom fill color
 * @param {number} props.width - icon width size
 * @param {number} props.height - icon height size
 * @param {style} props.className - class name modifier
 * @param {style} props.style - style override
 * @returns {JSX}
 */
const tiktokLegacy = ({
  fill,
  height,
  width,
  className,
  style,
}) => (
  <Svg
    height={height}
    width={width}
    viewBox="0 0 256 256"
    className={className}
    style={style}
  >
    <Path
      fill={`${fill || BLACK}`}
      d="M195.49,64.09c-11.86-7.49-20.42-19.48-23.09-33.45-.58-3.02-.89-6.13-.89-9.31h-37.85l-.06,146.99c-.64,16.46-14.62,29.67-31.76,29.67-5.33,0-10.34-1.29-14.76-3.54-10.13-5.16-17.06-15.45-17.06-27.29,0-17,14.27-30.83,31.82-30.83,3.28,0,6.41,.52,9.39,1.42v-37.44c-3.08-.41-6.2-.66-9.39-.66-38.41,0-69.67,30.29-69.67,67.51,0,22.84,11.78,43.05,29.74,55.27,11.32,7.7,25.08,12.24,39.93,12.24,38.42,0,69.67-30.28,69.67-67.51V92.63c14.84,10.33,33.03,16.41,52.66,16.41v-36.68c-10.57,0-20.42-3.05-28.68-8.26Z"
    />
  </Svg>
);

tiktokLegacy.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default tiktokLegacy;
