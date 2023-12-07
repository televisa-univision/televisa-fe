import React from 'react';
import Svg, { G, Path } from 'svgs';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import { BLACK } from '@univision/fe-utilities/styled/constants';

/**
 * navArrowDownward component
 * @param {number} width - icon width size
 * @param {number} height - icon height size
 * @param {string} fill - fill color, default: svg file color
 * @param {(Object|style)} [style] - modifier styles
 * @param {string} className - modifier class
 * @param {string} viewBox - viewBox value
 * @returns {JSX}
 */
const navArrowDownward = ({
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
        d="M117.333 53.333V172.48L65.28 120.427c-4.16-4.16-10.987-4.16-15.147 0a10.623 10.623 0 000 15.04l70.294 70.293a10.623 10.623 0 0015.04 0l70.293-70.293a10.623 10.623 0 000-15.04 10.623 10.623 0 00-15.04 0l-52.053 52.053V53.333c0-5.866-4.8-10.666-10.667-10.666s-10.667 4.8-10.667 10.666z"
        fill={`${fill || BLACK}`}
        fillRule="nonzero"
      />
    </G>
  </Svg>
);

navArrowDownward.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default navArrowDownward;
