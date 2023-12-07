import React from 'react';
import Svg, { G, Path } from 'svgs';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import { BLACK } from '@univision/fe-utilities/styled/constants';

/**
 * volumeOff component
 * @param {number} width - icon width size
 * @param {number} height - icon height size
 * @param {string} fill - fill color, default: svg file color
 * @param {(Object|style)} [style] - modifier styles
 * @param {string} className - modifier class
 * @param {string} viewBox - viewBox value
 * @returns {JSX}
 */
const volumeOff = ({
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
        d="M38.72 38.72a10.623 10.623 0 000 15.04L77.76 92.8 74.667 96h-32C36.8 96 32 100.8 32 106.667v42.666C32 155.2 36.8 160 42.667 160h32l35.093 35.093c6.72 6.72 18.24 1.92 18.24-7.573v-44.48l44.587 44.587c-5.227 3.946-10.88 7.253-17.067 9.706-3.84 1.6-6.187 5.654-6.187 9.814 0 7.68 7.787 12.586 14.827 9.706 8.533-3.52 16.533-8.213 23.68-13.973l14.293 14.293a10.623 10.623 0 0015.04 0 10.623 10.623 0 000-15.04L53.867 38.72c-4.16-4.16-10.88-4.16-15.147 0zM202.667 128c0 8.747-1.6 17.173-4.374 24.96l16.32 16.32C220.587 156.8 224 142.827 224 128c0-40.853-25.6-75.84-61.653-89.6-6.294-2.453-13.014 2.453-13.014 9.173V49.6c0 4.053 2.667 7.573 6.507 9.067C183.253 69.76 202.667 96.64 202.667 128zM109.76 60.907l-1.813 1.813L128 82.773v-14.4c0-9.493-11.52-14.186-18.24-7.466zM176 128c0-18.88-10.88-35.093-26.667-42.987v19.094l26.454 26.453c.106-.853.213-1.707.213-2.56z"
        fill={`${fill || BLACK}`}
        fillRule="nonzero"
      />
    </G>
  </Svg>
);

volumeOff.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default volumeOff;
