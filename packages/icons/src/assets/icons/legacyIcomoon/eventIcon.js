import React from 'react';
import Svg, { G, Path } from 'svgs';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import { BLACK } from '@univision/fe-utilities/styled/constants';

/**
 * eventIcon component
 * @param {number} width - icon width size
 * @param {number} height - icon height size
 * @param {string} fill - fill color, default: svg file color
 * @param {(Object|style)} [style] - modifier styles
 * @param {string} className - modifier class
 * @param {string} viewBox - viewBox value
 * @returns {JSX}
 */
const eventIcon = ({
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
        d="M170.667 138.667h-32c-5.867 0-10.667 4.8-10.667 10.666v32C128 187.2 132.8 192 138.667 192h32c5.866 0 10.666-4.8 10.666-10.667v-32c0-5.866-4.8-10.666-10.666-10.666zm0-106.667v10.667H85.333V32c0-5.867-4.8-10.667-10.666-10.667C68.8 21.333 64 26.133 64 32v10.667H53.333c-11.84 0-21.226 9.6-21.226 21.333L32 213.333c0 11.734 9.493 21.334 21.333 21.334h149.334c11.733 0 21.333-9.6 21.333-21.334V64c0-11.733-9.6-21.333-21.333-21.333H192V32c0-5.867-4.8-10.667-10.667-10.667-5.866 0-10.666 4.8-10.666 10.667zM192 213.333H64c-5.867 0-10.667-4.8-10.667-10.666V96h149.334v106.667c0 5.866-4.8 10.666-10.667 10.666z"
        fill={`${fill || BLACK}`}
        fillRule="nonzero"
      />
    </G>
  </Svg>
);

eventIcon.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default eventIcon;
