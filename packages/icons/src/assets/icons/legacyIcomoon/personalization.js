import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, { Path } from 'svgs';

import { BLACK } from '../../../constants/colors';

/**
 * personalization component
 * @param {!Object} props - components props
 * @param {style} props.fill - custom fill color
 * @param {number} props.width - icon width size
 * @param {number} props.height - icon height size
 * @param {style} props.className - class name modifier
 * @param {style} props.style - style override
 * @returns {JSX}
 */
const personalization = ({
  fill,
  height,
  width,
  className,
  style,
}) => (
  <Svg
    height={height}
    width={width}
    viewBox="0 0 1024 1024"
    className={className}
    style={style}
  >
    <Path
      fill={`${fill || BLACK}`}
      d="M856.405 123.733c-13.445 0.407-25.276 6.972-32.818 16.959l-0.078 0.108-435.243 430.933-4.267 68.267h68.267l430.933-439.467c10.423-7.866 17.090-20.23 17.090-34.151 0-23.564-19.103-42.667-42.667-42.667-0.428 0-0.855 0.006-1.28 0.019l0.062-0.001zM170.667 128v768h682.667v-469.333h-42.667v426.667h-597.333v-682.667h426.667v-42.667h-469.333z"
      fillRule="evenodd"
    />
  </Svg>
);

personalization.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default personalization;
