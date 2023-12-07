import React from 'react';
import Svg, { G, Path } from 'svgs';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import { BLACK } from '@univision/fe-utilities/styled/constants';

/**
 * formula1 component
 * @param {number} width - icon width size
 * @param {number} height - icon height size
 * @param {string} fill - fill color, default: svg file color
 * @param {(Object|style)} [style] - modifier styles
 * @param {string} className - modifier class
 * @param {string} viewBox - viewBox value
 * @returns {JSX}
 */
const formula1 = ({
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
      <Path d="M256 0H0v256h256z" />
      <Path
        d="M21.76 119.68c4.16-44.907 44.8-77.013 89.6-77.013 2.027 0 4.053.106 6.08.213 117.227 7.68 117.227 140.587 117.227 140.587V192c0 11.733-9.6 21.333-21.334 21.333H106.667c-49.814 0-89.707-42.773-84.907-93.653zm178.133 3.627c-6.08-13.76-13.653-25.067-22.826-34.027l-38.614 16.32c-6.4 2.667-10.453 8.853-10.453 15.787 0 9.493 7.68 17.173 17.173 17.173h60.48c-1.6-4.907-3.413-10.027-5.76-15.253zM59.307 171.093C71.467 184.427 88.747 192 106.667 192h106.666v-8.533c0-.214-.106-9.814-2.56-23.467h-65.6c-21.226 0-38.506-17.28-38.506-38.507 0-15.466 9.28-29.44 23.466-35.413L156.8 74.773c-11.733-6.08-25.28-9.6-40.747-10.56-1.6-.213-3.2-.213-4.693-.213-35.307 0-65.387 25.28-68.373 57.707-1.707 18.346 4.053 35.84 16.32 49.386z"
        fill={`${fill || BLACK}`}
        fillRule="nonzero"
      />
    </G>
  </Svg>
);

formula1.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default formula1;
