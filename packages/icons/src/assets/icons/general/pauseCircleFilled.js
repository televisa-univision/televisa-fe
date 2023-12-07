import React from 'react';
import Svg, { G, Path } from 'svgs';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import { BLACK } from '@univision/fe-utilities/styled/constants';

/**
 * pauseCircleFilled component
 * @param {number} width - icon width size
 * @param {number} height - icon height size
 * @param {string} fill - fill color, default: svg file color
 * @param {(Object|style)} [style] - modifier styles
 * @param {string} className - modifier class
 * @param {string} viewBox - viewBox value
 * @returns {JSX}
 */
const pauseCircleFilled = ({
  width,
  height,
  fill,
  className,
  style,
  viewBox,
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
        d="M128 21.333C69.12 21.333 21.333 69.12 21.333 128S69.12 234.667 128 234.667 234.667 186.88 234.667 128 186.88 21.333 128 21.333zm-21.333 149.334C100.8 170.667 96 165.867 96 160V96c0-5.867 4.8-10.667 10.667-10.667 5.866 0 10.666 4.8 10.666 10.667v64c0 5.867-4.8 10.667-10.666 10.667zm42.666 0c-5.866 0-10.666-4.8-10.666-10.667V96c0-5.867 4.8-10.667 10.666-10.667C155.2 85.333 160 90.133 160 96v64c0 5.867-4.8 10.667-10.667 10.667z"
        fill={`${fill || BLACK}`}
        fillRule="nonzero"
      />
    </G>
  </Svg>
);

pauseCircleFilled.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default pauseCircleFilled;
