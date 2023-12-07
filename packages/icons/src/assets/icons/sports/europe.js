import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, { Path, G } from 'svgs';

import { GREY_BLACK } from '../../../constants/colors';

/**
 * SVG for the globe showing Europe's continent in green.
 * @param {!Object} props - components props
 * @param {style} props.fill - custom fill color
 * @param {number} props.width - icon width size
 * @param {number} props.height - icon height size
 * @param {string} props.viewBox - viewBox layout
 * @param {style} props.className - class name modifier
 * @param {style} props.style - style override
 * @returns {JSX}
 */
const europe = ({
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
    <G fill={`${fill || GREY_BLACK}`} fillRule="evenodd">
      <Path d="M28 54a26 26 0 1 0 0-52 26 26 0 1 0 0 52zm0 2a28 28 0 1 1 0-56 28 28 0 0 1 0 56z" />
      <Path d="M41 35l1-1h-2-1v1c1-1 0 0 1 1l1-1zM11 15h3c-1-1 0-2-2-2h-1v-1h-1l1 1h-1v1l1 1zm2 13v-2h0v-1c-1 0 0 0 0 0h-1v1h-1v1s-2 0-1 1h3zm8 12h1v-1l-1 1zm1 1l-1-1v2h1v-1zm5 2l-2 1h-1l2 1v-1l1-1z" />
      <Path d="M18 29l-1-1-1-3h-1l2-2h-2l1-1h-1l-1 2h1v1l-1 1h1v1l-1 1-1 1h2-2l-1 1h5l1-1zm6-5s-1 1 0 0l-1 1 1-1zm0 3l-1-1 1 1zm0 0l1-1h-1v1zm10 18l-1 1h3v-1h-2zm8 0l1-1-2 1h-1 2z" />
      <Path d="M47 36v1h2l2 1 1-1h1v-1-1l-1-1-3-1 1-2v-1l-3-3h1v-1s1-2 3-1 3-2 4-3h-2l-1-2-1 1v-1-1h-1l-1-2c-1-4-5-3-4-9 0 0-2-2-3-1l1 2h-1l-1 1c-2 1-1 3-2 3l-1-1h1l-2-1 1 2 1 1s-2-1-2 1l1 1-2-1 1 1h-2l-1-2h2l1-1-5-1v-1h-2l-4 3c0 1-2 4-5 5v3c0 3 2 1 2 1l1-1v1l1 2 1 1c-1 0 0 0 0 0l2-3v-1l-1-2 2-2v-2l2 1-2 2c0 4 2 2 2 3l2-2 1 1-1 1h-2v1s0 2-1 1l-2 3s-2 2-3 1l-2-1v-2h-1v3h-1l-5 3h-1v1h-2-1c1 0 3 3 1 5l-5-1H7c1 1 0 3-1 4v2s2 0 2 2h3l3-2 1-2 2-1 3-1h2l2 2 3 3v1l1-2h-1 2l-1-1s-2 0-1-1h-1l-2-3h1l4 3 1 2 1 1h2c-1 1-2 0-1 1l1 1-1-1h1c1-1 0-1-1-1l1-1h-1v-1h2-1 2l2-1-1-2 1-4h3l3-2-1 1v2l2 1h3z" />
    </G>
  </Svg>
);

europe.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  viewBox: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default europe;
