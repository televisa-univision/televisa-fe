import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, { Path } from 'svgs';

/**
 * download component
 * @param {size} size - icon size
 * @param {string} fill - icon fill modifier
 * @param {style} style - style override
 * @returns {JSX}
 */
const download = ({
  className, height, fill, style, viewBox, width,
}) => (
  <Svg
    className={className}
    height={height}
    style={style}
    viewBox={viewBox}
    width={width}
  >
    <Path
      fill={`${fill || '#FFFFFF'}`}
      d="M159.468 3c6.817 0 12.344 5.542 12.344 12.38v74.962h31.216c6.06 0 10.972 4.927 10.972 11.004a11.02 11.02 0 01-3.048 7.61l-72.245 75.651a10.957 10.957 0 01-7.924 3.393h-4.44c-2.938 0-5.752-1.18-7.814-3.278l-74.37-75.65c-4.255-4.328-4.205-11.295.11-15.562a10.956 10.956 0 017.703-3.168h30.691l.001-74.963C82.664 8.542 88.19 3 95.007 3h64.461zM41.402 223h174.196c7.954 0 14.402 6.716 14.402 15 0 8.284-6.448 15-14.402 15H41.402C33.448 253 27 246.284 27 238c0-8.284 6.448-15 14.402-15z"
    />
  </Svg>
);

download.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default download;
