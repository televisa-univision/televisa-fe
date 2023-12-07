import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, { Path } from 'svgs';

import { WHITE } from '../../../constants/colors';

/**
 * goal component
 * @param {!Object} props - components props
 * @param {style} props.fill - custom fill color
 * @param {number} props.width - icon width size
 * @param {number} props.height - icon height size
 * @param {string} props.viewBox - viewBox layout
 * @param {style} props.className - class name modifier
 * @param {style} props.style - style override
 * @returns {JSX}
 */
const card = ({
  width,
  height,
  viewBox,
  fill,
  style,
  className,
}) => (
  <Svg
    height={height}
    width={width}
    viewBox={viewBox}
    className={className}
    style={style}
  >
    <Path fill={`${fill || WHITE}`} d="M19.556 6.222h-10.667c-0.978 0-1.778 0.8-1.778 1.778v12.444h1.778v-12.444h10.667v-1.778zM22.222 9.778h-9.778c-0.978 0-1.778 0.8-1.778 1.778v12.444c0 0.978 0.8 1.778 1.778 1.778h9.778c0.978 0 1.778-0.8 1.778-1.778v-12.444c0-0.978-0.8-1.778-1.778-1.778zM22.222 24h-9.778v-12.444h9.778v12.444z" />

  </Svg>
);

card.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  viewBox: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default card;
