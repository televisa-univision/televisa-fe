import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, { Path } from 'svgs';

import { BLACK } from '../../../constants/colors';

/**
 * pinterest component
 * @param {!Object} props - components props
 * @param {style} props.fill - custom fill color
 * @param {number} props.width - icon width size
 * @param {number} props.height - icon height size
 * @param {style} props.className - class name modifier
 * @param {style} props.style - style override
 * @returns {JSX}
 */
const pinterestLegacy = ({
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
    <g id="b">
      <Path
        fill={`${fill || BLACK}`}
        d="M127.96,21.33c-58.97,0-106.62,47.74-106.62,106.62,0,45.19,28.08,83.81,67.75,99.34-.97-8.42-1.76-21.41,.35-30.63,1.93-8.34,12.46-53,12.46-53,0,0-3.16-6.41-3.16-15.8,0-14.83,8.6-25.89,19.31-25.89,9.13,0,13.51,6.84,13.51,15.01,0,9.13-5.79,22.82-8.86,35.54-2.54,10.62,5.35,19.31,15.8,19.31,18.96,0,33.52-20.01,33.52-48.79,0-25.54-18.34-43.35-44.58-43.35-30.36,0-48.18,22.73-48.18,46.25,0,9.13,3.51,18.96,7.9,24.31,.88,1.05,.97,2.02,.7,3.07-.79,3.33-2.63,10.62-2.98,12.11-.44,1.93-1.58,2.37-3.6,1.4-13.16-6.32-21.41-25.8-21.41-41.42,0-33.61,24.4-64.5,70.47-64.5,36.95,0,65.73,26.33,65.73,61.6s-23.17,66.34-55.29,66.34c-10.79,0-20.97-5.62-24.4-12.29,0,0-5.35,20.36-6.67,25.36-2.37,9.3-8.86,20.89-13.25,27.99,10,3.07,20.53,4.74,31.59,4.74,58.88,0,106.62-47.74,106.62-106.62-.09-58.97-47.83-106.71-106.71-106.71Z"
      />
    </g>
  </Svg>

);

pinterestLegacy.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default pinterestLegacy;
