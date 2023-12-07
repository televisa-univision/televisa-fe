import React from 'react';
import Svg, { G, Path } from 'svgs';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import { BLACK } from '../../../constants/colors';

/**
 * cast props
 * @property {number} width - icon width size
 * @property {number} height - icon height size
 * @property {string} fill - fill color, default: svg file color
 * @property {(Object|style)} [style] - modifier styles
 * @property {string} className - modifier class
 * @returns {JSX}
 */
const cast = ({
  width, height, fill, className, style,
}) => (
  <Svg
    viewBox="0 0 24 24"
    height={height}
    width={width}
    className={className}
    style={style}
  >
    <G fill="none" fillRule="evenodd">
      <Path d="M0 0h24v24H0z" />
      <Path
        d="M20.182 4H3.818C2.818 4 2 4.818 2 5.818v1.818c0 .5.41.91.91.91s.908-.41.908-.91v-.909c0-.5.41-.909.91-.909h14.545c.5 0 .909.41.909.91v10.908c0 .5-.41.91-.91.91h-4.545c-.5 0-.909.409-.909.909s.41.909.91.909h5.454c1 0 1.818-.819 1.818-1.819V5.818c0-1-.818-1.818-1.818-1.818zM3.036 14.082C2.491 13.99 2 14.436 2 14.99c0 .445.327.818.773.89a4.562 4.562 0 013.709 3.71.907.907 0 00.89.773c.555 0 .992-.491.91-1.037a6.361 6.361 0 00-5.246-5.245zM2 17.636v2.728h2.727A2.724 2.724 0 002 17.636zm1-7.227a.918.918 0 00-1 .91c0 .463.345.854.8.9a8.179 8.179 0 017.345 7.345.89.89 0 00.9.79.915.915 0 00.91-1.009A10.02 10.02 0 003 10.41z"
        fill={`${fill || BLACK}`}
        fillRule="nonzero"
      />
    </G>
  </Svg>
);

cast.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  width: PropTypes.number,
};

export default cast;
