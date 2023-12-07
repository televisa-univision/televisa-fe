import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, { G, Path } from 'svgs';

import { BLACK } from '../../../constants/colors';

/**
 * lineup component
 * @param {!Object} props - components props
 * @param {style} props.fill - custom fill color
 * @param {number} props.width - icon width size
 * @param {number} props.height - icon height size
 * @param {string} props.viewBox - viewBox layout
 * @param {style} props.className - class name modifier
 * @param {style} props.style - style override
 * @returns {JSX}
 */
const lineup = ({
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
      <Path
        fill={`${fill || BLACK}`}
        d="M96 64c0-5.888 4.779-10.667 10.667-10.667S117.333 58.112 117.333 64s-4.778 10.667-10.666 10.667C100.779 74.667 96 69.888 96 64m42.667 0c0-5.888 4.778-10.667 10.666-10.667C155.221 53.333 160 58.112 160 64s-4.779 10.667-10.667 10.667S138.667 69.888 138.667 64M96 106.667C96 100.779 100.779 96 106.667 96s10.666 4.779 10.666 10.667-4.778 10.666-10.666 10.666c-5.888 0-10.667-4.778-10.667-10.666m42.667 0c0-5.888 4.778-10.667 10.666-10.667 5.888 0 10.667 4.779 10.667 10.667s-4.779 10.666-10.667 10.666-10.666-4.778-10.666-10.666m42.666 0C181.333 100.779 186.112 96 192 96s10.667 4.779 10.667 10.667-4.779 10.666-10.667 10.666-10.667-4.778-10.667-10.666m-128 0C53.333 100.779 58.112 96 64 96s10.667 4.779 10.667 10.667S69.888 117.333 64 117.333s-10.667-4.778-10.667-10.666M96 149.333c0-5.888 4.779-10.666 10.667-10.666s10.666 4.778 10.666 10.666c0 5.888-4.778 10.667-10.666 10.667C100.779 160 96 155.221 96 149.333m42.667 0c0-5.888 4.778-10.666 10.666-10.666 5.888 0 10.667 4.778 10.667 10.666 0 5.888-4.779 10.667-10.667 10.667s-10.666-4.779-10.666-10.667m42.666 0c0-5.888 4.779-10.666 10.667-10.666s10.667 4.778 10.667 10.666c0 5.888-4.779 10.667-10.667 10.667s-10.667-4.779-10.667-10.667m-128 0c0-5.888 4.779-10.666 10.667-10.666s10.667 4.778 10.667 10.666C74.667 155.221 69.888 160 64 160s-10.667-4.779-10.667-10.667m64 42.667c0-5.888 4.779-10.667 10.667-10.667s10.667 4.779 10.667 10.667-4.779 10.667-10.667 10.667-10.667-4.779-10.667-10.667"
      />
    </G>
  </Svg>
);

lineup.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  viewBox: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default lineup;
