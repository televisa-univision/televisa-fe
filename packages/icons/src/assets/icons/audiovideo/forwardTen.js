import React from 'react';
import Svg, { Path } from 'svgs';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import { BLACK } from '@univision/fe-utilities/styled/constants';

/**
 * forwardTen props
 * @param {string} className - modifier class
 * @param {number} height - icon height size
 * @param {string} fill - fill color, default: svg file color
 * @param {(Object|style)} [style] - modifier styles
 * @param {string} viewBox - viewBox value
 * @param {number} width - icon width size
 * @returns {JSX}
 */
const forwardTen = ({
  width, height, fill, className, style, viewBox,
}) => (
  <Svg
    viewBox={viewBox}
    height={height}
    width={width}
    className={className}
    style={style}
  >
    <Path fill={`${fill || BLACK}`} fillRule="nonzero" d="M131.365 34.119v29.09c-51.04 0-91.336 46.71-81.004 100.093 6.2 32.426 29.963 57.345 61.89 64.539 49.904 11.26 94.538-22.938 100.944-69.544.93-6.152-4.133-11.678-10.332-11.678-5.166 0-9.402 3.858-10.125 8.967-4.96 35.137-38.952 60.89-76.665 51.715-23.247-5.63-40.398-23.668-45.358-47.232-8.369-40.35 22.111-76.008 60.65-76.008v29.09c0 4.692 5.58 6.985 8.782 3.649l39.159-39.516c2.066-2.085 2.066-5.318 0-7.403l-39.159-39.516c-3.203-3.232-8.782-.938-8.782 3.754Zm16.976 96.09c-6.375 0-6.375 0-9.781 4.984-3.3 4.828-3.3 4.828-3.403 13.807l-.004.583v8.594c.125 9.063.125 9.063 3.547 13.922 3.422 4.86 3.422 4.86 9.703 4.86 6.344 0 6.344 0 9.766-5 3.318-4.85 3.318-4.85 3.419-13.87l.003-.568v-8.281c-.063-9.157-.063-9.157-3.469-14.094-3.406-4.938-3.406-4.938-9.781-4.938Zm-27.031.562-16.594 6.781v7.375l8.656-3.344v34.75h8.875v-45.562h-.937Zm27.03 6.781c2.25 0 2.25 0 3.313 2.688 1.014 2.565 1.014 2.565 1.06 7.579l.003.483v11.094c-.063 5.187-.063 5.187-1.11 7.703-1.046 2.516-1.046 2.516-3.203 2.516-2.281 0-2.281 0-3.36-2.688-1.03-2.57-1.03-2.57-1.075-7.714l-.002-.473v-11.344c.156-9.844.156-9.844 4.375-9.844Z" />
  </Svg>
);

forwardTen.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default forwardTen;
