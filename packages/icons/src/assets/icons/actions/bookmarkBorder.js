import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import Svg, { G, Path } from 'svgs';

import { BLACK } from '../../../constants/colors';

/**
 * bookmarkBorder component
 * @param {size} size - icon size
 * @param {string} fill - icon fill modifier
 * @param {style} style - style override
 * @returns {JSX}
 */
const bookmarkBorder = ({
  width, height, fill, style, className,
}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" style={style} className={className}>
    <G fill="none" fillRule="evenodd">
      <Path d="m0 0h24v24h-24z" />
      <Path d="m17 3h-10c-1.1 0-2 .9-2 2v16l7-3 7 3v-16c0-1.1-.9-2-2-2zm0 15-5-2.18-5 2.18v-12c0-.55.45-1 1-1h8c.55 0 1 .45 1 1z" fill={fill} fillRule="nonzero" />
    </G>
  </Svg>
);

/**
 * bookmarkBorder props
 * @property {number} width - icon width size
 * @property {number} height - icon height size
 * @property {string} fill - fill color, default: svg file color
 * @property {(Object|style)} [style] - modifier styles
 * @property {string} className - modifier class
 */
bookmarkBorder.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  className: PropTypes.string,
};

bookmarkBorder.defaultProps = {
  fill: BLACK,
};

export default bookmarkBorder;
