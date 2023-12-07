import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import Svg, { Path } from 'svgs';

/**
 * slideshow component
 * @param {size} size - icon size
 * @param {string} fill - icon fill modifier
 * @param {string} viewBox - viewBox
 * @param {style} style - style override
 * @returns {JSX}
 */
const slideshow = ({
  width, height, fill, viewBox, style, className,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} style={style} className={className}>
    <Path
      fill={`${fill || '#000000'}`}
      fillRule="evenodd"
      d="M77.121 93.849H249V229H77.121V93.849zM28.7 154.885h31.048v20.345H8V27h183.337v46.504h-20.7V47.345H28.7v107.54z"
    />
  </Svg>
);

/**
 * slideshow props
 * @property {number} width - icon width size
 * @property {number} height - icon height size
 * @property {string} fill - fill color, default: svg file color
 * @property {string} viewBox - viewBox width, height, default: 0 0 256 256
 * @property {(Object|style)} [style] - modifier styles
 * @property {string} className - modifier class
 */
slideshow.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  viewBox: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  className: PropTypes.string,
};

export default slideshow;
