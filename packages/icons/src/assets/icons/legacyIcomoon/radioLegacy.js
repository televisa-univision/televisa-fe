import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, { Path } from 'svgs';

import { BLACK } from '../../../constants/colors';

/**
 * radioLegacy component
 * @param {!Object} props - components props
 * @param {style} props.fill - custom fill color
 * @param {number} props.width - icon width size
 * @param {number} props.height - icon height size
 * @param {style} props.className - class name modifier
 * @param {style} props.style - style override
 * @returns {JSX}
 */
const radioLegacy = ({
  fill,
  height,
  width,
  className,
  style,
}) => (
  <Svg
    height={height}
    width={width}
    viewBox="0 0 18 18"
    className={className}
    style={style}
  >
    <Path
      fill={`${fill || BLACK}`}
      d="M18 3.6H3.87l9-2.76-.34-.84L0 3.735V17.1h18V3.6zm-.9.9v3.6h-2.7V6.3h-.9v1.8H.9V4.5h16.2zM.9 16.2V9h16.2v7.2H.9zm3.95-5.4a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5z"
    />
  </Svg>
);

radioLegacy.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default radioLegacy;
