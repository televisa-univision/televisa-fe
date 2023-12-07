import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, { Path, G } from 'svgs';
import { GREY_BLACK } from '../../../constants/colors';

/**
 * SVG for the globe showing America's continent in grey.
 * @param {!Object} props - components props
 * @param {style} props.fill - custom fill color
 * @param {number} props.width - icon width size
 * @param {number} props.height - icon height size
 * @param {string} props.viewBox - viewBox layout
 * @param {style} props.className - class name modifier
 * @param {style} props.style - style override
 * @returns {JSX}
 */
const america = ({
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
      <Path d="M28 56a28 28 0 1 1 0-56 28 28 0 0 1 0 56zm0-2a26 26 0 1 0 0-52 26 26 0 0 0 0 52z" />
      <Path d="M18 45l1-2v-2-1l-2-2-1-2 1-3v-1h-2s0-1 0 0v-1h-1s0-1 0 0l-1-1h-1l-1-1a3 3 0 0 0-1 0H9v-1l-1-1a5 5 0 0 1-1-2v1l1 1v1l-1-1v-1c-1 0-1 0 0 0H6l-1-2-1-2v-2-1H3l2-5 2-3h5v1l1-1-1-1V9 8h1v2l1 1h1l1-1v2h-1l-1 1-2 2 4 2v0l1-2v-1h2v1h2l1 1 1 2-2 1 1 1-1 1h-1l1-1-1 1-2 2-2 4c0-1 0-2-1-1h-3l-1 2 1 1h1l1-1s1 0 0 0a13 13 0 0 0 0 2h1v1h2v1l2-1c0 1 0 1 0 0h2l1 1h1l1 1 1 1h1l3 2-1 2-1 3-2 1-2 3c0-1-1 0 0 0l-2 1s0 1 0 0l-1 1v2l-1 1 1 2h-1l-1-3v-4zM18 28h-3 3zm0 1h0zm9-14c-2 0-3-1-3-3s1-1-1-3c0-2-2-2-3-2l-1-1c-1-1 0-1 1-1l2-2 8-1 3 1h-3c2 0 3 0 2 1l3-1v1l-2 2c1 0 1 4-2 5s-4 2-4 4zm17 29l-2-5 1-2-1-2v-2h-3c-3 0-4-1-4-2-1-2-1-4 1-5a7 7 0 0 1 1-2h1a8 8 0 0 1 4-1v1l2 1h1a7 7 0 0 0 3 0l1-2h-3a1 1 0 0 1 0-1h3c1 0 2 0 1-1l3 1c-1 1 0 1 1 1v3h-1v1h1v2l-3 1-3-4 2 4 1 1a7 7 0 0 0 2 0l-2 3-1 2v3h-1l-1 1v2s0 2-2 2a8 8 0 0 1-2 0z" />
      <Path d="M36 23v-2h2l1-1h-1v-1c-1 0 0 0 0 0h2v-1l1-1 1-1v1h3v-1h1l-1-1h2v2h1v1l1 1h1v1h-1a2 2 0 0 0-1 0h1l-1 1v-1h-1v1 1h-1-1v1h1-1v0l-1-1-1-1-1-1v1h1v1h1s-1 0 0 0l-1 1v-1h-1v-1h-2v1h-1v1h-1l-1 1v-1h-1z" />
      <Path d="M45 14h2v-1-2l1-1-1-1-1 1-3 1-1 2s-2 0-1 1v2l1-1 1 2 1-1v-1-1l1-2 1 1-1 1zm-8 5l1-1h1l-1-1v-2h-1v2h1v1c0-1-1 0 0 0h-1 1-1v1zm6 4c-1 0-1 0 0 0zm-1 0v-1h-1v1l1-1zM42 22l-1-1h1v1zm-25 7zm20-11h-1v-1h1c-1 0-1 0 0 0v1h-1zm-4-5h2v-1h-3l1 1h-1 1s-1 0 0 0zm-11 7h2v-1h-1v-1 1l-1 1zm-8-7l1-1 1 1h-2zm2-6l-1 1-2-1h-1l1-1 1 1h2z" />
      <Path d="M17 5v1h-1s-1 0 0 0c2 0 0 1 0 1h-2V6 5h3zm-9 5l2 1v-1H8zm2-1l1 1 1-1h-1V8l-1 1zm10 5a7 7 0 0 0-3-1l1-1c1-1 0-2-1-2h-3c-1-1-1-2 2-2l3 2 2 2h-1l1 1h-1v1z" />
    </G>
  </Svg>
);

america.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  viewBox: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default america;
