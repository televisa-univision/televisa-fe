import React from 'react';
import Svg, { G, Path } from 'svgs';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import { BLACK } from '@univision/fe-utilities/styled/constants';

/**
 * language component
 * @param {number} width - icon width size
 * @param {number} height - icon height size
 * @param {string} fill - fill color, default: svg file color
 * @param {(Object|style)} [style] - modifier styles
 * @param {string} className - modifier class
 * @param {string} viewBox - viewBox value
 * @returns {JSX}
 */
const language = ({
  width, height, fill, className, style, viewBox,
}) => (
  <Svg
    viewBox={viewBox}
    height={height}
    width={width}
    className={className}
    style={style}
  >
    <G fill="none" fillRule="evenodd">
      <Path d="M0 0h256v256H0z" />
      <Path
        d="M127.893 21.333c-58.88 0-106.56 47.787-106.56 106.667s47.68 106.667 106.56 106.667c58.987 0 106.774-47.787 106.774-106.667S186.88 21.333 127.893 21.333zm73.92 64h-31.466C166.933 72 162.027 59.2 155.627 47.36c19.626 6.72 35.946 20.373 46.186 37.973zM128 43.093c8.853 12.8 15.787 26.987 20.373 42.24h-40.746c4.586-15.253 11.52-29.44 20.373-42.24zm-82.56 106.24c-1.707-6.826-2.773-13.973-2.773-21.333 0-7.36 1.066-14.507 2.773-21.333h36.053C80.64 113.707 80 120.747 80 128c0 7.253.64 14.293 1.493 21.333H45.44zm8.747 21.334h31.466c3.414 13.333 8.32 26.133 14.72 37.973a85.193 85.193 0 01-46.186-37.973zm31.466-85.334H54.187a85.193 85.193 0 0146.186-37.973C93.973 59.2 89.067 72 85.653 85.333zM128 212.907c-8.853-12.8-15.787-26.987-20.373-42.24h40.746c-4.586 15.253-11.52 29.44-20.373 42.24zm24.96-63.574h-49.92c-.96-7.04-1.707-14.08-1.707-21.333 0-7.253.747-14.4 1.707-21.333h49.92c.96 6.933 1.707 14.08 1.707 21.333 0 7.253-.747 14.293-1.707 21.333zm2.667 59.307c6.4-11.84 11.306-24.64 14.72-37.973h31.466c-10.24 17.6-26.56 31.253-46.186 37.973zm18.88-59.307c.853-7.04 1.493-14.08 1.493-21.333 0-7.253-.64-14.293-1.493-21.333h36.053c1.707 6.826 2.773 13.973 2.773 21.333 0 7.36-1.066 14.507-2.773 21.333h-36.053z"
        fill={`${fill || BLACK}`}
        fillRule="nonzero"
      />
    </G>
  </Svg>
);

language.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default language;
