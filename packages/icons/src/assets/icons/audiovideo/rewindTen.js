import React from 'react';
import Svg, { Path } from 'svgs';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import { BLACK } from '@univision/fe-utilities/styled/constants';

/**
 * rewindTen props
 * @param {string} className - modifier class
 * @param {number} height - icon height size
 * @param {string} fill - fill color, default: svg file color
 * @param {(Object|style)} [style] - modifier styles
 * @param {string} viewBox - viewBox value
 * @param {number} width - icon width size
 * @returns {JSX}
 */
const rewindTen = ({
  width, height, fill, className, style, viewBox,
}) => (
  <Svg
    viewBox={viewBox}
    height={height}
    width={width}
    className={className}
    style={style}
  >
    <Path fill={`${fill || BLACK}`} fillRule="nonzero" d="M130.676 34.119c0-4.692-5.58-6.986-8.783-3.754L82.734 69.881c-2.066 2.085-2.066 5.318 0 7.403l39.16 39.516c3.202 3.336 8.782 1.043 8.782-3.65V84.062c38.538 0 69.018 35.658 60.65 76.008-4.96 23.564-22.112 41.602-45.359 47.232-37.712 9.175-71.705-16.578-76.664-51.715-.724-5.109-4.96-8.967-10.126-8.967-6.199 0-11.262 5.526-10.332 11.678 6.406 46.606 51.04 80.804 100.945 69.544 31.926-7.194 55.69-32.113 61.89-64.54 10.331-53.382-29.964-100.093-81.004-100.093Zm9.665 96.09c-6.375 0-6.375 0-9.781 4.984-3.3 4.828-3.3 4.828-3.403 13.807l-.004.583v8.594c.125 9.063.125 9.063 3.547 13.922 3.422 4.86 3.422 4.86 9.703 4.86 6.344 0 6.344 0 9.766-5 3.318-4.85 3.318-4.85 3.419-13.87l.003-.568v-8.281c-.063-9.157-.063-9.157-3.469-14.094-3.406-4.938-3.406-4.938-9.781-4.938Zm-27.031.562-16.594 6.781v7.375l8.656-3.344v34.75h8.875v-45.562h-.937Zm27.03 6.781c2.25 0 2.25 0 3.313 2.688 1.014 2.565 1.014 2.565 1.06 7.579l.003.483v11.094c-.063 5.187-.063 5.187-1.11 7.703-1.046 2.516-1.046 2.516-3.203 2.516-2.281 0-2.281 0-3.36-2.688-1.03-2.57-1.03-2.57-1.075-7.714l-.002-.473v-11.344c.156-9.844.156-9.844 4.375-9.844Z" />
  </Svg>
);

rewindTen.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default rewindTen;
