import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, { G, Path } from 'svgs';

import { GREEN_HAZE } from '../../../constants/colors';

/**
 * inIcon component
 * @param {!Object} props - components props
 * @param {style} props.fill - custom fill color
 * @param {number} props.width - icon width size
 * @param {number} props.height - icon height size
 * @param {string} props.viewBox - viewBox layout
 * @param {style} props.className - class name modifier
 * @param {style} props.style - style override
 * @returns {JSX}
 */
const inIcon = ({
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
    <G fill="none" fillRule="evenodd">
      <Path d="M0 256h256V0H0z" />
      <Path fill={`${fill || GREEN_HAZE}`} d="M91.045 165.739l7.542-7.542L60.88 120.48l-7.552 7.541z" />
      <Path fill={`${fill || GREEN_HAZE}`} d="M53.333 127.973l7.542 7.542 37.717-37.707-7.541-7.552z" />
      <Path fill={`${fill || GREEN_HAZE}`} d="M64 133.333h138.667v-10.666H64z" />
    </G>
  </Svg>
);

inIcon.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  viewBox: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default inIcon;
