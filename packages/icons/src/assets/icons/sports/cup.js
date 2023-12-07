import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, { Path } from 'svgs';

import { BLACK } from '../../../constants/colors';

/**
 * cup component
 * @param {!Object} props - components props
 * @param {style} props.fill - custom fill color
 * @param {number} props.width - icon width size
 * @param {number} props.height - icon height size
 * @param {string} props.viewBox - viewBox layout
 * @param {style} props.className - class name modifier
 * @param {style} props.style - style override
 * @returns {JSX}
 */
const cup = ({
  fill,
  height,
  width,
  viewBox,
  className,
  style,
}) => (
  <Svg
    height={height}
    width={width}
    viewBox={viewBox}
    className={className}
    style={style}
  >
    <Path
      fill={`${fill || BLACK}`}
      d="M179.307 128.853a104.64 104.64 0 0 1-7.254 14.72 56.853 56.853 0 0 1-22.72 22.507v15.253h7.894l46.826 53.334H52.48l47.04-53.334h7.147V166.4a55.04 55.04 0 0 1-22.934-22.827 104.64 104.64 0 0 1-7.146-14.72 101.44 101.44 0 0 1-33.92-75.52V42.667h23.68V21.333H189.44v21.334h23.04v10.666a101.547 101.547 0 0 1-33.813 75.52h.64zm-109.44-23.786a277.333 277.333 0 0 1-3.627-51.734H53.333a90.773 90.773 0 0 0 16.854 52.16l-.32-.426zm116.053.426a90.773 90.773 0 0 0 16.747-52.16H189.76a277.32 277.32 0 0 1-3.627 51.734l-.213.426zM76.16 224h104.427l-28.16-32h-13.76v-32.96l3.306-1.387a46.08 46.08 0 0 0 21.334-19.52c16.64-28.16 16.32-63.146 16-97.066V32H77.12v9.067c0 33.92-.64 69.013 16 97.066a44.267 44.267 0 0 0 21.333 19.84l3.414 1.28V192h-13.44L76.16 224z"
    />
  </Svg>
);

cup.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  viewBox: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default cup;
