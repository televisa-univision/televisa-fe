import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import { Svg, Path } from 'svgs';

import { BLACK } from '../../../constants/colors';

/**
 * skies icon component
 * @param {!Object} props - components props
 * @param {style} props.fill - custom fill color
 * @param {number} props.width - icon width size
 * @param {number} props.height - icon height size
 * @param {string} props.viewBox - viewBox layout
 * @param {style} props.className - class name modifier
 * @param {style} props.style - style override
 * @returns {JSX}
 */
const skies = ({
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
      d="M204.272 148.356c-9.067 0-16.619-4.288-20.33-6.411-5.398-3.072-39.457-22.293-102.4-57.803l5.333-9.472c62.976 35.52 97.056 54.752 102.24 57.696 8.021 4.576 21.077 11.979 34.837-8.341l9.003 6.09c-9.568 14.155-19.84 18.24-28.683 18.24zm-60.204 26.76c-9.077 0-16.63-4.31-20.341-6.421-5.387-3.062-39.445-22.283-102.39-57.803l5.345-9.472c62.965 35.52 97.034 54.763 102.218 57.707 8.01 4.576 21.088 11.99 34.848-8.342l9.003 6.091c-9.568 14.155-19.84 18.24-28.683 18.24z"
      fill={`${fill || BLACK}`}
    />
  </Svg>
);

skies.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  viewBox: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default skies;
