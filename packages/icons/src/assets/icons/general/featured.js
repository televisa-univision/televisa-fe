import React from 'react';
import Svg, { G, Path } from 'svgs';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import { BLACK } from '@univision/fe-utilities/styled/constants';

/**
 * featured component
 * @param {number} width - icon width size
 * @param {number} height - icon height size
 * @param {string} fill - fill color, default: svg file color
 * @param {(Object|style)} [style] - modifier styles
 * @param {string} className - modifier class
 * @param {string} viewBox - viewBox value
 * @returns {JSX}
 */
const featured = ({
  width, height, fill, className, style, viewBox,
}) => (
  <Svg
    viewBox={viewBox}
    height={height}
    width={width}
    className={className}
    style={style}
  >
    <G fill="none" fillRule="evenodd">
      <Path d="M0 0h256v256H0z" />
      <Path
        d="M170.667 42.667c5.866 0 10.666 4.8 10.666 10.666V192c0 5.867-4.8 10.667-10.666 10.667H85.333c-5.866 0-10.666-4.8-10.666-10.667V53.333c0-5.866 4.8-10.666 10.666-10.666h85.334zM42.667 64c5.866 0 10.666 4.8 10.666 10.667v96c0 5.866-4.8 10.666-10.666 10.666-5.867 0-10.667-4.8-10.667-10.666v-96C32 68.8 36.8 64 42.667 64zm170.666 0C219.2 64 224 68.8 224 74.667v96c0 5.866-4.8 10.666-10.667 10.666-5.866 0-10.666-4.8-10.666-10.666v-96c0-5.867 4.8-10.667 10.666-10.667z"
        fill={`${fill || BLACK}`}
        fillRule="nonzero"
      />
    </G>
  </Svg>
);

featured.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default featured;
