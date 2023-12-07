import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import Svg, { G, Path } from 'svgs';

import { BLACK } from '../../../constants/colors';

/**
 * bookmarks component
 * @param {size} size - icon size
 * @param {string} fill - icon fill modifier
 * @param {style} style - style override
 * @returns {JSX}
 */
const bookmarks = ({
  width, height, fill, style, className,
}) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    style={style}
    className={className}
  >
    <G fill="none" fillRule="evenodd">
      <Path d="m0 0h24v24h-24z" />
      <Path
        d="m19 18 2 1v-16c0-1.1-.9-2-2-2h-10.01c-1.1 0-1.99.9-1.99 2h10c1.1 0 2 .9 2 2zm-4-13h-10c-1.1 0-2 .9-2 2v16l7-3 7 3v-16c0-1.1-.9-2-2-2z"
        fill={fill}
        fillRule="nonzero"
      />
    </G>
  </Svg>
);

/**
 * bookmarks props
 * @property {number} width - icon width size
 * @property {number} height - icon height size
 * @property {string} fill - fill color, default: svg file color
 * @property {(Object|style)} [style] - modifier styles
 * @property {string} className - modifier class
 */
bookmarks.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  className: PropTypes.string,
};

bookmarks.defaultProps = {
  fill: BLACK,
};

export default bookmarks;
